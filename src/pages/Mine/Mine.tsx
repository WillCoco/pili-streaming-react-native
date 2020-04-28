import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, NativeModules, StatusBar, Platform  } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { setUserInfo } from '../../actions/user'
import { apiGetUserData } from '../../service/api'
import { Colors } from '../../constants/Theme'

import Header from './Header/Header'

function Mine(props) {
  const navigation = useNavigation()
  const [statusBarHeight, setStatusBarHeight] = useState(0)

  useEffect(() => {
    calcStatusBarHeight()
    if (props.isLogin) {
      getUserInfo()
    }
  }, [])

  /**
   * 获取状态栏高度
   */
  const calcStatusBarHeight = () => {
    if (Platform.OS === 'ios') {
      const { StatusBarManager } = NativeModules
      StatusBarManager.getHeight((statusBar: any) => {
        setStatusBarHeight(statusBar.height)
      })
    } else {
      setStatusBarHeight(StatusBar.currentHeight)
    }
  }

  /**
   * 获取用户信息
   */
  const getUserInfo = () => {
    apiGetUserData().then((res: any) => {
      console.log('获取用户信息', res)
      props.dispatch(setUserInfo(res))
    })
  }

  return (
    <View style={styles.container}>
      <Header statusBarHeight={statusBarHeight} userInfo={props.userInfo} />
    </View>
  )
}

export default connect(
  (state: any) => state.userData
)(Mine)

const styles = StyleSheet.create({
  container: {

  }
})