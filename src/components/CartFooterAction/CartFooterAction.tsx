import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

function CartFooterAction(props: any) {
  const { cartList } = props

  const allSelect = () => {
    console.log('全选')
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={allSelect}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {
            cartList.is_all_selected
              ? <Ionicons name='ios-checkmark-circle' color={Colors.basicColor} size={20} />
              : <Ionicons name='ios-radio-button-off' color={Colors.darkGrey} size={20} />
          }
          <Text style={styles.text}>全选</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.actionRight}>
        <View style={styles.goodsPrice}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{ fontSize: pxToDp(28), color: Colors.darkBlack }}>会员价：</Text>
            <Text style={{ fontSize: pxToDp(24), color: Colors.basicColor }}>¥</Text>
            <Text style={{ fontSize: pxToDp(34), color: Colors.basicColor, fontWeight: '500'}}>777.22</Text>
          </View>
          <Text style={{ fontSize: pxToDp(28), color: Colors.darkGrey }}>原价：¥111.11</Text>
        </View>

        <TouchableOpacity>
          <View style={styles.actionBtn}>
            <Text style={styles.btnText}>结算(1)</Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default connect(
  (state: any) => state.cartData
)(CartFooterAction)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: pxToDp(115),
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20)
  },
  text: {
    fontSize: pxToDp(34),
    lineHeight: pxToDp(48),
    color: Colors.lightBlack,
    marginLeft: pxToDp(25)
  },
  actionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  goodsPrice: {
    alignItems: 'flex-end'
  },
  actionBtn: {
    width: pxToDp(206),
    height: pxToDp(72),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.basicColor,
    borderRadius: pxToDp(36),
    marginLeft: pxToDp(25)
  },
  btnText: {
    fontSize: pxToDp(32),
    fontWeight: '500',
    color: Colors.whiteColor
  }
})