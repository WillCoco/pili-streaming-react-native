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
import BrandGoodRow, {ROW_HEIGHT} from './BrandGoodRow'
import PagingList from '../../../components/PagingList';
import NavBar from '../../../components/NavBar';
import {getPlatformBrandsGoods, AddGoodsTargetType} from '../../../actions/shop';
import {vw} from '../../../utils/metric';
import {pad} from '../../../constants/Layout';
import {Colors} from '../../../constants/Theme';
import {brandGoodAdapter} from '../../../utils/dataAdapters';
import images from '../../../assets/images/index';

const PAGE_SIZE = 14;

export interface BrandGoodsParams {
  onPicked: (goodsList: Array<any>) => any,
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
  const onRefresh = async () => {
    const result = await dispatch(getPlatformBrandsGoods({
      brandId,
      addType: type,
      pageSize: PAGE_SIZE,
      pageNo: 1,
    }));

    console.log(result, 'result')

    return Promise.resolve({result});
  }

  const onEndReached = async (pageNo: number, pageSize: number) => {
    const result = await dispatch(getPlatformBrandsGoods({
      brandId,
      addType: type,
      pageSize,
      pageNo,
    }));

    console.log(result, 'result')

    return Promise.resolve({result});
  };

  return (
    <View style={styles.style}>
      <NavBar
        leftTheme="light"
        title="添加商品"
        titleStyle={styles.navTitle}
        style={styles.nav}
      />
      <PagingList
        size={PAGE_SIZE}
        // initListData={warehouseGoods}
        renderItem={({item, index}) => {
          console.log(item, 'itemssss')
          return (
            <BrandGoodRow
              data={item}
              dataAdapter={(item: any) => {
                return brandGoodAdapter(item);
              }}
              onPress={onPicked}
              style={{paddingHorizontal: pad}}
            />
          )
        }}
        getItemLayout={(data, index) => (
          {length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index}
        )}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        keyExtractor={(item: any, index: number) => 'index' + index + item}
        initialNumToRender={PAGE_SIZE}
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