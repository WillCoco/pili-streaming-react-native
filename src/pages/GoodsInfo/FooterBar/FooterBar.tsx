import React from 'react'
import { View, Text, StyleSheet, Platform, Image, PixelRatio, TouchableWithoutFeedback } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'
import formatSinglePrice from '../../../utils/formatGoodsPrice'

export default function FooterBar(props: { showGoodsSkuActionSheet?: any; goodsInfo?: any }) {
  const { goodsInfo } = props

  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>
        <Image source={require('../../../assets/goods-image/icon_kefu.png')} style={styles.icon} />
        <Text>客服</Text>
      </View>

      <View style={styles.iconContainer}>
        <Image source={require('../../../assets/goods-image/icon_star.png')} style={styles.icon} />
        <Text>{goodsInfo.is_collect ? '已收藏' : '收藏'}</Text>
      </View>

      <View style={styles.iconContainer}>
        <Image source={require('../../../assets/goods-image/icon_cart.png')} style={styles.icon} />
        <Text>购物车</Text>
      </View>

      <TouchableWithoutFeedback onPress={() => props.showGoodsSkuActionSheet('add')}>
        <View style={styles.addCart}>
          <Text style={styles.addCartText}>加入购物车</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => props.showGoodsSkuActionSheet('buy')}>
        <View style={styles.buyBtn}>
          <Text style={styles.addCartText}>购买省¥{formatSinglePrice(goodsInfo.MyDiscounts)}</Text>
        </View>
      </TouchableWithoutFeedback>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: pxToDp(Platform.OS === 'ios' ? 128 : 100),
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: pxToDp(104),
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1 / PixelRatio.get(),
    borderRightColor: Colors.borderColor,
    height: '100%',
    paddingBottom: Platform.OS === 'ios' ? pxToDp(28) : 0
  },
  icon: {
    width: pxToDp(38),
    height: pxToDp(36),
    marginBottom: pxToDp(5)
  },
  addCart: {
    backgroundColor: Colors.blackColor,
    height: '100%',
    paddingBottom: Platform.OS === 'ios' ? pxToDp(28) : 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: pxToDp(190)
  },
  addCartText: {
    color: Colors.whiteColor,
    fontSize: pxToDp(28),
    fontWeight: '500'
  },
  buyBtn: {
    flex: 1,
    backgroundColor: Colors.basicColor,
    paddingBottom: Platform.OS === 'ios' ? pxToDp(28) : 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})