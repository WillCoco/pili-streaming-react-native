import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, PixelRatio } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import { apiGetOrderDetail, apiCancelOrder, apiReminderDeliverGoods, apiConfirmReceiveGoods, apiExtendReceiveGoods, apiQueryExpress } from '../../service/api'
import pxToDp from '../../utils/px2dp'
import Toast from 'react-native-tiny-toast'

import GoodsCard from './GoodsCard/GoodsCard'
import OrderCard from './OrderCard/OrderCard'
import ExpressStepper from '../../components/ExpressStepper/ExpressStepper'

export default function OrderDetail() {
  const id = useRoute().params.id
  const navigation = useNavigation()
  const [orderDetail, setOrderDetail] = useState({})
  const [expressList, setExpressList] = useState([])

  navigation.setOptions({
    headerTitle: `订单详情`,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  useEffect(() => {
    getOrderDetail()
  }, [])

  /**
   * 获取订单详情
   */
  const getOrderDetail = () => {
    apiGetOrderDetail({ orderId: id }).then((res: any) => {
      console.log('订单详情', res)
      setOrderDetail(res)

      if (res.deliveryNo && res.deliveryComCode) {
        queryExpress(res.deliveryNo, res.deliveryComCode, res.receivedTel)
      }
    })
  }

  /**
   * 取消订单
   */
  const cancelOrder = () => {
    apiCancelOrder({ orderId: orderDetail.id }).then(res => {
      Toast.showSuccess('已取消该订单')
      setTimeout(() => {
        navigation.goBack()
      }, 1500)
    })
  }

  /**
   * 去付款
   */
  const toPay = () => {
    console.log('去支付')
  }

  /**
   * 提醒发货
   */
  const remindDelivery = () => {
    apiReminderDeliverGoods({ orderId: orderDetail.id }).then(res => {
      Toast.showSuccess('已提醒卖家')
    })
  }

  /**
   * 延迟收货
   */
  const extendReceiveGoods = () => {
    apiExtendReceiveGoods({ orderId: orderDetail.id }).then(res => {
      Toast.showSuccess('已延长收货时间')
    })
  }

  /**
   * 查看物流
   */
  const queryExpress = (shippingCode: string, invoiceNo: string, tel: string) => {
    const params = {
      shippingCode,
      invoiceNo,
      customerName: tel.substr(7)
    }
    
    apiQueryExpress(params).then((res: any) => {
      console.log('物流信息', res)
      setExpressList(res.data.reverse())
    })
  }

  /**
   * 确认收货
   */
  const confirmTheGoods = () => {
    apiConfirmReceiveGoods({ orderId: orderDetail.id }).then(res => {
      Toast.showSuccess('已完成收货')
      setTimeout(() => {
        navigation.goBack()
      }, 1500)
    })
  }

  /**
   * 再次购买
   */
  const buyAgain = () => {
    const id = orderDetail.goodsList[0].goodsId
    navigation.push('GoodsInfo', { id })
  }

  return (
    <ScrollView>
      <ImageBackground source={require('../../assets/order-image/express_bgi.png')} style={styles.headerBgi}>
        <Text style={{
          fontSize: pxToDp(30),
          lineHeight: pxToDp(44),
          color: Colors.whiteColor
        }}>
          {
            orderDetail.orderStatus === 1
              ? '待付款'
              : orderDetail.orderStatus === 2
                ? '待发货'
                : orderDetail.orderStatus === 3
                  ? '卖家已发货'
                  : orderDetail.orderStatus === 4
                    ? '已完成'
                    : orderDetail.orderStatus === 5
                      ? '退货退款中' : '已取消'
          }
        </Text>
        {
          orderDetail.autoReceiveHours && <Text style={{
            fontSize: pxToDp(24),
            lineHeight: pxToDp(44),
            color: Colors.whiteColor
          }}>还剩xx天自动确认</Text>
        }
      </ImageBackground>

      {/* 物流信息 */}
      {
        orderDetail.deliveryNo && orderDetail.deliveryComCode && <ExpressStepper
        expressList={expressList}
      />
      }

      {/* 商品信息 */}
      <GoodsCard detail={orderDetail} />

      {/* 订单信息 */}
      <OrderCard detail={orderDetail} />

      {/* 订单操作 */}
      <View style={styles.orderActionBar}>

        <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
          <View style={styles.actionItem}>
            <Image source={require('../../assets/order-image/icon_kefu.png')} style={styles.icon} />
            <Text style={styles.btnText}>联系客服</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
          <View style={styles.actionItem}>
            <Image source={require('../../assets/order-image/icon_phone.png')} style={styles.icon} />
            <Text style={styles.btnText}>立即购买</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 待付款 按钮组 */}
      {
        orderDetail.orderStatus === 1 &&
        <View style={styles.btnGroup}>
          <Text style={[styles.btn, styles.greyBtn]} onPress={cancelOrder}>取消订单</Text>
          <Text style={styles.btn} onPress={toPay}>去付款</Text>
        </View>
      }

      {/* 待发货 按钮组 */}
      {
        orderDetail.orderStatus === 2 &&
        <View style={styles.btnGroup}>
          <Text style={styles.btn} onPress={remindDelivery}>提醒发货</Text>
        </View>
      }

      {/* 待收货 按钮组 */}
      {
        orderDetail.orderStatus === 3 &&
        <View style={styles.btnGroup}>
          <Text style={[styles.btn, styles.greyBtn]} onPress={extendReceiveGoods}>延迟收货</Text>
          <Text style={styles.btn} onPress={confirmTheGoods}>确认收货</Text>
        </View>
      }

      {/* 已完成 按钮组 */}
      {
        orderDetail.orderStatus === 4 &&
        <View style={styles.btnGroup}>
          <Text style={styles.btn} onPress={buyAgain}>再次购买</Text>
        </View>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  headerBgi: {
    height: pxToDp(240),
    paddingLeft: pxToDp(50),
    justifyContent: 'center'
  },
  orderActionBar: {
    height: pxToDp(100),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor
  },
  actionItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: pxToDp(44),
    height: pxToDp(44)
  },
  btnText: {
    fontSize: pxToDp(26),
    color: Colors.darkBlack,
    marginLeft: pxToDp(10)
  },
  btnGroup: {
    height: pxToDp(94),
    backgroundColor: Colors.whiteColor,
    marginTop: pxToDp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  btn: {
    marginRight: pxToDp(20),
    height: pxToDp(56),
    lineHeight: pxToDp(56),
    width: pxToDp(170),
    textAlign: 'center',
    borderRadius: pxToDp(28),
    borderWidth: 1 / PixelRatio.get(),
    borderColor: Colors.basicColor,
    color: Colors.basicColor
  },
  greyBtn: {
    borderColor: Colors.lightGrey,
    color: Colors.lightGrey
  }
})
