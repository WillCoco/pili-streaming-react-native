import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import SearchBar from '../../components/SearchBar/SearchBar'
import EmptyContent from './EmptyContent/EmptyContent'
import GoodsCard from '../../components/GoodsCard/GoodsCard'

import { Colors } from '../../constants/Theme'
import { apiSearch, apiGetIndexGoodsList } from '../../service/api'
import pxToDp from '../../utils/px2dp'

function HomeSearch(props: { searchKey: React.ReactNode }) {
  const navgation = useNavigation()

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

  const pageSize = 20
  const [searchKey, setSearchKey] = useState('')
  const [sortValue, setSortValue] = useState('sort')
  const [isEmpty, setIsEmpty] = useState(false)
  const [emptySearchKey, setEmptySearchKey] = useState('')
  const [goodsList, setGoodsList] = useState([])
  let [pageNo, setPageNo] = useState(1)

  /**
   * 搜索
   * @param placeholderSearchKey 搜索占位符
   */
  const toSearch = (placeholderSearchKey: string) => {
    const params = {
      pageSize,
      pageNo: 1,
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

      setGoodsList(res.list)
    })
  }

  /**
   * 加载推荐商品
   */
  const getRecommendGoods = () => {
    const params = {
      pageNo,
      pageSize
    }

    apiGetIndexGoodsList(params).then((res: any) => {
      console.log('推荐商品', res)
      setGoodsList(res.list)
    })
  }

  return (
    <ScrollView>
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