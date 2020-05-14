import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import { upload } from '../../service/fetch'
import { UPLOAD_URL } from '../../service/api'

import Form from './Form/Form'
import ImagePicker from './ImagePicker/ImagePicker'
import GoodsList from './GoodsList/GoodsList'

function PublishWork(props: any) {
  const navigation = useNavigation()
  const route = useRoute()
  const { type: pageType } = route.params
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mediaList, setMediaList] = useState([])

  navigation.setOptions({
    headerTitle: `发布${pageType === 'video' ? '视频' : '图片'}`,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  /**
   * 发表
   */
  const publish = () => {
    const currentList = mediaList.splice(1, mediaList.length - 1)

    upload(UPLOAD_URL, currentList)
    // .then((res: any) => {
    //   console.log('上传文件', res)
    // })
  }

  return (
    <View style={styles.container}>
      <Form
        inputTitle={(title: string) => setTitle(title)}
        inputContent={(content: string) => setContent(content)}
      />
      <ImagePicker
        pageType={pageType}
        setMediaList={(list: Array<any>) => setMediaList(list)}
      />
      <GoodsList
        publish={publish}
      />
    </View>
  )
}

export default connect(
  (state: any) => state.worksData
)(PublishWork)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})