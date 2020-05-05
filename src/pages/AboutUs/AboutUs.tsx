import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'

import Header from './Header/Header'
import Form from './Form/Form'

export default function AboutUs() {
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '关于圈品',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false,
    headerTransparent: true
  })

  return (
    <View>
      <Header />
      <Form />
    </View>
  )
}