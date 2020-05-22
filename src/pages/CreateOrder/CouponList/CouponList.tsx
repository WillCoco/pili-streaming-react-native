import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'
import formatSinglePrice from '../../../utils/formatGoodsPrice'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  curShopId: number;
  orderList: Array<any>;
  hideCoupon(): void;
  chooseCoupon(shopId: number, couponId: number): void;
}

export default function CouponList(props: Props) {
  const { orderList, curShopId } = props

  const orderInfo = orderList.filter((item: {
    shop_info: {
      shop_id: number
    }
  }) => item.shop_info.shop_id === curShopId)[0]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>店铺优惠</Text>

      <View style={styles.couponList}>
        {
          orderInfo.shop_info.couponList.map((item: any, index: number) => {
            return (
              <TouchableWithoutFeedback onPress={() => props.chooseCoupon(orderInfo.shop_info.shop_id, item.id)} key={`coupon-${index}`}>
                <View key={`coupon-${index}`} style={styles.couponItem}>
                  <Text>{item.id === -1 ? '不使用优惠券' : `满${formatSinglePrice(item.fullAmount)}减${formatSinglePrice(item.discountAmount)}`}</Text>
                  {
                    item.isChoosed
                      ? <Ionicons name='ios-checkmark-circle' color={Colors.basicColor} size={20} />
                      : <Ionicons name='ios-radio-button-off' color={Colors.darkGrey} size={20} />
                  }
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </View>

      <TouchableOpacity onPress={props.hideCoupon} style={styles.btn}>
        <Text style={styles.btnText}>完成</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: pxToDp(900),
    paddingTop: pxToDp(40),
    backgroundColor: Colors.whiteColor
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: pxToDp(98),
    width: '100%',
    backgroundColor: Colors.basicColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: pxToDp(32),
    fontWeight: '500',
    color: Colors.whiteColor
  },
  title: {
    fontSize: pxToDp(32),
    fontWeight: '500',
    color: Colors.darkBlack,
    textAlign: 'center',
    marginBottom: pxToDp(40)
  },
  couponList: {
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20)
  },
  couponItem: {
    height: pxToDp(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})