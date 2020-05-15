import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '../../../constants/Theme'
import * as WeChat from 'react-native-wechat-lib'
import * as FileSystem from 'expo-file-system'
import { apiCreatePoster } from '../../../service/api'

export default function ShareBar(props: any) {
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
      console.log(res)
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
  const createPoster = () => {
    const params = {
      goodsId,
      userId
    }

    console.log(params)

    apiCreatePoster(params).then((res: any) => {
      console.log('生成海报', res)
    })
    // downLoad()
  }

  const downLoad = async () => {
    const callback = (downloadProgress:
      {
        totalBytesWritten: number
        totalBytesExpectedToWrite: number
      }) => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite
      setProgress(progress)
    }

    const downloadResumable = FileSystem.createDownloadResumable(
      'http://techslides.com/demos/sample-videos/small.mp4',
      FileSystem.documentDirectory + 'small.mp4',
      {},
      callback
    )

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
    } catch (e) {
      console.error(e);
    }
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