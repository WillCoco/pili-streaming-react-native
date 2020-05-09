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
  LayoutAnimation,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux'
import LiveIntro from '../LiveIntro';
import LivingBottomBlock from '../LivingBottomBlock';
import LivePusher from '../LivePusher';
import L from '../../constants/Layout';
import Iconcloselight from '../../components/Iconfont/Iconcloselight';
import Iconchangecamera from '../../components/Iconfont/Iconchangecamera';
import NoticeBubble from '../../components/NoticeBubble';
import Mask from '../../components/Mask';
import AnchorShopCard from '../../components/LivingShopCard/AnchorShopCard';
import {pad} from '../../constants/Layout';
import images from '../../assets/images';
import { joinGroup, quitGroup, createGroup, dismissGroup, updateGroupProfile } from '../../actions/im';
import { Modal } from '@ant-design/react-native'

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
  let [maskList, maskDispatch] = React.useContext(Mask.context);

  /**
   * 实例
   */
  let camera: {current: any} = React.useRef();

  /**
   * 切换摄像头
   */
  const switchCamera = () => {
    camera.current.switchCamera()
    console.log(camera)
  }

  /**
   * 所在房间信息
   */
  const room = useSelector(state => state?.im?.room);

  /**
   * im加群状态
   */
  const [isIMJoinSecceed, setIsIMJoinSecceed]: [undefined|boolean, any] = React.useState(undefined);

  /**
   * 退出直播
   */
  const closeLive = () => {
    maskDispatch({
      type: Mask.Actions.PUSH,
      payload: {
        type: Mask.ContentTypes.Normal,
        data: {
          text: '有2人正在观看你的直播 确认关闭直播吗？',
          title: 'dasdas?',
          rightBtnText: '确定',
          onPressRight: goBack
        }
      }});
    
  };
  
  /**
   * 商品卡可见
   */
  const [shopCardVisible,  setShopCardVisible]: [boolean | undefined, any] = React.useState();

  /**
   * 
   */
  React.useEffect(() => {
    dispatch(createGroup({roomName: '上级传递'}))
      .then((success?: boolean) => {
        setIsIMJoinSecceed(!!success)
      })
      .catch((err: any) => {
        console.log(err, 'err');
        // 找不到指定群组 显示结束
        setIsIMJoinSecceed(false)
      });
    
    return () => {
      dispatch(dismissGroup()); // 退im群
      // todo 晴空room消息、message、livegoods
      camera.current.stopPreview();
    }
  }, [])
  
  React.useEffect(() => {
    if (camera.current) {
      camera.current.start()
    }
    return () => {
      camera.current.stop()
    }
  }, [camera.current])

  /**
   * 公告气泡
   */
  const noticeBubbleText = room?.notification;
  
  const onPressBubble = () => {
    if (room?.groupID) {
      // 显示输入框
      maskDispatch({
        type: Mask.Actions.PUSH,
        payload: {
          type: Mask.ContentTypes.Normal,
          data: {
            text: '有2人正在观看你的直播 确认关闭直播吗？',
            title: 'dasdas?',
            rightBtnText: '确定',
            onPressRight: () => {alert(noticeBubbleText)}
          }
        }});
      return
      dispatch(updateGroupProfile({notification: '抽奖抽奖, 随机踢走一名幸运观众'}));
    }
  }

  /**
   * 卡片动画
   */
  const shopCardAnim = (visiable: boolean) => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.2,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      }
    });

    // LayoutAnimation.spring();
    setShopCardVisible(visiable)
  }

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <LivePusher 
        ref={(c: any) => camera.current = c}
      />
      {/*  backgroundColor: 'rgba(0,0,0,0.01)' 修复摄像上层气泡边缘显示问题 */}
      <View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.01)', zIndex: 1}}>
        <LiveIntro
          anchorId={1}
          liveTitle="湖南卫视直播间"
          liveSubTitle={`123214`}
        />
        <LivingBottomBlock.Anchor
          onPressShopBag={() => shopCardAnim(true)}
          onPressBubble={onPressBubble}
          onPressShare={() =>alert('余组货')}
          onPressFaceBeauty={() => Modal.prompt('1', '123')}
          onPressFilter={() =>alert('美颜')}
        />
        <TouchableOpacity onPress={switchCamera} style={StyleSheet.flatten([styles.camera, {top: props.safeTop + (pad * 2)}])}>
          <Iconchangecamera size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={closeLive} style={StyleSheet.flatten([styles.close, {top: props.safeTop + (pad * 2)}])}>
          <Iconcloselight size={24} />
        </TouchableOpacity>
        {
          !!noticeBubbleText ?
            <NoticeBubble
              text={noticeBubbleText}
              style={styles.noticeBubble}
            /> : null
        }
        <AnchorShopCard
          visible={!!shopCardVisible}
          onPressClose={() => shopCardAnim(false)}
        />
      </View>
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