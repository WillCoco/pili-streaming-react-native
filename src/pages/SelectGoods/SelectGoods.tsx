import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import { apiSelectGoodsTags, apiSelectGoodsList } from '../../service/api'

import GoodsCard from './GoodsCard/GoodsCard'

import { Colors } from '../../constants/Theme'

export default function SelectGoods() {
  const pageSize = 20
  const [pageNo, setPageNo] = useState(1)
  const navigation = useNavigation()
  const [tags, setTags] = useState([])
  const [goodsList, setGoodsList] = useState([])

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
  const changeTab = (e) => {
    let { i } = e

    getGoodsList(tags[i].cat_id)
  }

  /**
   * 获取商品列表
   */
  const getGoodsList = (id: number) => {
    const params = {
      pageNo,
      pageSize,
      cat_id: id
    }

    apiSelectGoodsList(params).then(res => {
      console.log('精选好物商品', res)
      if (res.list.length) {
        setGoodsList(res.list)
      }
    })
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