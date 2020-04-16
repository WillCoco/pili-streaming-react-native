import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import SearchBar from '../../components/SearchBar/SearchBar'

import { Colors } from '../../constants/Theme'

function HomeSearch(props: { searchKey: React.ReactNode }) {
  const navgation = useNavigation()

  const searchBarProps = {
    isPlaceHolder: false,
    hasSearchKey: true
  }

  navgation.setOptions({
    headerTitle: () => <SearchBar {...searchBarProps} />,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  return (
    <View>
      <Text>{props.searchKey}</Text>
    </View>
  )
}

export default connect(
  (state: any) => state.homeData
)(HomeSearch)