import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

import Swiper from './Swiper/Swiper'
import GoodsCard from './GoodsCard/GoodsCard'
import Advantage from './Advantage/Advantage'
import BrandCard from './BrandCard/BrandCard'
import { apiGoodInfo } from '../../service/api'
import { Colors } from '../../constants/Theme'

export default function GoodsInfo() {
  const route = useRoute()
  const navigation = useNavigation()
  const [swiperList, setSwiperList] = useState([])
  const [goodsInfo, setGoodsInfo] = useState({})

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
    getGoodsInfo()
  }, [])

  /**
   * 加在商品详情
   */
  const getGoodsInfo = () => {
    apiGoodInfo({
      goods_id: route.params.id
    }).then((res: any) => {
      console.log('商品详情', res)
      setSwiperList(res.goods_images_list)
      setGoodsInfo(res)
    })
  }

  return (
    <View>
      <ScrollView>
        {/* 轮播图 */}
        <Swiper swiperList={swiperList} />
        {/* 商品信息 */}
        <GoodsCard goodsInfo={goodsInfo} />
        {/* 平台优势 */}
        <Advantage />
        {/* 店铺信息 */}
        <BrandCard goodsInfo={goodsInfo} />
      </ScrollView>
    </View>
  )
}