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
import Iconcartlight from '../../../../components/Iconfont/Iconcartlight';
import {getPlatformBrands} from '../../../../actions/shop';
import images from '../../../../assets/images/index';
import WarehouseRow from './WarehouseRow';

const ROW_HEIGHT = 120;

const LivingGoodsWareHouse = (props: any) =>  {
  const {navigate, goBack} = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    let loading: any;
    const getData = async () => {
      loading = Toast.showLoading('');
      await dispatch(getPlatformBrands());
      Toast.hide(loading);
    };
    getData();

    return () => {
      Toast.hide(loading);
    }
  }, [])

  const onPressBrand = () => {

    // 跳转
  }

  // 平台品牌
  const warehouseGoods = useSelector(state => state?.shop?.warehouseGoods) || [];

  /**
   * 选择的种类
   */
  const [checkedCategory, setCheckedCategory]: Array<any> = React.useState(0);


  /**
   * 刷新
   */
  const onRefresh = () => {
    return Promise.resolve({result: [1,2,3]})
  }

  /**
   * 更多
   */
  const onEndReached = () => {
    
  }

  /**
   * 移除选中
   */
  const onPressRemoveChecked = () => {
    alert('移除选中')
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
          size={14}
          // initListData={warehouseGoods}
          renderItem={({item, index}) => {
            return (
              <WarehouseRow 
                onPress={() => {alert(1)}}
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
          <TouchableOpacity>
            <Image />
            <PrimaryText color="grey">全选</PrimaryText>
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
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: pad,
    backgroundColor: '#fff',
  },
});

export default withPage(LivingGoodsWareHouse, {
  statusBarOptions: {
    barStyle: 'light-content',
    backgroundColor: 'transparent',
  }
});