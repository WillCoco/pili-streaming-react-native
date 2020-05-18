import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, Platform, PermissionsAndroid } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs'
import { connect } from 'react-redux'
import pxToDp from '../../../utils/px2dp'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '../../../constants/Theme'
import * as WeChat from 'react-native-wechat-lib'
// import * as FileSystem from 'expo-file-system'
import { apiCreatePoster, apiGetUserData } from '../../../service/api'
import { setUserInfo } from '../../../actions/user'
import Toast from 'react-native-tiny-toast'

function ShareBar(props: { hideShareBar?: any; dispatch?: any; goodsId?: any; userId?: any }) {
  const [progress, setProgress] = useState(0)
  const { goodsId, userId } = props

  /**
   * 分享到微信
   */
  const shareToWeChat = () => {
    WeChat.shareMiniProgram({
      title: 'Mini program.',
      userName: 'gh_d39d10000000',
      webpageUrl: 'https://google.com/show.html',
      thumbImageUrl: 'https://google.com/1.jpg',
      scene: 0
    }).then(res => {
      Toast.show('已保存至相册')
      props.hideShareBar()
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 生成小程序码
   */
  const createMiniAppCode = () => {

  }

  /**
   * 生成图文卡片
   */
  const createCrad = () => {

  }

  /**
   * 生成空间海报
   */
  const createPoster = async () => {
    let userInfo: any = {}

    if (!userId) {
      userInfo = await apiGetUserData()
      props.dispatch(setUserInfo(userInfo))
    }

    const params = {
      goodsId,
      userId: userId || userInfo.userId
    }

    apiCreatePoster(params).then((res: any) => {
      download(res, () => {
        Toast.show('已保存至相册')
        props.hideShareBar()
      }, () => {
        console.log('error')
      })
    })
  }

  const download = (base64Img: string, success: any, fail: any) => {
    const dirs =
      Platform.OS === 'ios'
        ? RNFS.LibraryDirectoryPath
        : RNFS.ExternalDirectoryPath; // 外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${((Math.random() * 10000000) | 0)}.png`;
    const imageData = base64Img;

    // 报错了 先注释
    RNFetchBlob.fs.writeFile(downloadDest, imageData, 'base64').then(async () => {
      try {
        if (Platform.OS === 'ios') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "请求",
              message: "允许存储文件到手机",
              buttonNeutral: "稍后询问",
              buttonNegative: "取消",
              buttonPositive: "确认"
            }
          )

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            CameraRoll.saveToCameraRoll(downloadDest).then((res) => {
              console.log('saveSuccess', res)
              success && success()
            }).catch((err) => {
              Toast.show('保存失败')
            })
          }
        }
      } catch (err) {
        console.log('catch', err)
        fail && fail()
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>立即分享给好友</Text>
        <TouchableOpacity onPress={props.hideShareBar}>
          <AntDesign name="closecircleo" size={24} color={Colors.lightBlack} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.item} onPress={shareToWeChat}>
          <Image source={require('../../../assets/goods-image/icon_wechat.png')} style={styles.icon} />
          <Text style={styles.shareText}>分享到微信</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={createMiniAppCode}>
          <Image source={require('../../../assets/goods-image/icon_miniapp.png')} style={styles.icon} />
          <Text style={styles.shareText}>生成小程序码</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={createCrad}>
          <Image source={require('../../../assets/goods-image/icon_card.png')} style={styles.icon} />
          <Text style={styles.shareText}>生成图文卡片</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={createPoster}>
          <Image source={require('../../../assets/goods-image/icon_poster.png')} style={styles.icon} />
          <Text style={styles.shareText}>生成空间海报</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default connect(
  (state: any) => state.userData
)(ShareBar)

const styles = StyleSheet.create({
  container: {
    height: pxToDp(350),
    padding: pxToDp(20)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: pxToDp(64)
  },
  title: {
    fontSize: pxToDp(28),
    color: Colors.darkBlack
  },
  content: {
    flexDirection: 'row'
  },
  item: {
    flex: 1,
    alignItems: 'center'
  },
  icon: {
    width: pxToDp(114),
    height: pxToDp(114),
    marginBottom: pxToDp(20)
  },
  shareText: {
    fontSize: pxToDp(22),
    color: Colors.lightBlack
  }
})