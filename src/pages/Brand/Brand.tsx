import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import BrandCard from './BrandCard/BrandCard'

import { apiBrandList, apiGetAttention } from '../../service/api'

import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

export default function Brand(props: any) {
  const route = useRoute()
  const navgation = useNavigation()

  const pageSize = 20
  const pageType = route?.params?.type

  const [pageNo, setPageNo] = useState(1)
  const [brandList, setBrandList] = useState([])

  navgation.setOptions({
    headerTitle: pageType === 'default' ? '圈品超级品牌' : '品牌关注',
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
      result = await apiGetAttention({ pageNo, pageSize })
    }

    console.log(result, '品牌列表')

    setBrandList(result.list)
  }

  if ( pageType === 'focus' && !brandList.length) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/img_empty_brand.png')} style={styles.emptyImg}>
          <Text style={styles.emptyText}>暂无关注的店铺</Text>
        </ImageBackground>
      </View>
    )
  }

  return (
    <ScrollView>
      {
        brandList && brandList.map((item, index) => <BrandCard key={`brand-${index}`} brandInfo={item} />)
      }
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
    color: Colors.lightBlack,
    textAlign: 'center',
    marginTop: pxToDp(298)
  }
})