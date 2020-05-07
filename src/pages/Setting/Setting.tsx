import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'

import Header from './Header/Header'
import Form from './Form/Form'
import pxToDp from '../../utils/px2dp'

export default function Setting() {
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '设置',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false,
    headerTransparent: true
  })

  const logOut = () => {
    console.log('退出')
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Form />
      <TouchableOpacity style={styles.logOut} onPress={logOut}>
        <Text style={styles.logOutText}>退出登录</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  logOut: {
    position: 'absolute',
    left: '50%',
    bottom: pxToDp(100),
    marginLeft: pxToDp(-335),
    width: pxToDp(670),
    height: pxToDp(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.basicColor,
    borderRadius: pxToDp(40)
  },
  logOutText: {
    fontSize: pxToDp(32),
    color: Colors.whiteColor
  }
})