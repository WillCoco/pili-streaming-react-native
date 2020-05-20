import React from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

export default function NetWorkErr(props: { reload(): void }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/default-image/err_network.png')} style={styles.errNetWorkImg} >
        <Text style={styles.text}>网络异常,请稍后重试</Text>
      </ImageBackground>
      <TouchableOpacity style={styles.reloadBtn} onPress={props.reload}>
        <Text style={styles.reloadText}>点击重新加载</Text>
      </TouchableOpacity>
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
    height: pxToDp(360),
    paddingTop: pxToDp(300)
  },
  text: {
    textAlign: 'center'
  },
  reloadBtn: {
    height: pxToDp(50),
    backgroundColor: Colors.basicColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    borderRadius: pxToDp(25)
  },
  reloadText: {
    fontSize: pxToDp(24),
    color: Colors.whiteColor
  }
})