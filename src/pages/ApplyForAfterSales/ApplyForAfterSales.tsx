import React from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function ApplyForAfterSales() {
  const route = useRoute()

  console.log(route)

  return (
    <View>
      <Text>s</Text>
    </View>
  )
}