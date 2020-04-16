/**
 * 主播直播窗体
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {Audience as AudienceLiveToolBar} from '../LiveToolBar';
import LiveIntro from '../LiveIntro';
import LivingBottomBlock from '../LivingBottomBlock';
import LivePuller from '../LivePuller';
import L from '../../constants/Layout';

const {window} = L;

interface LiveWindowProps {
  style?: StyleProp<any>,
  liveData?: any,
}

const LiveWindow = (props: LiveWindowProps) : any =>  {
  const player: {current: any} = React.createRef();

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
      <LivePuller
        ref={player}
        inputUrl="rtmp://58.200.131.2:1935/livetv/hunantv"
      />
      <LiveIntro
        anchorId={1}
        liveTitle="湖南卫视直播间"
        liveSubTitle={`123214 观看`}
      />
      <LivingBottomBlock />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: window.height
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  }
})

export default LiveWindow;