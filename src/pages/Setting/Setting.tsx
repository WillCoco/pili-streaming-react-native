import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import { connect } from 'react-redux'
import { apiLogout } from '../../service/api'
import { toggleLoginState, setUserInfo, setToke } from '../../actions/user'
import Toast from 'react-native-tiny-toast'

import Header from './Header/Header'
import Form from './Form/Form'
import pxToDp from '../../utils/px2dp'

function Setting(props: any) {
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '设置',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false,
    headerTransparent: true
  })

  const logOut = () => {
    apiLogout({
      platform: 'app'
    }).then(res => {
      console.log('退出', res)
      props.dispatch(toggleLoginState(false))
      props.dispatch(setToke(''))
      props.dispatch(setUserInfo({
        accountMoney: 0,
        anchorCount: 0,
        bgc: '',
        card: 0,
        collectionCount: 0,
        consumeMoney: 0,
        fansCount: 0,
        frozenMoney: 0,
        hasSettle: 0,
        inviteCode: '',
        likeContent: 0,
        lookCount: 0,
        needMoney: 0,
        nextLevel: '',
        nickName: '',
        publishCount: 0,
        quanPinMoney: 0,
        saveMoney: 0,
        storeFollow: 0,
        totalProfit: 0,
        userAvatar: '',
        userId: '',
        userLevel: [],
        willSettle: 0,
      }))
      Toast.showSuccess('已退出登录')

      setTimeout(() => {
        navigation.navigate('首页')
      }, 1000)
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Form />
      <TouchableOpacity style={styles.logOut} onPress={logOut}>
        <Text style={styles.logOutText}>退出登录</Text>
      </TouchableOpacity>
    </View>
  )
}

export default connect()(Setting)

const styles = StyleSheet.create({
  logOut: {
    position: 'absolute',
    left: '50%',
    bottom: pxToDp(100),
    marginLeft: pxToDp(-335),
    width: pxToDp(670),
    height: pxToDp(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.basicColor,
    borderRadius: pxToDp(40)
  },
  logOutText: {
    fontSize: pxToDp(32),
    color: Colors.whiteColor
  }
})