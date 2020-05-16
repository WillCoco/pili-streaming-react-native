import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import { apiMyAttentionList } from '../../service/api'
import PagingList from '../../components/PagingList'
import AnchorCard from './AnchorCard/AnchorCard'
import Empty from '../../components/Empty'
import withPage from '../../components/HOCs/withPage'
import { useSelector } from 'react-redux'
import images from '../../assets/images'

function FocusedAnchor() {
  const navigation = useNavigation()
  const userId = useSelector(state => state?.userData?.userInfo?.userId)
  const [myAttentionList, setMyAttentionList] = useState([])

  navigation.setOptions({
    headerTitle: '关注的主播',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  /**
   * 获取关注列表
   */
  const getMyAttentionList = async () => {
    let params = {
      pageNo: 1,
      pageSize: 10,
      userId
    }
    
    const result = await apiMyAttentionList(params).then(res => {
      setMyAttentionList(res?.records)
      return res?.records
    })

    return [134324, 24135]
  }

  /**
   * 刷新
   */
  const onRefresh = async () => {
    const result = await getMyAttentionList()
    return Promise.resolve({result})
  }

  /**
   * 更多
   */
  const onEndReached = () => {
    
  }

  return (
    <View style={styles.container}>
      <PagingList
        // data={myAttentionList}
        // setData={setMyAttentionList}
        size={10}
        // initListData={warehouseGoods}
        renderItem={({item, index}: any) => {
          return (
            <AnchorCard key={`anchor-${index}`} />
          )
        }}
        empty={
          <Empty 
            img={images.emptyAttention}
            text='暂无关注的主播'
            textStyle={{width: '70%', textAlign: 'center'}}
          />
        }
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        keyExtractor={(item, index) => 'index' + index + item}
        initialNumToRender={14}
        numColumns={1}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{flex: 1}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default withPage(FocusedAnchor)