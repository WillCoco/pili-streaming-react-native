import React from 'react'
import { View, Text } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview'
import { Colors } from '../../constants/Theme'
import { strDiscode } from '../../utils/discodeRichText'

export default function ActivityWebView() {
  const route = useRoute()
  const navigation = useNavigation()
  const uri = 'https://cashier.sandpay.com.cn/gw/web/order/create?charset=UTF-8&data={"head":{"accessType":"1","plMid":"","method":"sandpay.trade.orderCreate","productId":"00002000","mid":"S4514032","channelType":"07","reqTime":"20200508183504","version":"1.0"},"body":{"subject":"杉德收银台统测试订单标题","payModeList":"[alipay]","frontUrl":"http://61.129.71.103:8003/jspsandpay/payReturn.jsp","terminalId":"shzdbh001","body":"{\"mallOrderCode\":\"mall00000000001\",\"receiveAddress\":\"上海市徐汇区田林路487号宝石园22号2楼\",\"goodsDesc\":\"杉德卡1张\"}","storeId":"shmdbh001","userId":"C0908992","merchExtendParams":"shkzcs","clearCycle":"0","extend":"kzy","totalAmount":"000000000012","txnTimeOut":"20200509183504","bizExtendParams":"yykzcs","notifyUrl":"http://127.0.0.1/WebGateway/stateChangeServlet","orderCode":"20200508183504","operatorId":"czybh001","accountingMode":"02","riskRateInfo":"fkxxy"}}&signType=01&sign=CkAspqeYrEdPRBf9zoPebbls1vJwPNfSI%2B4LXjfKbN6WJDByFYCxV2jQR3sXADlxvuTCBzCSepF0NnSbpECFqJgKVQRTTev69xJt8hG2rsiRB6wTgafznTvePkrqmOB54hzo%2FI2XTCTX4rCt2tttd3qEBo%2Bp5TjZRa0s6%2FGs%2FiSqNSD4RhBwqSJkMHAh6Rv%2BYouw9XkDgHVCJ4iMrhX%2F%2FsUNsmwtjIh6vSnpfM7BdVzsPgCry3K2h%2BQTeH0DKYBxQICKtdkQHMZCn3Bw7oJ4U4clHv5gIwDH3T2K8k78wnUPTaTEhyoK%2Fut9ofsmpbKVHLGgk91AfJCPpWjdL1BATg%3D%3D&extend=kzy'

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