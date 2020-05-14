import React, { useState } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { connect } from 'react-redux'
import { Colors } from '../../../constants/Theme'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-tiny-toast'
import { apiLiveUploadFile } from '../../../service/api'
import { setMediaList } from '../../../actions/works'

function ImgPicker(props: any) {
  const { pageType, mediaList } = props

  const chooseImage = async (index: number) => {
    if (index) return

    if (pageType !== 'video' && mediaList.length === 10) {
      Toast.show('最多上传9张图片', { position: 0 })
      return
    }

    if (pageType === 'video' && mediaList.length === 2) {
      Toast.show('只能上传一个视频', { position: 0 })
      return
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: pageType === 'video'
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.5,
      })

      if (result.cancelled) return

      upLoadImage(result.uri)
    } catch (error) {
      console.log(error)
    }
  }

  const delImage = (index: number) => {
    mediaList.splice(index, 1)
    props.dispatch(setMediaList(JSON.parse(JSON.stringify(mediaList))))
  }

  const upLoadImage = (imgUri: string) => {
    apiLiveUploadFile({
      fileType: pageType === 'video' ? 'VIDEO' : 'PICTURE',
      size: pageType === 'video' ? '20' : '2',
      unit: 'M',
      file: getImageInfo(imgUri),
    }).then((res: any) => {
      console.log(res)
      if (res.code === 200) {
        props.dispatch(setMediaList([...mediaList, ...[res.data]]))
      } else {
        Toast.show(res.data)
      }
    })
  }

  const getImageInfo = (uri: string) => {
    const nameArr = uri.split('/');
    const name = nameArr[nameArr.length - 1];
    const typeArr = name.split('.');
    const type = `image/${typeArr[typeArr.length - 1]}`;

    return {
      uri,
      name,
      type
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePicker}>
        {
          mediaList.map((item: any, index: number) => {
            return (
              <View key={`image-${index}`}>
                <TouchableOpacity onPress={() => chooseImage(index)} key={`imag-${index}`}>
                  <ImageBackground
                    style={styles.img}
                    source={index ? { uri: item } : item.uri}
                  />
                </TouchableOpacity>
                {
                  !!index
                  && <TouchableOpacity onPress={() => delImage(index)} style={styles.closeIcon}>
                    <Ionicons
                      size={30}
                      name='ios-close-circle'
                      color={Colors.basicColor}
                    />
                  </TouchableOpacity>
                }
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default connect(
  (state: any) => state.worksData
)(
  ImgPicker
)

const styles = StyleSheet.create({
  container: {
    padding: pxToDp(20),
    backgroundColor: Colors.whiteColor,
    paddingBottom: 0
  },
  imagePicker: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  img: {
    width: pxToDp(156),
    height: pxToDp(156),
    borderRadius: pxToDp(10),
    marginRight: pxToDp(20),
    marginBottom: pxToDp(20),
    overflow: 'hidden'
  },
  closeIcon: {
    position: 'absolute',
    top: pxToDp(-15),
    right: pxToDp(0)
  }
})