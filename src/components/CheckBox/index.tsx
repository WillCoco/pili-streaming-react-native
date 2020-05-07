/**
 * 单选
 */
import * as React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import images from '../../assets/images/index';
import { pad } from '../../constants/Layout';

const CheckBox = (props: {
  isChecked: boolean,
  style?: StyleProp<any>,
  label?: string,
  labelStyle?: StyleProp<any>,
  onPress?: () => any,
  disabled?: boolean,
}) =>  {

  const img = props.isChecked ? images.checkedIcon : images.uncheckedIcon
  return (
    <TouchableOpacity disabled={props.disabled} style={StyleSheet.flatten([styles.style, props.style])} onPress={props.onPress}>
      <Image source={img} style={styles.img} resizeMode='contain' />
      {
        props.label ? (
          <PrimaryText style={StyleSheet.flatten([styles.lable, props.labelStyle])}>{props.label}</PrimaryText>
        ) : null
      }
    </TouchableOpacity>
  )
};

CheckBox.defaultProps = {
  disabled: false
};

const styles = StyleSheet.create({
  style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 18,
    height: 18,
  },
  lable: {
    marginLeft: pad
  }
});

export default CheckBox;