import React, { useEffect, useState, useRef } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import { apiSelectGoodsTags, apiSelectGoodsList } from '../../service/api'

import GoodsCard from './GoodsCard/GoodsCard'

import { Colors } from '../../constants/Theme'
import checkIsBottom from '../../utils/checkIsBottom'

export default function SelectGoods() {
  const pageSize = 20
  let pageNoRef = useRef(1)
  let hasMoreRef = useRef(true)
  let indexRef = useRef(0)
  let goodsListRef = useRef([])
  const navigation = useNavigation()
  const [tags, setTags] = useState([])
  const [goodsList, setGoodsList] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  navigation.setOptions({
    headerTitle: '精选好物',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  useEffect(() => {
    apiSelectGoodsTags().then((res: any) => {
      console.log('精选好物标签', res)
      setTags(res.category)
      getGoodsList(res.category[0].cat_id)
    })
  }, [])

  /**
   * 切换 TAB
   */
  const changeTab = (e: any) => {
    const { i } = e
    if (e.i === indexRef.current) return
    goodsListRef.current = []
    indexRef.current = i
    pageNoRef.current = 1
    setGoodsList(goodsListRef.current)
    getGoodsList(tags[i].cat_id)
  }

  /**
   * 获取商品列表
   */
  const getGoodsList = (id: number) => {
    const params = {
      pageNo: pageNoRef.current,
      pageSize,
      cat_id: id
    }

    apiSelectGoodsList(params).then((res: any) => {
      console.log('精选好物商品', res)
      if (res.count) {
        const totalPage = Math.ceil(res.count / pageSize)
        hasMoreRef.current = pageNoRef.current < totalPage
        goodsListRef.current = [...goodsListRef.current, ...res.list]
        setGoodsList(goodsListRef.current)
      }
    })
  }

  /**
   * 下拉触底
   */
  const onReachBottom = (e: any) => {
    if (hasMoreRef.current && checkIsBottom(e)) {
      pageNoRef.current += 1
      getGoodsList(tags[indexRef.current].cat_id)
    }
  }

  return (
    <ScrollableTabView
      initialPage={0}
      tabBarUnderlineStyle={{ backgroundColor: Colors.basicColor }}
      tabBarActiveTextColor={Colors.darkBlack}
      tabBarInactiveTextColor={Colors.darkBlack}
      tabBarBackgroundColor={Colors.whiteColor}
      renderTabBar={() => <ScrollableTabBar />}
      onChangeTab={(e) => changeTab(e)}
    >
      {
        tags && tags.map((item: any, index: number) => {
          return (
            <ScrollView
              tabLabel={item.name}
              key={`tag-${index}`}
              onMomentumScrollEnd={(e) => onReachBottom(e)}
            >
              {
                goodsList && goodsList.map((item: any, index: number) => {
                  return (
                    <GoodsCard key={`goods-${index}`} goodsInfo={item} />
                  )
                })
              }
            </ScrollView>
          )
        })
      }
    </ScrollableTabView>
  )
}