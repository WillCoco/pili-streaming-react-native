import React from 'react'
import { View, Text, StyleSheet, PixelRatio } from 'react-native'
import { Colors } from '../../../constants/Theme'
import pxToDp from '../../../utils/px2dp'

export default function OrderCard(props) {
  const { detail } = props

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Text style={styles.text}>订单编号：{detail.orderSn}</Text>
        <Text style={[styles.text, styles.copyBtn]}>复制</Text>
      </View>
      <Text style={styles.text}>下单时间：{detail.createTime}</Text>
      <Text style={styles.text}>支付方式：{detail.payType === 1 ? '微信支付' : detail.payType === 2 ? '余额支付' : '圈品金支付'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10),
    padding: pxToDp(20),
    paddingBottom: pxToDp(10)
  },
  text: {
    fontSize: pxToDp(24),
    color: Colors.darkGrey,
    fontWeight: '500',
    marginBottom: pxToDp(10)
  },
  copyBtn: {
    height: pxToDp(30),
    lineHeight: pxToDp(30),
    width: pxToDp(100),
    textAlign: 'center',
    borderColor: Colors.darkGrey,
    borderWidth: 1 / PixelRatio.get()
  }
})