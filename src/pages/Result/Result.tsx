import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

const successIcon = require('../../assets/order-image/pay_success.png')
const failedIcon = require('../../assets/order-image/pay_failed.png')

export default function Result() {
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: `支付成功`,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={successIcon} style={styles.icon} />
        <Text style={styles.statusText}>支付成功</Text>
        <Text style={styles.price}>¥888.88</Text>
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