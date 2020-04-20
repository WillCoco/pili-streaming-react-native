import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Colors } from '../../../constants/Theme'
import pxToDp from '../../../utils/px2dp'

const navList = [
  {
    text: '品牌',
    icon: require('../../../assets/home-image/icon_brand.png')
  }, {
    text: '分类',
    icon: require('../../../assets/home-image/icon_classify.png')
  }, {
    text: '特卖专区',
    icon: require('../../../assets/home-image/icon_sale.png')
  }, {
    text: '产业带',
    icon: require('../../../assets/home-image/icon_belt.png')
  }
]

export default function HomeNav() {

  return (
    <View style={styles.navContainer}>
      {
        navList.map((item, index) => {
          return (
            <View key={`nav-${index}`} style={styles.navItem}>
              <Image source={ item.icon } style={styles.navIcon} />
              <Text style={styles.navText}>{item.text}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(35)
  },
  navItem: {
    alignItems: 'center'
  },
  navIcon: {
    width: pxToDp(100),
    height: pxToDp(100)
  },
  navText: {
    color: Colors.darkBlack,
    fontSize: pxToDp(28),
    marginTop: pxToDp(14)
  }
})