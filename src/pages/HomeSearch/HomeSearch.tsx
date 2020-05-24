import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { apiSearch, apiGetIndexGoodsList } from '../../service/api'

import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'
import checkIsBottom from '../../utils/checkIsBottom'

import EmptyContent from './EmptyContent/EmptyContent'
import LoadMore from '../../components/LoadMore/LoadMore'
import SearchBar from '../../components/SearchBar/SearchBar'
import GoodsCard from '../../components/GoodsCard/GoodsCard'

const pageSize = 20

function HomeSearch() {
  const pageNoRef = useRef(1)
  const hasMoreRef = useRef(true)

  const navgation: any = useNavigation()

  navgation.setOptions({
    headerTitle: () => <SearchBar
      hasSearchKey
      isPlaceHolder={false}
      inputSearchKey={(text: string) => setSearchKey(text)}
      toSearch={(value: string) => toSearch(value)}
    />,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })
  
  const [isEmpty, setIsEmpty] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [sortValue, setSortValue] = useState('sort')
  const [emptySearchKey, setEmptySearchKey] = useState('')
  const [goodsList, setGoodsList]: Array<any> = useState([])
  

  /**
   * 搜索
   * @param placeholderSearchKey 搜索占位符
   */
  const toSearch = (placeholderSearchKey: string) => {
    const params = {
      pageSize,
      pageNo: pageNoRef.current,
      order: sortValue,
      search_word: searchKey || placeholderSearchKey
    }

    apiSearch(params).then((res: any) => {
      console.log('首页搜索', res)
      setIsEmpty(!res.count)
      if (!res.count) {
        setEmptySearchKey(searchKey || placeholderSearchKey)
        getRecommendGoods()
        return
      }

      const totalPage = Math.ceil(res.count / pageSize)
      hasMoreRef.current = pageNoRef.current < totalPage
      setGoodsList([...goodsList, ...res.list])
    })
  }

  /**
   * 加载推荐商品
   */
  const getRecommendGoods = () => {
    const params = {
      pageNo: pageNoRef.current,
      pageSize
    }

    apiGetIndexGoodsList(params).then((res: any) => {
      console.log('推荐商品', res)
      const totalPage = Math.ceil(res.count / pageSize)
      hasMoreRef.current = pageNoRef.current < totalPage
      setGoodsList([...goodsList, ...res.list])
    })
    // .catch(err => {console.log(err, 123123123123)})
  }

  /**
   * 触底加载
   */
  const onReachBottom = (e: any) => {
    if (hasMoreRef.current && checkIsBottom(e)) {
      pageNoRef.current += 1
      toSearch(searchKey)
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={(e) => onReachBottom(e)}
    >
      {isEmpty && <EmptyContent emptyText={emptySearchKey} />}
      <View style={styles.goodsList}>
        {
          goodsList && goodsList.map((item: any, index: number) => {
            return (
              <GoodsCard
                goodsInfo={item}
                key={`goods-${index}`}
                style={{ marginBottom: pxToDp(20) }}
                tapGoodsCard={(id: number) => navgation.push('GoodsInfo', { id })}
              />
            )
          })
        }
      </View>
      {!!goodsList.length && <LoadMore hasMore={hasMoreRef.current} />}
    </ScrollView>
  )
}

export default connect(
  (state: any) => state.homeData
)(HomeSearch)

const styles = StyleSheet.create({
  container: {

  },
  goodsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: pxToDp(20),
    justifyContent: 'space-between'
  }
})