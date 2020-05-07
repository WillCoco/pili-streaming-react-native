/**
 * 公告气泡
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {SmallText} from 'react-native-normalization-text';
import { vh, vw } from '../../utils/metric';
import { pad, radio } from '../../constants/Layout';

const NoticeBubble = (props: {
  text: string,
  style?: StyleProp<any>
}) =>  {
  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      <View style={styles.shape} />
      <SmallText color="white">{props.text}</SmallText>
    </View>
  )
};

NoticeBubble.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    position: 'absolute',
    right: 0,
    top: vh(40),
    backgroundColor: '#cb2bffFF',
    padding: pad,
    borderRadius: radio * 2,
    maxWidth: vw(40),
    // zIndex: 1,
  },
  shape: {
    width: 10,
    height: 10,
    position: 'absolute',
    left: 15,
    bottom: -5,
    backgroundColor: '#cb2bffFF',
    transform: [{rotateZ: '45deg'}]
  }
});

export default NoticeBubble;