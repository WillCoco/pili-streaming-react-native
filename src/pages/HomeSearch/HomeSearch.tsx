import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

import SearchBar from '../../components/SearchBar/SearchBar'

import { Colors } from '../../constants/Theme'

function HomeSearch() {
  const route = useRoute()
  const navgation = useNavigation()

  const searchBarProps = {
    isPlaceHolder: false
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

  const [searchKey, setSearchKey] = useState(route.params.searchKey)

  return (
    <View>
      <Text>{searchKey}</Text>
    </View>
  )
}

export default HomeSearch