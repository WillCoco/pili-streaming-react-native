import React, { useEffect } from 'react'
import { View, Modal, Animated, StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

interface Props {
  isShow?: boolean;
  children: React.ReactNode;
  close?: () => void;
}

export default function ActionSheet(props: Props) {
  const sheetAnim = new Animated.Value(300)

  useEffect(() => {
    Animated.timing(sheetAnim, {
      toValue: props.isShow ? 0 : 300,
      duration: props.isShow ? 250 : 150
    }).start()
  }, [props.isShow])

  return (
    <Modal
      visible={props.isShow}
      transparent={true}
      animationType='fade'
      onRequestClose={props.close}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.content, { transform: [{ translateY: sheetAnim }] }]}>
          {props.children}
        </Animated.View>
      </View>
    </Modal>
  )
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 999
  },
  content: {
    height: 'auto',
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
    overflow: 'hidden'
  }
})