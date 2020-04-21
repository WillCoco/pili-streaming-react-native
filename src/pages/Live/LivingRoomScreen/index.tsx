/**
 * 直播页
 */
import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import LiveWindow from '../../../components/LiveWindow';
import withPage from '../../../components/HOCs/withPage';
import { pad } from '../../../constants/Layout';
import { safeTop } from '../../../constants/DeviceInfo';

const LivingRoomScreen = (props: any) : any =>  {

  // 连接im

  // 观众
  if (true) {
    return (
      <LiveWindow.Audience
        safeTop={props.safeTop}
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

export default withPage(LivingRoomScreen, {
  statusBarOptions: {
  }
});