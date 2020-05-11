import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { apiGetOrderList, apiGetReturnOrderList, apiCancelOrder, apiReminderDeliverGoods, apiConfirmReceiveGoods, apiExtendReceiveGoods } from '../../service/api'
import Toast from 'react-native-tiny-toast'

import OrderItem from './OrderItem/OrderItem'
import pxToDp from '../../utils/px2dp'

export default function OrderList() {
  const navigation = useNavigation()
  const route = useRoute()
  const pageSize = 20
  const tabList = ['全部', '待付款', '待发货', '待收货', '已完成', '退款/售后']
  const [pageNo, setPageNo] = useState(1)
  const [orderList, setOrderList] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  navigation.setOptions({
    headerTitle: `我的订单`,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  useEffect(() => {
    const index = route.params.index
    setActiveIndex(index)

    navigation.addListener('focus', () => {
      if (index === 5) {
        getReturnOrderList()
      } else {
        getOrderList(index)
      }
    })
  }, [])

  /**
   * 切换 TAB
   */
  const changeTab = (e: any) => {
    const index = e.i
    setActiveIndex(index)
    if (index === 5) {
      getReturnOrderList()
    } else {
      getOrderList(index)
    }
  }

  /**
   * 获取订单列表
   */
  const getOrderList = (index: number) => {
    const loading = Toast.showLoading('')

    const params = index ? { pageNo, pageSize, orderStatus: index } : { pageNo, pageSize }

    apiGetOrderList(params).then(res => {
      Toast.hide(loading)
      console.log('获取订单列表', res)
      setOrderList(res.records)
    })
  }

  /**
   * 获取售后订单列表
   */
  const getReturnOrderList = () => {
    const loading = Toast.showLoading('')

    apiGetReturnOrderList({ pageNo, pageSize }).then((res: any) => {
      console.log('售后订单列表', res)
      res.records.forEach((item: any) => {
        item.goodsList = [{
          goodsId: item.goodsId,
          goodsName: item.goodsName,
          goodsNum: item.goodsNum,
          goodsPrice: item.payPrice,
          skuId: item.skuId,
          skuImg: item.skuImg,
          specJson: item.specJson
        }]
      })
      setOrderList(res.records)
      Toast.hide(loading)
    })
  }

  /**
   * 取消订单
   */
  const cancelOrder = (id: number) => {
    console.log(id)
    apiCancelOrder({ orderId: id }).then(res => {
      Toast.showSuccess('已取消该订单')
      getOrderList(activeIndex)
    })
  }

  /**
   * 提醒发货
   */
  const remindDelivery = (id: number) => {
    apiReminderDeliverGoods({ orderId: id }).then(res => {
      Toast.showSuccess('已提醒卖家')
    })
  }

  /**
   * 确认收货
   */
  const confirmTheGoods = (id: number) => {
    apiConfirmReceiveGoods({ orderId: id }).then(res => {
      Toast.showSuccess('已完成收货')
    })
  } 

  /**
   * 去支付
   */
  const toPay = (id: number) => {
    console.log('去支付', id)
  }

  /**
   * 延迟收货
   */
  const extendReceiveGoods = (id: number) => {
    apiExtendReceiveGoods({ orderId: id }).then(res => {
      Toast.showSuccess('已延长收货时间')
    })
  }


  return (
    <ScrollableTabView
      initialPage={route.params.index}
      tabBarUnderlineStyle={{ backgroundColor: Colors.basicColor }}
      tabBarActiveTextColor={Colors.darkBlack}
      tabBarInactiveTextColor={Colors.darkBlack}
      tabBarBackgroundColor={Colors.whiteColor}
      renderTabBar={() => <ScrollableTabBar />}
      onChangeTab={(e) => changeTab(e)}
    >
      {
        tabList.map((item: string, index: number) => {
          return (
            <ScrollView key={`tab-${index}`} tabLabel={item} style={{ padding: pxToDp(20) }}>
              {
                orderList.map((_item: any, _index: number) => {
                  return (
                    <OrderItem
                      orderInfo={_item}
                      key={`order-${_index}`}
                      cancelOrder={(id: number) => cancelOrder(id)}
                      remindDelivery={(id: number) => remindDelivery(id)}
                      confirmTheGoods={(id: number) => confirmTheGoods(id)}
                      toPay={(id: number) => toPay(id)}
                      extendReceiveGoods={(id: number) => extendReceiveGoods(id)}
                    />
                  )
                })
              }
            </ScrollView>
          )
        })
      }
    </ScrollableTabView>
  )
}