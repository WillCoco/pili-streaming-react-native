import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

function SearchBar(props: any) {
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    setSearchKey(props.hasSearchKey ? props.searchKey : '请输入要搜索的内容')
  }, [props.hasSearchKey])

  const toSearchPage = () => props.toSearchPage()

  const toSearch = () => {
    const params = {
      search_word: searchKey || props.searchKey
    }

    console.log(params)
  }

  if (props.isPlaceHolder) {
    return (
      <View style={[styles.placeholderSearchBar, props.searchBarStyle]}>
        <Ionicons
          size={20}
          name='ios-search'
          color={props.iconColor || Colors.lightGrey}
        />
        <Text
          numberOfLines={1}
          style={[styles.searchKey, props.searchKeyStyle]}
          onPress={toSearchPage}
        >{searchKey || props.searchKey}</Text>
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