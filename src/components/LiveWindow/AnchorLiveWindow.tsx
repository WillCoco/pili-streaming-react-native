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
import LiveMsg, {msgList} from '../LiveMsg';
import {Anchor as AnchorLiveToolBar} from '../LiveToolBar';
import LiveIntro from '../LiveIntro';
import L from '../../constants/Layout';

const {window} = L;

interface LiveWindowProps {
  style?: StyleProp<any>,
  liveData?: any,
  msgList: msgList,
}


const LiveWindow = (props: LiveWindowProps) : any =>  {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>

      <LiveIntro
        anchorId={1}
        liveTitle="asdasd"
      />
      <LiveMsg
        style={{maxHeight: 200}}
        msgList={props.msgList}
      />
      <AnchorLiveToolBar />
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