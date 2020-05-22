import React, { useEffect, useState, useRef } from 'react'
import { AppState } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview'
import { Colors } from '../../constants/Theme'


// const a = "credential":"{"payMode":"wx_pub","params":"{"timeStamp":"1589893165","package":"prepay_id=wx1920592545889266c92f8eb01261170600","paySign":"VuT81hRCk1DR2YcVNsC0863+OivHR7wdR5P+H8mq8qeFz/d3IjmW44FVekfJ4rlguX2Mkcy2W44XD2ovYIclFfGwSpnGrq4xkgoEOZf6C6WL8FN1gnTtUp6RnoL3fvjQLnAZj6RkPauPx3ZK7+Q9EbLwoMXabn1ZP47cfYdKabWH6VH1gLUYk8pCuBSvucf80hVdsCR0OdXrcAcA+e+eD7PCrh/fhGSaIatpBToi1HNjZxgShnWD+G/IWYVJQ9MFojf90QUyFYbQQjv1FLeH1GyBI70YAB5APGhADP1xEJjT/GFCH1bWBIUX1U3bI7gyVGk1a2qkTkukJVRG7UYajw==","appId":"wx19d16e894dd2d0ab","signType":"RSA","prepayId":"wx1920592545889266c92f8eb01261170600","nonceStr":"648b065989e14945b068d3bde6ebf5a8","prepay_id":"wx1920592545889266c92f8eb01261170600"}"}",

export default function PayWebview() {
  const webViewRef: any = useRef()

  const route: any = useRoute()
  const navigation: any = useNavigation()

  const { orderSn, payType } = route.params

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
        payType
      }

      navigation.push('Result', params)
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: route?.params?.url }}
    />
  )
}