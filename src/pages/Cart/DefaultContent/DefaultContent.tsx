import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'

const emptyImg = require('../../../assets/default-image/empty_cart.png')
const notLoginImg = require('../../../assets/default-image/cart_not_login.png')

export default function DefaultContent(props) {
  const { type } = props

  return (
    <View style={styles.emptyContainer}>
      <ImageBackground source={type === 'empty' ? emptyImg : notLoginImg} style={styles.emptyImg}>
        <Text style={styles.emptyText}>{type === 'empty' ? '您的购物车空空如也' : '请先登录后进行操作'}</Text>
      </ImageBackground>
      <TouchableOpacity onPress={props.nextAction}>
        <Text style={styles.emptyBtn}>{type === 'empty' ? '去逛逛' : '立即登录'}</Text>
      </TouchableOpacity>
      {
        type !== 'empty' && <Text style={styles.notLogin} onPress={props.nextAction}>还未注册？</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyImg: {
    width: pxToDp(380),
    height: pxToDp(360),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: pxToDp(22)
  },
  emptyText: {
    fontSize: pxToDp(28),
    color: Colors.lightBlack
  },
  emptyBtn: {
    width: pxToDp(240),
    height: pxToDp(72),
    lineHeight: pxToDp(72),
    backgroundColor: Colors.basicColor,
    textAlign: 'center',
    fontSize: pxToDp(32),
    color: Colors.whiteColor,
    fontWeight: '500',
    borderRadius: pxToDp(36),
    overflow: 'hidden',
    marginTop: pxToDp(28)
  },
  notLogin: {
    fontSize: pxToDp(28),
    color: Colors.basicColor,
    marginTop: pxToDp(14)
  }
})