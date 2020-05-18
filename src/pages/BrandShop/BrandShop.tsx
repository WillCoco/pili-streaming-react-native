import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import Toast from 'react-native-tiny-toast'
import { connect } from 'react-redux'
import { apiBrandInfo, apiBrandGoodsList, apiAttentionBrand } from '../../service/api'

import BrandSwiper from './BrandSwiper/BrandSwiper'
import GoodsCardRow from '../../components/GoodsCardRow/GoodsCardRow'

import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

function BrandShop(props: any) {
  const pageSize = 20
  const route = useRoute()
  const navigation = useNavigation()
  const { isLogin } = props
  const brandId = route.params.id
  const [pageNo, setPageNo] = useState(1)
  const [brandInfo, setBrandInfo] = useState({})
  const [goodsList, setGoodsList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  navigation.setOptions({
    headerTitle: '',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerBackTitleVisible: false,
    headerTintColor: Colors.whiteColor,
    headerTransparent: true
  })

  useEffect(() => {
    getBrandInfo()
    getGoodsList()
  }, [])

  /**
   * 获取品牌详情
   */
  const getBrandInfo = () => {
    const loading = Toast.showLoading('')

    apiBrandInfo({
      brand_id: brandId
    }).then((res: any) => {
      Toast.hide(loading)
      console.log('店铺详情', res)
      setBrandInfo(res)
      setIsLoaded(true)
    })
  }

  /**
   * 获取品牌商品列表
   */
  const getGoodsList = () => {
    apiBrandGoodsList({
      pageNo,
      pageSize,
      brand_id: brandId
    }).then(res => {
      console.log('品牌商品列表', res)
      if (res.list.length) {
        setGoodsList(res.list)
      }
    })
  }

  /**
   * 监听页面滚动
   * @param e 事件参数
   */
  const scrollPage = (e: any) => {
    const scrollY = e.nativeEvent.contentOffset.y
    if (scrollY < 128) {
      navigation.setOptions({
        headerTransparent: true
      })
    } else {
      navigation.setOptions({
        headerTransparent: false
      })
    }
  }

  const focusBrand = () => {
    if (isLogin) {
      const { is_attention } = brandInfo
      apiAttentionBrand({
        brand_id: brandId,
        type: is_attention ? 0 : 1
      }).then(res => {
        console.log('关注/取消关注店铺', res)

        brandInfo.is_attention = is_attention ? 0 : 1

        setBrandInfo(JSON.parse(JSON.stringify(brandInfo)))
      })

    } else {
      navigation.push('Login')
    }
  }

  if (!isLoaded) {
    return <></>
  }

  return (
    <ScrollView
      onScroll={(e) => scrollPage(e)}
      scrollEventThrottle={200}
      showsVerticalScrollIndicator={false}
    >
      {/* 轮播图 */}
      {
        brandInfo.banner && <BrandSwiper swiperList={brandInfo.banner} />
      }
      {/* 品牌信息 */}
      <View style={styles.brandInfo}>
        <View style={styles.brandLeftInfo}>
          <Image source={{ uri: brandInfo.logo }} style={styles.logo} />
          <View style={styles.brandDetail}>
            <Text style={styles.brandName}>{brandInfo.brand_name}</Text>
            <Text style={styles.brandFansCount}>{brandInfo.people_attention}人关注</Text>
          </View>
        </View>
        <Text
          style={[styles.focusText, brandInfo.is_attention && styles.isFoucs]}
          onPress={focusBrand}
        >{brandInfo.is_attention ? '已关注' : '关注'}</Text>
      </View>
      {/* 商品列表 */}
      <View style={styles.goodsList}>
        {
          goodsList && goodsList.map((item: any, index: number) => {
            return (
              <GoodsCardRow style={{ marginBottom: pxToDp(10) }} goodsInfo={item} key={`goods-${index}`} />
            )
          })
        }
      </View>
    </ScrollView>
  )
}

export default connect(
  (state: any) => state.userData
)(BrandShop)

const styles = StyleSheet.create({
  brandInfo: {
    backgroundColor: Colors.whiteColor,
    height: pxToDp(120),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brandLeftInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: pxToDp(80),
    height: pxToDp(80),
    borderRadius: pxToDp(40),
    marginRight: pxToDp(10)
  },
  brandDetail: {

  },
  brandName: {
    fontSize: pxToDp(30),
    color: Colors.blackColor,
    marginBottom: pxToDp(8)
  },
  brandFansCount: {
    fontSize: pxToDp(24),
    color: Colors.darkGrey
  },
  focusText: {
    width: pxToDp(120),
    height: pxToDp(40),
    lineHeight: pxToDp(40),
    borderRadius: pxToDp(20),
    textAlign: 'center',
    backgroundColor: Colors.basicColor,
    fontSize: pxToDp(26),
    color: Colors.whiteColor,
    overflow: 'hidden'
  },
  isFoucs: {
    backgroundColor: Colors.borderColor
  },
  goodsList: {
    marginTop: pxToDp(20)
  }
})