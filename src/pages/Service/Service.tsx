import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview'
import { Colors } from '../../constants/Theme'

export default function Service() {
  const route = useRoute()
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '在线客服',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  return (
    // <WebView source={{ uri: route.params.url }} />
    <WebView source={{ uri: 'https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1r0MG9g&scene=SCE00006973' }} />
  )
}