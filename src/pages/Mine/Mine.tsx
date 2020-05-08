import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { setUserInfo } from '../../actions/user'
import { apiGetUserData, apiGetOrderCount, apiGetIndexGoodsList } from '../../service/api'

import Header from './Header/Header'
import OrdersContent from './OrdersContent/OrdersContent'
import FansContent from './FansContent/FansContent'
import Account from './Account/Account'
import Banner from './Banner/Banner'
import GoodsList from './GoodsList/GoodsList'

function Mine(props) {
  const navigation = useNavigation()
  const pageSize = 20
  const { isLogin } = props
  const [orderCount, setOrderCount] = useState({})
  const [pageNo, setPageNo] = useState(1)
  const [goodsList, setGoodsList] = useState([])

  useEffect(() => {
    getGoodsList()

    if (isLogin) {
      navigation.addListener('focus', () => {
        getUserInfo()
        getOrderCount()
      })
    }
  }, [])

  /**
   * 加载推荐商品
   */
  const getGoodsList = () => {
    apiGetIndexGoodsList({ pageNo, pageSize }).then(res => {
      console.log('推荐商品', res)
      setGoodsList(res.list)
    })
  }

  /**
   * 获取用户信息
   */
  const getUserInfo = () => {
    apiGetUserData().then((res: any) => {
      console.log('获取用户信息', res)
      props.dispatch(setUserInfo(res))
    })
  }

  /**
   * 获取订单数量
   */
  const getOrderCount = () => {
    apiGetOrderCount().then(res => {
      console.log('订单数量', res)
      setOrderCount(res)
    })
  }

  return (
    <ScrollView style={styles.container}>
      {/* 头部区域 */}
      <Header />
      {/* 订单 */}
      <OrdersContent orderCount={orderCount} isLogin={isLogin} />
      {/* 粉丝数量 相关 */}
      <FansContent />
      {/* 账户 */}
      <Account />
      {/* 邀新横幅 */}
      <Banner />
      {/* 推荐商品 */}
      <GoodsList list={goodsList} />
    </ScrollView>
  )
}

export default connect(
  (state: any) => state.userData
)(Mine)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})