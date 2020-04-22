import React from 'react'
import { View, Text } from 'react-native'
import {useNavigation} from '@react-navigation/native'
export default function Home() {
  const {navigate} = useNavigation();
  return (
    <View>
      <Text>我的</Text>
      <Text onPress={() => navigate('AnchorTabs')}>我的直播</Text>
    </View>
  )
}