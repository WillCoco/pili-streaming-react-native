/**
 * 头像
*/
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  StyleProp,
  View,
} from "react-native";

interface AvatarProps {
  source?: any,
  defaultSource?: any,
  size?: number,
  imgStyle?: StyleProp<any>,
  style?: StyleProp<any>,
}

const Avatar = (props: AvatarProps) => {
  const sizeStyle = props.size && {
    width: props.size,
    height: props.size,
    borderRadius: props.size / 2
  }

  return (
    <View style={props.style}>
      <Image
        source={props.source || props.defaultSource}
        style={StyleSheet.flatten([
          styles.img,
          sizeStyle,
          props.imgStyle
        ])}
        resizeMode="cover"
      />
    </View>
  )
};

Avatar.defaultProps = {
  // defaultSource: {uri: 'http://www.gravatar.com/avatar/ac5ed5ed4458b4811187bad5b566b1bc?s=72&d=identicon'}
  defaultSource: {uri: 'https://www.baidu.com/img/bd_logo1.png'}
}

const styles = StyleSheet.create({
  img: {
    width: 38,
    height: 38,
    borderRadius: 19
  },
})

export default Avatar;