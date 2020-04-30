/**
 * 图文组合
 */
import * as React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { T4, SmallText, PrimaryText, T2, T3 } from 'react-native-normalization-text';
import Badge, {BadgeProps} from '../Badge';


interface ImageTextProps extends BadgeProps {
  text: string,
  img: any,
  onPress?: () => void,
  style?: StyleProp<any>,
  imgStyle?: StyleProp<any>,
  textStyle?: StyleProp<any>,
  disabled?: boolean,
  children?: any,
  showBadge?: boolean
  badgeTextStyle?: StyleProp<any>,
}

const ImageText = (props: ImageTextProps): React.ReactElement => {
  return (
    <TouchableOpacity disabled={!props.onPress || props.disabled} onPress={props.onPress} style={StyleSheet.flatten([styles.style, props.style])}>
      {
        props.showBadge ? (
          <Badge
            quantity={props.quantity} 
            style={props.style}
            textStyle={props.textStyle}
            textWrapperStyle={props.textWrapperStyle}
            overflowCount={props.overflowCount}
         >
            <Image source={props.img} style={StyleSheet.flatten([styles.img, props.imgStyle])} resizeMode="contain" />
          </Badge>
        ) : (
          <Image source={props.img} style={StyleSheet.flatten([styles.img, props.imgStyle])} resizeMode="contain" />
        )
      }
      <SmallText color="secondary" style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.text}</SmallText>
      {props.children}
    </TouchableOpacity>
  )
};

ImageText.defaultProps = {
  disabled: false,
  showBadge: false
};

const styles = StyleSheet.create({
  style: {
    alignItems: 'center'
  },
  img: {
    height: 30,
    width: 30,
  },
  text: {
  }
});

export default ImageText;
