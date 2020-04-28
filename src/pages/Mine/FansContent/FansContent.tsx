import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../constants/Theme'

export default function FansContent() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>1</Text>
        <Text>发布</Text>
      </View>
      <View style={styles.item}>
        <Text>1</Text>
        <Text>粉丝</Text>
      </View>
      <View style={styles.item}>
        <Text>1</Text>
        <Text>浏览</Text>
      </View>
      <View style={styles.item}>
        <Text>1</Text>
        <Text>关注主播</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor
  }
})