/**
 * 推流组件
 */
import React from 'react';
import {
  View,
  ScrollView,
  PermissionsAndroid,
  StyleSheet,
  StyleProp,
  InteractionManager
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
// import {Streaming} from 'pili-streaming-react-native';
import {NodePlayerView, NodeCameraView} from 'react-native-nodemediaclient';
import {PrimaryText} from 'react-native-normalization-text';
import {vw, vh} from '../../utils/metric';
import {isAndroid} from '../../constants/DeviceInfo';
import {updateStarted} from '../../actions/live';
import usePermissions from '../../hooks/usePermissions';
import Toast from 'react-native-tiny-toast';

interface LivePusherProps {
  style?: StyleProp<any>
}

const LivePusher = React.forwardRef((props: LivePusherProps, ref: any) : any =>  {
  const dispatch = useDispatch();

  /**
   * 必要权限
   */
  const isPermissionGranted = usePermissions([
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ]);

  React.useEffect(() => {
    // 打开
    return () => {
      // 关闭
      Toast.show('close')
      // return dispatch(updateStarted(false))
    }
  }, [])

  console.log(isPermissionGranted, 'isPermissionGranted')


  /**
   * 推流配置
   */
  const pusherConfig = useSelector(state => state?.live?.pusherConfig)

  console.log(pusherConfig, 'pusherConfig')

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      {
        isPermissionGranted ? (
          <NodeCameraView
            style={{flex: 1}}
            ref={ref}
            {...pusherConfig}
          />
        ) : null
      }
    </View>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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

export default LivePusher;