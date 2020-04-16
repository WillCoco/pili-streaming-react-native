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
import LiveMsg, {msgList, onMsgListResponse} from '../LiveMsg';
import {Anchor as AnchorLiveToolBar} from '../LiveToolBar';
import LiveIntro from '../LiveIntro';
import L from '../../constants/Layout.js';

const {window} = L;

interface LiveWindowProps {
  style?: StyleProp<any>,
  liveData?: any,
  msgList: msgList,
  onMsgListResponse: onMsgListResponse,
}


const LiveWindow = (props: LiveWindowProps) : any =>  {
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>

      <LiveIntro
        anchorId={1}
        liveTitle="asdasd"
        audienveQuantity={123213}
      />
      <LiveMsg
        style={{maxHeight: 200}}
        msgList={props.msgList}
        onMsgListResponse={props.onMsgListResponse}
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