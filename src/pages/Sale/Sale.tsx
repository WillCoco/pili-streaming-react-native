import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Toast from 'react-native-tiny-toast'

import { apiSaleList, apiSeckillList } from '../../service/api'

import Header from './Header/Header'
import GoodsList from './GoodsList/GoodsList'

import { Colors } from '../../constants/Theme'
import checkIsBottom from '../../utils/checkIsBottom'
import LoadMore from '../../components/LoadMore/LoadMore'

export default function Sale() {
  const navigation = useNavigation()
  const route = useRoute()
  const pageSize = 20
  let pageNoRef = useRef(1)
  let hasMoreRef = useRef(true)
  const [headerGoodsList, setHeaderGoodsList] = useState([])
  const [goodsList, setGoodsList] = useState([])
  const [isReady, setIsReady] = useState(false)
  const [timeList, setTimeList] = useState([
    { time: '10:00', ongoing: false, state: '' },
    { time: '14:00', ongoing: false, state: '' },
    { time: '20:00', ongoing: false, state: '' }
  ])

  navigation.setOptions({
    headerTitle: route.params.type === 'sale' ? '特卖专区' : '限时秒杀',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false,
    headerTransparent: true
  })

  useEffect(() => {
    getGoodsList()
  }, [])

  /**
   * 获取商品列表
   */
  const getGoodsList = () => {
    const { type } = route.params

    if (type === 'seckill') {
      setSeckillQuantum()
      return
    }

    let loading = Toast.showLoading('')

    apiSaleList({
      pageNo: pageNoRef.current,
      pageSize
    }).then((res: any) => {
      console.log(res, '特卖专区')
      Toast.hide(loading)

      if (!res.count) return

      const totalPage = Math.ceil(res.count / pageSize)

      hasMoreRef.current = pageNoRef.current < totalPage

      if (pageNoRef.current === 1) {
        setHeaderGoodsList(res.list.slice(0, 2))

        if (res.count > 2) {
          setGoodsList(res.list.slice(2))
        }
      } else {
        setGoodsList([...goodsList, ...res, list])
      }
    }).catch(err => {
      console.log(err, '===')
    })
  }

  /**
   * 设置秒杀时间段
   */
  const setSeckillQuantum = async () => {
    const curHours = new Date().getHours()
    let loading = Toast.showLoading('')

    let timeQuantum: string

    if (curHours >= 10 && curHours < 14) {
      timeQuantum = await '10:00'

      setTimeList([
        { time: '10:00', ongoing: true, state: '正在疯抢' },
        { time: '14:00', ongoing: false, state: '即将开始' },
        { time: '20:00', ongoing: false, state: '即将开始' }
      ])
    } else if (curHours >= 14 && curHours <= 20) {
      timeQuantum = await '14:00'

      setTimeList([
        { time: '10:00', ongoing: false, state: '已结束' },
        { time: '14:00', ongoing: true, state: '正在疯抢' },
        { time: '20:00', ongoing: false, state: '即将开始' }
      ])
    } else {
      timeQuantum = await '20:00'

      setTimeList([
        { time: '10:00', ongoing: false, state: '已结束' },
        { time: '14:00', ongoing: false, state: '已结束' },
        { time: '20:00', ongoing: true, state: '正在疯抢' }
      ])
    }

    apiSeckillList({
      pageNo: pageNoRef.current,
      pageSize,
      time_quantum: timeQuantum
    }).then((res: any) => {
      console.log(res, '限时秒杀')
      Toast.hide(loading)

      if (!res.count) return

      const totalPage = Math.ceil(res.count / pageSize)

      hasMoreRef.current = pageNoRef.current < totalPage

      if (pageNoRef.current === 1) {
        setHeaderGoodsList(res.list.slice(0, 2))

        if (res.count > 2) {
          setGoodsList(res.list.slice(2))
        }
      } else {
        setGoodsList([...goodsList, ...res, list])
      }
    })
  }

  /**
   * 监听页面滚动
   * @param e 事件参数
   */
  const scrollPage = (e: any) => {
    // const scrollY = e.nativeEvent.contentOffset.y
    // if (scrollY < 128) {
    //   navigation.setOptions({
    //     headerTransparent: true
    //   })
    // } else {
    //   navigation.setOptions({
    //     headerTransparent: false
    //   })
    // }
  }

  /**
   * 切换时间
   * @param index 时间段索引
   */
  const changeTimeQuantum = (index: number) => {
    timeList.forEach(item => {
      item.ongoing = false
      timeList[index].ongoing = true
    })

    setTimeList(JSON.parse(JSON.stringify(timeList)))
    setHeaderGoodsList([])
    setGoodsList([])
    pageNoRef.current = 1

    const curTime = timeList.filter(item => item.ongoing)

    let timeQuantum = curTime[0].time

    apiSeckillList({
      pageNo: pageNoRef.current,
      pageSize,
      time_quantum: timeQuantum
    }).then((res: any) => {
      console.log(res, '限时秒杀')
      if (res.list.length) {
        setHeaderGoodsList(res.list.slice(0, 2))

        if (res.list.length > 2) {
          setGoodsList(res.list.slice(2))
        }
      }
    })
  }

  /**
   * 触底加载
   */
  const onReachBottom = (e: any) => {
    if (hasMoreRef.current && checkIsBottom(e)) {
      pageNoRef.current += 1
      getGoodsList()
    }
  }


  return (
    <ScrollView
      style={styles.container}
      onScroll={(e) => scrollPage(e)}
      scrollEventThrottle={200}
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={(e) => onReachBottom(e)}
    >
      <Header
        goodsList={headerGoodsList}
        type={route.params.type}
        timeList={timeList}
        changeTimeQuantum={(index) => changeTimeQuantum(index)}
      />

      <GoodsList goodsList={goodsList} type={route.params.type} />
      <LoadMore hasMore={hasMoreRef.current} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})