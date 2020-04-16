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
import {useNavigation} from '@react-navigation/native';
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
  onPress?: (anchorid: number) => any,
  ref?: any,
}

const LiveIntro = (props: LiveMsgProps) : any =>  {
  const {navigate} = useNavigation();
  
  const onPress = () => {
    if (props.onPress) {
      props.onPress(props.anchorId);
      return;
    }
    // 默认跳转主播详情
    navigate('AnchorDetailScreen')
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
        <Text style={{color: '#fff'}}>{props.liveTitle}</Text>
        <Text style={{color: '#ccc'}}>{props.liveSubTitle}</Text>
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
    backgroundColor: '#222',
    height: 46,
    borderRadius: 23,
    width: vw(50),
    maxWidth: 180,
    padding: 3
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  }
})

export default LiveIntro;