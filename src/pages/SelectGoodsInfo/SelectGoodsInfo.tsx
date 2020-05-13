import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import { Ionicons } from '@expo/vector-icons'

import { apiSelectGoodsInfo } from '../../service/api'
import CardTitle from '../../components/CardTitle/CardTitle'
import GoodsCard from './GoodsCard/GoodsCard'
import Swiper from './Swiper/Swiper'
import pxToDp from '../../utils/px2dp'
import formatSinglePrice from '../../utils/formatGoodsPrice'
import { Flex } from '@ant-design/react-native'

export default function SelectGoodsInfo() {
  const route = useRoute()
  const navigation = useNavigation()
  const [swiperList, setSwiperList] = useState([])
  const [goodsInfo, setGoodsInfo] = useState({})
  const [goodsList, setGoodsList] = useState([])

  navigation.setOptions({
    headerTitle: '',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false,
    headerTransparent: true
  })

  useEffect(() => {
    getSelectedInfo()
  }, [])

  const getSelectedInfo = () => {
    apiSelectGoodsInfo({
      goods_id: route.params.id
    }).then(res => {
      console.log('精选好物详情', res)

      setSwiperList(res.goods_img)
      setGoodsInfo(res.goods)
      setGoodsList(res.recommend)
    })
  }

  const toGoodsInfo = () => {
    const id = goodsInfo.goods_id
    navigation.push('GoodsInfo', { id })
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* 轮播题 */}
        <Swiper swiperList={swiperList} />
        {/* 商品信息 */}
        <View style={styles.goodsInfo}>
          <Text style={styles.goodsName} numberOfLines={1}>{goodsInfo.goods_name}</Text>
          <Text style={styles.content}>{goodsInfo.content}</Text>
        </View>
        {/* 推荐商品列表 */}
        <View style={styles.goodsList}>
          <CardTitle title='你可能还想看' />
          <View style={styles.goodsListContainer}>
            {
              goodsList && goodsList.map((item, index) => {
                return (
                  <GoodsCard key={`goods-${index}`} goodsInfo={item} style={{ marginBottom: pxToDp(20) }} />
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerActionBar}>
        <View style={styles.footerLeft}>
          <Ionicons
            size={20}
            name={goodsInfo.is_like ? 'ios-heart' : 'ios-heart-empty'}
            color={goodsInfo.is_like ? Colors.basicColor : Colors.lightGrey}
          />
          <Text style={styles.likesCount}>{goodsInfo.people_like}人喜欢</Text>
        </View>
        <TouchableWithoutFeedback onPress={toGoodsInfo}>
          <View style={styles.footerRight}>
            <Text style={styles.goodsPrice}>¥{formatSinglePrice(goodsInfo.shop_price)}去看看</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    </View>

  )
}

const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: pxToDp(98)
  },
  goodsInfo: {
    backgroundColor: Colors.whiteColor,
    padding: pxToDp(20),
    marginBottom: pxToDp(10)
  },
  goodsName: {
    fontSize: pxToDp(28),
    color: Colors.darkBlack,
    marginBottom: pxToDp(14)
  },
  content: {
    fontSize: pxToDp(24),
    color: Colors.lightBlack,
    lineHeight: pxToDp(33)
  },
  goodsList: {
    backgroundColor: Colors.whiteColor,
    padding: pxToDp(20)
  },
  goodsListContainer: {
    marginTop: pxToDp(37),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  footerActionBar: {
    width: '100%',
    height: pxToDp(98),
    flexDirection: 'row'
  },
  footerLeft: {
    flex: 1,
    backgroundColor: Colors.blackColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerRight: {
    flex: 1,
    backgroundColor: Colors.basicColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  goodsPrice: {
    fontSize: pxToDp(28),
    color: Colors.whiteColor,
    fontWeight: '500'
  },
  likesCount: {
    fontSize: pxToDp(28),
    color: Colors.whiteColor,
    fontWeight: '500',
    marginLeft: pxToDp(15)
  }
})