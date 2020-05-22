import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'

export default function Advantage() {
  const advList = [
    {
      text: '正品保障',
      image: require('../../../assets/goods-image/icon_zhengpin.png')
    }, {
      text: '售后无忧',
      image: require('../../../assets/goods-image/icon_shouhou.png')
    }, {
      text: '全国包邮',
      image: require('../../../assets/goods-image/icon_baoyou.png')
    }, {
      text: '48小时发货',
      image: require('../../../assets/goods-image/icon_fahuo.png')
    }
  ]

  return (
    <View style={styles.container}>
      {
        advList.map((item, index) => {
          return (
            <View style={styles.advItem} key={`adv-${index}`}>
              <Image style={styles.advImg} source={item.image} />
              <Text style={styles.advText}>{item.text}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: pxToDp(150),
    backgroundColor: Colors.whiteColor,
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  advItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  advImg: {
    width: pxToDp(48),
    height: pxToDp(48),
    marginBottom: pxToDp(10)
  },
  advText: {
    fontSize: pxToDp(24),
    color: Colors.darkGrey
  }
})