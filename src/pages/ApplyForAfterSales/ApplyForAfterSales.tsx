import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'

import ShopCard from './ShopCard/ShopCard'
import ServiceType from './ServiceType/ServiceType'
import Reason from './Reason/Reason'
import Contact from './Contact/Contact'
import pxToDp from '../../utils/px2dp'

export default function ApplyForAfterSales() {
  const route = useRoute()
  const navigation = useNavigation()
  const [orderInfo]= useState(route.params)
  const [reason, setReason] = useState('')
  const [tel, setTel] = useState('')
  const [typeList, setTypeList] = useState([
    { type: '仅退款', active: true },
    { type: '退货退款', active: false },
    { type: '换货', active: false }
  ])

  navigation.setOptions({
    headerTitle: `申请售后`,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  const submit = () => {
    
  }

  return (
    <ScrollView>
      {/* 店铺、商品信息 */}
      <ShopCard orderInfo={orderInfo} />
      {/* 服务类型 */}
      <ServiceType typeList={typeList} setTypeList={(list: React.SetStateAction<{ type: string; active: boolean }[]>) => setTypeList(JSON.parse(JSON.stringify(list)))} />
      {/* 申请原因 */}
      <Reason inputReason={(text: string) => setReason(text)} />
      {/* 联系电话 */}
      <Contact inputTel={(value: string) => setTel(value)} />
      {/* 退货说明 */}
      <Text style={styles.tips}>退货说明：退货成功后，退款将原路返回，退款只会退还实际支付的价格。提交退款申请后，售后专员可能与您电话沟通，请保持手机畅通。</Text>
      <Text style={styles.submitBtn} onPress={submit}>提交</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  tips: {
    padding: pxToDp(20),
    fontSize: pxToDp(24),
    color: Colors.darkGrey,
    fontWeight: '500',
    lineHeight: pxToDp(34)
  },
  submitBtn: {
    marginTop: pxToDp(30),
    width: pxToDp(670),
    height: pxToDp(80),
    lineHeight: pxToDp(80),
    borderRadius: pxToDp(40),
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: Colors.basicColor,
    textAlign: 'center',
    fontSize: pxToDp(32),
    fontWeight: '500',
    color: Colors.whiteColor
  }
})