/**
 * 直播消息工具栏目
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StyleProp,
} from 'react-native';
import {vw} from '../../utils/metric'

export type msgList = any[] | undefined;
export type onMsgListResponse = (v: boolean) => any;

interface LiveToolBarProps {
  style?: StyleProp<any>,
  inputPlaceholder?: string,
  inputStyle?: StyleProp<any>,
  onSubmitEditing: () => any
}

const LiveToolBar = (props: LiveToolBarProps) : any =>  {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <Text>商品</Text>
      <TextInput
        placeholder={props.inputPlaceholder}
        placeholderTextColor="#fff"
        style={StyleSheet.flatten([styles.input, props.inputStyle])}
        returnKeyLabel="发送"
        returnKeyType="send"
        onSubmitEditing={props.onSubmitEditing}
      />
      <Text>分享</Text>
      <Text>点赞</Text>
    </View>
  )
}

LiveToolBar.defaultProps = {
  inputPlaceholder: '说点好听的'
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  input: {
    width: vw(50),
    lineHeight: 1,
    paddingHorizontal: 10,
    borderRadius: vw(40) / 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: '#fff'
  }
})
export default LiveToolBar;