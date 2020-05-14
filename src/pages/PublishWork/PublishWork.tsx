import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import { apiPublishWorks } from '../../service/api'
import { setAddedGoodsList } from '../../actions/works'

import Form from './Form/Form'
import ImagePicker from './ImagePicker/ImagePicker'
import GoodsList from './GoodsList/GoodsList'
import Toast from 'react-native-tiny-toast'

function PublishWork(props: any) {
  const navigation = useNavigation()
  const route = useRoute()
  const { addedGoodsList, mediaList } = props
  const { type: pageType } = route.params
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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
    const filesUrl = mediaList.splice(1, mediaList.length - 1)

    if (!title || !content) {
      Toast.show('标题和内容不能为空', { position: 0 })
      return
    }

    let findGoodsInfoList:
      {
        goodsTitle: any
        goodsPictures: any
        goodsCurPrice: any;
        goodsOriPrice: any;
        goodsId: any
      }[] = []

    addedGoodsList.forEach((item: any, index: number) => {
      findGoodsInfoList[index] = {
        goodsTitle: addedGoodsList[index].goods_name,
        goodsPictures: addedGoodsList[index].original_img,
        goodsCurPrice: addedGoodsList[index].shop_price,
        goodsOriPrice: addedGoodsList[index].market_price,
        goodsId: addedGoodsList[index].goods_id
      }
    })

    const params = {
      content,
      filesUrl,
      findGoodsInfoList,
      title,
      worksType: pageType === 'video' ? 'VIDEO' : 'PICTURE'
    }

    apiPublishWorks(params).then(res => {
      console.log('发表作品', res)
      if (res === '请求成功') {
        Toast.showSuccess('已发布')
        props.dispatch(setAddedGoodsList([]))
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
      }
    })
  }

  return (
    <View style={styles.container}>
      <Form
        inputTitle={(title: string) => setTitle(title)}
        inputContent={(content: string) => setContent(content)}
      />
      <ImagePicker
        pageType={pageType}
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