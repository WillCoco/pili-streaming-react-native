import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import ExpressStepper from '../../components/ExpressStepper/ExpressStepper'
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

export default function ExpressInfo() {

  return (
    <>
      <View style={styles.container}>
        <Image source={require('../../assets/login-image/logo.png')} style={styles.logo} />
        <View style={styles.content}>
          <Text style={styles.expressName}>中通快递</Text>
          <Text style={styles.expressCode}>运单号:312321312312</Text>
          <Text style={styles.expressTel}>客服电话：321412</Text>
        </View>
      </View>
      <ExpressStepper />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: pxToDp(20),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(30),
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: pxToDp(122),
    height: pxToDp(122),
    borderRadius: pxToDp(61),
    margin: pxToDp(20)
  },
  content: {
    marginBottom: pxToDp(10)
  },
  expressName: {
    fontSize: pxToDp(30),
    lineHeight: pxToDp(42),
    color: Colors.darkBlack
  },
  expressCode: {
    fontSize: pxToDp(30),
    lineHeight: pxToDp(42),
    color: Colors.darkBlack
  },
  expressTel: {
    fontSize: pxToDp(24),
    lineHeight: pxToDp(42),
    color: Colors.darkBlack
  }
})