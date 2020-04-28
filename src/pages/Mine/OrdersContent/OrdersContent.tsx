import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../../constants/Theme'
import pxToDp from '../../../utils/px2dp'

import CardTitle from '../../../components/CardTitle/CardTitle'

export default function OrdersContent() {
  const navigation = useNavigation()

  const toOrderList = () => {
    navigation.push('OrderList')
  }

  return (
    <View style={styles.container}>
      <CardTitle title='我的订单' subTitle='查看全部' nextAction={toOrderList} />
      <View style={styles.orderList}>
        <TouchableWithoutFeedback onPress={toOrderList}>
          <View style={styles.orderItem}>
            <Image source={require('../../../assets/mine-image/icon_daifukuan.png')} style={styles.orderIcon} />
            <Text style={styles.orderText}>待付款</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={toOrderList}>
          <View style={styles.orderItem}>
            <Image source={require('../../../assets/mine-image/icon_daifahuo.png')} style={styles.orderIcon} />
            <Text style={styles.orderText}>待发货</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={toOrderList}>
          <View style={styles.orderItem}>
            <Image source={require('../../../assets/mine-image/icon_daishouhuo.png')} style={styles.orderIcon} />
            <Text style={styles.orderText}>待收货</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={toOrderList}>
          <View style={styles.orderItem}>
            <Image source={require('../../../assets/mine-image/icon_wancheng.png')} style={styles.orderIcon} />
            <Text style={styles.orderText}>已完成</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={toOrderList}>
          <View style={styles.orderItem}>
            <Image source={require('../../../assets/mine-image/icon_tuikuan.png')} style={styles.orderIcon} />
            <Text style={styles.orderText}>退款/售后</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    marginTop: pxToDp(10),
    marginBottom: pxToDp(20),
    paddingTop: pxToDp(30),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20)
  },
  orderList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToDp(20),
    marginBottom: pxToDp(30)
  },
  orderItem: {
    flex: 1,
    alignItems: 'center'
  },
  orderIcon: {
    width: pxToDp(80),
    height: pxToDp(80)
  },
  orderText: {
    fontSize: pxToDp(26),
    fontWeight: '500',
    lineHeight: pxToDp(37),
    color: Colors.darkBlack,
    marginTop: pxToDp(4)
  }
})