import React from 'react'
import { View, Text } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview'
import { Colors } from '../../constants/Theme'
import { strDiscode } from '../../utils/discodeRichText'

export default function ActivityWebView() {
  const route = useRoute()
  const navigation = useNavigation()
  const uri = 'http://192.168.4.136'

  navigation.setOptions({
    headerTitle: '活动页面',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false,
    // headerTransparent: true
  })

  console.log(strDiscode(uri))

  return (
    // <WebView source={{ uri: route.params.url }} />
    // <WebView source={{ uri: 'https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1r0MG9g&scene=SCE00006973' }} />

    // <WebView source={{ uri: 'http://61.129.71.103:8003/gw/web/order/create' }} />

    <WebView source={{ uri: strDiscode(uri) }} />

    // https://cashier.sandpay.com.cn/gw/web/order/toIndex?p=UHWOtxlSetvHdIvrJstgrYBtcfRVgnMOiNt5n8CobEinP37cUEZGKK4If2JnbpNMe11NPR4iCutSRebck0zliL%2FWxSudPL%2BoMsbNweqSPN9QBtnmnCZ70A%3D%3D#
  )
}