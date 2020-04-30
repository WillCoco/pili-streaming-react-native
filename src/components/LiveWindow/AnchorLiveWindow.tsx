/**
 * 主播直播窗体
 */
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux'
import LiveIntro from '../LiveIntro';
import LivingBottomBlock from '../LivingBottomBlock';
import LivePusher from '../LivePusher';
import L from '../../constants/Layout';
import Iconcloselight from '../../components/Iconfont/Iconcloselight';
import Iconchangecamera from '../../components/Iconfont/Iconchangecamera';
import {pad} from '../../constants/Layout';
import images from '../../assets/images';
import {joinGroup, quitGroup} from '../../actions/im';

const {window} = L;

interface LiveWindowProps {
  style?: StyleProp<any>,
  liveData?: any,
  safeTop: number
}

const LiveWindow = (props: LiveWindowProps) : any =>  {
  const {goBack} = useNavigation();
  const dispatch = useDispatch();

  /**
   * 实例
   */
  let camera: {current: any} = React.useRef();

  /**
   * 切换摄像头
   */
  const switchCamera = () => {
    camera.current.switchCamera()
  }

  /**
   * im加群状态
   */
  const [isIMJoinSecceed, setIsIMJoinSecceed]: [undefined|boolean, any] = React.useState(undefined);

  /**
   * 退出直播
   */
  const closeLive = () => {
    goBack();
  };

  /**
   * 
   */
  React.useEffect(() => {
    dispatch(joinGroup({groupID: '1'}))
      .then((success?: boolean) => {
        setIsIMJoinSecceed(!!success)
      })
      .catch((err: any) => {
        console.log(err, 'err');
        // 找不到指定群组 显示结束
        setIsIMJoinSecceed(false)
      });
    
    return () => {
      dispatch(quitGroup('1')); // 退im群
    }
  }, [])

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <Image
        style={styles.imgBg}
        source={images.livingbg}
        resizeMode="cover"
      />
      <LivePusher ref={(c: any) => camera.current = c} />
      <LiveIntro
        anchorId={1}
        liveTitle="湖南卫视直播间"
        liveSubTitle={`123214`}
      />
      <LivingBottomBlock.Anchor
        onShopBagPress={() =>alert('余组货')}
      />
      <TouchableOpacity onPress={switchCamera} style={StyleSheet.flatten([styles.camera, {top: props.safeTop + (pad * 2)}])}>
        <Iconchangecamera size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={closeLive} style={StyleSheet.flatten([styles.close, {top: props.safeTop + (pad * 2)}])}>
        <Iconcloselight size={24} />
      </TouchableOpacity>
    </View>
  )
};


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  },
  close: {
    position: 'absolute',
    right: pad * 1.5,
  },
  camera: {
    position: 'absolute',
    right: pad * 5.5,
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
});

export default LiveWindow;