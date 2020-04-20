import React from 'react'
import { View, Text, Image, StyleSheet, PixelRatio, ImageBackground } from 'react-native'
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

export default function GoodsCardRow() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'http://129.211.138.215/public/upload/goods/2020/03-31/091693a9e3fa4973c43fb21bb2685656.jpeg' }} style={styles.goodsImg} />
      <View style={styles.goodsInfo}>
        <Text style={styles.goodsName} numberOfLines={2}>太平鸟白色衬衫连衣裙春装2020新款韩版仙女裙</Text>
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
            <Text style={styles.sharePrice}>¥22.22</Text>
          </View>
        </View>
        <View style={styles.goodsPrice}>
          <Text style={styles.rmbIcon}>¥</Text>
          <Text style={styles.salePrice}>22.11</Text>
          <Text style={styles.originalPrice}>¥22.11</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: pxToDp(240),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    backgroundColor: Colors.whiteColor
  },
  goodsImg: {
    width: pxToDp(220),
    height: pxToDp(220),
    borderRadius: pxToDp(16)
  },
  goodsInfo: {
    width: pxToDp(470),
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
    marginLeft: pxToDp(14)
  },
  goodsName: {
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