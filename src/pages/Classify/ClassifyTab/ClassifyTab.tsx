import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme' 

export default function ClassifyTab(props: { changeTab: any; tabs: any }) {
  const { tabs } = props

  return (
    <ScrollView style={styles.conatainer}>
      {
        tabs.map((item: any, index: number) => {
          return (
            <Text
              key={`tab-${index}`}
              onPress={() => props.changeTab(index)}
              style={[styles.tabItem, item.active && styles.tabItemActive]}
            >{item.name}</Text>
          )
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  conatainer: {
    width: pxToDp(180),
    flex: 1
  },
  tabItem: {
    width: pxToDp(180),
    height: pxToDp(100),
    lineHeight: pxToDp(100),
    textAlign: 'center',
    fontSize: pxToDp(26),
    color: Colors.darkBlack,
    fontWeight: '500'
  },
  tabItemActive: {
    color: Colors.whiteColor,
    fontSize: pxToDp(32),
    backgroundColor: Colors.basicColor
  }
})