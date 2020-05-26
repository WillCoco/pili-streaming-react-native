import React, { useEffect, useState, useRef } from 'react'
import { AppState } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview'
import { Colors } from '../../constants/Theme'

export default function PayWebview() {
  const webViewRef: any = useRef()

  const route: any = useRoute()
  const navigation: any = useNavigation()

  // const { orderSn, payType } = route.params
  const { orderSn, payType, nextBtnText, nextRoute } = route.params

  console.log(route.params, '支付页面路由参数')

  navigation.setOptions({
    headerTitle: '支付' || route?.params?.title,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false,
  })

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)
  }, [])

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'background') {
      console.log('后台')
    } else if (nextAppState === 'active') {
      console.log('前台')
      const params = {
        orderSn,
        payType,
        nextBtnText,
        nextRoute,
      }

      navigation.push('Result', params)
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }

  return (
    <WebView
      ref={webViewRef}
      style={{ opacity: 0.99 }}
      source={{ uri: route?.params?.url }}
    />
  )
}