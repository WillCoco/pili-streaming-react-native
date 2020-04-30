import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../../constants/Theme'
import pxToDp from '../../../utils/px2dp'

import CardTitle from '../../../components/CardTitle/CardTitle'
import GoodsCard from '../../../components/GoodsCard/GoodsCard'

export default function GoodsList(props) {
  const navigation = useNavigation()
  const { list } = props

  const toGoodsInfo = (id: number) => {
    navigation.push('GoodsInfo', { id })
  }

  return (
    <View style={styles.container}>
      <CardTitle title='推荐' />
      <View style={styles.goodsContainer}>
        {
          list.map((item: any, index: number) => {
            return (
              <GoodsCard
                key={`recommend-${index}`}
                style={{ marginBottom: pxToDp(20) }}
                goodsInfo={item} tapGoodsCard={(id: number) => toGoodsInfo(id)} />
            )
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    marginTop: pxToDp(20),
    padding: pxToDp(20)
  },
  goodsContainer: {
    marginTop: pxToDp(36),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})