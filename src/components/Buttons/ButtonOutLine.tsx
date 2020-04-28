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

interface ButtonOutLineProps {
  text: string,
  size?: number, // 高度
  style?: StyleProp<any>,
  textStyle?: StyleProp<any>,
}

const ButtonOutLine = (props: ButtonOutLineProps) =>  {

  const radio = props.size ? props.size / 2 : 0
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.style,
        {
          height: props.size,
          borderRadius: radio,
        },
        props.style,
      ])}
    >
      <PrimaryText style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.text}</PrimaryText>
    </TouchableOpacity>
  )
};

ButtonOutLine.defaultProps = {
  size: 30,
};

const styles = StyleSheet.create({
  style: {
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  text: {
    color: '#fff'
  }
});

export default ButtonOutLine;