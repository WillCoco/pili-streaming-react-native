import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import { apiGetEnshrine } from '../../service/api'
import GoodsCard from '../../components/GoodsCardRow/GoodsCardRow'
import pxToDp from '../../utils/px2dp'

export default function CollectGoods() {
  const navigation = useNavigation()
  const pageSize = 20
  const [pageNo, setPageNo] = useState(1)
  const [goodsList, setGoodsList] = useState([])

  navigation.setOptions({
    headerTitle: '商品收藏',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  useEffect(() => {
    getMyCollectGoods()
  }, [])

  const getMyCollectGoods = () => {
    apiGetEnshrine({ pageNo, pageSize }).then(res => {
      console.log('我的收藏', res)
      setGoodsList(res.list)
    })
  }

  if (goodsList.length) {
    return (
      <View>
        {
          goodsList.map((item: any, index: number) => {
            return (
              <GoodsCard
                goodsInfo={item}
                key={`goods-${index}`}
                style={index && { marginTop: pxToDp(10) }}
              />
            )
          })
        }
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/img_nocollect.png')} style={styles.emptyImg}>
          <Text style={styles.emptyText}>暂无收藏</Text>
        </ImageBackground>
      </View>
    )
  }

  
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyImg: {
    width: pxToDp(380),
    height: pxToDp(360),
  },
  emptyText: {
    fontSize: pxToDp(28),
    color: Colors.lightBlack,
    textAlign: 'center',
    marginTop: pxToDp(298)
  }
})