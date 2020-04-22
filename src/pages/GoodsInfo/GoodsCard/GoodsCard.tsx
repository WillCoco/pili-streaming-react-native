import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Theme'
import formatSinglePrice from '../../../utils/formatGoodsPrice'

export default function GoodsCard(props: { goodsInfo: any }) {
  const { goodsInfo } = props

  return (
    <View style={styles.container}>
      <View style={styles.goodsHeader}>
        <View style={styles.goodsPrice}>
          <View style={styles.price}>
            <Text style={styles.priceText}>会员优惠价</Text>
            <Text style={styles.rmbIcon}>¥</Text>
            <Text style={styles.salePrice}>{formatSinglePrice(goodsInfo.shop_price)}</Text>
            <Text style={styles.originalPrice}>¥{formatSinglePrice(goodsInfo.market_price)}</Text>
          </View>
        </View>
        <View style={styles.shareBar}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ImageBackground source={require('../../../assets/goods-image/share_bgi.png')} style={styles.shareBgi}>
              <Text style={styles.shareBgiText}>分享</Text>
            </ImageBackground>
            <Text style={styles.shareBarText}>预计可赚：¥{formatSinglePrice(goodsInfo.MyDiscounts)}</Text>
            <Text style={[styles.shareBarText, styles.totalPriceText]}>最高可赚：</Text>
            <Text style={[styles.shareBarText, styles.totalPrice]}>¥{formatSinglePrice(goodsInfo.MaxDiscounts)}</Text>
          </View>

          <View style={styles.upLevel}>
            <Text style={styles.upLevelText}>立即晋升</Text>
            <Ionicons
              size={20}
              name='ios-arrow-forward'
              color={Colors.darkGrey}
            />
          </View>
        </View>
      </View>


      {/* 商品名称 */}
      <View style={styles.goodsName}>
        <Text style={styles.goodsNameText} numberOfLines={2}>{goodsInfo.goods_name}</Text>
        <View style={styles.shareContainer}>
          <Image source={require('../../../assets/goods-image/icon_share.png')} style={styles.shareIcon} />
          <Text style={styles.shareText}>分享赚：¥{formatSinglePrice(goodsInfo.MyDiscounts)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: pxToDp(20),
    paddingTop: pxToDp(30),
    paddingRight: 0,
    backgroundColor: Colors.whiteColor
  },
  goodsName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  goodsNameText: {
    width: pxToDp(454),
    fontSize: pxToDp(28),
    lineHeight: pxToDp(40),
    color: Colors.darkBlack
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.basicColor,
    height: pxToDp(48),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(10),
    borderTopLeftRadius: pxToDp(24),
    borderBottomLeftRadius: pxToDp(24)
  },
  shareIcon: {
    width: pxToDp(32),
    height: pxToDp(30),
    marginRight: pxToDp(10)
  },
  shareText: {
    fontSize: pxToDp(24),
    color: Colors.whiteColor
  },
  goodsHeader: {

  },
  goodsPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: pxToDp(15)
  },
  price: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  priceText: {
    fontSize: pxToDp(24),
    color: Colors.lightBlack,
    marginRight: pxToDp(20)
  },
  rmbIcon: {
    fontSize: pxToDp(24),
    color: Colors.basicColor
  },
  salePrice: {
    fontSize: pxToDp(34),
    fontWeight: '500',
    color: Colors.basicColor,
    marginRight: pxToDp(20)
  },
  originalPrice: {
    fontSize: pxToDp(24),
    color: Colors.lightGrey,
    textDecorationLine: 'line-through'
  },
  shareBar: {
    backgroundColor: '#FFC42B66',
    height: pxToDp(60),
    width: pxToDp(710),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: pxToDp(20),
    paddingRight: pxToDp(20)
  },
  shareBgi: {
    width: pxToDp(95),
    height: pxToDp(40),
    marginRight: pxToDp(10)
  },
  shareBgiText: {
    lineHeight: pxToDp(40),
    color: Colors.whiteColor,
    fontSize: pxToDp(22),
    fontWeight: '500',
    paddingLeft: pxToDp(20)
  },
  shareBarText: {
    fontSize: pxToDp(22),
    color: Colors.darkBlack
  },
  totalPriceText: {
    marginLeft: pxToDp(20)
  },
  totalPrice: {
    color: Colors.basicColor
  },
  upLevel: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  upLevelText: {
    fontSize: pxToDp(22),
    color: Colors.darkBlack,
    marginRight: pxToDp(15)
  }
})