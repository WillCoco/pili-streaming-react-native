/**
 * 直播缩略块
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StyleProp,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {vw} from '../../utils/metric'
import Avatar from '../Avatar';

export type msgList = any[] | undefined;
export type onMsgListResponse = (v: boolean) => any;

interface LiveToolBarProps {
  style?: StyleProp<any>,
  inputPlaceholder?: string,
  inputStyle?: StyleProp<any>,
  onSubmitEditing: () => any,
  liveInfo?: any

}

const LiveSummaryBlock = (props: LiveToolBarProps) : any =>  {

  const {navigate} = useNavigation()

  /**
   * 根据类型去定义LiveWindow的播放类型(直播、回放、预告)
   */

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.wrapper, props.style])}
      onPress={() => navigate('LivingRoomScreen')}
    >
      <Image
        source={
          props.liveInfo?.img ? {uri: props.liveInfo?.img} : {
            uri: 'https://sponsor-static.segmentfault.com/2778c80a0247bc4d241af08a4f76f12b.jpg'
          }
        }
        style={styles.img}
      />
      <View style={styles.liveTitleWrapper}>
        <Text>{props.liveInfo?.type || '直播状态'}</Text>
        <Text>{props.liveInfo?.audienceQty || '0观看'}</Text>
      </View>
      <Text style={styles.titleText}>{props.liveInfo?.title || '标题'}</Text>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigate('AnchorDetailScreen')}>
          <Avatar />
        </TouchableOpacity>
        <Text>点赞</Text>
        <Text style={{}}>1.1k</Text>
      </View>
    </TouchableOpacity>
  )
}

LiveSummaryBlock.defaultProps = {
}

const styles = StyleSheet.create({
  wrapper: {
    height: vw(60),
    width: vw(50),
    justifyContent: 'space-around',
    padding: 2,
    alignItems: 'center'
  },
  liveTitleWrapper: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  img: {
    width: vw(44),
    height: vw(44),
    borderWidth: 1,
  },
  titleText: {
    width: '100%'
  },
  bottomBar: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})
export default LiveSummaryBlock;