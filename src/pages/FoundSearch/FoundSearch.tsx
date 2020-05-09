import React, { useState } from 'react'
import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import SearchBar from './SearchBar/SearchBar'
import WorkCard from '../../components/WorkCard/WorkCard'

import { Colors } from '../../constants/Theme'
import { apiSearchWork } from '../../service/api'
import Toast from 'react-native-tiny-toast'
import pxToDp from '../../utils/px2dp'
import waterFall from '../../utils/waterFall'

export default function FoundSearch(props: { searchKey: React.ReactNode }) {
  const navgation = useNavigation()

  navgation.setOptions({
    headerTitle: () => <SearchBar
      inputSearchKey={(text: string) => setSearchKey(text)}
      toSearch={toSearch}
    />,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  const [searchKey, setSearchKey] = useState('')
  const [maxHeight, setMaxHeight] = useState(0)
  const [worksList, setWorksList] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  const pageSize = 50
  let [pageNo, setPageNo] = useState(1)

  const toSearch = () => {
    console.log(searchKey)

    if (!searchKey) {
      Toast.show('搜索关键字不能为空', { position: 0 })
      return
    }

    const params = {
      page: pageNo,
      pageSize,
      searchKeyword: searchKey
    }

    apiSearchWork(params).then((res: any) => {
      console.log('发现搜索', res)
      setIsEmpty(!res.totalCount)
      if (!res.totalCount) return

      res.worksInfoList.forEach((item: any) => {
        item.imageWidth = item.worksMoreInfo.imageWidth
        item.imageHeight = item.worksMoreInfo.imageHeight
      })

      setWorksList(waterFall(res.worksInfoList).items)
      setMaxHeight(waterFall(res.worksInfoList).maxHeight)
    })
  }

  if (isEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <ImageBackground source={require('../../assets/images/emptyList.png')} style={styles.emptyImg}>
          <Text style={{ fontSize: pxToDp(24), color: Colors.darkGrey, textAlign: 'center' }}>没有找到你想要的，换个关键词试试吧</Text>
        </ImageBackground>
      </View>
    )
  }

  return (
    <ScrollView>
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
  emptyContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyImg: {
    width: pxToDp(380),
    height: pxToDp(360),
    paddingTop: pxToDp(300)
  }
})