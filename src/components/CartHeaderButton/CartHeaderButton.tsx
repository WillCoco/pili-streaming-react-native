import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { toggleCartAction } from '../../actions/cart'
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

function CartHeaderButton(props: any) {
  const toggleAction = () => {
    let type: string = props.cartActionType === '管理' ? '完成' : '管理'
    
    props.dispatch(toggleCartAction(type))
  }

  return (
    <TouchableWithoutFeedback onPress={toggleAction}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.cartActionType}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default connect(
  (state: any) => state.cartData
)(CartHeaderButton)

const styles = StyleSheet.create({
  container: {
    paddingRight: pxToDp(30)
  },
  text: {
    fontSize: pxToDp(30),
    color: Colors.whiteColor
  }
})