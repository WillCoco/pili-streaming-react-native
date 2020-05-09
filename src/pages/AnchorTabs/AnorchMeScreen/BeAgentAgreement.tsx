/**
 * 《经纪人劳务电子合同》
 */
import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../../constants/Theme'
import pxToDp from '../../../utils/px2dp'

export default function BeAgentAgreement() {
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '经纪人劳务电子合同',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>《经纪人劳务电子合同》</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>【总则】</Text>
        <Text style={styles.text}></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>【服务协议】</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}></Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: pxToDp(20),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(50)
  },
  section: {
    marginBottom: pxToDp(40)
  },
  text: {
    fontSize: pxToDp(24),
    lineHeight: pxToDp(36),
    color: Colors.darkBlack
  },
  title: {
    fontSize: pxToDp(26),
    lineHeight: pxToDp(36),
    color: Colors.darkBlack,
    fontWeight: '600'
  },
  boldText: {
    fontWeight: '600'
  }
})