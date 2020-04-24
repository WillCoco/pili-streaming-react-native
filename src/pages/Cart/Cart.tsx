import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'

import { setCartList } from '../../actions/cart'
import { apiCartList } from '../../service/api'

import DefaultContent from './DefaultContent/DefaultContent'
import CartItem from '../../components/CartItem/CartItem'
import CartFooterAction from '../../components/CartFooterAction/CartFooterAction'
import pxToDp from '../../utils/px2dp'

function Cart(props: any) {
  const navigation = useNavigation()
  const [isEmpty, setIsEmpty] = useState(false)

  const { userData, cartData } = props

  // useEffect(() => {
  //   if (props.userData.isLogin) {
  //     navigation.addListener('focus', () => {
  //       getCartList()
  //     })
  //   }
  // }, [navigation])

  /**
   * 获取购物车列表
   */
  const getCartList = () => {
    apiCartList().then((res: any) => {
      console.log('购物车列表', res)
      if (res.count) {
        setIsEmpty(false)
        props.dispatch(setCartList(res))
      } else {
        // 购物车为空
        setIsEmpty(true)
      }
    })
  }

  /**
   * 切换到首页
   */
  const toHome = () => {
    navigation.navigate('首页')
  }

  /**
   * 去登录
   */
  const toLogin = () => {
    navigation.push('Login')
  }

  /**
   * 减少商品数量
   */
  const minusGoodsNum = (shopId: number, cartId: number) => {
    const { cartList } = cartData

    cartList.shop.forEach((item: { shop_info: { shop_id: number }; list: any[] }) => {
      if (item.shop_info.shop_id === shopId) {
        item.list.forEach(_item => {
          if (_item.cart_id === cartId && _item.goods_num > 1) {
            _item.goods_num -= 1
          }
        })
      }
    })

    props.dispatch(setCartList(cartList))
  }

  /**
   * 增加商品数量
   */
  const addGoodsNum = (shopId: number, cartId: number) => {
    const { cartList } = cartData

    cartList.shop.forEach((item: { shop_info: { shop_id: number }; list: any[] }) => {
      if (item.shop_info.shop_id === shopId) {
        item.list.forEach(_item => {
          if (_item.cart_id === cartId && _item.goods_num < _item.goods_count) {
            _item.goods_num += 1
          }
        })
      }
    })

    props.dispatch(setCartList(cartList))
  }

  if (!userData.isLogin) {
    return (
      <DefaultContent type='notLogin' nextAction={toLogin} />
    )
  }

  if (isEmpty) {
    return (
      <DefaultContent type='empty' nextAction={toHome} />
    )
  }

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: pxToDp(125) }}
      >
        {
          cartData.cartList.shop && cartData.cartList.shop.map((item: any, index: number) => {
            return (
              <CartItem
                key={`cart-${index}`}
                cartInfo={item}
                minusGoodsNum={(shopId: number, cartId: number) => minusGoodsNum(shopId, cartId)}
                addGoodsNum={(shopId: number, cartId: number) => addGoodsNum(shopId, cartId)}
              />
            )
          })
        }
      </ScrollView>
      <CartFooterAction />
    </View>
  )
}

export default connect(
  (state: any) => state
)(Cart)

const styles = StyleSheet.create({
  container: {

  }
})