/**
 * 主播端直播页
 */
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import LiveWindow from '../../../components/LiveWindow';
import withPage from '../../../components/HOCs/withPage';
import { pad } from '../../../constants/Layout';
import { safeTop } from '../../../constants/DeviceInfo';

const AnchorLivingRoomScreen = (props: any) : any =>  {
  // 主播
  return (
    <LiveWindow.Anchor
      safeTop={props.safeTop}
    />
  )
};

AnchorLivingRoomScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default withPage(AnchorLivingRoomScreen, {
  statusBarOptions: {
    backgroundColor: 'transparent'
  }
});