import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { Colors } from '../../../constants/Theme'
import pxToDp from '../../../utils/px2dp'

function FansContent(props) {
  const navigation = useNavigation()
  const { userInfo = {}, isLogin } = props

  const toPublishedWork = () => {
    isLogin ? navigation.push('PublishedWork') : navigation.push('Login')
  }

  const toFocusedAnchor = () => {
    isLogin ? navigation.push('FocusedAnchor') : navigation.push('Login')
  }

  return (
    <View style={styles.container}>

      <TouchableWithoutFeedback onPress={toPublishedWork}>
        <View style={styles.item}>
          <Text style={styles.count}>{userInfo.publishCount}</Text>
          <Text style={styles.text}>发布</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.item}>
        <Text style={styles.count}>{userInfo.fansCount}</Text>
        <Text style={styles.text}>粉丝</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.count}>{userInfo.lookCount}</Text>
        <Text style={styles.text}>浏览</Text>
      </View>

      <TouchableWithoutFeedback onPress={toFocusedAnchor}>
        <View style={styles.item}>
          <Text style={styles.count}>{userInfo.anchorCount}</Text>
          <Text style={styles.text}>关注主播</Text>
        </View>
      </TouchableWithoutFeedback>

    </View>
  )
}

export default connect(
  (state: any) => state.userData
)(FansContent)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: pxToDp(16),
    paddingBottom: pxToDp(14)
  },
  item: {
    flex: 1,
    alignItems: 'center'
  },
  count: {
    fontSize: pxToDp(34),
    fontWeight: '600',
    lineHeight: pxToDp(48),
    color: Colors.darkBlack,
    marginBottom: pxToDp(4)
  },
  text: {
    fontSize: pxToDp(26),
    lineHeight: pxToDp(37),
    color: Colors.darkGrey
  }
})