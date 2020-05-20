import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { apiAddGoods } from '../../service/api'
import { setWorkGoodsList } from '../../actions/works'

import Header from './Header/Header'
import GoodsCard from '../../components/WorksGoodsCard/WorksGoodsCard'
import NetWorkErr from '../../components/NetWorkErr/NetWorkErr'

function WorksGoodsList(props: any) {
  const { goodsList, addedGoodsList } = props

  const navigation: any = useNavigation()

  const [netWorkErr, setNetWorkErr] = useState(false)

  navigation.setOptions({
    headerShown: false
  })

  useEffect(() => {
    getGoodsList()
  }, [])

  const getGoodsList = (keywords: string = '') => {
    apiAddGoods({
      keywords
    }).then((res: any) => {
      console.log('商品列表', res)
      setNetWorkErr(false)

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
    }).catch((err: any) => {
      console.log(err)
      setNetWorkErr(true)
    })
  }

  if (netWorkErr) return <NetWorkErr reload={getGoodsList} />

  return (
    <View style={{ flex: 1 }}>
      <Header toSearch={(searchKey: string) => getGoodsList(searchKey)} />
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