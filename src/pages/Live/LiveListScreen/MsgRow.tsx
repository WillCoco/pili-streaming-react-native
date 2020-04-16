/**
 * 直播消息行
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  StyleProp,
} from 'react-native';

interface MsgRowProps {
  levelImg: ImageSourcePropType,
  userName: string,
  msg: string,
  wrapperStyle?: StyleProp<any>
}

const MsgRow = (props: MsgRowProps) : any =>  {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.wrapperStyle])}>
      <Image source={props.levelImg} />
      <Text>{props.userName}</Text>
      <Text>{props.msg}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
  },
})

export default MsgRow;