import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import { Colors } from '../../../constants/Theme'
import pxToDp from '../../../utils/px2dp'
import HTML from 'react-native-render-html'

export default function WorksCard(props: any) {
  const { worksInfo } = props

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{worksInfo.worksTitle}</Text>
      <HTML html={worksInfo.worksContent} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    padding: pxToDp(20)
  },
  title: {
    fontSize: pxToDp(34),
    color: Colors.darkBlack,
    fontWeight: '500'
  }
})