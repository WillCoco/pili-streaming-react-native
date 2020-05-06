/**
 * 品牌的商品
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import BrandGoodRow from './BrandGoodRow'
import PagingList from '../../../components/PagingList';
import NavBar from '../../../components/NavBar';
import {Colors} from '../../../constants/Theme';
import {vw} from '../../../utils/metric';
import {pad} from '../../../constants/Layout';
import images from '../../../assets/images/index';

const ROW_HEIGHT = 120;

const BrandGoods = () =>  {
  const {navigate, goBack} = useNavigation();
  const route = useRoute();
  /**
   * 获取参数
   */
  // 目标列表(挑选到预组货 还是 挑选到店铺), 用于比较是否存在(分页的化应该服务端去比较)
  // 添加事件
  // 目标品牌
  const {
    onPicked,
    brandId,
    // targetList
  } = route.params || {};

  /**
   * 获取品牌商品
   */

  const onGoodPicked = () => {
    // 执行挑选的目标事件

    // 返回
    goBack();
  }

  const onRefresh = () => Promise.resolve({
    result: [1,1,1,1,]
  });

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