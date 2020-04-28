import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

export default function Stepper(props: { minusCount?: any; addCount?: any; goodsNum?: any }) {
  const { goodsNum } = props

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.minusCount}>
        <View style={styles.icon}>
          <Ionicons
            size={20}
            name='ios-remove'
            color={Colors.darkBlack}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.count}>
        <Text style={{ fontSize: pxToDp(28) }}>{goodsNum}</Text>
      </View>

      <TouchableOpacity onPress={props.addCount}>
        <View style={styles.icon}>
          <Ionicons
            size={20}
            name='ios-add'
            color={Colors.darkBlack}
          />
        </View>
      </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: pxToDp(64),
    height: pxToDp(64),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
  },
  count: {
    height: pxToDp(64),
    minWidth: pxToDp(80),
    backgroundColor: '#f2f2f2',
    marginLeft: pxToDp(5),
    marginRight: pxToDp(5),
    justifyContent: 'center',
    alignItems: 'center'
  }
})