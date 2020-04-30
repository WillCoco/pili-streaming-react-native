import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import { apiGetUserFavorite } from '../../service/api'
import pxToDp from '../../utils/px2dp'

export default function LikeContent() {
  const navigation = useNavigation()
  const pageSize = 20
  const [pageNo, setPageNo] = useState(1)
  const [goodsList, setGoodsList] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)

  navigation.setOptions({
    headerTitle: '喜欢的内容',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  useEffect(() => {
    getGooodsList()
  }, [])

  const getGooodsList = () => {
    apiGetUserFavorite({ pageNo, pageSize }).then(res => {
      console.log('我喜欢的内容', res)
      if (res) {
        setIsEmpty(false)
      } else {
        setIsEmpty(true)
      }
    })
  }

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/img_empty-like.png')} style={styles.emptyImg}>
          <Text style={styles.emptyText}>暂无喜欢的内容</Text>
        </ImageBackground>
      </View>
    )
  }

  return (
    <View>
      <Text>

      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyImg: {
    width: pxToDp(380),
    height: pxToDp(360)
  },
  emptyText: {
    fontSize: pxToDp(28),
    color: Colors.darkGrey,
    textAlign: 'center',
    marginTop: pxToDp(298)
  }
})