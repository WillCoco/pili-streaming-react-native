import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import moment from 'moment'
import { Colors } from '../../../constants/Theme'

export default function ReturnSchedule(props: { scheduleList: Array<any> }) {
  const { scheduleList } = props

  return (
    <View style={styles.container}>
      <Text style={styles.scheduleTitle}>退货退款进度</Text>
      {
        scheduleList && scheduleList.map((item: any, index: number) => {
          return (
            <View key={`achedule-${index}`} style={styles.scheduleItem}>
              <View style={styles.itemTitle}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{moment(item.createTime).format('YYYY.MM.DD HH:mm')}</Text>
              </View>
              <Text style={styles.text}>{item.remark}</Text>
            </View>
          )
        })
      }
      <Text style={styles.tips}>退货说明：退货成功后，退款将原路返回，退款只会退还实际支付的价格。提交退款申请后，售后专员可能与您电话沟通，请保持手机畅通。</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  scheduleTitle: {
    height: pxToDp(90),
    lineHeight: pxToDp(90),
    paddingLeft: pxToDp(20),
    fontSize: pxToDp(28),
    color: '#347CFF'
  },
  scheduleItem: {
    padding: pxToDp(20),
    backgroundColor: Colors.whiteColor,
    marginBottom: pxToDp(10)
  },
  itemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: pxToDp(16)
  },
  title: {
    fontSize: pxToDp(28),
    color: Colors.darkBlack,
    fontWeight: '500'
  },
  text: {
    fontSize: pxToDp(24),
    color: Colors.darkGrey
  },
  tips: {
    padding: pxToDp(20),
    paddingTop: pxToDp(10),
    fontSize: pxToDp(24),
    color: Colors.darkGrey,
    lineHeight: pxToDp(34),
    fontWeight: '500'
  }
})