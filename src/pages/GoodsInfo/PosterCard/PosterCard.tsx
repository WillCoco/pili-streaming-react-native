import React from 'react'
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native'
import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import CameraRoll from '@react-native-community/cameraroll'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'
import Toast from 'react-native-tiny-toast'
import { Portal, Toast as AntToast } from '@ant-design/react-native'

interface Props {
  show: boolean
  type: number
  path: string
  hidePosterCard(): void
}

function PosterCard(props: Props) {
  const { show, type, path } = props

  const saveImg = () => {
    const loading = AntToast.loading('保存中')
    const base64Code = path.split("data:image/png;base64,")

    download(base64Code[1], () => {
      Portal.remove(loading)
      Toast.show('已保存至相册', { position: 0 })
      props.hidePosterCard()
    }, () => {
      Portal.remove(loading)
      console.log('error')
    })
  }

  const download = (base64Img: string, success: any, fail: any) => {
    const dirs =
      Platform.OS === 'ios'
        ? RNFS.LibraryDirectoryPath
        : RNFS.ExternalDirectoryPath; // 外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${((Math.random() * 10000000) | 0)}.png`;
    const imageData = base64Img;

    RNFetchBlob.fs.writeFile(downloadDest, imageData, 'base64').then(async () => {
      try {
        if (Platform.OS !== 'ios') {
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
              Toast.show('保存失败', { position: 0 })
            })
          }
        } else {
          CameraRoll.saveToCameraRoll(downloadDest).then((res) => {
            console.log('saveSuccess', res)
            success && success()
          }).catch((err) => {
            Toast.show('保存失败', { position: 0 })
          })
        }
      } catch (err) {
        console.log('catch', err)
        fail && fail()
      }
    });
  }

  return (
    <Modal
      visible={show}
      transparent={true}
      animationType='fade'
    >
      <View style={styles.container}>
        {
          type === 1
            ? <View>
              <Image source={{ uri: path }} style={styles.poster1Img} />
              <TouchableOpacity style={styles.saveBtn} onPress={saveImg}>
                <Text style={styles.saveText}>保存图片</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeIcon} onPress={props.hidePosterCard}>
                <Ionicons
                  size={30}
                  name='ios-close-circle'
                  color={Colors.whiteColor}
                />
              </TouchableOpacity>
            </View>
            : type === 2
              ? <View style={styles.poster2}>
                <Image source={{ uri: path }} style={styles.poster2Img} />
                <TouchableOpacity style={[styles.saveBtn, { width: pxToDp(500) }]} onPress={saveImg}>
                  <Text style={styles.saveText}>保存图片</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeIcon} onPress={props.hidePosterCard}>
                  <Ionicons
                    size={30}
                    name='ios-close-circle'
                    color={Colors.whiteColor}
                  />
                </TouchableOpacity>
              </View>
              : <View style={styles.poster3}>
                <Image source={{ uri: path }} style={styles.poster3Img} />
                <TouchableOpacity style={[styles.saveBtn, { width: pxToDp(500) }]} onPress={saveImg}>
                  <Text style={styles.saveText}>保存图片</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeIcon} onPress={props.hidePosterCard}>
                  <Ionicons
                    size={30}
                    name='ios-close-circle'
                    color={Colors.whiteColor}
                  />
                </TouchableOpacity>
              </View>
        }
      </View>
    </Modal>
  )
}

export default connect(
  (state: any) => state
)(PosterCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  poster1Img: {
    width: pxToDp(550),
    height: pxToDp(978),
    borderRadius: pxToDp(20)
  },
  saveBtn: {
    width: pxToDp(550),
    height: pxToDp(90),
    backgroundColor: Colors.basicColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToDp(30)
  },
  saveText: {
    fontSize: pxToDp(32),
    color: Colors.whiteColor
  },
  closeIcon: {
    position: 'absolute',
    top: -10,
    right: -10
  },
  poster2: {
    width: pxToDp(550),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    paddingTop: pxToDp(60),
    paddingBottom: pxToDp(30),
    borderRadius: pxToDp(20)
  },
  poster2Img: {
    width: pxToDp(360),
    height: pxToDp(360)
  },
  poster3: {
    padding: pxToDp(25),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    borderRadius: pxToDp(20)
  },
  poster3Img: {
    width: pxToDp(516),
    height: pxToDp(796)
  }
})