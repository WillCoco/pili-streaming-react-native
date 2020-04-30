import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'


export default function AnchorCard() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: '' }} style={styles.anchorImg} />
        <View style={styles.anchorInfo}>
          <Text style={styles.watchCount}>123人观看</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: '' }} style={styles.avatar} />
            <Text style={styles.name}>峭壁罗甸下</Text>
          </View>
        </View>
      </View>
      <View style={styles.state}>
        <Text style={{ fontSize: pxToDp(28), color: Colors.whiteColor }}>直播中</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    padding: pxToDp(15),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    marginBottom: pxToDp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  anchorImg: {
    width: pxToDp(150),
    height: pxToDp(150),
    backgroundColor: '#0f0',
    borderRadius: pxToDp(10)
  },
  anchorInfo: {
    marginLeft: pxToDp(24),
    paddingTop: pxToDp(15),
    paddingBottom: pxToDp(10),
    justifyContent: 'space-between'
  },
  avatar: {
    height: pxToDp(54),
    width: pxToDp(54),
    borderRadius: pxToDp(27),
    backgroundColor: '#0f0'
  },
  watchCount: {
    fontSize: pxToDp(34),
    color: Colors.darkBlack,
    fontWeight: '500'
  },
  name: {
    fontSize: pxToDp(24),
    color: Colors.darkGrey,
    marginLeft: pxToDp(20)
  },
  state: {
    width: pxToDp(200),
    height: pxToDp(60),
    backgroundColor: Colors.basicColor,
    borderRadius: pxToDp(30),
    justifyContent: 'center',
    alignItems: 'center'
  }
})