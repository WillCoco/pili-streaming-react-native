/**
 * 直播消息行
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
} from 'react-native';
import { PrimaryText, scale } from 'react-native-normalization-text';
import {UserLevel} from '../../liveTypes';
import images from '../../assets/images';
import { Colors } from '../../constants/Theme';
import { radio, radioLarge, pad } from '../../constants/Layout';
import {MessageType} from '../../reducers/im';

export type dataAdapterType = (data: any) => {
  id: string,
  name: string,
  text: string,
  type: string,
  isFollowed: boolean,
}
interface MsgRowProps {
  data: any,
  dataAdapter?: dataAdapterType,
  wrapperStyle?: StyleProp<any>,
  onPress?: (data: any) => any,
}

const MsgRow = (props: MsgRowProps) : any =>  {

  const data = (props.dataAdapter ? props.dataAdapter(props.data) : props.data) || {}

   /**
   * 用户等级图片
   */
  const userLvImg = React.useMemo(() => {
    // const userLevel = props.userInfo || {};
    // if (userLevel <= 6 && userLevel >= 1) {
    //   return images[`userLv${userLevel}`]
    // };
    // return images[`userLv${1}`]
    if (data.isFollowed) {
      return images.roomMessageFollowed;
    }
    return images.roomMessageUnFollowed;
  }, [data.isFollowed]);


  const backgroundColor = React.useMemo(() => {
    if (data.type === MessageType.enter) {
      return 'rgba(245,113,185,0.5)';
    }
    return Colors.opacityDarkBg;
  }, [data.type]);

  return (
    <TouchableOpacity
      disabled={!props.onPress}
      onPress={() => props.onPress(props.data)}
      style={StyleSheet.flatten([styles.wrapper, {backgroundColor}, props.wrapperStyle])}
    >
      <Image
        style={styles.userLvImg}
        source={userLvImg}
        resizeMode="contain"
      />
      <PrimaryText style={styles.text} color="white">
        <PrimaryText style={styles.userName} color="white">{data.name || '游客'}:  </PrimaryText>
        {data.text}
      </PrimaryText>
    </TouchableOpacity>
  )
}

MsgRow.defaultProps = {
  dataAdapter: (d: any = {}) => ({name: d.name, text: d.text, isFollowed: d.isFollowed})
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: 2,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 16,
    alignItems: 'center'
  },
  userLvImg: {
    height: 16,
    width: 36,
    marginRight: 4,
    marginTop: 1,
    alignSelf: 'flex-start'
  },
  text: {
    flex: 1
  },
  userName: {
    color: Colors.yellowColor,
    lineHeight: scale(20),
  },
})

export default MsgRow;