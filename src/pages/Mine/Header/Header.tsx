import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, PixelRatio, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Theme'
import pxToDp from '../../../utils/px2dp'

export default function Header(props) {
  const navigation = useNavigation()
  const { statusBarHeight, userInfo } = props



  return (
    <ImageBackground
      resizeMode='stretch'
      source={require('../../../assets/mine-image/header-bgi.png')}
      style={[styles.container, { paddingTop: statusBarHeight }]}
    >
      {/* 顶部右侧操作区域 */}
      <View style={styles.rightOption}>
        <TouchableOpacity onPress={() => navigation.push('AnchorTabs')}>
          <ImageBackground source={require('../../../assets/mine-image/live-btn.png')} style={styles.liveBgi}>
            <Text style={styles.liveText}>去直播</Text><Ionicons name='ios-play' color={Colors.whiteColor} size={20} />
          </ImageBackground>
        </TouchableOpacity>
        <Image source={require('../../../assets/mine-image/icon_setting.png')} style={styles.setIcon} />
      </View>

      {/* 个人信息 */}
      <View style={styles.userInfo}>
        <Image source={{ uri: userInfo.userAvatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{userInfo.nickName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.userLevel, styles.userLevelBgc]}>{userInfo.userLevel}</Text>
            <Text style={styles.userLevel}>缺失</Text>
            <View style={[styles.userLevel, { flexDirection: 'row', alignItems: 'center' }]}>
              <Text style={{ fontSize: pxToDp(20), color: Colors.whiteColor }}>缺失</Text>
              <Ionicons name='ios-play' color={Colors.whiteColor} />
            </View>
          </View>
        </View>
      </View>

      {/* 关注、收藏 相关信息 */}
      <View style={styles.otherInfo}>
        <View style={styles.otherInfoItem}>
          <Text style={styles.count}>{userInfo.collectionCount}</Text>
          <Text style={styles.text}>商品收藏</Text>
        </View>
        <View style={styles.otherInfoItem}>
          <Text style={styles.count}>{userInfo.storeFollow}</Text>
          <Text style={styles.text}>店铺关注</Text>
        </View>
        <View style={styles.otherInfoItem}>
          <Text style={styles.count}>{userInfo.likeContent}</Text>
          <Text style={styles.text}>喜欢的内容</Text>
        </View>
        <View style={styles.otherInfoItem}>
          <Text style={styles.count}>{userInfo.card}</Text>
          <Text style={styles.text}>优惠券</Text>
        </View>
      </View>

      {/* 会员信息 */}
      <ImageBackground
        source={require('../../../assets/mine-image/vip-card-bgi.png')}
        style={styles.vipCard}
      >

      </ImageBackground>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    height: pxToDp(550),
    borderBottomLeftRadius: pxToDp(46),
    borderBottomRightRadius: pxToDp(46),
    overflow: 'hidden'
  },
  rightOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: pxToDp(30)
  },
  liveBgi: {
    width: pxToDp(150),
    height: pxToDp(58),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: pxToDp(4)
  },
  setIcon: {
    width: pxToDp(40),
    height: pxToDp(40),
    marginLeft: pxToDp(30)
  },
  liveText: {
    marginTop: pxToDp(7),
    marginRight: pxToDp(5),
    color: Colors.whiteColor,
    fontSize: pxToDp(24)
  },
  userInfo: {
    paddingLeft: pxToDp(30),
    marginTop: pxToDp(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: pxToDp(130),
    height: pxToDp(130),
    borderRadius: pxToDp(65),
    marginRight: pxToDp(20)
  },
  userName: {
    fontSize: pxToDp(36),
    fontWeight: '600',
    color: Colors.whiteColor,
    marginBottom: pxToDp(10)
  },
  userLevel: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: Colors.whiteColor,
    paddingLeft: pxToDp(14),
    paddingRight: pxToDp(14),
    height: pxToDp(32),
    lineHeight: pxToDp(32),
    fontSize: pxToDp(20),
    color: Colors.whiteColor,
    borderRadius: pxToDp(16),
    marginRight: pxToDp(10)
  },
  userLevelBgc: {
    backgroundColor: Colors.yellowColor,
    overflow: 'hidden'
  },
  otherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  otherInfoItem: {
    alignItems: 'center',
    marginTop: pxToDp(36)
  },
  count: {
    color: Colors.whiteColor,
    fontSize: pxToDp(34),
    fontWeight: '600',
    lineHeight: pxToDp(48),
    marginBottom: pxToDp(4)
  },
  text: {
    color: Colors.whiteColor,
    fontSize: pxToDp(26)
  },
  vipCard: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: pxToDp(692),
    height: pxToDp(120),
    marginLeft: pxToDp(-346)
  }
})