import React from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function GoodsInfo() {
  const route = useRoute()

  return (
    <View><Text>{route.params.id}</Text></View>
  )
}