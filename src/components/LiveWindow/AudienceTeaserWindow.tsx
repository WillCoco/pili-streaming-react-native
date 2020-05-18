/**
 * 预告
 */
import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  LayoutAnimation,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import VideoPlayer from '../VideoPlayer';
// import VideoPlayer from 'react-native-video-controls';
import { useDispatch, useSelector } from "react-redux";
import LiveIntro from "../LiveIntro";
import LivingBottomBlock from "../LivingBottomBlock";
import Iconcloselight from "../Iconfont/Iconcloselight";
import { pad } from "../../constants/Layout";
import images from "../../assets/images";
import { MediaType } from "../../liveTypes";
import AudienceShopCard from "../LivingShopCard/AudienceShopCard";
import { vw, vh } from "../../utils/metric";
import withPage from '../HOCs/withPage';
import TrailerCountDown from '../TrailerCountDown';
import { EMPTY_OBJ } from '../../constants/freeze';
import { apiEnterLive } from '../../service/api';

interface LiveVideoProps {
  style?: StyleProp<any>,
  liveData?: any,
  safeTop: number,
  liveTime: number,
}

interface LiveWindowParams {
  liveId: string | number, // 直播id
  groupID: string, // im群组
  mediaType: MediaType, // 媒体类型
  // mediaSource: string, // 拉流地址、 video
}

const LiveVideo = (props: LiveVideoProps): any => {
  const { goBack, replace } = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute() || EMPTY_OBJ;

  const {
    liveId,
    mediaType,
  } : LiveWindowParams = (route.params || EMPTY_OBJ) as LiveWindowParams;

  // 用户id
  const userId = useSelector((state: any) => state?.userData?.userInfo?.userId) || '';

  const backUrl = useSelector((state: any) => state?.live?.livingInfo?.backRtmp) || '';

  // 主播信息
  const [anchorInfo, setAnchorInfo]: [any, any] = React.useState({})

  console.log(backUrl, 'backUrl')

  /**
   * 进入直播间，获取拉流地址 TODO:
   */
  React.useEffect(() => {
    const params = {
      liveId,
      userId
    }

    // apiEnterLive(params)
    //   .then((res: any) => {
    //     // const safeRes = res || {};
    //     console.log(res, '进入列表');
    //     res.watchNum = res.watchNum -1; // 这里重新会重复加人数
    //     dispatch(updateLivingInfo(res))
    //     setAnchorInfo(res);
    //   })
  }, []);

  /**
   * [播放uri]
   */

  /**
   * 预告倒计时组件
   */


  /**
   * 播放器状态
   */
  const [playerStatus, setPlayerStatus]: [
    undefined | boolean,
    any
  ] = React.useState(undefined);

  const onPlayerStatus = (status: number | string) => {
    console.log(status, "status");
    setPlayerStatus(status);
  };

  /**
   * 播放器示例
   */
  const player: { current: any } = React.createRef();

  /**
   * 退出直播
   */
  const closeLive = () => {
    // player.current?.stop(); // 停止播放器实例
    goBack();
  };

  /**
   *
   */
  React.useEffect(() => {
    // 直播加群
  
    return () => {
      // player.current?.stop(); // 返回时停止
    };
  }, []);

  /**
   * 商品卡可见
   */
  const [shopCardVisible, setShopCardVisible]: [
    boolean | undefined,
    any
  ] = React.useState();

  /**
   * 卡片动画
   */
  const shopCardAnim = (visiable: boolean) => {
    Keyboard.dismiss();
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.2,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    });

    // LayoutAnimation.spring();
    setShopCardVisible(visiable);
  };

  const bigPic = useSelector((state: any) => state?.live?.livingInfo?.bigPic) || '';

  const liveTime = useSelector((state: any) => state?.live?.livingInfo?.liveTime) || '';
  
  // bigPic返回不对
  const bgUri = bigPic ? {uri: bigPic} : images.livingbg

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <Image style={styles.imgBg} source={images.livingbg} resizeMode="cover" />
      <TrailerCountDown
        deadline={liveTime}
        style={styles.countDown}
      />
      <View style={styles.livingBottomBlock}>
        <LivingBottomBlock.AudienceTraser
        
        />
      </View>
      <LiveIntro
        showFollowButton
        // name=
        isFollow={anchorInfo?.isAttention} // 是否关注(0:没关注；1：关注)
      />
      <TouchableOpacity
        onPress={closeLive}
        style={StyleSheet.flatten([
          styles.close,
          { top: props.safeTop + pad * 2 },
        ])}
      >
        <Iconcloselight size={24} />
      </TouchableOpacity>
      <AudienceShopCard
        visible={!!shopCardVisible}
        onPressClose={() => shopCardAnim(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  countDown: {
    position: 'absolute',
    top: vh(18),
    alignSelf: 'center',
  },
  livingBottomBlock: {
    flex: -1,
    position: "absolute",
    height: 68,
    left: 0,
    bottom: 0,
    right: 0,
  },
  scrollerWrapper: {},
  contentWrapper: {
    justifyContent: "flex-end",
  },
  close: {
    position: "absolute",
    right: pad * 1.5,
  },
  imgBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  video: {
    flex: 1,
    minHeight: vh(100),
    minWidth: vw(100),
  },
});

export default withPage(LiveVideo);
