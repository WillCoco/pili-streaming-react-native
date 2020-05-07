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

const LivingRoomScreen = (props: any) : any =>  {
  return (
    <LiveWindow.Audience
      safeTop={props.safeTop}
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