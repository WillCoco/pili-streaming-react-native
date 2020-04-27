/**
 * 缺省组件
 */
import * as React from 'react';
import { PrimaryText } from 'react-native-normalization-text';
import images from '../../assets/images/index';
import { vw } from '../../utils/metric';
import { Colors } from '../../constants/Theme';
import {
  View,
  Image,
  StyleSheet,
  StyleProp
} from 'react-native';

interface EmptyProps {
  img?: any,
  text?: string,
  imgStyle?: StyleProp<any>,
  style?: StyleProp<any>,
  textStyle?: StyleProp<any>,
}

const Empty = (props: EmptyProps) =>  {
  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      <Image
        style={StyleSheet.flatten([styles.img, props.imgStyle])}
        source={props.img}
        resizeMode='contain'
      />
      {props.text && <PrimaryText style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.text}</PrimaryText>}
    </View>
  )
};

Empty.defaultProps = {
  img: images.emptyList
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: vw(60),
    height: vw(60),
  },
  text: {
    color: Colors.darkGrey,
    bottom: 30
  },
});

export default Empty;