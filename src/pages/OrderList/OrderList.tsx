import React, { useState, useEffect, useRef } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { apiGetOrderList, apiGetReturnOrderList, apiCancelOrder, apiReminderDeliverGoods, apiConfirmReceiveGoods, apiExtendReceiveGoods, apiPayOrder } from '../../service/api'
import Toast from 'react-native-tiny-toast'

import OrderItem from './OrderItem/OrderItem'
import pxToDp from '../../utils/px2dp'
import checkIsBottom from '../../utils/checkIsBottom'

export default function OrderList() {
  const navigation = useNavigation()
  const route = useRoute()
  const isFocused = useIsFocused()
  const pageSize = 20
  const tabList = ['全部', '待付款', '待发货', '待收货', '已完成', '退款/售后']
  const [orderList, setOrderList] = useState([])
  let pageNoRef = useRef(1)
  let hasMoreRef = useRef(true)
  let indexRef = useRef(0)
  let orderListRef = useRef([])

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
    if (isFocused) {
      indexRef.current = route.params.index

      if (indexRef.current === 5) {
        getReturnOrderList()
      } else {
        getOrderList(indexRef.current)
      }
    }
  }, [isFocused])

  /**
   * 切换 TAB
   */
  const changeTab = (e: any) => {
    if (e.i === indexRef.current) return

    pageNoRef.current = 1
    indexRef.current = e.i
    orderListRef.current = []
    setOrderList(orderListRef.current)

    if (indexRef.current === 5) {
      getReturnOrderList()
    } else {
      getOrderList(indexRef.current)
    }
  }

  /**
   * 获取订单列表
   */
  const getOrderList = (index: number) => {
    const loading = Toast.showLoading('')

    const params = index
      ? {
        pageNo: pageNoRef.current,
        pageSize,
        orderStatus: index
      }
      : {
        pageNo: pageNoRef.current,
        pageSize
      }

    apiGetOrderList(params).then((res: any) => {
      Toast.hide(loading)

      console.log('获取订单列表', res)

      const totalPage = Math.ceil(res.total / pageSize)

      hasMoreRef.current = pageNoRef.current < totalPage

      orderListRef.current = [...orderListRef.current, ...res.records]

      setOrderList(orderListRef.current)
    })
  }

  /**
   * 获取售后订单列表
   */
  const getReturnOrderList = () => {
    const loading = Toast.showLoading('')

    apiGetReturnOrderList({
      pageNo: pageNoRef.current,
      pageSize
    }).then((res: any) => {
      Toast.hide(loading)
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

      const totalPage = Math.ceil(res.count / pageSize)

      hasMoreRef.current = pageNoRef.current < totalPage

      orderListRef.current = [...orderListRef.current, ...res.records]

      setOrderList(orderListRef.current)
    })
  }

  /**
   * 取消订单
   */
  const cancelOrder = (id: number) => {
    console.log(id)
    apiCancelOrder({ orderId: id }).then(res => {
      Toast.showSuccess('已取消该订单')
      getOrderList(indexRef.current)
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
    let loading = Toast.showLoading('')
    apiPayOrder({ id, payType: 2 }).then((res: any) => {
      Toast.hide(loading)

      console.log('去支付', res)

      if (res.code !== 200) {
        Toast.show('创建订单失败')
        return
      }

      let payURL = 'https://cashier.sandpay.com.cn/gw/web/order/create?charset=UTF-8'

      for (let item in res.data) {
        payURL += '&' + item + '=' + res.data[item]
      }

      navigation.push('PayWebView', { url: payURL })
    })
  }

  /**
   * 延迟收货
   */
  const extendReceiveGoods = (id: number) => {
    apiExtendReceiveGoods({ orderId: id }).then(res => {
      Toast.showSuccess('已延长收货时间')
    })
  }

  /**
   * 触底加载
   */
  const onReachBottom = (e: any) => {
    if (hasMoreRef.current && checkIsBottom(e)) {
      pageNoRef.current += 1
      indexRef.current === 5 ? getReturnOrderList() : getOrderList(indexRef.current)
    }
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
            <ScrollView
              key={`tab-${index}`}
              tabLabel={item}
              style={{ padding: pxToDp(20) }}
              showsVerticalScrollIndicator={false}
              onMomentumScrollEnd={(e) => onReachBottom(e)}
            >
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