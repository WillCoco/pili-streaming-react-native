import * as React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {useSelector, useDispatch} from 'react-redux';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import {useNavigation} from '@react-navigation/native';
import withPage from '../../../components/HOCs/withPage';
// import NavBar from '../../../../components/NavBar'
// import LiveWindow from '../../../../components/LiveWindow'
import LiveReadyCard from '../../../components/LiveReadyCard';
import LivePusher from '../../../components/LivePusher';
import {vw} from '../../../utils/metric';
import {Colors} from '../../../constants/Theme';
import images from '../../../assets/images/index';
import usePermissions from '../../../hooks/usePermissions';
import { pad } from '../../../constants/Layout';
import {updateLiveConfig} from '../../../actions/live';
import * as api from '../../../service/api';

const CreateLiveScreen = (props: any) =>  {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  /**
   * 直播设置
   */
  const liveConfig = useSelector((state: any) => state?.live?.liveConfig)


  console.log(liveConfig, 'liveConfig')

  const isValidData = (): boolean => {
    if (!liveConfig.cover) {
      Toast.show('请选择直播封面');
      return false;
    }

    if (!liveConfig.title) {
      Toast.show('请填写标题');
      return false;
    }

    return true;
  }

  const onNextPress = () => {
    if (!isValidData()) {
      return;
    }

    // 跳转
    navigation.navigate('LiveGoodsManage');

    // 暂停
    // camera.current.stopPreview();
  }


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

  /**
   * 修改标题
   */
  const onChangeTitle = async (title?: string) => {
    dispatch(updateLiveConfig({title}))
  }

  /**
   * 上传文件
   */
  const onChangeCover = async (r: any) => {
    console.log(r, '=======')

    const result = await api.apiLiveUploadFile({
      fileType: 'PICTURE',
      size: '20',
      unit: 'M',
      file: r,
    });

    console.log(result, 'resultresultresult')
    const cover = result?.data;
    if (cover) {
      // 存直播配置
      dispatch(updateLiveConfig({cover}))
    }
  }

  return (
    <View style={StyleSheet.flatten([styles.style, {paddingBottom: props.safeBottom}])}>
      <LivePusher
        ref={(c: any) => camera.current = c}
      />
      <View style={styles.contentWrapper}>
        <View style={StyleSheet.flatten([styles.liveReadyCardWrapper, {marginTop: props.safeTop + 80}])}>
          <LiveReadyCard
            onChangeCover={onChangeCover}
            onChangeTitle={onChangeTitle}
          />
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
        <SmallText color="white" style={StyleSheet.flatten([styles.agreement, {paddingBottom: props.safeBottom}])}>
          开播默认已阅读
          <SmallText
            style={{color: Colors.yellowColor}}
            onPress={() => navigation.navigate('AnchorAgreement')}
          >
            《圈品主播入驻协议》
          </SmallText>
        </SmallText>
      </View>
    </View>
  )
};

CreateLiveScreen.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: Colors.darkBlack,
  },
  navStyle: {
    backgroundColor: 'transparent',
  },
  headWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  liveReadyCardWrapper: {
    flex: 1,
    marginTop: 28,
    paddingHorizontal: pad
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