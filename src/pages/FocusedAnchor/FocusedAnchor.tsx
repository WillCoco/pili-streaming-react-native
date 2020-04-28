import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'

import AnchorCard from './AnchorCard/AnchorCard'

export default function FocusedAnchor() {
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '关注的主播',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  return (
    <View>
      {
        [1,2,3,4].map((item, index) => {
          return (
            <AnchorCard key={`anchor-${index}`} />
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})