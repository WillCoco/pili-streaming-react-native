/**
 * 主播直播页
 */
import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import LiveWindow from '../../../../components/LiveWindow';
import withPage from '../../../../components/HOCs/withPage';

const LivingRoomScreen = (props: any) : any =>  {
  // 主播
  return (
    <LiveWindow.Anchor />
  )
};

LivingRoomScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default withPage(LivingRoomScreen, {
  statusBarOptions: {
  }
});