import React from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'

function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text>首页</Text>
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