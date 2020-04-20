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
import {PrimaryText, SmallText, TinyText, scale} from 'react-native-normalization-text';
import {vw} from '../../utils/metric';
import {pad, radio, radioLarge} from '../../constants/Layout';
import {Colors} from '../../constants/Theme';
import Avatar from '../Avatar';
import images from '../../assets/images';
import {PlayerType} from '../../liveTypes';

export type msgList = any[] | undefined;
export type onMsgListResponse = (v: boolean) => any;

interface LiveToolBarProps {
  style?: StyleProp<any>,
  inputPlaceholder?: string,
  inputStyle?: StyleProp<any>,
  onSubmitEditing: () => any,
  liveInfo?: any,
}

const LiveSummaryBlock = (props: LiveToolBarProps) : any =>  {

  const {navigate} = useNavigation()

  /**
   * 根据类型去定义LiveWindow的播放类型(直播、回放、预告)
   */
  // const type: PlayerType = PlayerType.living;
  const type: PlayerType = PlayerType.record;
  // const type: playerType = props.liveInfo?.type;
  let liveTypeEle;
  switch (+type) {
    case PlayerType.living:
      liveTypeEle = (
        <Image
          source={images.livingTypeIcon}
          style={styles.liveTypeIcon}
          resizeMode="contain"
        />
      );
      break;
    case PlayerType.record:
      liveTypeEle = (
        <>
          <Image
            source={images.liveTypeBgIcon}
            style={styles.liveTypeIcon}
            resizeMode="contain"
          />
          <TinyText color="white" style={styles.liveTypeText}>回放</TinyText>
        </>
      );
      break;
    case PlayerType.teaser:
      liveTypeEle = (
        <>
          <Image
            source={images.liveTypeBgIcon}
            style={styles.liveTypeIcon}
            resizeMode="contain"
          />
          <TinyText color="white" style={styles.liveTypeText}>预告</TinyText>
        </>
      );
      break;
     default:
     liveTypeEle = (
      <>
        <Image
          source={images.liveTypeBgIcon}
          style={styles.liveTypeIcon}
          resizeMode="contain"
        />
        <TinyText color="white" style={styles.liveTypeText}>类型</TinyText>
      </>
    );
  }

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.wrapper, props.style])}
      onPress={() => navigate('LivingRoomScreen')}
    >
      <Image
        source={
          props.liveInfo?.img ? {uri: props.liveInfo?.img} : {
            uri: 'https://goss.veer.com/creative/vcg/veer/800water/veer-302989341.jpg'
          }
        }
        style={styles.img}
      />
      <View style={styles.liveTitleWrapper}>
        {liveTypeEle}
        <TinyText color="white">{props.liveInfo?.audienceQty || '0'}</TinyText>
      </View>
      <View style={styles.titleWrapper}>
        <PrimaryText
          style={styles.titleText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {props.liveInfo?.title || '标题标标题标标题标标题标标题标标题标标题标标题标标题标标题标标题标标题标'}
        </PrimaryText>
      </View>
      
      <TouchableOpacity style={styles.bottomBar} onPress={() => navigate('AnchorDetailScreen')}>
        <View style={styles.anorchInfoWrapper}>
          <Avatar size={scale(20)} style={{marginRight: pad / 2}} />
          <SmallText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{width: scale(50)}}
          >
              {props.liveInfo?.name || '主播昵称'}
          </SmallText>
        </View>
        <View style={styles.hotWrapper}>
          <Image
            source={images.heart}
            style={styles.heart}
            resizeMode="contain"
          />
          <SmallText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.hotText}>
              9.1w
          </SmallText>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

LiveSummaryBlock.defaultProps = {
}

const cardWidth = vw(50) - (1.25*pad)
const styles = StyleSheet.create({
  wrapper: {
    width: cardWidth,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: pad,
    borderRadius: radioLarge,
    elevation: 1,
    backgroundColor: '#fff'
  },
  liveTitleWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
    paddingRight: pad,
    paddingLeft: 34,
    height: 20,
    alignItems: 'center',
    borderRadius: radioLarge,
    backgroundColor: Colors.opacityDarkBg,
    overflow: 'hidden',
  },
  liveTypeIcon: {
    width: 28,
    height: 20,
    right: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  liveTypeText: {
    position: 'absolute',
    left: 3
  },
  img: {
    width: cardWidth,
    height: cardWidth,
  },
  anorchInfoWrapper: {
    flexDirection: 'row',
  },
  titleWrapper: {
    width: '100%',
    height: scale(36),
    padding: 7,
    justifyContent: 'center'
  },
  titleText: {
    lineHeight: scale(16),
  },
  bottomBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: pad,
    paddingTop: pad / 2,
    paddingBottom: pad / 2,
  },
  heart: {
    height: scale(20),
    width: scale(20),
    marginRight: 6
  },
  hotWrapper: {
    flexDirection: 'row',
    marginRight: 6,
  },
  hotText: {
    width: scale(30),
  }
})

export default LiveSummaryBlock;