/**
 * 拉流组件
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StyleProp,
} from 'react-native';

interface LiveWindowProps {
  style?: StyleProp<any>,
  liveData?: any,
}


const LiveWindow = (props: LiveWindowProps) : any =>  {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  }
})

export default LiveWindow;