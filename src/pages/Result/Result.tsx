import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { apiQueryOrderPayStatus } from '../../service/api'

import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

const successIcon = require('../../assets/order-image/pay_success.png')
const failedIcon = require('../../assets/order-image/pay_failed.png')

export default function Result() {
  const route: any = useRoute()
  const navigation = useNavigation()

  const [paySuccess, setPaySuccess]= useState(false)

  const { orderSn, payType } = route.params

  navigation.setOptions({
    headerTitle: `支付成功`,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false,
    headerLeft: () => {},
    gesturesEnabled: false
  })

  useEffect(() => {
    queryOrderStauts()
  }, [])

  /**
   * 查询订单支付状态
   */
  const queryOrderStauts = () => {
    const params = {
      orderSn,
      payType
    }

    apiQueryOrderPayStatus(params).then((res: any) => {
      console.log('订单支付成功', res)
      setPaySuccess(true)
    }).catch((err: any) => {
      setPaySuccess(false)
      console.log('订单支付失败', err)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={paySuccess ? successIcon : failedIcon} style={styles.icon} />
        <Text style={styles.statusText}>{paySuccess ? '支付成功' : '支付失败'}</Text>
        { paySuccess && <Text style={styles.price}>¥888.88</Text>}
      </View>
      <TouchableOpacity style={styles.completeBtn} onPress={() => navigation.navigate('首页')}>
        <Text style={styles.text}>继续购物</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    marginTop: pxToDp(340),
    alignItems: 'center'
  },
  icon: {
    width: pxToDp(120),
    height: pxToDp(120)
  },
  statusText: {
    fontSize: pxToDp(32),
    color: Colors.darkBlack,
    fontWeight: '500',
    marginTop: pxToDp(40),
    marginBottom: pxToDp(30),
    lineHeight: pxToDp(45)
  },
  price: {
    fontSize: pxToDp(60),
    lineHeight: pxToDp(84),
    fontWeight: '600',
    color: Colors.darkBlack
  },
  completeBtn: {
    marginTop: pxToDp(100),
    width: pxToDp(670),
    height: pxToDp(80),
    borderRadius: pxToDp(40),
    backgroundColor: Colors.basicColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: pxToDp(30),
    color: Colors.whiteColor
  }
})