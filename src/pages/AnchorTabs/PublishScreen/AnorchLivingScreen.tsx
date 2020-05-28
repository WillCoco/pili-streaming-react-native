/**
 * 主播端直播页
 */
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {useDispatch} from 'react-redux';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import LiveWindow from '../../../components/LiveWindow';
import withPage from '../../../components/HOCs/withPage';
import {clearLiveRoom, updateRoomMessage} from '../../../actions/im';

const AnchorLivingRoomScreen = (props: any) : any =>  {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // 屏幕常亮
    activateKeepAwake();
    // 清空消息
    dispatch(updateRoomMessage([]));
    return () => {
      // 取消屏幕常亮
      deactivateKeepAwake();

      // 清空直播房间相关信息
      dispatch(clearLiveRoom('ANCHOR'));
    }
  }, [])

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