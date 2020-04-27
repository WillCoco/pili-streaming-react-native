import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { setAddressList } from '../../actions/address'
import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

import AddressBar from './AddressBar/AddressBar'

import { apiAddrList } from '../../service/api'

function CreateOrder(props) {
  const route = useRoute()
  const navigation = useNavigation()
  const [tempOrderList, setTempOrderList] = useState(route.params.tempOrderList)
  const [defaultAddress, setDefaultAddress] = useState([])
  const [isEmptyAddr, setIsEmptyAddr] = useState(true)

  navigation.setOptions({
    headerTitle: '确认订单',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  useEffect(() => {
    navigation.addListener('focus', () => {
      getAddressList()
    })
  }, [])

  /**
   * 获取收货地址列表
   */
  const getAddressList = () => {
    apiAddrList().then(res => {
      console.log('获取收货地址列表', res)
      if (!res.length) {
        setIsEmptyAddr(true)
        return
      }

      props.dispatch(setAddressList(res))

      setIsEmptyAddr(false)

      setDefaultAddress(res.filter((item: { is_default: number }) => item.is_default === 1)[0])
    })
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        {/* 地址选择栏 */}
        <AddressBar defaultAddress={Object.keys(props.choosedAddress).length ? props.choosedAddress : defaultAddress} isEmpty={isEmptyAddr} />
      </ScrollView>
      <View style={styles.submitBar}>
        <Text>sdfdfsd</Text>
      </View>
    </View>
  )
}

export default connect(
  (state: any) => state.addressData
)(CreateOrder)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: pxToDp(20),
    paddingBottom: pxToDp(110),
  },
  submitBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: pxToDp(100),
    backgroundColor: '#f00'
  }
})