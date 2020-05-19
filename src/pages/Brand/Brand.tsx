import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import Toast from 'react-native-tiny-toast'

import BrandCard from './BrandCard/BrandCard'

import { apiBrandList, apiGetAttention, apiAttentionBrand } from '../../service/api'

import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'
import checkIsBottom from '../../utils/checkIsBottom'
import LoadMore from '../../components/LoadMore/LoadMore'

export default function Brand() {
  const route = useRoute()
  const navgation = useNavigation()
  const isFocused = useIsFocused()

  const pageSize = 20
  const pageType = route?.params?.type
  let pageNoRef = useRef(1)
  let hasMoreRef = useRef(true)

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
    if (isFocused) {
      getBrandList()
    }
  }, [isFocused])

  const getBrandList = async () => {
    const loading = Toast.showLoading('')
    let result: any = {}

    const params = {
      pageNo: pageNoRef.current,
      pageSize
    }

    if (pageType === 'default') {
      result = await apiBrandList(params)
    } else {
      result = await apiGetAttention(params)
    }

    Toast.hide(loading)

    const totalPage = Math.ceil(result.count / pageSize)

    hasMoreRef.current = pageNoRef.current < totalPage

    console.log(result, '品牌列表')

    setBrandList([...brandList, ...result.list])
  }

  /**
   * 关注/取消关注
   */
  const focusBrandShop = (brandInfo: any) => {
    const { brand_id, is_focus } = brandInfo

    apiAttentionBrand({
      brand_id,
      type: is_focus ? 0 : 1
    }).then(res => {
      console.log('关注/取消关注', res)
      const params = {
        pageNo: 1,
        pageSize: pageNoRef.current * pageSize
      }

      if (pageType === 'default') {
        apiBrandList(params).then((res: any) => {
          setBrandList(JSON.parse(JSON.stringify(res.list)))
        })
      } else {
        brandList.forEach((item: any, index: number) => {
          if (item.brand_id === brand_id) {
            brandList.splice(index, 1)
          }
        })

        setBrandList(JSON.parse(JSON.stringify(brandList)))
      }
    })
  }

  /**
   * 触底加载
   */
  const onReachBottom = (e: any) => {
    if (hasMoreRef.current && checkIsBottom(e)) {
      pageNoRef.current += 1
      getBrandList()
    }
  }

  if (!brandList.length) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/img_empty_brand.png')} style={styles.emptyImg}>
          <Text style={styles.emptyText}>暂无关注的店铺</Text>
        </ImageBackground>
      </View>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={(e) => onReachBottom(e)}
    >
      {
        brandList && brandList.map((item, index) => {
          return (
            <BrandCard
              key={`brand-${index}`}
              brandInfo={item}
              focusBrandShop={(brandInfo: any) => focusBrandShop(brandInfo)}
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
    color: Colors.lightBlack,
    textAlign: 'center',
    marginTop: pxToDp(298)
  }
})