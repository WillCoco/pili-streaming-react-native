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
import { vw } from '../../../utils/metric'
import { Colors } from '../../../constants/Theme'
import { AntDesign } from '@expo/vector-icons'
import { pad } from '../../../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import { PrimaryText, SmallText, TinyText} from 'react-native-normalization-text'
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view'
import Toast from 'react-native-tiny-toast'
import ButtonOutLine from '../../../components/Buttons/ButtonOutLine'

const BeAgent = props => {
  const [agree, setAgree] = React.useState(false) // 是否同意
  const [pass, setPass] = React.useState(false) // 是否符合升级条件
  const agentTab = ['初级经纪人', '中级经纪人', '高级经纪人']


  /**
   * 复制
   */
  const copy = () => {
    Clipboard.setString(props.wxNumber)
    Toast.show('复制成功')
  }
  
  /**
   * 切换 TAB
   */
  const changeTab = (e: any) => {
    console.log(e)
    // setAgentTab(agentTab[e])
  }

  /**
   * 升级经纪人
   */
  const submit = () => {

  }

  const renderAgentRequireRow = (props) => {
    return (
      <View style={{flexDirection: 'column', marginTop: pad}}>
        <View style={styles.requireRow}>
          <Text style={{color: Colors.brownColor}}>缴费6000元</Text>
          <ButtonOutLine
            text='去缴费'
            style={styles.unLockButton}
            textStyle={{color: Colors.brownColor}}
          />
        </View>
        <View style={styles.progressBottom}>
          {/* 通过样式控制进度 */}
          <View style={StyleSheet.flatten([styles.progressUp, {width: '40%'}])}></View>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={{flex: 1}}>
      <ImageBackground source={images.agentBg} style={styles.style}>
        <ImageBackground source={images.agentBgTop} style={styles.topCard}>
          <NavBar 
            title={'成为经纪人'}
            style={styles.nav}
            titleStyle={{color: Colors.lightBrown}}
            left={
              () => <AntDesign name="left" size={20} color={Colors.lightBrown} />
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
          <ScrollableTabView
            initialPage={0}
            tabBarUnderlineStyle={{ 
              width: 35,  
              height: 2,
              backgroundColor: Colors.lightBrown, 
              marginLeft: 35
            }}
            tabBarActiveTextColor={Colors.lightBrown}
            tabBarInactiveTextColor={Colors.lightBrown}
            renderTabBar={() => <DefaultTabBar />}
            onChangeTab={(e) => changeTab(e)}
          >
            {
              agentTab.map((item, index) => {
                return (
                  <View
                    key={`tab-${index}`}
                    tabLabel={item}
                    style={styles.tabWrapper}
                  >
                    {
                      renderAgentRequireRow(props)
                    }
                    {
                      renderAgentRequireRow()
                    }
                    {
                      renderAgentRequireRow()
                    }
                    {
                      renderAgentRequireRow()
                    }

                    <TinyText style={styles.beAgentTip}>任意一条件达成即可成为经纪人</TinyText>
                  </View>
                )
              })
            }
          </ScrollableTabView>
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
            <Text style={{color: '#34C0FF'}}>《经纪人劳务电子合同》</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={submit} disabled={!pass}>
          <LinearGradient
            colors={[Colors.lightBrown, '#FFCA98']}
            start={[0, 0]}
            style={styles.subButton}
          >
            <Text style={{color: '#0F0707'}}>
              {
                pass && '升级经纪人' || '暂未达成条件'
              }
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  )
}

BeAgent.defaultProps = {
  wxNumber: 'haduia81237'
}

const styles = StyleSheet.create({
  style: {
    width: vw(100),
    flexDirection: 'column',
    alignItems: 'center',
  },
  nav: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  topCard: {
    height: 260,
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
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: pad,
  },
  serviceLeft: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wxIcon: {
    width: 20,
    height: 17,
    marginRight: pad,
  },
  angetTitle: {
    width: 304,
    height: 22,
    marginVertical: pad * 2
  },
  agentRules: {
    width: vw(100) - pad * 2,
    height: 320,
  },
  subButton: {
    width:335,
    height:40,
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: pad
  },
  colorLightBrown: {
    color: Colors.lightBrown
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
  unLockButton: {
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
    width: 15,
    height: 15,
    marginRight: pad
  }
})

export default BeAgent
