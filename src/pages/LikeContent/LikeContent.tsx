import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import { apiGetUserFavorite } from '../../service/api'
import pxToDp from '../../utils/px2dp'
import waterFall from '../../utils/waterFall'
import WorkCard from '../../components/WorkCard/WorkCard'

export default function LikeContent() {
  const navigation = useNavigation()
  const pageSize = 20
  let pageNoRef = useRef(1)
  let hasMoreRef = useRef(true)
  const [worksList, setWorksList] = useState([])
  const [maxHeight, setMaxHeight] = useState(0)
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
    getWorksList()
  }, [])

  const getWorksList = () => {
    apiGetUserFavorite({
      page: pageNoRef.current,
      pageSize
    }).then((res: any) => {
      console.log('我喜欢的内容', res)
      setIsEmpty(!res.totalCount)
      if (!res.totalCount) return

      res.worksInfoList.forEach((item: any) => {
        item.imageWidth = item.worksMoreInfo.imageWidth
        item.imageHeight = item.worksMoreInfo.imageHeight
      })

      let tempList = [...worksList, ...waterFall(res.worksInfoList).items]
      let maxH = waterFall(tempList).maxHeight
      
      setWorksList(tempList)
      setMaxHeight(maxH)
    })
  }

  /**
   * 触底加载
   */
  const onReachBottom = () => {
    if (!hasMoreRef.current) return
    pageNoRef.current += 1
    getWorksList()
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
    <ScrollView
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onReachBottom}
      >
        <View style={{ height: maxHeight }}>
          {
            worksList && worksList.map((item: any, index: number) => {
              return (
                <WorkCard key={`work-${index}`} workInfo={item} />
              )
            })
          }
        </View>
      </ScrollView>
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