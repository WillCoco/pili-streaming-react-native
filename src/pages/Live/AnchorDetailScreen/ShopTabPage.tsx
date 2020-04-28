/**
 * 主播详情
 */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  PanResponder,
} from 'react-native';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import Avatar from '../../../components/Avatar';
import PagingList from '../../../components/PagingList';
import GoodsCard from '../../../components/GoodsCard/GoodsCard';
import {Colors} from '../../../constants/Theme';
import {vw} from '../../../utils/metric';
import { pad } from '../../../constants/Layout';
import images from '../../../assets/images/index';

const AnorchDetailAvatar = (props: {
  isLiving: boolean
}) =>  {

  /**
   * 获取店铺商品
   */
  const onRefresh = () => Promise.resolve({
    result: [
      {
        original_img: images.userDefaultAvatar,
        goods_name: '测试',
        MyDiscounts: '100',
        shop_price: '120',
        market_price: '130',
      },
      {
        original_img: images.userDefaultAvatar,
        goods_name: '测试',
        MyDiscounts: '100',
        shop_price: '120',
        market_price: '130',
      },
  ]
  });

  const onEndReached = () => {};

  return (
    <View style={styles.style}>
      <PagingList
          size={14}
          // initListData={['1223', '2222']}
          //item显示的布局
          renderItem={({item}) => {
            console.log(item,1112322)
            return <GoodsCard goodsInfo={item} /> 
          }}
          //下拉刷新相关
          onRefresh={onRefresh}
          //加载更多
          onEndReached={onEndReached}
          // ItemSeparatorComponent={separator}
          keyExtractor={(item, index) => 'index' + index + item}
          initialNumToRender={14}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          // style={{borderTopWidth: 4, borderColor: Colors.pageGreyBg}}
          contentContainerStyle={{paddingHorizontal: pad}}
      />
    </View>
  )
};

AnorchDetailAvatar.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    borderTopWidth: 4,
    borderColor: Colors.pageGreyBg,
    paddingTop: pad
  },
  livingText: {
    color: '#fff',
    backgroundColor: Colors.basicColor,
    height: 18,
    lineHeight: 18,
    paddingHorizontal: 7,
    borderRadius: 9,
    position: 'absolute',
    bottom: -2,
    fontSize: 12,
    // transform: [{translateY: vw(8)}]
  }
});

export default AnorchDetailAvatar;
