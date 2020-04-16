import React, { useEffect } from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { setSearchKey } from '../../actions/home'

import { apiGetIndexData } from '../../service/api'

function Home(props: any) {
  const navigation: any = useNavigation()

  useEffect(() => {
    apiGetIndexData().then((res: any) => {
      console.log(res)
      props.dispatch(setSearchKey(res.hot?.goods_name))

    })
  }, [])

  console.log(props, 'home')

  const toHomeSearch = () => navigation.push('HomeSearch')

  return (
    <ScrollView style={[styles.container]}>
      <Text onPress={toHomeSearch}>首页</Text>
    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
  container: {

  }
})

export default connect(
  (state: any) => state.publicData
)(Home)