import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'

export default function FoundInfo() {
  const navigation = useNavigation()
  const route = useRoute()

  navigation.setOptions({
    headerTitle: '',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  return (
    <View style={styles.container}>
      <Text>{route.params.id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})