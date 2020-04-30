import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../constants/Theme'
import { Ionicons } from '@expo/vector-icons'
import pxToDp from '../../../utils/px2dp'
import formatSinglePrice from '../../../utils/formatGoodsPrice'
import moment from 'moment'

export default function AddiInfoCard(props) {
  const { orderInfo } = props

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>联系电话</Text>
        <Text style={[styles.value, { color: Colors.darkBlack }]}>{orderInfo.mobile}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>服务单号</Text>
        <Text style={styles.value}>{orderInfo.returnSn}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>申请时间</Text>
        <Text style={styles.value}>{moment(orderInfo.createTime).format('YYYY.MM.DD HH:mm')}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>服务类型</Text>
        <Text style={styles.value}>
          {
            orderInfo.type === 1
              ? '仅退款'
              : orderInfo.type === 2
                ? '退货退款' : '换货'
          }
        </Text>
      </View>
      <View style={styles.item}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.title, { marginRight: pxToDp(10) }]}>退款金额</Text>
          <Ionicons name='ios-help-circle-outline' size={20} color={Colors.basicColor} />
        </View>
        <Text style={styles.price}>¥{formatSinglePrice(orderInfo.refundMoney)}</Text>
      </View>
      <View style={[styles.item, { marginTop: -1 }]}>
        <Text style={styles.title}>退款方式</Text>
        <Text style={styles.value}>字段缺失</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  item: {
    backgroundColor: Colors.whiteColor,
    marginTop: pxToDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    height: pxToDp(80)
  },
  title: {
    fontSize: pxToDp(28),
    color: Colors.darkBlack,
    fontWeight: '500'
  },
  value: {
    fontSize: pxToDp(24),
    color: Colors.darkGrey,
    fontWeight: '500'
  },
  price: {
    fontSize: pxToDp(28),
    fontWeight: '500',
    color: Colors.basicColor
  }
})