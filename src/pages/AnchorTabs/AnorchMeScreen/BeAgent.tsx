/**
 * 成为经纪人
 */

import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Clipboard,
  TouchableOpacity
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import images from '../../../assets/images'
import NavBar from '../../../components/NavBar'
import { vw, vh } from '../../../utils/metric'
import { Colors } from '../../../constants/Theme'
import { AntDesign } from '@expo/vector-icons'
import { pad } from '../../../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { T4, PrimaryText, SmallText, TinyText} from 'react-native-normalization-text'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import Toast from 'react-native-tiny-toast'
import ButtonOutLine from '../../../components/Buttons/ButtonOutLine'
import { useNavigation } from '@react-navigation/native'
import pxToDp from '../../../utils/px2dp'
import { apiSandCreateOrder } from '../../../service/api'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo } from '../../../actions/user'
import { apiGetUserData } from '../../../service/api'
import withPage from '../../../components/HOCs/withPage'

const BeAgent = props => {
  const {navigate} = useNavigation()
  const {goBack} = useNavigation()
  const [agree, setAgree] = React.useState(false) // 是否同意
  const [pass, setPass] = React.useState(false) // 是否符合升级条件
  const dispatch = useDispatch()

  useEffect(() => {
    getUserInfo()
  }, [])

  // 经纪人等级
  const agentList = [
    { level: 1, name: '初级经纪人', },
    { level: 2, name: '中级经纪人', },
    { level: 3, name: '高级经纪人', },
  ]

  const curAgentLevel = 1

  // 成为经纪人条件
  const beAgentRequireList = [
    {title: '缴费6000元', curProgress: 4000, totalProgress: 6000, needButton: true},
    {title: '邀请20位主播加入', curProgress: 20, totalProgress: 20, needButton: false},
    {title: '邀请3位初级经纪人', curProgress: 2, totalProgress: 3, needButton: false},
    {title: '邀请3位中级经纪人', curProgress: 1, totalProgress: 3, needButton: false},
  ]

  /**
   * 复制
   */
  const copy = () => {
    Clipboard.setString(props.wxNumber)
    Toast.show('复制成功')
  }

  /**
   * 获取用户信息
   */
  const getUserInfo = () => {

    apiGetUserData().then((res: any) => {
      console.log('获取用户信息', res)
      dispatch(setUserInfo(res))
    })
  }

  /**
   * 去缴费
   */
  const userId = useSelector(state => state?.userData?.userInfo?.userId)
  const state = useSelector(state => state)
  const toPay = () => {
    apiGetUserData().then((res: any) => {
      console.log('获取用户信息', res)
      dispatch(setUserInfo(res))
    })

    const baseURL = 'https://cashier.sandpay.com.cn/gw/web/order/create?charset=UTF-8'
    let URL = baseURL

    apiSandCreateOrder({
      "goodsDesc": "4321532153215213",
      "orderSn": "stri23532153253215123ng",
      "receivedAddress": "fsdafsa",
      "totalPay": "1",
      "userId": userId
    }).then((res: any) => {
      for (let item in res) {
        URL += '&' + item + '=' + res[item]
      }
      console.log(URL)
    // navigate('PayWebView', {url: URL})
    })
  }

  /**
   * 升级经纪人
   */
  const submit = () => {
    setPass(agree)
  }

  /**
   * 经纪人解锁
   */
  const renderAgentRequireRow = (item: any ) => {
    return (
      <View style={{flexDirection: 'column', marginTop: pad * 2}} key={item.title}>
        <View style={styles.requireRow}>
          <Text style={{color: Colors.brownColor}}>{item.title}</Text>
          { item.needButton && <ButtonOutLine
            text='去缴费'
            style={styles.toPayButton}
            textStyle={{color: Colors.brownColor}}
            onPress={toPay}
          />}
        </View>
        <View style={styles.progressBottom}>
          {/* 通过样式控制进度 */}
          <View style={StyleSheet.flatten([styles.progressUp, {width: (item.curProgress / item.totalProgress) * 100 + '%'}])}></View>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={{flex: 1}}>
      <ImageBackground 
        source={images.agentBg} 
        style={styles.style}
        resizeMode='cover'
      >
        <ImageBackground 
          source={images.agentBgTop} 
          style={styles.topCard}
          resizeMode='cover'
        >
          <NavBar 
            title={'成为经纪人'}
            style={styles.nav}
            titleStyle={{color: Colors.lightBrown}}
            left={
              () => <AntDesign name="left" size={20} color={Colors.lightBrown} onPress={goBack}/>
            }
          />
          <Image source={images.agent} style={{width: 127, height: 22}}/>
          <PrimaryText style={styles.agentText}>
            经纪人是指通过与平台签订劳务合同，获取更高比例返佣与权限的人员，经纪人将获得平台专业的培训，帮助经纪人获取更高的报酬。
          </PrimaryText>
          <ImageBackground 
            source={images.wxBg} 
            style={styles.service} 
            resizeMode='contain'
          >
            <View style={styles.serviceLeft}>
              <Image source={images.wxIcon} style={styles.wxIcon} />
              <SmallText style={{color: Colors.brownColor}}>客服微信</SmallText>
            </View>
            <View style={styles.serviceRight}>
              <SmallText style={styles.colorLightBrown}>{props.wxNumber}</SmallText>
              <PrimaryText 
                style={styles.colorLightBrown}
                onPress={copy}
              >
                复制
              </PrimaryText>
            </View>
          </ImageBackground>
        </ImageBackground>
        <Image source={images.beAgent} style={styles.angetTitle} />
        <ImageBackground source={images.beAgentBg} style={styles.agentRules}>
          <View style={{height: pxToDp(100), flexDirection: 'row', justifyContent: 'space-around'}}>
              {
                agentList.map((item, index) => {
                return (
                  <View key={item.name} style={styles.tabItem}>
                    <PrimaryText style={StyleSheet.flatten([styles.tabText, (item.level === curAgentLevel) && styles.activeTabText])}>{item.name}</PrimaryText>
                    <View style={(item.level === curAgentLevel) && styles.tabUnderLine}></View>
                  </View>
                )
              })
              }
          </View>
          <View
            style={styles.tabWrapper}
          >
            {
              beAgentRequireList.map((item, index) => {
                return renderAgentRequireRow(item)
              })
            }
            <TinyText style={styles.beAgentTip}>任意一条件达成即可成为经纪人</TinyText>
          </View>
        </ImageBackground>
        <View style={styles.checkLine}>
          <TouchableOpacity onPress={() => setAgree(!agree)}>
            <Image 
              style={styles.checkIcon} 
              source={agree && images.checkBeAgent || images.unCheckBeAgent} 
            />
          </TouchableOpacity>
          <Text style={{color: Colors.lightBrown}}>
            升级即表示观看且同意
            <Text style={{color: '#34C0FF'}} onPress={() => navigate('BeAgentAgreement')}>《经纪人劳务电子合同》</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={submit} disabled={!pass}>
          <LinearGradient
            colors={[Colors.lightBrown, '#FFCA98']}
            start={[0, 0]}
            style={styles.subButton}
          >
            <T4 style={{color: Colors.brownColor}}>
              {
                pass && '升级经纪人' || '暂未达成条件'
              }
            </T4>
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  )
}

BeAgent.defaultProps = {
  // TODO:
  wxNumber: 'haduia81237'
}

export default withPage(BeAgent)

const styles = StyleSheet.create({
  style: {
    width: vw(100),
    height: vh(100),
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
  },
  nav: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  topCard: {
    height: pxToDp(520),
    width: vw(100),
    flexDirection: 'column',
    alignItems: 'center',
  },
  agentText: {
    marginTop: pad,
    marginBottom: pad * 2,
    width: '80%',
    textAlign: 'center',
    color: Colors.lightBrown,
    lineHeight: 20,
  },
  service: {
    width: vw(100) - pad * 6,
    height: pxToDp(72),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: pad,
  },
  serviceLeft: {
    width: pxToDp(200),
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wxIcon: {
    width: pxToDp(40),
    height: pxToDp(34),
    marginRight: pad,
  },
  angetTitle: {
    width: pxToDp(608),
    height: pxToDp(44),
    marginVertical: pad * 2
  },
  agentRules: {
    width: vw(100) - pad * 2,
    height: pxToDp(640),
  },
  colorLightBrown: {
    color: Colors.lightBrown
  },
  // 经纪人等级Tab
  tabItem: {
    height: pxToDp(96), 
    flexDirection: 'column', 
    justifyContent: 'center', 
  },
  tabText: {
    height: '100%',
    lineHeight: pxToDp(100),
    color: Colors.lightBrown,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  tabWrapper: {
    flex: 1,
    paddingBottom: pad,
    paddingHorizontal: pad / 2,
  },
  requireRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: pad,
  },
  tabUnderLine: {
    width: pxToDp(70),  
    height: pxToDp(4),
    backgroundColor: Colors.lightBrown, 
    marginLeft: pxToDp(30),
    borderRadius: pxToDp(4),
  },
  toPayButton: {
    width: 'auto',
    height: 'auto',
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginLeft: 20,
    fontSize: 10,
    borderColor: Colors.brownColor,
    color: Colors.brownColor
  },
  // 进度条
  progressBottom: {
    width: '100%',
    height: 4, 
    backgroundColor: '#D89176', 
  },
  progressUp: {
    height: 4, 
    backgroundColor: Colors.brownColor, 
  },
  beAgentTip: {
    position: 'absolute',
    bottom: pad,
    right: pad,
    color: Colors.brownColor,
  },
  checkLine: {
    flexDirection: 'row',
    marginTop: pad, 
    marginBottom: pad * 3,
  },
  checkIcon: {
    width: pxToDp(30),
    height: pxToDp(30),
    marginRight: pad
  },
  subButton: {
    width: pxToDp(670),
    height: pxToDp(80),
    borderRadius: pxToDp(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: pad
  },
})