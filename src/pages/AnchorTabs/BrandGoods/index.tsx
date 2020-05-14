/**
 * 品牌的商品
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import BrandGoodRow from './BrandGoodRow'
import PagingList from '../../../components/PagingList';
import NavBar from '../../../components/NavBar';
import {getPlatformBrandsGoods, AddGoodsTargetType} from '../../../actions/shop';
import {vw} from '../../../utils/metric';
import {pad} from '../../../constants/Layout';
import {Colors} from '../../../constants/Theme';
import images from '../../../assets/images/index';

const ROW_HEIGHT = 120;

export interface BrandGoodsParams {
  onPicked: () => any,
  brandId: number,
  type: AddGoodsTargetType, // 区分添加橱窗还是
}

const BrandGoods = () =>  {
  const {navigate, goBack} = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  /**
   * 获取参数
   */
  // 目标列表(挑选到预组货 还是 挑选到店铺), 用于比较是否存在(分页的化应该服务端去比较)
  // 添加事件
  // 目标品牌
  const {
    onPicked,
    brandId,
    type,
  }: BrandGoodsParams = (route.params || {}) as BrandGoodsParams;

  /**
   * 获取品牌商品
   */

  const onGoodPicked = () => {
    // 执行挑选的目标事件

    // 返回
    goBack();
  }

  const onRefresh = async () => {
    const r = await dispatch(getPlatformBrandsGoods({
      brandId,
      addType: type,
      pageSize: 20,
      pageNo: 1,
    }));
    
    return Promise.resolve({
      result: [1,1,1,1,]
    });
  }

  const onEndReached = () => {};
  return (
    <View style={styles.style}>
      <NavBar
        leftTheme="light"
        title="添加商品"
        titleStyle={styles.navTitle}
        style={styles.nav}
      />
      <PagingList
        size={14}
        // initListData={warehouseGoods}
        renderItem={({item, index}) => {
          return (
            <BrandGoodRow
              onPress={onGoodPicked}
              isAdded={false} // 在目标列表中有没有
              style={{paddingHorizontal: pad}}
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
        // columnWrapperStyle={{justifyContent: 'space-between'}}
        // contentContainerStyle={styles.pagingListWrapper}
      />
    </View>
  )
};

BrandGoods.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  },
  nav: {
    backgroundColor: Colors.basicColor,
  },
  navTitle: {
    color: '#fff',
  },
});

export default BrandGoods;