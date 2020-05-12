import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

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
        <Image source={require('../../assets/order-image/result.png')} style={styles.icon} />
        <Text style={styles.statusText}>支付成功</Text>
        <Text style={styles.price}>¥888.88</Text>
      </View>
      <TouchableOpacity style={styles.completeBtn}>
        <Text style={styles.text}>完成</Text>
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
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? pxToDp(60) : pxToDp(30),
    left: '-50%',
    width: pxToDp(670),
    marginLeft: pxToDp(-335),
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