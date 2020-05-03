import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'
import formatSinglePrice from '../../../utils/formatGoodsPrice'

export default function ShopCard(props) {
  const { orderInfo } = props

  return (
    <View style={styles.container}>
      {/* 店铺头部信息 */}
      <View style={styles.header}>
        <Image source={require('../../../assets/order-image/icon_shop.png')} style={styles.icon} />
        <Text style={styles.name}>{orderInfo.shopName}</Text>
        <Ionicons size={20} name='ios-arrow-forward' color={Colors.darkGrey} />
      </View>
      {/* 商品信息 */}
      <View style={styles.goodsInfo}>
        <Image source={{ uri: orderInfo.goodsInfo.skuImg }} style={styles.goodsImg} />
        <View style={styles.goodsDetail}>
          <Text style={styles.goodsName} numberOfLines={2}>{orderInfo.goodsInfo.goodsName}</Text>
          <View style={styles.goodsSku}>
            <Text style={styles.text}>{orderInfo.goodsInfo.specJson}</Text>
            <Text style={[styles.text, { marginLeft: pxToDp(40) }]}>数量：</Text>
            <Text style={styles.text}>{orderInfo.goodsInfo.goodsNum}</Text>
          </View>
          <View style={styles.totalPrice}>
            <Text style={styles.text}>合计：</Text>
            <Text style={[styles.text, { color: Colors.basicColor }]}>¥</Text>
            <Text style={styles.price}>{formatSinglePrice(orderInfo.goodsInfo.goodsPrice)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: pxToDp(20),
    backgroundColor: Colors.whiteColor
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: pxToDp(20)
  },
  icon: {
    width: pxToDp(38),
    height: pxToDp(34)
  },
  name: {
    fontSize: pxToDp(32),
    fontWeight: '500',
    color: Colors.darkBlack,
    marginLeft: pxToDp(14),
    marginRight: pxToDp(14)
  },
  goodsInfo: {
    marginTop: pxToDp(20),
    flexDirection: 'row'
  },
  goodsImg: {
    width: pxToDp(200),
    height: pxToDp(200),
    borderRadius: pxToDp(10)
  },
  goodsDetail: {
    flex: 1,
    marginLeft: pxToDp(20)
  },
  goodsName: {
    fontSize: pxToDp(28),
    fontWeight: '500',
    color: Colors.darkBlack,
    lineHeight: pxToDp(36)
  },
  goodsSku: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToDp(22)
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: pxToDp(20),
    alignItems: 'baseline'
  },
  text: {
    fontSize: pxToDp(26),
    color: Colors.darkGrey
  },
  price: {
    fontSize: pxToDp(28),
    fontWeight: '600',
    color: Colors.basicColor
  }
})