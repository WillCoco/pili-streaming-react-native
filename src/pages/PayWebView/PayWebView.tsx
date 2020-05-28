import React, { useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview'
import { Colors } from '../../constants/Theme'

export default function PayWebview() {
  const route: any = useRoute()
  const navigation: any = useNavigation()
  const hasLeaveRef: any = useRef(false)

  const { orderSn, payType, nextBtnText, nextRoute } = route.params

  const appState = AppState.currentState

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

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  const handleAppStateChange = (nextAppState: any) => {
    console.log('appCurrentState', appState)
    console.log('nextAppState', nextAppState, route.name, hasLeaveRef.current)

    if (nextAppState === 'background') {
      hasLeaveRef.current = true
      console.log('后台')
    } else if (nextAppState === 'active' && route.name === 'PayWebView') {
      console.log('前台')
      if (hasLeaveRef.current) {
        const params = {
          orderSn,
          payType,
          nextBtnText,
          nextRoute,
        }

        navigation.push('Result', params)
      }
    }
  }

  return (
    <WebView
      style={{ opacity: 0.99 }}
      source={{ uri: route?.params?.url }}
      // source={{ uri: 'https://baidu.com' }}
    />
  )
}