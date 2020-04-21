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
import LiveIntro from '../LiveIntro';
import LivingBottomBlock from '../LivingBottomBlock';
import LivePuller from '../LivePuller';
import L from '../../constants/Layout';
import Iconcloselight from '../../components/Iconfont/Iconcloselight';
import {pad} from '../../constants/Layout';
import images from '../../assets/images';

const {window} = L;

interface LiveWindowProps {
  style?: StyleProp<any>,
  liveData?: any,
  safeTop: number
}

const LiveWindow = (props: LiveWindowProps) : any =>  {
  const {goBack} = useNavigation();

  /**
   * 播放器示例
   */
  const player: {current: any} = React.createRef();

  /**
   * 推出直播
   */
  const closeLive = () => {
    player.current?.stop();
    goBack();
  }

  /**
   * 返回时停止
  */
  React.useEffect(() => {
    return () => {
      player.current?.stop();
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