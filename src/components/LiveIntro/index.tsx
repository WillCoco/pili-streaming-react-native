/**
 * 直播简介: 主播头像、标题、观看人数
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StyleProp,
  TouchableWithoutFeedback,
  TouchableOpacity,
  PanResponder,
  ImageSourcePropType
} from 'react-native';
import Avatar from '../Avatar';
import {vw} from '../../utils/metric';

export type msgList = any[] | undefined;
export type onMsgListResponse = (v: boolean) => any;

interface LiveMsgProps {
  anchorId: number,
  anchorAvatar?: ImageSourcePropType,
  liveTitle: string,
  liveSubTitle: string | number,
  renderItem?: (d: string | object, i: number) => any,
  style?: StyleProp<any>,
  onPress?: (anchorid: number) => any
}

const LiveIntro = (props: LiveMsgProps) : any =>  {
  const onPress = () => {
    if (props.onPress) {
      props.onPress(props.anchorId);
      return;
    }
    // 默认跳转主播详情
    alert('前往主播详情');
  }

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.wrapper, props.style])}
      onPress={onPress}
    >
      <Avatar
        source={props.anchorAvatar}
        size={40}
        style={{marginRight: 4}}
      />
      <View>
        <Text>{props.liveTitle}</Text>
        <Text>{props.liveSubTitle}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 44,
    borderRadius: 22,
    width: vw(50),
    maxWidth: 180,
    padding: 2
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  }
})

export default LiveIntro;