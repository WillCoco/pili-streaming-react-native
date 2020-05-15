import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import pxToDp from '../../utils/px2dp'

export default function NetWorkErr() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/default-image/err_network.png')} style={styles.errNetWorkImg} >

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errNetWorkImg: {
    width: pxToDp(380),
    height: pxToDp(360)
  }
})