import React from 'react'
import { View, Text, Image, StyleSheet, PixelRatio, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'
import formatGoodsPrice from '../../utils/formatGoodsPrice'

export default function GoodsCard(props: any) {
  const { goodsInfo } = props
  const navigation = useNavigation()

  const toGoodsInfo = () => {
    const { goods_id: id } = goodsInfo
    navigation.push('GoodsInfo', { id })
  }

  return (
    <View style={[styles.container, props.style]}>
      <TouchableWithoutFeedback onPress={toGoodsInfo}>
        <Image source={{ uri: goodsInfo.original_img }} style={styles.goodsImg} />
      </TouchableWithoutFeedback>
      <View style={styles.goodsInfo}>
        <Text style={styles.goodsName} numberOfLines={2} onPress={toGoodsInfo}>{goodsInfo.goods_name}</Text>
        <View style={styles.goodsShare}>
          {
            true
              ? <ImageBackground source={require('../../assets/home-image/badge_bg.png')} style={styles.badgeBg}>
                <Text style={styles.badgeText}>自营</Text>
              </ImageBackground>
              : <Text />
          }
          <View style={styles.shareCard}>
            <Text style={styles.shareText}>分享</Text>
            <Text style={styles.sharePrice}>¥{formatGoodsPrice(goodsInfo.MyDiscounts)}</Text>
          </View>
        </View>
        <View style={styles.goodsPrice}>
          <Text style={styles.rmbIcon}>¥</Text>
          <Text style={styles.salePrice}>{formatGoodsPrice(goodsInfo.shop_price)}</Text>
          <Text style={styles.originalPrice}>¥{formatGoodsPrice(goodsInfo.market_price)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: pxToDp(350),
    height: pxToDp(570),
    borderRadius: pxToDp(16),
    backgroundColor: Colors.whiteColor,
    overflow: 'hidden',
    borderColor: Colors.borderColor,
    borderWidth: 1 / PixelRatio.get()
  },
  goodsImg: {
    width: pxToDp(350),
    height: pxToDp(350)
  },
  goodsInfo: {
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10)
  },
  goodsName: {
    marginTop: pxToDp(14),
    fontSize: pxToDp(28),
    lineHeight: pxToDp(36),
    color: Colors.darkBlack
  },
  goodsShare: {
    marginTop: pxToDp(17),
    marginBottom: pxToDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  badgeBg: {
    width: pxToDp(48),
    height: pxToDp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: pxToDp(20),
    color: Colors.whiteColor
  },
  shareCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: pxToDp(40),
    borderColor: Colors.basicColor,
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: pxToDp(10),
    overflow: 'hidden'
  },
  shareText: {
    backgroundColor: Colors.basicColor,
    height: '100%',
    paddingTop: pxToDp(5),
    paddingBottom: pxToDp(5),
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
    color: Colors.whiteColor
  },
  sharePrice: {
    paddingTop: pxToDp(5),
    paddingBottom: pxToDp(5),
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
    color: Colors.basicColor
  },
  goodsPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  rmbIcon: {
    fontSize: pxToDp(24),
    color: Colors.basicColor
  },
  salePrice: {
    fontSize: pxToDp(34),
    color: Colors.basicColor,
    marginRight: pxToDp(16)
  },
  originalPrice: {
    fontSize: pxToDp(24),
    color: Colors.lightGrey,
    textDecorationLine: 'line-through'
  }
})