import React, { useEffect } from 'react'
import { AppState } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview'
import { Colors } from '../../constants/Theme'

export default function PayWebview() {
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

  useEffect(() => {
    navigation.addListener('blur', () => {
      AppState.removeEventListener('change', handleAppStateChange)
    })
  }, [navigation])

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'background') {
      console.log('后台')
    } else if (nextAppState === 'active' && route.name === 'PayWebView') {
      console.log('前台')
      const params = {
        orderSn,
        payType,
        nextBtnText,
        nextRoute,
      }

      navigation.push('Result', params)
    }
  }

  return (
    <WebView
      style={{ opacity: 0.99 }}
      source={{ uri: route?.params?.url }}
    />
  )
}