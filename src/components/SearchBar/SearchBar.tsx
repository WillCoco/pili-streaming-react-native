import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

function SearchBar(props: any) {
  const navgation = useNavigation()
  const [searchKey, setSearchKey] = useState('')

  const toHomeSearch = () => navgation.push('HomeSearch', { searchKey: props.searchKey })

  const toSearch = () => {
    const params = {
      search_word: searchKey || props.searchKey
    }

    console.log(params)
  }

  if (props.isPlaceHolder) {
    return (
      <View style={styles.placeholderSearchBar}>
        <Ionicons
          size={20}
          name='ios-search'
          color={Colors.lightGrey}
        />
        <Text
          numberOfLines={1}
          style={styles.searchKey}
          onPress={toHomeSearch}
        >{props.searchKey}</Text>
      </View>
    )
  } else {
    return (
      <View style={[styles.placeholderSearchBar, styles.searchBar]}>
        <Ionicons
          size={20}
          name='ios-search'
          color={Colors.lightGrey}
        />
        <TextInput
          value={searchKey}
          style={styles.searchKey}
          placeholder={props.searchKey}
          onChangeText={text => setSearchKey(text)}
          onSubmitEditing={toSearch}
        />
      </View>
    )
  }
}

export default connect(
  (state: any) => state.homeData
)(SearchBar)

const styles = StyleSheet.create({
  placeholderSearchBar: {
    width: pxToDp(710),
    height: pxToDp(56),
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: pxToDp(28),
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26)
  },
  searchBar:{
    width: pxToDp(620)
  },
  searchKey: {
    color: Colors.lightGrey,
    marginLeft: pxToDp(20)
  }
})