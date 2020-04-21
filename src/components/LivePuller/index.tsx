/**
 * 拉流组件
 */
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text'
import {NodePlayerView} from 'react-native-nodemediaclient';
import {vw, vh} from '../../utils/metric';

interface LiveWindowProps {
  inputUrl: string,
  style?: StyleProp<any>,
}

const LiveWindow = React.forwardRef((props: LiveWindowProps, ref: any) : any =>  {
  /**
   * 播放器状态
   */
  const [status, setStatus]: [number | undefined, any] = React.useState()
  const onStatus = (status: number) => {
    setStatus(status);
  }

  /**
   * 播放器实例
   */
  const player = React.useRef();

  console.log(status, 'statusstatusstatus')

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <NodePlayerView
        style={{height: '100%', width: '100%', backgroundColor: '#333'}}
        ref={ref}
        inputUrl={props.inputUrl}
        scaleMode="ScaleAspectFit" // 'ScaleToFill', 'ScaleAspectFit', 'ScaleAspectFill'
        bufferTime={300}
        maxBufferTime={1000}
        autoplay={true}
        renderType="SURFACEVIEW" //'SURFACEVIEW', 'TEXTUREVIEW'
        onStatus={onStatus}
      />
      {status === 1000 && <PrimaryText color="white" style={styles.loading}>连接中</PrimaryText>}
    </View>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  },
  loading: {
    position: 'absolute',
    top: vh(50) - 20,
    left: vw(50) - 20,
  }
})

export default LiveWindow;