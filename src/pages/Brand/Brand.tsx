import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import BrandCard from './BrandCard/BrandCard'

import { apiBrandList } from '../../service/api'

import { Colors } from '../../constants/Theme'

export default function Brand(props: any) {
  const route = useRoute()
  const navgation = useNavigation()

  const pageSize = 20
  const pageType = route?.params?.type


  const [pageNo, setPageNo] = useState(1)
  const [brandList, setBrandList] = useState([])

  navgation.setOptions({
    headerTitle: '圈品超级品牌',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  useEffect(() => {
    getBrandList()
  }, [])

  const getBrandList = async () => {
    let result: any = {}

    if (pageType === 'default') {
      result = await apiBrandList({ pageNo, pageSize })
    } else {

    }

    console.log(result, '品牌列表')

    setBrandList(result.list)
  }

  return (
    <ScrollView style={styles.container}>
      {
        brandList.map((item, index) => <BrandCard key={`brand-${index}`} brandInfo={item} />)
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})