import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'

import pxToDp from '../utils/px2dp'
import { Colors } from '../constants/Theme'

export default function NavigationBar(props) {
  return (
    <View style={styles.navBarContainer}>
      <Text>{props.children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  navBarContainer: {
    height: '100%',
    backgroundColor: '#f00'
  }
})