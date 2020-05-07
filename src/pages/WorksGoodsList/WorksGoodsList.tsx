import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { apiAddGoods } from '../../service/api'
import { setWorkGoodsList } from '../../actions/works'

import Header from './Header/Header'
import GoodsCard from '../../components/WorksGoodsCard/WorksGoodsCard'

function WorksGoodsList(props: any) {
  const navigation = useNavigation()
  const { goodsList, addedGoodsList } = props

  navigation.setOptions({
    headerShown: false
  })

  useEffect(() => {
    getGoodsList()
  }, [])

  const getGoodsList = () => {
    console.log(addedGoodsList)
    apiAddGoods().then((res: any) => {
      console.log('商品列表', res)

      if (addedGoodsList.length) {
        res.list.forEach((item: any) => {
          item.isAdd = false

          addedGoodsList.forEach((_item: any) => {
            if (_item.goods_id === item.goods_id) {
              item.isAdd = true
            }
          })
        })
      } else {
        res.list.forEach((item: any) => {
          item.isAdd = false
        })
      }

      props.dispatch(setWorkGoodsList(res.list))
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={{ flex: 1 }}>
        {
          goodsList && goodsList.map((item: any, index: number) => {
            return (
              <GoodsCard
                key={`goods-${index}`}
                goodsInfo={item}
                type='add'
              />
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default connect(
  (state: any) => state.worksData
)(WorksGoodsList)