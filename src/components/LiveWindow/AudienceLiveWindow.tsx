/**
 * 主播直播窗体
 */
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux'
import NoticeBubble from '../../components/NoticeBubble';
import LiveIntro from '../LiveIntro';
import LivingBottomBlock from '../LivingBottomBlock';
import LivePuller from '../LivePuller';
import L from '../../constants/Layout';
import Iconcloselight from '../../components/Iconfont/Iconcloselight';
import {pad} from '../../constants/Layout';
import images from '../../assets/images';
import {joinGroup, quitGroup} from '../../actions/im';
import {MediaType} from '../../liveTypes';

const {window} = L;

interface LiveWindowProps {
  style?: StyleProp<any>,
  liveData?: any,
  safeTop: number
}

const LiveWindow = (props: LiveWindowProps) : any =>  {
  const {goBack} = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute() || {};

  const room = useSelector(state => state?.im?.room);

  /**
   * 播放类型
   */
  const {mediaType, } = route;

  const playerComponent = React.useMemo(() => {
    // 预告片
    if (mediaType === MediaType.teaser) {
      return (
        <Video source={{uri: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4'}}   // Can be a URL or a local file.
          repeat
          fullscreen
          resizeMode="cover"
          // paused
          // ref={ref}                                        // Store reference
          // onBuffer={this.onBuffer}                // Callback when remote video is buffering
          // onError={this.videoError}               // Callback when video cannot be loaded
          style={styles.video}
        />
      )
    }

    // 直播和回放都是拉流
    return (
      <LivePuller
        ref={player}
        inputUrl="rtmp://58.200.131.2:1935/livetv/hunantv"
        onStatus={onPlayerStatus}
      />
    )
  }, [mediaType])


  /**
   * 播放器状态
   */
  const [playerStatus, setPlayerStatus]: [undefined|boolean, any] = React.useState(undefined);

  const onPlayerStatus = (status: number | string) => {
    console.log(status, 'status')
    setPlayerStatus(status)
  }
  
  /**
   * im加群状态
   */
  const [isIMJoinSecceed, setIsIMJoinSecceed]: [undefined|boolean, any] = React.useState(undefined);

  /**
   * 播放器示例
   */
  const player: {current: any} = React.createRef();

  /**
   * 退出直播
   */
  const closeLive = () => {
    // player.current?.stop(); // 停止播放器实例
    goBack();
  }

  /**
   * 
   */
  React.useEffect(() => {
    dispatch(joinGroup({groupID: '@TGS#3PEWFMNGV'}))
      .then((success?: boolean) => {
        alert(1)
        setIsIMJoinSecceed(!!success)
      })
      .catch((err: any) => {
        console.log(err, 'err');
        // 找不到指定群组 显示结束
        setIsIMJoinSecceed(false)
      });
    
    return () => {
      player.current?.stop(); // 返回时停止
      dispatch(quitGroup()); // 退im群
    }
  }, [])

  /**
   * 公告气泡
   */
  const noticeBubbleText = room?.notification;

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <Image
        style={styles.imgBg}
        source={images.livingbg}
        resizeMode="cover"
      />
      {playerComponent}
      {
        !!noticeBubbleText ?
          <NoticeBubble
            text={noticeBubbleText}
          /> : null
      }
      <LiveIntro
        showFollowButton
        anchorId={1}
        liveTitle="湖南卫视直播间"
        liveSubTitle={`123214`}
      />
      <LivingBottomBlock.Audience />
      <TouchableOpacity onPress={closeLive} style={StyleSheet.flatten([styles.close, {top: props.safeTop + (pad * 2)}])}>
        <Iconcloselight size={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  },
  close: {
    position: 'absolute',
    right: pad * 1.5,
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  video: {
    flex: 1,
  }
})

export default LiveWindow;