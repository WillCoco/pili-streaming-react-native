import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

let timer: any

export default function SeckillCountDown() {
  const isFocused = useIsFocused()
  const [countDownInfo, setCountDownInfo] = useState({
    hours: 0,
    min: 0,
    sec: 0
  })

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    isFocused ? setCountDown() : clearInterval(timer)
  }, [isFocused])

  /**
   * 设置秒杀倒计时
   */
  const setCountDown = () => {
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

  return (
    <View style={styles.countDown}>
      <Text style={styles.time}>{(countDownInfo.hours + '').padStart(2, '0')}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.time}>{(countDownInfo.min + '').padStart(2, '0')}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.time}>{(~~countDownInfo.sec + '').padStart(2, '0')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
})