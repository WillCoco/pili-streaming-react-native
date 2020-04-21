/**
 * 直播消息工具栏目
 */
import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  StyleProp,
} from 'react-native';
import {scale, PrimaryText} from 'react-native-normalization-text';
import {vw} from '../../utils/metric'
import {Colors} from '../../constants/Theme';
import {pad} from '../../constants/Layout';
import images from '../../assets/images';

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
      <TextInput
        placeholder={props.inputPlaceholder}
        placeholderTextColor="#fff"
        style={StyleSheet.flatten([styles.input, props.inputStyle])}
        returnKeyLabel="发送"
        returnKeyType="send"
        onSubmitEditing={props.onSubmitEditing}
      />
      <Image
        source={images.shoppingIcon}
        style={styles.img}
        resizeMode="contain"
      />
      <Image
        source={images.forwardIcon}
        style={styles.img}
        resizeMode="contain"
      />
      <Image
        source={images.shoppingIcon}
        style={styles.img}
        resizeMode="contain"
      />
    </View>
  )
}

LiveToolBar.defaultProps = {
  inputPlaceholder: '说点好听的'
}

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 4
  },
  input: {
    height: scale(35),
    width: vw(50),
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: scale(35) / 2,
    backgroundColor: Colors.opacityDarkBg,
    marginRight: pad,
    color: '#fff',
    fontSize: scale(14),
  },
  img: {
    width: scale(35),
    height: scale(35),
  }
})
export default LiveToolBar;