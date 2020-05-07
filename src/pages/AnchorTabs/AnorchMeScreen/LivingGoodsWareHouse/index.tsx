/**
 * 预组货列表
 */
import * as React from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {PrimaryText, SmallText, T4, scale} from 'react-native-normalization-text';
import Toast from 'react-native-tiny-toast';
import {useNavigation} from '@react-navigation/native';
import withPage from '../../../../components/HOCs/withPage';
import PagingList from '../../../../components/PagingList';
import {vw} from '../../../../utils/metric';
import {Colors} from '../../../../constants/Theme';
import { pad, radio } from '../../../../constants/Layout';
import NavBar from '../../../../components/NavBar';
import GoodsCategoryScroll from '../../../../components/GoodsCategoryScroll';
import Empty from '../../../../components/Empty';
import GoodCheckBlock from '../../../../components/GoodCheckBlock';
import {getPlatformBrands} from '../../../../actions/shop';
import images from '../../../../assets/images/index';
import WarehouseRow from './WarehouseRow';
import CheckBox from '../../../../components/CheckBox';

const ROW_HEIGHT = 120;

const LivingGoodsWareHouse = (props: any) =>  {
  const {navigate, goBack} = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    // let loading: any;
    // const getData = async () => {
    //   loading = Toast.showLoading('');
    //   await dispatch(getPlatformBrands());
    //   Toast.hide(loading);
    // };
    // getData();

    return () => {
      Toast.hide('');
    }
  }, [])

  // 
  const warehouseGoods = useSelector(state => state?.shop?.warehouseGoods) || [];

  /**
   * 选择的种类
   */
  const [checkedCategory, setCheckedCategory]: Array<any> = React.useState(0);

  /**
   * 刷新
   */
  const onRefresh = () => {
    const d = [{id: 1, canAdd: true},{id: 2}, {id: 3}];
    const {getListData, setListData} = plist.current?.actions || {};
    const checkList = getListData ? getListData() : undefined;

    console.log(checkList, 1111)

    const r = Promise.resolve({result: dataFormat(d, checkList)});

    return r;
  }

  /**
   * 加工原数据
   * 加上isChecked字段
   * @params: {Array} dataList - 预组货列表原数据
   * @params: {Array} checkList - 本地操作选择的
   */
  const dataFormat = (dataList: Array<any>, checkList?: Array<any>) => {
    // 本地选择过之后刷新, format数据
    if (checkList) {
      const checked = checkList.filter(c => c.isChecked)
      const result: Array<any> = [];

      dataList.forEach(d => {
        const matchedGood = checked.find(o => (o.id === d.id && !!o.id)) // todo: 标识
        if (matchedGood) {
          result.push({...d, isChecked: matchedGood.isChecked})
        } else {
          result.push(d)
        }
      })

      return result;
    }

    // 本地没有选择过, format数据默认未选中
    return dataList.map((d: any) => {
      return {
        ...d,
        isChecked: false
      }
    });
  }

  /**
   * 更多
   */
  const onEndReached = () => {
    
  }

  /**
   * 下拉组件实例actions
   */
  const plist: {current: any} = React.useRef();

  /**
   * 选择单个
   */
  const checkGood = (index: number) => {
    const {getListData, setListData} = plist.current?.actions || {};

    setListData((dataList: any) => {
      const newDataList = [...dataList];
      newDataList[index].isChecked = !newDataList[index].isChecked;
      console.log(newDataList, 'newDataList')
      setCanAddShopList(canAddFilter(newDataList))
      return newDataList;
    }, )
  }

  /**
   * 现在是否全选
   */
  const [isCheckedAll, setIsCheckedAll] = React.useState(false);

  /**
   * 全选/反选
   */
  const onPressCheckAll = () => {
    const {getListData, setListData} = plist.current?.actions || {};

    // 全选
    if (!isCheckedAll) {
      const newCheckedList = getListData().map((good: any) => ({...good, isChecked: true}));
      setListData(newCheckedList);
      setIsCheckedAll(true);
      setCanAddShopList(canAddFilter(newCheckedList))
      return;
    }

    // 取消全选
    const newCheckedList = getListData().map((good: any) => ({...good, isChecked: false}));
    setListData(newCheckedList);
    setIsCheckedAll(false);
    setCanAddShopList(canAddFilter(newCheckedList))
  }

  /**
   * 移除单个
   */
  const onPressRemove = (index) => {
    alert('移除选中' + index)
  }

  /**
   * 过滤出选中的, 且是未添加到店铺的
   */
  const [canAddShopList, setCanAddShopList]: Array<any> = React.useState([]);
  const canAddFilter = (list: Array<any>) => {
    return list.filter(o => o.isChecked && o.canAdd) // todo: 字段修正
  }
  const canAddShop = canAddShopList && canAddShopList.length > 0;

  /**
   * 移除选中
   */
  const onPressRemoveChecked = (index) => {
    alert('移除选中' + index)
  }

  /**
   * 添加店铺选中
   */
  const onPressAddChecked = (index) => {
    alert('添加、删除店铺选中' + index + canAddShopList)
  }

  return (
    <View style={styles.style}>
      <NavBar
        leftTheme="light"
        title="预组货"
        titleStyle={styles.navTitle}
        style={styles.nav}
        right={
          () => (
            <TouchableOpacity onPress={() => navigate('GoodsSupply')} style={styles.navRight}>
              <SmallText color="white" style={{}}>添加商品</SmallText>
            </TouchableOpacity>
          )
        }
      />
        <PagingList
          ref={c => plist.current = c}
          size={14}
          // initListData={warehouseGoods}
          renderItem={({item, index}: any) => {
            console.log(item, 'itemmmmmmm')
            return (
              <WarehouseRow
                isChecked={item.isChecked}
                onPressCheck={() => {checkGood(index)}}
                onPressRemove={() => {onPressRemove(index)}}
                onPressAddShop={() => {alert(1)}}
              />
            )
          }}
          getItemLayout={(data, index) => (
            {length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index}
          )}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          keyExtractor={(item, index) => 'index' + index + item}
          initialNumToRender={14}
          numColumns={1}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={styles.pagingListWrapper}
        />
        <View style={styles.bottomWrapper}>
          <CheckBox
            label="全选"
            isChecked={isCheckedAll}
            labelStyle={{color: Colors.darkGrey}}
            onPress={onPressCheckAll}
          />
          <TouchableOpacity onPress={onPressRemoveChecked}>
            <PrimaryText color={canAddShop ? 'theme' : 'grey'}>添加店铺</PrimaryText>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressRemoveChecked}>
            <PrimaryText color="grey">删除</PrimaryText>
          </TouchableOpacity>
        </View>
    </View>
  )
};

LivingGoodsWareHouse.defaultProps = {
};

const cellWidth = (vw(100 - 28) - 3 * pad) / 3 ;

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  nav: {
    backgroundColor: Colors.basicColor,
  },
  navTitle: {
    color: '#fff',
  },
  navRight: {
    width: scale(100),
    padding: pad,
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default withPage(LivingGoodsWareHouse, {
  statusBarOptions: {
    barStyle: 'light-content',
    backgroundColor: 'transparent',
  }
});