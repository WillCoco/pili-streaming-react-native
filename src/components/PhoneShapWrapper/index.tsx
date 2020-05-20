/**
 * @author: Xu Ke
 * @date: 2020/2/16 3:48 PM
 * @Description: 手机形状
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import { View, StyleSheet, StyleProp } from 'react-native';
import { pad, radioLarge } from '../../constants/Layout';
import { vw } from '../../utils/metric';
import { Colors } from '../../constants/Theme';

const phoneShapeWrapper = (props: {
  style: StyleProp<any>,
  children: any,
}) => {
  return (
    <View
      style={StyleSheet.flatten([styles.historyWrapper, {...props.style}])}
    >
      <View style={styles.shape} />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  historyWrapper: {
    backgroundColor: '#fff',
    marginTop: pad,
    borderTopLeftRadius: radioLarge * 3,
    borderTopRightRadius: radioLarge * 3,
    overflow: 'hidden',
  },
  shape: {
    height: 8,
    width: 26,
    alignSelf: 'center',
    marginVertical: pad,
    borderRadius: 4,
    backgroundColor: Colors.pink
  },
});


export default phoneShapeWrapper;
