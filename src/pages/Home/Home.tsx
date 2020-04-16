import React, { useEffect } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { setSearchKey } from '../../actions/home'

import { apiGetIndexData } from '../../service/api'

function Home(props: any) {
  useEffect(() => {
    apiGetIndexData().then((res: any) => {
      console.log(res)
      props.dispatch(setSearchKey(res.hot?.goods_name))

    })
  }, [])

  return (
    <ScrollView style={[styles.container]}>
      <Text>sfsfsf</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000'
  }
})

export default connect(
  (state: any) => state.publicData
)(Home)