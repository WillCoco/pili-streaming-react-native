import React, { useEffect } from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

function Home() {
  const navigation: any = useNavigation()

  function toHomeSearch() {
    navigation.push('HomeSearch')
  }

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