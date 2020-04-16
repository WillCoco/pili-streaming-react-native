import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import NavBar from '../../components/NavBar/NavBar'

function Home(props: { statusBarHeight: number }) {
  return (
    <ScrollView style={styles.container}>
      <NavBar />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  }
})

export default connect(
  (state: any) => state.publicData
)(Home)