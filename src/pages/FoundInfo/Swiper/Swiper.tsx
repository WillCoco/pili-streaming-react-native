import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'


export default function GoodsSwiper(props: { swiperList: Array<any> }) {
  const { swiperList } = props

  return (
    <View style={styles.swiperContainer}>
      <Swiper
        autoplay
        activeDotColor={Colors.whiteColor}
      >
        {
          swiperList && swiperList.map((item: any, index: number) => {
            return (
              <Image
                key={`swiper-${index}`}
                source={{ uri: item.worksUrl }}
                style={styles.img}
                resizeMode='contain'
              />
            )
          })
        }
      </Swiper>
    </View>
  )
}


const styles = StyleSheet.create({
  swiperContainer: {
    height: pxToDp(750)
  },
  img: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.darkBlack
  } 
})