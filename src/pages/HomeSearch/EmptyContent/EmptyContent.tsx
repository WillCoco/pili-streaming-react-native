import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'

export default function EmptyContent(props: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>抱歉，没有找到与“<Text style={{ color: Colors.basicColor }}>{props.emptyText}</Text>”相关的商品</Text>
      <View style={styles.lineContnet}>
        <Text style={styles.tipText}>可能你想要</Text>
        <Text style={[styles.line, styles.leftLine]} />
        <Text style={[styles.line, styles.rightLine]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: pxToDp(236),
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: pxToDp(24),
    color: Colors.darkBlack
  },
  lineContnet: {
    marginTop: pxToDp(30),
    width: pxToDp(400),
    height: pxToDp(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    position: 'absolute',
    top: '50%',
    width: pxToDp(100),
    height: pxToDp(1),
    backgroundColor: Colors.darkGrey
  },
  leftLine: {
    left: 0
  },
  rightLine: {
    right: 0
  },
  tipText: {
    fontSize: pxToDp(24),
    color: Colors.darkGrey
  }
})