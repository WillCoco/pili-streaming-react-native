import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, RefreshControl, ScrollView, ImageBackground, Image, PixelRatio } from 'react-native'
import { connect } from 'react-redux'
import { setSearchKey, setSwiperList, setActivityList, setSelectedGoodsInfo, setRecommendGoodsList } from '../../actions/home'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import HomeSwiper from './HomeSwiper'
import HomeNav from './HomeNav'
import GoodsCard from '../../components/GoodsCard/GoodsCard'
import GoodsCardRow from '../../components/GoodsCardRow/GoodsCardRow'
import CardTitle from '../../components/CardTitle/CardTitle'

import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

import { apiGetIndexData, apiGetIndexGoodsList } from '../../service/api'


function Home(props: any) {
  const [categoryList, setCategoryList] = useState([{ name: '首页' }])
  const [categoryData, setCategoryData] = useState({})
  const [loading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize] = useState(20)

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

      if (categoryList.length === 1) {
        setCategoryList([...categoryList, ...res.category])
      }

      getRecommendGoodsList()
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
   * 
   */
  const changeTab = (e: any) => {
    setCategoryData(categoryList[e.i])
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
                              <View style={[styles.brandItem, !!((index + 1) % 4) && {marginRight: pxToDp(60)}]} key={`brand-${index}`}>
                                <Image source={{ uri: item.logo }} style={styles.brandLogo} />
                                <Text style={styles.brandName}>{item.name}</Text>
                              </View>
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
                          props.selectedGoodsInfo.goodsList && props.selectedGoodsInfo.goodsList.map((item: any, index: any) => <GoodsCard style={{ marginRight: pxToDp(20) }} key={`selected-${index}`} goodsInfo={item} />)
                        }
                      </ScrollView>
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

                    {/* <GoodsCardRow /> */}

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
  }
})

export default connect(
  (state: any) => state.homeData
)(Home)