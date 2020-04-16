/**
 * 直播页
 */
import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import LiveWindow from '../../../components/LiveWindow';

const LivingRoomScreen = () : any =>  {

  // 连接im

  // 观众
  if (true) {
    return (
      <LiveWindow.Audience
      />
    )
  }

  // 主播
  return (
    <LiveWindow.Anchor
      msgList={data}
    />
  )
};

LivingRoomScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default LivingRoomScreen;