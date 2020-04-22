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
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux'
import LiveIntro from '../LiveIntro';
import LivingBottomBlock from '../LivingBottomBlock';
import LivePuller from '../LivePuller';
import L from '../../constants/Layout';
import Iconcloselight from '../../components/Iconfont/Iconcloselight';
import {pad} from '../../constants/Layout';
import images from '../../assets/images';
import {joinGroup, quitGroup} from '../../actions/im';

const {window} = L;

interface LiveWindowProps {
  style?: StyleProp<any>,
  liveData?: any,
  safeTop: number
}

const LiveWindow = (props: LiveWindowProps) : any =>  {
  const {goBack} = useNavigation();
  const dispatch = useDispatch();


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
    dispatch(joinGroup({groupID: '1'}))
      .then((success?: boolean) => {
        setIsIMJoinSecceed(!!success)
      })
      .catch((err: any) => {
        console.log(err, 'err');
        // 找不到指定群组 显示结束
        setIsIMJoinSecceed(false)
      });
    
    return () => {
      player.current?.stop(); // 返回时停止
      dispatch(quitGroup('1')); // 退im群
    }
  }, [])

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <Image
        style={styles.imgBg}
        source={images.livingbg}
        resizeMode="cover"
      />
      <LivePuller
        ref={player}
        inputUrl="rtmp://58.200.131.2:1935/livetv/hunantv"
        onStatus={onPlayerStatus}
      />
      <LiveIntro
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
  }
})

export default LiveWindow;