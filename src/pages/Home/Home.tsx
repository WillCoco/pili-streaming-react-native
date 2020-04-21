import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, RefreshControl, ScrollView, ImageBackground, Image, PixelRatio, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import { connect } from 'react-redux'
import { setSearchKey, setSwiperList, setActivityList, setSelectedGoodsInfo, setRecommendGoodsList, setSeckillList } from '../../actions/home'

import HomeSwiper from './HomeSwiper'
import HomeNav from './HomeNav'
import GoodsCard from '../../components/GoodsCard/GoodsCard'
import GoodsCardRow from '../../components/GoodsCardRow/GoodsCardRow'
import CardTitle from '../../components/CardTitle/CardTitle'
import withPage from '../../components/HOCs/withPage'

import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

import { apiGetIndexData, apiGetIndexGoodsList } from '../../service/api'


function Home(props: any) {
  const navigation = useNavigation()

  const [categoryList, setCategoryList] = useState([{ name: '首页' }])
  const [categoryData, setCategoryData] = useState({})
  const [loading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize] = useState(20)
  const [timeQuantum, setTimeQuantum] = useState('')
  const [countDownList, setCountDownList] = useState([
    { timeQuantum: '10:00', state: '' },
    { timeQuantum: '14:00', state: '' },
    { timeQuantum: '20:00', state: '' }
  ])

  useEffect(() => {
    apiGetIndexData().then((res: any) => {
      console.log('首页初始化数据', res)
      const selectedGoodsInfo = {
        subTitle: res.jxhtSubCategory.name,
        goodsList: res.jxht
      }

      props.dispatch(setSearchKey(res.hot?.goods_name))
      props.dispatch(setSwiperList(res.banner))
      props.dispatch(setActivityList(res.activity))
      props.dispatch(setSelectedGoodsInfo(selectedGoodsInfo))
      props.dispatch(setSeckillList(res.seckill))

      if (categoryList.length === 1) {
        setCategoryList([...categoryList, ...res.category])
      }

      getRecommendGoodsList()
      setCountDown()
    })
  }, [])

  const getRecommendGoodsList = () => {
    apiGetIndexGoodsList({
      pageNo,
      pageSize
    }).then((res: any) => {
      console.log('首页圈重点数据', res)
      props.dispatch(setRecommendGoodsList(res.list))
    })
  }

  /**
   * 下拉刷新
   */
  const getData = () => {
    setLoading(false)
  }

  /**
   * 前往精选话题详情
   */
  const toSelectedGoods = () => {
    console.log('前往精选话题')
  }

  /**
   * 切换 TAB
   */
  const changeTab = (e: any) => {
    setCategoryData(categoryList[e.i])
  }

  /**
   * 设置秒杀倒计时
   */
  const setCountDown = () => {
    const curHour = new Date().getHours()

    if ((curHour >= 0 && curHour < 10) || curHour >= 20) {
      setTimeQuantum('20:00')
      setCountDownList([
        { timeQuantum: '10:00', state: curHour >= 20 ? '已结束' : '即将开始' },
        { timeQuantum: '14:00', state: '已结束' },
        { timeQuantum: '20:00', state: '正在疯抢' }
      ])
    } else if (curHour >= 10 && curHour < 14) {
      setTimeQuantum('10:00')
      setCountDownList([
        { timeQuantum: '10:00', state: '正在疯抢' },
        { timeQuantum: '14:00', state: '即将开始' },
        { timeQuantum: '20:00', state: '即将开始' }
      ])
    } else {
      setTimeQuantum('14:00')
      setCountDownList([
        { timeQuantum: '10:00', state: '已结束' },
        { timeQuantum: '14:00', state: '正在疯抢' },
        { timeQuantum: '20:00', state: '即将开始' }
      ])
    }

    let seckillCountdown: number

    if (curHour >= 20) {  // 当天 0 点之前
      seckillCountdown = new Date().setHours(23, 59, 59, 999) + 1 - new Date().getTime()
    } else if (curHour >= 0 && curHour < 10) {  // 当天 0 点到 10 点之间
      seckillCountdown = new Date().setHours(10, 0, 0, 0) - new Date().getTime()
    } else {
      seckillCountdown = new Date().setHours(20, 0, 0, 0) - new Date().getTime()
    }

    console.log(seckillCountdown)
  }

  /**
   * 前往品牌店铺
   */
  const toBrandShop = (id: number) => {
    navigation.push('BrandShop', { id })
  }

  /**
   * 前往秒杀页
   */
  const toSeckillPage = () => {
    navigation.push('Sale', { type: 'seckill'} )
  }

  return (
    <ScrollableTabView
      initialPage={0}
      tabBarUnderlineStyle={{ backgroundColor: Colors.whiteColor }}
      tabBarActiveTextColor={Colors.whiteColor}
      tabBarInactiveTextColor={Colors.whiteColor}
      tabBarBackgroundColor={Colors.basicColor}
      renderTabBar={() => <ScrollableTabBar />}
      onChangeTab={(e) => changeTab(e)}
    >
      {
        categoryList.map((item, index) => {
          return (
            <ScrollView
              key={`tab-${index}`}
              tabLabel={item.name}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getData}
                />
              }
            >
              {
                index
                  ? <>
                    {/* 品牌精选 */}
                    <View style={styles.brandList}>
                      <CardTitle title='品牌精选' />
                      <View style={styles.brandsContainer}>
                        {
                          categoryData.list && categoryData.list.map((item: any, index: number) => {
                            return (
                              <TouchableWithoutFeedback key={`brand-${index}`} onPress={() => toBrandShop(item.brand_id)}>
                                <View style={[styles.brandItem, !!((index + 1) % 4) && { marginRight: pxToDp(60) }]}>
                                  <Image source={{ uri: item.logo }} style={styles.brandLogo} />
                                  <Text style={styles.brandName}>{item.name}</Text>
                                </View>
                              </TouchableWithoutFeedback>

                            )
                          })
                        }
                      </View>
                    </View>
                    {/* 圈品热卖 */}
                    <View style={styles.recommendGoodsList}>
                      <CardTitle title='圈品热卖' />
                      <View style={styles.recommendGoodsListContainer}>
                        {
                          categoryData.shopGoods && categoryData.shopGoods.map((item: any, index: any) => <GoodsCard key={`recommend-${index}`}
                            style={{ marginBottom: pxToDp(20) }} goodsInfo={item} />)
                        }
                      </View>
                    </View>
                  </>
                  : <>
                    {/* 顶部轮播图 */}
                    <ImageBackground
                      resizeMode='stretch'
                      source={require('../../assets/home-image/banner_bg.png')}
                      style={styles.swiperContainer}
                    >
                      <HomeSwiper
                        swiperList={props.swiperList}
                        swiperStyle={styles.swiper}
                      />
                    </ImageBackground>
                    {/* 导航栏 */}
                    <HomeNav />
                    {/* 活动轮播 */}
                    <View style={styles.activityContainer}>
                      <HomeSwiper
                        showDots={false}
                        swiperList={props.activityList}
                        swiperStyle={styles.activity}
                      />
                    </View>
                    {/* 精选话题 */}
                    <View style={styles.selectedGoods}>
                      <CardTitle title='精选话题' subTitle={props.selectedGoodsInfo.subTitle} nextAction={toSelectedGoods} />
                      <ScrollView style={styles.selectedGoodsList} horizontal={true}>
                        {
                          props.selectedGoodsInfo.goodsList && props.selectedGoodsInfo.goodsList.map((item: any, index: any) => <GoodsCard style={{ marginRight: pxToDp(10) }} key={`selected-${index}`} goodsInfo={item} />)
                        }
                      </ScrollView>
                    </View>
                    {/* 限时秒杀 */}
                    <View style={styles.seckill}>
                      <ImageBackground source={require('../../assets/home-image/seckill_bg.png')} style={styles.seckillHeader}>
                        <View style={styles.seckillText}>
                          <Image source={require('../../assets/home-image/seckill_text.png')} style={styles.seckillTextImg} resizeMode='contain' />
                          <View style={styles.countDown}>
                            <Text style={styles.time}>11</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.time}>22</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.time}>22</Text>
                          </View>
                        </View>
                        <View style={styles.seckillSubTitle}>
                          <Text style={styles.seckillSubTitleText} onPress={toSeckillPage}>更多</Text>
                          <Ionicons
                            size={20}
                            name='ios-arrow-forward'
                            color={Colors.whiteColor}
                          />
                        </View>
                      </ImageBackground>
                      <View style={styles.countDonwList}>
                        {
                          countDownList.map((item, index) => {
                            return (
                              <View style={styles.countDownItem} key={`time-${index}`}>
                                <Text style={[styles.countDownTime, timeQuantum === item.timeQuantum && styles.countDownActiveTime]}>{item.timeQuantum}</Text>
                                <Text style={[styles.countDownState, timeQuantum === item.timeQuantum && styles.countDownActiveState]}>{item.state}</Text>
                              </View>
                            )
                          })
                        }
                      </View>
                      <View style={styles.seckillGoodsList}>
                        {
                          props.seckillList && props.seckillList.map((item: any, index: number) => <GoodsCardRow style={index && { marginTop: pxToDp(10) }} key={`goods-${index}`} goodsInfo={item} />)
                        }
                      </View>
                    </View>
                    {/* 圈重点 */}
                    <View style={styles.recommendGoodsList}>
                      <CardTitle title='圈重点' />
                      <View style={styles.recommendGoodsListContainer}>
                        {
                          props.recommendGoodsList.map((item: any, index: any) => <GoodsCard key={`recommend-${index}`}
                            style={{ marginBottom: pxToDp(20) }} goodsInfo={item} />)
                        }
                      </View>
                    </View>
                  </>
              }
            </ScrollView>
          )
        })
      }
    </ScrollableTabView>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    height: pxToDp(80)
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.basicColor
  },
  tabsItem: {
    padding: pxToDp(10),
    color: Colors.whiteColor
  },
  swiperContainer: {
    backgroundColor: Colors.whiteColor,
    paddingTop: pxToDp(20),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20)
  },
  swiper: {
    height: pxToDp(240),
    borderRadius: pxToDp(16)
  },
  activityContainer: {
    height: pxToDp(220),
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    paddingBottom: pxToDp(20)
  },
  activity: {
    width: pxToDp(710),
    borderRadius: pxToDp(16)
  },
  selectedGoods: {
    backgroundColor: Colors.whiteColor,
    marginTop: pxToDp(20),
    padding: pxToDp(20)
  },
  selectedGoodsList: {
    marginTop: pxToDp(36),
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  recommendGoodsList: {
    marginTop: pxToDp(20),
    padding: pxToDp(20),
    backgroundColor: Colors.whiteColor
  },
  recommendGoodsListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: pxToDp(36),
    justifyContent: 'space-between'
  },
  brandList: {
    padding: pxToDp(20),
    paddingBottom: 0,
    backgroundColor: Colors.whiteColor
  },
  brandsContainer: {
    marginTop: pxToDp(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: pxToDp(40)
  },
  brandItem: {
    alignItems: 'center',
    marginBottom: pxToDp(30)
  },
  brandLogo: {
    width: pxToDp(112),
    height: pxToDp(112),
    marginBottom: pxToDp(16),
    borderRadius: pxToDp(56),
    borderWidth: 1 / PixelRatio.get(),
    borderColor: Colors.bgColor
  },
  brandName: {
    fontSize: pxToDp(28),
    color: Colors.darkBlack
  },
  seckill: {
    marginTop: pxToDp(20)
  },
  seckillHeader: {
    height: pxToDp(76),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20)
  },
  seckillText: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  seckillTextImg: {
    width: pxToDp(144),
    height: pxToDp(36),
    marginRight: pxToDp(12)
  },
  seckillSubTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  seckillSubTitleText: {
    color: Colors.whiteColor,
    fontSize: pxToDp(26),
    marginRight: pxToDp(10)
  },
  countDown: {
    flexDirection: 'row'
  },
  time: {
    height: pxToDp(36),
    lineHeight: pxToDp(36),
    backgroundColor: Colors.blackColor,
    color: Colors.whiteColor,
    width: pxToDp(40),
    textAlign: 'center'
  },
  colon: {
    marginLeft: pxToDp(5),
    marginRight: pxToDp(5)
  },
  countDonwList: {
    height: pxToDp(140),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor
  },
  countDownItem: {
    alignItems: 'center'
  },
  countDownTime: {
    fontSize: pxToDp(34),
    color: Colors.darkBlack,
    fontWeight: '600',
    marginBottom: pxToDp(10)
  },
  countDownActiveTime: {
    color: Colors.basicColor
  },
  countDownState: {
    height: pxToDp(40),
    lineHeight: pxToDp(40),
    textAlign: 'center',
    fontSize: pxToDp(26),
    borderRadius: pxToDp(20),
    overflow: 'hidden',
    paddingLeft: pxToDp(5),
    paddingRight: pxToDp(5),
    color: Colors.lightBlack
  },
  countDownActiveState: {
    backgroundColor: Colors.basicColor,
    color: Colors.whiteColor
  },
  seckillGoodsList: {

  }
})

export default connect(
  (state: any) => state.homeData
)(withPage(Home))