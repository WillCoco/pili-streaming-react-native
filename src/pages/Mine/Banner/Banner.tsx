import React from 'react'
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'

function Banner(props) {
  const { userInfo } = props

  return (
    <ImageBackground source={require('../../../assets/mine-image/banner_bgi.png')} style={styles.container}>
      <Image source={require('../../../assets/mine-image/banner_text.png')} style={styles.bannerText} resizeMode='contain' />
      <View style={styles.invCodeContainer}>
        <Text style={styles.invCodeText}>你的邀请码为：</Text><Text style={styles.invCode}>{userInfo.inviteCode}</Text>
      </View>
      <View style={styles.shareContainer}>
        <Text style={styles.shareText}>分享小程序</Text>
        <Ionicons name='ios-play' color={Colors.basicColor} size={16} />
      </View>
    </ImageBackground>
  )
}

export default connect(
  (state: any) => state.userData
)(Banner)

const styles = StyleSheet.create({
  container: {
    height: pxToDp(180),
    paddingTop: pxToDp(50),
    paddingLeft: pxToDp(50)
  },
  bannerText: {
    width: pxToDp(367),
    height: pxToDp(45)
  },
  invCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToDp(10)
  },
  invCodeText: {
    fontSize: pxToDp(28),
    color: Colors.whiteColor
  },
  invCode: {
    fontWeight: '600',
    color: Colors.yellowColor,
    fontSize: pxToDp(32)
  },
  shareContainer: {
    position: 'absolute',
    width: pxToDp(170),
    height: pxToDp(40),
    right: 0,
    bottom: pxToDp(27),
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: pxToDp(20),
    borderBottomLeftRadius: pxToDp(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: pxToDp(30)
  },
  shareText: {
    fontSize: pxToDp(20),
    fontWeight: '500',
    color: Colors.basicColor,
    marginRight: pxToDp(5)
  }
})