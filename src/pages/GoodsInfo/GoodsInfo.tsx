import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import HTML from 'react-native-render-html'

import Swiper from './Swiper/Swiper'
import GoodsCard from './GoodsCard/GoodsCard'
import Advantage from './Advantage/Advantage'
import BrandCard from './BrandCard/BrandCard'
import ActivityBar from './ActivityBar/ActivityBar'

import { apiGoodInfo } from '../../service/api'
import { Colors } from '../../constants/Theme'
import { strDiscode } from '../../utils/discodeRichText'
import pxToDp from '../../utils/px2dp'

export default function GoodsInfo() {
  const route = useRoute()
  const navigation = useNavigation()
  const [swiperList, setSwiperList] = useState([])
  const [goodsInfo, setGoodsInfo] = useState({})
  const [goodsType, setGoodsType] = useState('')
  const [goodsContent, setGoodsContent] = useState('')

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
      setGoodsContent(strDiscode(res.goods_content))

      if (res.is_sale || res.is_snap_up) {
        setGoodsType(res.is_sale ? 'sale' : 'seckill')
      }
    })
  }

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 轮播图 */}
        <Swiper swiperList={swiperList} />
        {
          !!goodsType && <ActivityBar type={goodsType} goodsInfo={goodsInfo} />
        }
        {/* 商品信息 */}
        <GoodsCard goodsInfo={goodsInfo} />
        {/* 平台优势 */}
        <Advantage />
        {/* 店铺信息 */}
        <BrandCard goodsInfo={goodsInfo} />
        {/* 商品详情 */}
        <View style={{ marginTop: pxToDp(10) }}>
          <HTML
            html={goodsContent}
            imagesMaxWidth={Dimensions.get('window').width}
          />
        </View>
      </ScrollView>
    </View>
  )
}