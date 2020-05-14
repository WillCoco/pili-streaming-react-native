import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'

import CardTitle from '../../../components/CardTitle/CardTitle'
import { Colors } from '../../../constants/Theme'
import pxToDp from '../../../utils/px2dp'
import formatSinglePrice from '../../../utils/formatGoodsPrice'

function Account(props) {
  const { userInfo = {}, isLogin } = props
  const navigation = useNavigation()

  const toAccountInfo = () => {
    if (!isLogin) {
      navigation.push('Login')
      return
    }
  }

  return (
    <View style={styles.container}>
      <CardTitle title='我的账户' subTitle='更多' nextAction={toAccountInfo} />
      <View style={styles.accountInfo}>
        <View style={styles.accountItem}>
          <Image source={require('../../../assets/mine-image/img_yifanxian.png')} style={styles.icon} />
          <View style={styles.accountDetail}>
            <Text style={styles.text}>已返金额</Text>
            <Text style={styles.price}>¥{formatSinglePrice(userInfo.hasSettle)}</Text>
          </View>
        </View>
        <View style={styles.accountItem}>
          <Image source={require('../../../assets/mine-image/img_daifanxian.png')} style={styles.icon} />
          <View style={styles.accountDetail}>
            <Text style={styles.text}>待返金额</Text>
            <Text style={styles.price}>¥{formatSinglePrice(userInfo.willSettle)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default connect(
  (state: any) => state.userData
)(Account)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    marginTop: pxToDp(20),
    marginBottom: pxToDp(20),
    padding: pxToDp(20),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(40)
  },
  accountInfo: {
    flexDirection: 'row',
    marginTop: pxToDp(40)
  },
  icon: {
    width: pxToDp(80),
    height: pxToDp(80)
  },
  accountItem: {
    flex: 1,
    paddingLeft: pxToDp(40),
    flexDirection: 'row',
    alignItems: 'center'
  },
  accountDetail: {
    marginLeft: pxToDp(12)
  },
  text: {
    fontSize: pxToDp(26),
    color: Colors.darkGrey,
    lineHeight: pxToDp(37)
  },
  price: {
    fontSize: pxToDp(30),
    fontWeight: '600',
    color: Colors.darkBlack,
    lineHeight: pxToDp(42)
  }
})