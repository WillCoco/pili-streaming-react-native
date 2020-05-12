import React, { useState } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-tiny-toast'

export default function ImgPicker(props: any) {
  const { pageType } = props

  const [imageList, setImageList] = useState([
    { uri: require('../../../assets/order-image/add.png') }
  ])

  const chooseImage = async (index: number) => {
    if (index) return

    if (pageType === 'video' && imageList.length === 2) {
      Toast.show('只能上传一个视频', { position: 0 })
      return
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: pageType === 'video'
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      })

      if (result.cancelled) return

      setImageList([...imageList, ...[result]])

      props.setMediaList([...imageList, ...[result]])
    } catch (error) {
      console.log(error)
    }
  }

  const delImage = (index: number) => {
    imageList.splice(index, 1)
    setImageList(JSON.parse(JSON.stringify(imageList)))
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePicker}>
        {
          imageList.map((item: any, index: number) => {
            return (
              <View key={`image-${index}`}>
                <TouchableOpacity onPress={() => chooseImage(index)} key={`imag-${index}`}>
                  <ImageBackground
                    style={styles.img}
                    source={index ? { uri: item.uri } : item.uri}
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