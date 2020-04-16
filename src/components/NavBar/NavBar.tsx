import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import pxToDp from '../../utils/px2dp'

function NavBar(props: any) {
  return (
    <View style={styles.container}>
      <Text>{props.statusBarHeight}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#f0f',
    height: pxToDp(128)
  }
})

export default connect(
  (state: any) => state.publicData
)(NavBar)