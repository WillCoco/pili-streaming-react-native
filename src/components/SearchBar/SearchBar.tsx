import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

function SearchBar(props: any) {
  return (
    <View style={styles.homeSearchBar}>
      <Ionicons
        size={20}
        name='ios-search'
        color={Colors.lightGrey}
      />
      <Text style={styles.searchKey} numberOfLines={1}>{props.statusBarHeight}</Text>
    </View>
  )
}

export default connect(
  (state: any) => state.publicData
)(SearchBar)

const styles = StyleSheet.create({
  homeSearchBar: {
    width: pxToDp(710),
    height: pxToDp(56),
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: pxToDp(28),
    paddingLeft: pxToDp(26)
  },
  searchKey: {
    color: Colors.lightGrey,
    marginLeft: pxToDp(20)
  }
})