import React from 'react'
import { View, Text } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview'
import { Colors } from '../../constants/Theme'

export default function PayWebview() {
  const route = useRoute()
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '支付' || route?.params?.title,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false,
    // headerTransparent: true
  })

  return (
    <WebView source={{ uri: route?.params?.url }} />
  )
}