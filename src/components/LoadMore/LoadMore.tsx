import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

export default function LoadMore(props: { hasMore: boolean }) {
  const { hasMore } = props

  return (
    <View style={styles.container}>
      {
        hasMore
          ? <ActivityIndicator size='small' color={Colors.darkGrey} />
          : <View style={styles.isEnd}>
            <Text style={styles.line} />
            <Text style={styles.text}>没有更多了</Text>
            <Text style={styles.line} />
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: pxToDp(20),
    marginBottom: pxToDp(20)
  },
  isEnd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Colors.lightGrey,
    marginLeft: pxToDp(30),
    marginRight: pxToDp(30)
  },
  line: {
    width: pxToDp(200),
    height: pxToDp(1),
    backgroundColor: Colors.lightGrey
  }
})