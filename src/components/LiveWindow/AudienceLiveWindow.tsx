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
import L from '../../constants/Layout.js';

const {window} = L

interface LiveWindowProps {
  style?: StyleProp<any>,
  liveData?: any,
}


const LiveWindow = (props: LiveWindowProps) : any =>  {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <LiveIntro
        anchorId={1}
        liveTitle="罗玉凤直播间"
        liveSubTitle={`123213 观看`}
      />
      {/* <LivePuller></LivePuller> */}
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