import React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Carousel } from '@ant-design/react-native'
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
  const navigation = useNavigation()

  const changSwiper = () => {
    console.log(1)
  }

  const tapSwiper = (item: any) => {
    if (item.goods_id) {
      props.tapSwiper(item.goods_id)
    } else {
      props.tapSwiper(item.activity_url)
    }
  }

  // <Carousel
  //   infinite={true}
  //   autoplay={true}
  //   autoplayInterval={3000}
  //   dots={props.showDots}
  //   style={[swiperStyle.swiper, props.swiperStyle]}
  //   dotStyle={{ backgroundColor: Colors.lightGrey }}
  //   dotActiveStyle={{ backgroundColor: Colors.whiteColor }}
  //   afterChange={() => changSwiper()}
  // >
  // </Carousel>

  return (
    <Swiper
      style={[swiperStyle.swiper, props.swiperStyle]}
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
  swiper: {
    width: '100%'
  },
  swiperImage: {
    width: '100%',
    height: '100%',
    borderRadius: pxToDp(16)
  }
})

export default HomeSwiper