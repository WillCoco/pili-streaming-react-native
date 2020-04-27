import * as React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import {useNavigation} from '@react-navigation/native';
import withPage from '../../../components/HOCs/withPage';
// import NavBar from '../../../../components/NavBar'
// import LiveWindow from '../../../../components/LiveWindow'
import Iconcloselight from '../../../components/Iconfont/Iconcloselight';
import Iconchangecamera from '../../../components/Iconfont/Iconchangecamera';
import LiveReadyCard from '../../../components/LiveReadyCard';
import LivePusher from '../../../components/LivePusher';
import {vw} from '../../../utils/metric';
import {Colors} from '../../../constants/Theme';
import images from '../../../assets/images/index';
import {pad} from '../../../constants/Layout';
import {updatecamera} from '../../../actions/live';
import usePermissions from '../../../hooks/usePermissions';

const CreateLiveScreen = (props: any) =>  {
  const {navigate, goBack} = useNavigation();
  const dispatch = useDispatch();

  const granted = usePermissions(['android.permission.CAMERA'])

  const onNextPress = () => {
    // 存直播配置

    // 跳转
    navigate('LiveGoodsManageScreen');
  }

  const liveConfig = useSelector(state => state?.live?.liveConfig);

  console.log(liveConfig, 'liveConfig')


  /**
   * 实例
   */
  let camera: {current: any} = React.useRef();

  /**
   * 切换摄像头
   */
  // const switchCamera = () => {
  //   camera.current.switchCamera()
  // }


  return (
    <View style={styles.style}>
      <LivePusher ref={(c: any) => camera.current = c} />
      {/* <View style={StyleSheet.flatten([styles.headWrapper, {marginTop: props.safeTop + 20}])}>
        <TouchableOpacity onPress={() => switchCamera()}>
          <Iconchangecamera />
        </TouchableOpacity>
        <TouchableOpacity onPress={goBack}>
          <Iconcloselight />
        </TouchableOpacity>
      </View> */}
      <View  style={StyleSheet.flatten([styles.liveReadyCardWrapper, {marginTop: props.safeTop + 80}])}>
        <LiveReadyCard />
      </View>
      <View style={styles.functionBtnWrapper}>
        <TouchableOpacity>
          <PrimaryText color="white">美颜</PrimaryText>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={images.userDefaultAvatar} />
          <PrimaryText color="white">滤镜</PrimaryText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onNextPress} style={styles.button}>
        <PrimaryText style={styles.nextText}>下一步</PrimaryText>
      </TouchableOpacity>
      <SmallText color="white" style={styles.agreement}>
        开播默认已阅读
        <SmallText
          style={{color: Colors.yellowColor}}
          onPress={() => navigate('aa')}
        >
          《圈品主播入驻协议》
        </SmallText>
      </SmallText>
    </View>
  )
};

CreateLiveScreen.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: Colors.darkBlack,
    paddingHorizontal: pad
  },
  navStyle: {
    backgroundColor: 'transparent',
  },
  headWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  liveReadyCardWrapper: {
    flex: 1,
    marginTop: 28
  },
  functionBtnWrapper: {
    flexDirection: 'row',
    width: vw(60),
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: vw(70),
    height: 48,
    backgroundColor: Colors.basicColor,
    alignSelf: 'center',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28
  },
  nextText: {
    color: '#fff',
  },
  agreement: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 8,
  }
});

export default withPage(CreateLiveScreen, {
  navBackOptions: {
    navBackIcon: 'close',
    navBackTheme: 'light',
    navBackPosition: 'right',
  },
  statusBarOptions: {
    barStyle: 'light-content',
    backgroundColor: 'transparent',
  }
});