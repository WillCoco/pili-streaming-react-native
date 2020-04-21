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
import { PrimaryText, scale } from 'react-native-normalization-text';
import {UserLevel} from '../../liveTypes';
import images from '../../assets/images';
import { Colors } from '../../constants/Theme';
import { radio, radioLarge, pad } from '../../constants/Layout';

interface MsgRowProps {
  userInfo: any,
  wrapperStyle?: StyleProp<any>,
}

const MsgRow = (props: MsgRowProps) : any =>  {
  /**
   * 用户等级图片
   */
  const userLvImg = React.useMemo(() => {
    const userLevel = props.userInfo || {};
    if (userLevel <= 6 && userLevel >= 1) {
      return images[`userLv${userLevel}`]
    };
    return images[`userLv${1}`]
  }, [props.userInfo?.userLevel])

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.wrapperStyle])}>
      <Image
        style={styles.userLvImg}
        source={userLvImg}
        resizeMode="contain"
      />
      <PrimaryText style={styles.text} color="white">
        <PrimaryText style={styles.userName} color="white">{props.userInfo?.userName || '用户名'}:  </PrimaryText>
        {props.userInfo?.message || '消息内容'}
      </PrimaryText>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.opacityDarkBg,
    marginVertical: 2,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 16,
    alignItems: 'center'
  },
  userLvImg: {
    height: 16,
    width: 36,
    marginRight: 4
  },
  text: {
  },
  userName: {
    color: Colors.yellowColor,
    lineHeight: scale(20),
  },
})

export default MsgRow;