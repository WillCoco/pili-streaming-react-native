import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'

import Form from './Form/Form'
import ImagePicker from './ImagePicker/ImagePicker'
import GoodsList from './GoodsList/GoodsList'

function PublishWork(props: any) {
  const navigation = useNavigation()
  const route = useRoute()
  const pageType = route.params.type === 'video' ? '视频' : '图片'
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  navigation.setOptions({
    headerTitle: `发布${pageType}`,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  return (
    <View style={styles.container}>
      <Form
        inputTitle={(title: string) => setTitle(title)}
        inputContent={(content: string) => setContent(content)}
      />
      <ImagePicker />
      <GoodsList />
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