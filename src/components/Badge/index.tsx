/**
 * 徽标
 */
import * as React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { T4, SmallText, TinyText, PrimaryText, T2, T3, scale } from 'react-native-normalization-text';
import { Colors } from '../../constants/Theme';

export interface BadgeProps {
  quantity?: number | string,
  children?: any,
  style?: StyleProp<any>,
  textStyle?: StyleProp<any>,
  textWrapperStyle?: StyleProp<any>,
  overflowCount?: number
}

const Badge = (props: BadgeProps): React.ReactElement => {
  const text = (props.quantity && props.quantity > props.overflowCount) ? `${props.overflowCount}+` : props.quantity 
    
  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      <View style={StyleSheet.flatten([styles.textWrapper, props.textWrapperStyle])}>
        <TinyText color="theme" numberOfLines={1} style={StyleSheet.flatten([styles.badgeText, props.textStyle])}>{text}</TinyText>
      </View>
      {props.children}
    </View>
  )
};

Badge.defaultProps = {
  disabled: false,
  overflowCount: 999
};

const styles = StyleSheet.create({
  style: {
    // flex: -1,
    // borderWidth: 1,
    alignItems: 'center',
  },
  img: {
    height: 30,
    width: 30,
  },
  badgeText: {
   
  },
  textWrapper: {
    flex: -1,
    position: 'absolute',
    top: -6,
    right: -8,
    borderWidth: 1,
    borderColor: Colors.basicColor,
    height: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(12),
    minWidth: scale(20),
    maxWidth: scale(220),
    paddingHorizontal: 3
  }
});

export default Badge;
