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
import {pad, radio} from '../../../../constants/Layout';
import NavBar from '../../../../components/NavBar';
import WarehouseRow from './WarehouseRow';
import CheckBox from '../../../../components/CheckBox';

const ROW_HEIGHT = 120;

const emptyList: [] = [];

const LivingGoodsWareHouse = (props: any) =>  {
  const {navigate, goBack} = useNavigation();
  const dispatch = useDispatch();

  /**
   * 原始数据
   */
  const [dataList, setDataList]: [Array<any>, any] = React.useState(emptyList);

  /**
   * 过滤出选中的, 且是未添加到店铺的
   */
  const canAddFilter = (list: Array<any>) => {
    return list.filter(o => o.isChecked && o.canAdd) // todo: 字段修正
  }

  /**
   * 过滤出选中的
   */
  const checkedFilter = (list: Array<any>) => {
    return list.filter(o => o.isChecked) // todo: 字段修正
  }

  /**
   * 选中的列表
   */
  const checkedList = React.useMemo(() => {
    return checkedFilter(dataList)
  }, [dataList]);

  /**
   * 现在是否全选
   */
  const isCheckedAll = React.useMemo(() => {
    return !dataList.find(o => (!o.isChecked)) // todo: 标识
  }, [dataList]);

  /**
   * 待添加店铺的列表
   */
  const canAddShopList = React.useMemo(() => {
    return canAddFilter(dataList)
  }, [dataList]);

  /**
   * 是否可以选中添加店铺
   */
  const canAddShop = React.useMemo(() => {
    return canAddShopList && canAddShopList.length > 0;
  }, [canAddShopList]);

  /**
   * 是否可选中删除
   */
  const canRemove = checkedList && checkedList.length > 0;

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

  /**
   * 刷新
   */
  const onRefresh = () => {
    const d = [{id: 1, canAdd: true},{id: 2}, {id: 3}];
    const r = Promise.resolve({result: dataFormat(d, dataList)});
    return r;
  }

  /**
   * 更多
   */
  const onEndReached = () => {
    
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
   * 选择单个
   */
  const checkGood = (index: number) => {
    const newDataList = [...dataList];
    newDataList[index].isChecked = !newDataList[index].isChecked;
    setDataList(newDataList);
  }

  /**
   * 全选/反选
   */
  const onPressCheckAll = () => {
    // 全选
    if (!isCheckedAll) {
      const newCheckedList = (dataList || emptyList).map((good: any) => ({...good, isChecked: true}));
      setDataList(newCheckedList);
      return;
    }

    // 取消全选
    const newCheckedList = (dataList || emptyList).map((good: any) => ({...good, isChecked: false}));
    setDataList(newCheckedList);
  }

  /**
   * 移除单个
   */
  const onPressRemove = (index) => {
    alert('移除选中' + index)
  }

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
          data={dataList}
          setData={setDataList}
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
                style={{marginBottom: 4}}
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
          <View style={styles.bottomRightWrapper}>
            <TouchableOpacity disabled={!canAddShop} onPress={onPressAddChecked}>
              <PrimaryText color={canAddShop ? 'theme' : 'grey'}>添加店铺</PrimaryText>
            </TouchableOpacity>
            <View style={styles.strip}/>
            <TouchableOpacity disabled={!canRemove} onPress={onPressRemoveChecked}>
              <PrimaryText color={canRemove ? 'theme' : 'grey'}>删除</PrimaryText>
            </TouchableOpacity>
          </View>
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
    padding: pad,
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 55,
    paddingHorizontal: pad
  },
  bottomRightWrapper: {
    flexDirection: 'row',
  },
  strip: {
    width: 1,
    backgroundColor: Colors.lightGrey,
    marginHorizontal: pad
  }
});

export default withPage(LivingGoodsWareHouse, {
  statusBarOptions: {
    barStyle: 'light-content',
    backgroundColor: 'transparent',
  }
});