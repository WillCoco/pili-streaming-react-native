/**
 * 外边框按钮
 */
import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text'
import { Colors } from '../../constants/Theme';

interface ButtonOutLineProps {
  text?: string,
  size?: number, // 高度
  style?: StyleProp<any>,
  textStyle?: StyleProp<any>,
  children?: any,
  onPress?: () => any,
  disabled?: boolean,
}

const ButtonOutLine = (props: ButtonOutLineProps) =>  {

  const radio = props.size ? props.size / 2 : 0
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={StyleSheet.flatten([
        styles.style,
        {
          height: props.size,
          borderRadius: radio,
        },
        props.style,
      ])}
      onPress={props.onPress}
    >
      {
        props.children || <PrimaryText style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.text}</PrimaryText>
      }
    </TouchableOpacity>
  )
};

ButtonOutLine.defaultProps = {
  size: 40,
  disabled: false
};

const styles = StyleSheet.create({
  style: {
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.basicColor
  },
  text: {
    color: '#fff',
  }
});

export default ButtonOutLine;