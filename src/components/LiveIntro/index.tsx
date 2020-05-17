/**
 * 直播简介: 主播头像、标题、观看人数
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TouchableWithoutFeedback,
  PanResponder,
  ImageSourcePropType
} from 'react-native';
import {Toast} from '@ant-design/react-native'
import { useSelector } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import Avatar from '../Avatar';
import withSafeArea from '../HOCs/withSafeArea';
import {pad} from '../../constants/Layout';
// import {vw} from '../../utils/metric';
// import {Colors} from '../../constants/Theme';
import FollowButton from '../../components/FollowButton';
import {apiAttentionAnchor} from '../../service/api';
import {shorNum} from '../../utils/numeric';


export type msgList = any[] | undefined;
export type onMsgListResponse = (v: boolean) => any;
const EMPTY_OBJ = Object.freeze({});

interface LiveMsgProps {
  anchorId: number,
  anchorAvatar?: ImageSourcePropType,
  liveTitle: string,
  liveSubTitle: string | number,
  renderItem?: (d: string | object, i: number) => any,
  style?: StyleProp<any>,
  onPress?: (anchorid: number) => any,
  ref?: any,
  isFollow: boolean,
  safeTop: number,
  showFollowButton?: boolean,
}

const LiveIntro = (props: LiveMsgProps) =>  {
  const {navigate} = useNavigation();

  const livingInfo = useSelector((state: any) => {
    return state?.live?.livingInfo || EMPTY_OBJ
  })

  // console.log(livingInfo, 'livingInfo')
  
  /**
   * 前往主播详情
   */
  const onPress = () => {
    if (livingInfo.anchorId) {
      // 默认跳转主播详情
      navigate('AnchorDetail', {anchorId: livingInfo.anchorId})
    }
  }

  /**
   * 取消/关注 
   */
  const onFollowPress = (isFollow: boolean) => {
    console.log(isFollow, 'isFollow')

    const params = {
      anchorId: props?.anchorId,
      attentionType: "1", // 1：关注；2：取关
      userId: props?.userId
    }

    apiAttentionAnchor(params).then(res => {
      // TODO:

    })
    Toast.show('关注/取消关注成功')
  }

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.wrapper, props.style, {top: props.safeTop + pad}])}
      onPress={onPress}
    >
      <Avatar
        source={livingInfo.anchorLogo ? {uri: livingInfo.anchorLogo} : undefined}
        size={40}
        style={{marginRight: 4}}
      />
      <View style={{marginRight: pad}}>
        <SmallText
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail"
        >{livingInfo.anchorName}</SmallText>
        <SmallText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{color: '#ccc'}}
        >
          {shorNum(livingInfo.watchNum) || 0} 观看
        </SmallText>
      </View>
      {
        props.showFollowButton && (
          <FollowButton 
            isFollow={!props.isFollow}
            onPress={onFollowPress}
            // style={{marginLeft: pad}}
          />
        )
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 10,
    left: pad * 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    height: 46,
    borderRadius: 23,
    // width: vw(50),
    // maxWidth: 180,
    padding: 3,
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  },
  title: {
    color: '#fff',
    maxWidth: 100,
  },
})

export default withSafeArea(LiveIntro);