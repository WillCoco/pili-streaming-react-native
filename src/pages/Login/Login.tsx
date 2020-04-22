import React, { useState } from 'react'
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-tiny-toast'

import Form from './Form/Form'

import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

import { apiSendVerCode } from '../../service/api'

const phonePattern = /^1[3456789]\d{9}$/

let timer: any

export default function Logion() {
  const navigation = useNavigation()
  const [telNum, setTelNum] = useState('')
  const [verCode, setVerCode] = useState('')
  const [invCode, setInvCode] = useState('')
  const [disabled, setDisabled] = useState(false)
  let [countDown, setCountDown] = useState(16)

  navigation.setOptions({
    headerTitle: '',
    headerStyle: {
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false,
    headerTransparent: true
  })

  /**
   * 输入手机号
   */
  const changeTelNum = (value: string) => {
    setTelNum(value)
  }

  /**
   * 输入验证码
   */
  const changeVerCode = (value: string) => {
    setVerCode(value)
  }

  /**
   * 输入邀请码
   */
  const changeInvCode = (value: string) => {
    setInvCode(value)
  }

  /**
   * 发送验证码
   */
  const sendMsg = () => {
    if (disabled) return

    if (!phonePattern.test(telNum)) {
      Toast.show('请输入正确的手机号')
      return
    }

    const loading = Toast.showLoading('')

    apiSendVerCode({ userTel: telNum }).then(res => {
      if (res === '请求成功') {
        Toast.hide(loading)

        Toast.showSuccess('验证码已发送')

        setDisabled(true)

        timer = setInterval(() => {
          setCountDown(countDown--)
          if (countDown <= 0) {
            clearInterval(timer)
            setDisabled(false)
            setCountDown(16)
          }
        }, 1000)
      }
    })
  }

  /**
   * 登录操作
   */
  const toLogin = () => {
    if (!phonePattern.test(telNum)) {
      Toast.show('请输入正确的手机号')
      return
    }

    if (verCode.length !== 6) {
      Toast.show('请输入正确的验证码')
      return
    }
    console.log('logion')
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/login-image/login_bgi.png')}
    >
      <Image
        style={styles.logo}
        source={require('../../assets/login-image/logo.png')}
      />

      <Form
        telNum={telNum}
        verCode={verCode}
        invCode={invCode}
        disabledSendBtn={disabled}
        countDown={countDown}
        changeTelNum={(value: string) => changeTelNum(value)}
        changeVerCode={(value: string) => changeVerCode(value)}
        changeInvCode={(value: string) => changeInvCode(value)}
        sendMsg={sendMsg}
      />

      <TouchableOpacity style={styles.loginBtnContainer} onPress={toLogin}>
        <Text style={styles.btnText}>登录/注册</Text>
      </TouchableOpacity>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  logo: {
    position: 'absolute',
    width: pxToDp(240),
    height: pxToDp(240),
    top: pxToDp(140),
    right: pxToDp(88)
  },
  loginBtnContainer: {
    width: pxToDp(600),
    height: pxToDp(90),
    backgroundColor: Colors.basicColor,
    borderRadius: pxToDp(45),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pxToDp(90)
  },
  btnText: {
    fontSize: pxToDp(28),
    color: Colors.whiteColor
  }
})