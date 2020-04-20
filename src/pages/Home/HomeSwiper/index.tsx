import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Carousel } from '@ant-design/react-native'

import { Colors } from '../../../constants/Theme'

interface Props {
  swiperList?: Array<any>  // 传入的轮播图列表
  swiperStyle?: any  // 轮播图样式
  showDots?: any
}

function HomeSwiper(props: Props) {
  const { swiperList } = props

  const changSwiper = () => {

  }

  return (
    <Carousel
      autoplay={true}
      infinite={true}
      dots={props.showDots}
      style={[swiperStyle.swiper, props.swiperStyle]}
      dotStyle={{ backgroundColor: Colors.lightGrey }}
      dotActiveStyle={{ backgroundColor: Colors.whiteColor }}
      afterChange={changSwiper}
    >
      {
        swiperList && swiperList.map((item: { original_img: any }, index: any) => {
          return (
            <Image
              source={{ uri: item.original_img }}
              resizeMode='cover'
              style={swiperStyle.swiperImage}
              key={`swiper-${index}`}
            />
          )
        })
      }
    </Carousel>
  )
}

const swiperStyle = StyleSheet.create({
  swiper: {
    width: '100%'
  },
  swiperImage: {
    width: '100%',
    height: '100%'
  }
})

export default HomeSwiper