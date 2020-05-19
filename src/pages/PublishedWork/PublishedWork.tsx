import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'

import { apiGetUserWorks, apiWorksManage } from '../../service/api'
import WorkCard from './WorkCard/WorkCard'
import pxToDp from '../../utils/px2dp'
import LoadMore from '../../components/LoadMore/LoadMore'

export default function PublishedWork() {
  const navigation = useNavigation()
  const pageSize = 20
  let pageNoRef = useRef(1)
  let hasMoreRef = useRef(true)
  const [workList, setWorkList] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)

  navigation.setOptions({
    headerTitle: '我的作品',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  useEffect(() => {
    getPublishedWorks()
  }, [])

  const getPublishedWorks = () => {
    apiGetUserWorks({
      page: pageNoRef.current,
      pageSize
    }).then((res: any) => {
      console.log('我的作品', res)
      if (res && res.totalCount) {
        const totalPage = res.totalCount / pageSize
        hasMoreRef.current = pageNoRef.current < totalPage
        setWorkList(JSON.parse(JSON.stringify(res.worksInfoList)))
      }
      setIsEmpty(!res.totalCount)
    })
  }

  const workAction = (id: string, opera: number) => {
    apiWorksManage({  
      worksId: id,
      operateMode: opera
    }).then(res => {
      console.log('操作作品', res)
      if (res) {
        getPublishedWorks()
      }
    })
  }

  /**
   * 触底加载
   */
  const onBeachBottom = () => {
    if (!hasMoreRef.current) return
    pageNoRef.current += 1
    getPublishedWorks()
  }

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/img_empty_work.png')} style={styles.emptyImg}>
          <Text style={styles.emptyText}>暂无发布</Text>
        </ImageBackground>
      </View>
    )
  }

  return (
    <ScrollView
      onMomentumScrollEnd={onBeachBottom}
    >
      {
        workList && workList.map((item: any, index: number) => {
          return (
            <WorkCard
              key={`work-${index}`}
              workInfo={item}
              workAction={(id: string, opera: number) => workAction(id, opera)}
            />
          )
        })
      }
      <LoadMore hasMore={hasMoreRef.current} />
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
    marginTop: pxToDp(298),
    textAlign: 'center'
  }
})