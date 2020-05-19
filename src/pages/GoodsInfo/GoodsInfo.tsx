import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, Dimensions, StyleSheet, Platform, Text, ImageBackground, Image } from 'react-native'
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native'
import { connect } from 'react-redux'
// import HTML from 'react-native-render-html'
// import HTML from 'react-native-htmlview'
import Toast from 'react-native-tiny-toast'
import WebView from 'react-native-webview'

import ActionSheet from '../../components/ActionSheet/ActionSheet'
import Swiper from './Swiper/Swiper'
import GoodsCard from './GoodsCard/GoodsCard'
import Advantage from './Advantage/Advantage'
import BrandCard from './BrandCard/BrandCard'
import ActivityBar from './ActivityBar/ActivityBar'
import FooterBar from './FooterBar/FooterBar'
import GoodsSku from './GoodsSku/GoodsSku'
import Coupon from './Coupon/Coupon'
import ShareBar from './ShareBar/ShareBar'

import { apiGoodInfo, apiGetUnclaimedCoupons, apiAddCart, apiGoodsIsLike } from '../../service/api'
import { Colors } from '../../constants/Theme'
import { strDiscode } from '../../utils/discodeRichText'
import pxToDp from '../../utils/px2dp'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NetWorkErr from '../../components/NetWorkErr/NetWorkErr'

let timer: any

// const BaseScript = `(function () {
//                       var height = null;
//                       function changeHeight() {
//                         console.log('11111')
//                         if (document.body.scrollHeight != height) {
//                           height = document.body.scrollHeight;
//                           if (window.postMessage) {
//                             window.postMessage(JSON.stringify({
//                               type: 'setHeight',
//                               height: height,
//                             }))
//                           }
//                         }
//                       }
//                       setTimeout(changeHeight, 300);
//                   } ())`

const BaseScript = `
console.log(11)
`

function GoodsInfo(props: any) {
  const route = useRoute()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const { isLogin } = props
  const { id: goodsId, shareUserId } = route.params
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const [swiperList, setSwiperList] = useState([])
  const [goodsInfo, setGoodsInfo]: any = useState({})
  const [goodsType, setGoodsType] = useState('')
  const [goodsContent, setGoodsContent] = useState('')
  const [goodsSku, setGoodsSku] = useState([])  // 规格列表
  const [curSku, setCurSku] = useState('')  // 当前选中的规格
  const [curSkuInfo, setCurSkuInfo]: any = useState({})  // 当前选中规格的详细信息
  const [showGoodsSku, setShowGoodsSku] = useState(false)
  const [showCoupon, setShowCoupon] = useState(false)
  const [showShareBar, setShowShareBar] = useState(false)
  const [buttonType, setButtonType] = useState('')  // 商品规格操作面板购买按钮文字
  const [soldOut, setSoldOut] = useState(false)
  let [goodsNum, setGoodsNum] = useState(1)
  const [couponList, setCouponList] = useState([])
  const [isErr, setIsErr] = useState(false)
  const [webViewHeight, setWebViewHeight] = useState(0)
  const [countDownInfo, setCountDownInfo] = useState({
    hours: 0,
    min: 0,
    sec: 0
  })
  const goodsInfoRef: any = useRef()

  navigation.setOptions({
    headerTitle: '',
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
    getGoodsInfo()
  }, [])

  useEffect(() => {
    if (!isFocused) clearInterval(timer)
  }, [isFocused])

  /**
   * 加载商品详情
   */
  const getGoodsInfo = () => {
    let loading = Toast.showLoading('')

    apiGoodInfo({
      goods_id: goodsId
    }).then((res: any) => {
      console.log('商品详情', res)
      Toast.hide(loading)
      if (!res) {
        setSoldOut(true)
        setIsLoadingComplete(false)
        return
      }

      goodsInfoRef.current = res
      setGoodsInfo(goodsInfoRef.current)
      setSwiperList(res.goods_images_list)
      // setGoodsContent(strDiscode(res.goods_content))

      let content = strDiscode(res.goods_content).replace(/\<img/gi, '<img style="width: 100%; height: auto"')
      setGoodsContent(content)


      if (res.is_sale || res.is_snap_up) {
        setGoodsType(res.is_sale ? 'sale' : 'seckill')

        if (res.is_snap_up) {
          const curHour = new Date().getHours()
          let seckillCountdown: number

          if (curHour >= 20) {  // 当天 0 点之前
            seckillCountdown = new Date().setHours(23, 59, 59, 999) + 1 - new Date().getTime()
          } else if (curHour >= 0 && curHour < 10) {  // 当天 0 点到 10 点之间
            seckillCountdown = new Date().setHours(10, 0, 0, 0) - new Date().getTime()
          } else {
            seckillCountdown = new Date().setHours(20, 0, 0, 0) - new Date().getTime()
          }

          timer = setInterval(() => {
            seckillCountdown -= 1000
            countDown(seckillCountdown)
          }, 1000)
        }
      }

      initGoodsSku(res.sku)  // 初始化商品规格信息

      setIsLoadingComplete(true)
      setSoldOut(false)

      if (isLogin) getGoodsCoupon(res.goods_id)
    }).catch((err: any) => {
      setIsErr(true)
    })
  }

  /**
   * 倒计时
   */
  const countDown = (seckillCountdown: number) => {
    let diff = seckillCountdown / 1000

    if (diff <= 0) {
      return false
    }

    const time = {
      hours: 0,
      min: 0,
      sec: 0
    }

    if (diff >= 3600) {
      time.hours = Math.floor(diff / 3600)
      diff -= time.hours * 3600
    }
    if (diff >= 60) {
      time.min = Math.floor(diff / 60)
      diff -= time.min * 60
    }

    time.sec = diff

    setCountDownInfo(time)
  }

  /**
   * 加载优惠券
   */
  const getGoodsCoupon = (id: number) => {
    apiGetUnclaimedCoupons({ goodsId: id }).then((res: any) => {
      console.log('加载优惠券', res)
      setCouponList(JSON.parse(JSON.stringify(res)))
    }).catch((err: any) => {
      if (err.code === '203' || err.code === '204') {
        navigation.push('Login')
        return
      }
      setIsErr(true)
    })
  }

  /**
   * 初始化商品规格
   */
  const initGoodsSku = (sku: Array<any>) => {
    let curSkuList: any[] = []

    sku.forEach(item => {
      item.options = []

      item.list.forEach((_item: any, _index: number) => {
        item.options.push({
          text: _item,
          checked: _index ? false : true
        })
      })

      curSkuList.push(item.options[0].text)
    })

    setCurSku(curSkuList.join('_'))
    setGoodsSku(sku)

    setCurrentSkuInfo(curSkuList.join('_'))
  }

  /**
   * 选择规格
   */
  const changeSku = (key: string, index: number) => {
    let currentSku: any[] = []

    goodsSku.forEach((item: { key: string, options: any }) => {
      if (item.key === key) {
        item.options.forEach((_item: { checked: boolean }) => {
          _item.checked = false
        })

        item.options[index].checked = true
      }

      item.options.forEach((_item: { checked: boolean, text: string }) => {
        if (_item.checked) {
          currentSku.push(_item.text)
        }
      })
    })

    setCurSku(currentSku.join('_'))
    setGoodsSku(JSON.parse(JSON.stringify(goodsSku)))
    setCurrentSkuInfo(currentSku.join('_'))
  }

  /**
   * 获取当前选中商品规格的详细信息
   */
  const setCurrentSkuInfo = (curSku: string) => {
    let { sku_info } = goodsInfoRef.current

    let curSkuInfo = sku_info.filter((item: { keywords: string }) => item.keywords === curSku)

    setCurSkuInfo(curSkuInfo[0])
  }

  /**
   * 显示商品规格操作面板
   */
  const showGoodsSkuActionSheet = (type: string) => {
    setShowGoodsSku(true)
    setButtonType(type)
  }

  /**
   * 显示优惠券操作面板
   */
  const showCouponActionSheet = () => {
    if (isLogin) {
      if (couponList.length) {
        setShowCoupon(true)
      } else {
        Toast.show('当前无可用优惠券', {
          position: 0
        })
      }
    } else {
      navigation.push('Login')
    }
  }

  /**
   * 减少商品
   */
  const minusCount = () => {
    if (goodsNum === 1) return
    setGoodsNum(--goodsNum)
  }

  /**
   * 增加商品
   */
  const addCount = () => {
    if (goodsNum === curSkuInfo.goods_count) return
    setGoodsNum(++goodsNum)
  }

  /**
   * 商品规格面板  点击 加入购物车 or 立即购买
   */
  const nextAction = () => {
    if (!isLogin) {
      setShowGoodsSku(false)
      navigation.push('Login')
      return
    }

    if (buttonType === 'add') {
      addToCart()
    } else {
      createOrder()
    }
    setShowGoodsSku(false)
  }

  /**
   * 加入购物车
   */
  const addToCart = () => {
    const params = {
      goods_id: curSkuInfo.goods_id,
      goods_num: goodsNum,
      sku_id: curSkuInfo.id
    }

    apiAddCart(params).then((res: any) => {
      console.log('加入购物车', res)

      if (res === '添加成功') {
        Toast.showSuccess('已加入购物车')
      }
    })
  }

  /**
   * 预生成订单
   */
  const createOrder = () => {
    let tempOrderList = [{
      shop_info: {
        shop_name: goodsInfo.shop_name,
        shop_logo: goodsInfo.shop_logo,
        is_selected: 1,
        shop_id: goodsInfo.shop_id
      },
      selectedGoods: [{
        sku_id: curSkuInfo.id,
        goods_name: goodsInfo.goods_name,
        original_img: curSkuInfo.img_url,
        spec_key_name: curSkuInfo.keywords,
        market_price: curSkuInfo.market_price,
        shop_price: curSkuInfo.shop_price,
        selected: 1,
        goods_num: goodsNum,
        goods_id: curSkuInfo.goods_id
      }]
    }]

    navigation.push('CreateOrder', { tempOrderList, shareUserId })
  }

  /**
   * 收藏/取消收藏
   */
  const toggleStarGoods = () => {
    if (!isLogin) {
      navigation.push('Login')
      return
    }

    const { goods_id, is_collect } = goodsInfo

    apiGoodsIsLike({
      goods_id,
      type: is_collect ? 0 : 1
    }).then((res: any) => {
      console.log('收藏/取消收藏', res)

      goodsInfo.is_collect = is_collect ? 0 : 1

      setGoodsInfo(JSON.parse(JSON.stringify(goodsInfo)))
    })
  }

  /**
   * 分享
   */
  const toShare = () => {
    if (!isLogin) {
      navigation.push('Login')
      return
    }

    setShowShareBar(true)
  }

  if (isErr) {
    return <NetWorkErr />
  }

  if (soldOut) {
    return (
      <View style={styles.soldOutContainer}>
        <ImageBackground source={require('../../assets/images/img_empty-like.png')} style={styles.soldOutBgi}>
          <Text style={styles.soldOutText}>该商品已下架</Text>
        </ImageBackground>
        <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack()}>
          <Text style={{
            fontSize: pxToDp(28),
            color: Colors.whiteColor
          }}>返回继续浏览</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (isLoadingComplete) {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          {/* 轮播图 */}
          <Swiper swiperList={swiperList} />
          {
            !!goodsType && <ActivityBar type={goodsType} goodsInfo={goodsInfo} countDownInfo={countDownInfo} />
          }
          {/* 商品信息 */}
          <GoodsCard
            goodsInfo={goodsInfo}
            showCouponActionSheet={showCouponActionSheet}
            showShareBar={toShare}
          />
          {/* 平台优势 */}
          <Advantage />
          {/* 店铺信息 */}
          <BrandCard goodsInfo={goodsInfo} />
          {/* 商品详情 */}
          <View style={{ marginTop: pxToDp(10) }}>
            {/* <HTML
              html={goodsContent}
              imagesMaxWidth={Dimensions.get('window').width}
            /> */}
            {/* <HTML
              value={goodsContent}
              renderNode={(node, index, siblings, parent, defaultRenderer) => {
                if (node.name == 'img') {
                  const a = node.attribs;
                  return (<Image resizeMode='cover' style={{ flex: 1, width: Dimensions.get('window').width }} source={{ uri: a.src }} />)
                }
              }}
            /> */}
            <WebView
              injectedJavaScript={`console.log(111)`}
              style={{
                width: Dimensions.get('window').width,
                height: 1000
              }}
              source={{ html: goodsContent }}
              decelerationRate='normal'
              onMessage={(event) => {
                console.log(event, '====')
                try {
                  const action = JSON.parse(event.nativeEvent.data)
                  if (action.type === 'setHeight' && action.height > 0) {
                    setWebViewHeight(action.height)
                  }
                } catch (error) {
                  // pass
                  console.log(error)
                }
              }}
            />

          </View>
        </ScrollView>
        {/* 底部操作栏 */}
        <FooterBar
          goodsInfo={goodsInfo}
          showGoodsSkuActionSheet={(type: string) => showGoodsSkuActionSheet(type)}
          toggleStarGoods={toggleStarGoods}
          shareUserId={shareUserId}
        />
        {/* 商品属性弹窗 */}
        <ActionSheet isShow={showGoodsSku}>
          <GoodsSku
            goodsNum={goodsNum}
            sku={goodsSku}
            curSku={curSku}
            curSkuInfo={curSkuInfo}
            buttonType={buttonType}
            changeSku={(key: string, index: number) => changeSku(key, index)}
            minusCount={minusCount}
            addCount={addCount}
            nextAction={nextAction}
            hideGoodsSkuActionSheet={() => setShowGoodsSku(false)}
          />
        </ActionSheet>

        {/* 优惠券弹窗 */}
        <ActionSheet isShow={showCoupon}>
          <Coupon
            couponList={couponList}
            goodsInfo={goodsInfo}
            hideCouponActionSheet={() => setShowCoupon(false)}
            getGoodsCoupon={() => getGoodsCoupon(goodsInfo.goods_id)}
          />
        </ActionSheet>

        {/* 分享弹窗 */}
        <ActionSheet isShow={showShareBar}>
          <ShareBar
            hideShareBar={() => setShowShareBar(false)}
            userId={props.userInfo.userId}
            goodsId={goodsId}
          />
        </ActionSheet>
      </View>
    )
  }

  return (
    <></>
  )
}

export default connect(
  (state: any) => state.userData
)(GoodsInfo)

const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    height: deviceHeight - pxToDp(Platform.OS === 'ios' ? 128 : 100)
  },
  soldOutContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  soldOutBgi: {
    width: pxToDp(380),
    height: pxToDp(360),
    paddingTop: pxToDp(280)
  },
  soldOutText: {
    textAlign: 'center'
  },
  goBackBtn: {
    width: pxToDp(300),
    height: pxToDp(80),
    backgroundColor: Colors.basicColor,
    borderRadius: pxToDp(40),
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareBar: {
    height: pxToDp(350)
  }
})