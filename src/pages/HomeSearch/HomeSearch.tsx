import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

function HomeSearch() {
  const navgation = useNavigation()

  navgation.setOptions({
    headerShown: false
  })

  return (
    <View>
      <Text>搜索</Text>
    </View>
  )
}

export default HomeSearch