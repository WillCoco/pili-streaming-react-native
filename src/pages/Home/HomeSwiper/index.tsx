import React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Swiper from 'react-native-swiper'

import { Colors } from '../../../constants/Theme'
import pxToDp from '../../../utils/px2dp'

interface Props {
  swiperList?: Array<any>  // 传入的轮播图列表
  swiperStyle?: any  // 轮播图样式
  showDots?: any
  tapSwiper?: any
}

function HomeSwiper(props: Props) {
  const { swiperList } = props

  const tapSwiper = (item: any) => {
    if (item.goods_id) {
      props.tapSwiper(item.goods_id)
    } else {
      props.tapSwiper(item.activity_url)
    }
  }

  return (
    <Swiper
      style={props.swiperStyle}
      activeDotColor={Colors.whiteColor}
      autoplay
    >
      {
        swiperList && swiperList.map((item: { original_img: any }, index: any) => {
          return (
            <TouchableWithoutFeedback onPress={() => tapSwiper(item)} key={`swiper-${index}`}>
              <Image
                source={{ uri: item.original_img }}
                resizeMode='cover'
                style={swiperStyle.swiperImage}
              />
            </TouchableWithoutFeedback>
          )
        })
      }
    </Swiper>
  )
}

const swiperStyle = StyleSheet.create({
  swiperImage: {
    width: '100%',
    height: '100%',
    borderRadius: pxToDp(16)
  }
})

export default HomeSwiper