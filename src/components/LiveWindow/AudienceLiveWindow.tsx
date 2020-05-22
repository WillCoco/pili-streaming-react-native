/**
 * 直播回放和预告容器
 * vedio
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
import { useDispatch, useSelector } from "react-redux";
import NoticeBubble from "../../components/NoticeBubble";
import LiveIntro from "../LiveIntro";
import LivingBottomBlock from "../LivingBottomBlock";
import LivePuller from "../LivePuller";
import Iconcloselight from "../../components/Iconfont/Iconcloselight";
import { pad } from "../../constants/Layout";
import defaultImages from "../../assets/default-image";
import { joinGroup, quitGroup } from "../../actions/im";
import AudienceShopCard from "../../components/LivingShopCard/AudienceShopCard";
import { vw, vh } from "../../utils/metric";
import { apiEnterLive, apiAttentionAnchor } from '../../service/api';
import { updateLivingInfo } from '../../actions/live';
import withPage from '../../components/HOCs/withPage';
import { Toast } from "@ant-design/react-native";
import { isSucceed } from '../../utils/fetchTools';
import { EMPTY_OBJ } from '../../constants/freeze';
import { MessageType } from "../../reducers/im";
import { sendRoomMessage } from '../../actions/im';

interface LiveWindowProps {
  style?: StyleProp<any>;
  liveData?: any;
  safeTop: number;
}

interface LiveWindowParams {
  liveId: string | number, // 直播id
  groupID: string, // im群组
  anchorId: string, // 主播id
}

const LiveWindow = (props: LiveWindowProps): any => {
  const { goBack, replace } = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute() || EMPTY_OBJ;

  const {
    liveId,
    groupID,
    anchorId,
  } : LiveWindowParams = (route.params || EMPTY_OBJ) as LiveWindowParams;

  // 房间信息
  const room = useSelector((state: any) => state?.im?.room);

  // 直播结束
  const isLiveOver = useSelector((state: any) => state?.live?.isLiveOver);

  // 用户id
  const userId = useSelector((state: any) => state?.userData?.userInfo?.userId);

  // 拉流
  const pullUrl = useSelector((state: any) => state?.live?.livingInfo?.pullUrl) || '';

  // 底图
  const smallPic = useSelector((state: any) => state?.live?.livingInfo?.smallPic);

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
   * im加群状态
   */
  const [isIMJoinSecceed, setIsIMJoinSecceed]: [
    undefined | boolean,
    any
  ] = React.useState(undefined);

  /**
   * 播放器示例
   */
  const player: { current: any } = React.createRef();

  /**
   * 退出直播
   */
  const closeLive = () => {
    // player.current?.stop(); // 停止播放器实例
    dispatch(quitGroup()); // 退im群
    goBack();
  };

  /**
   * 公告气泡
   */
  const noticeBubbleText = room?.notification;

  /**
   * 商品卡可见
   */
  const [shopCardVisible, setShopCardVisible]: [
    boolean | undefined,
    any
  ] = React.useState();

  React.useEffect(() => {
    // 进入直播间，获取拉流地址等房间信息
    const params = {
      liveId,
      userId
    }
    apiEnterLive(params)
      .then((res: any) => {
        if (isSucceed(res)) {
          console.log(res, '进入列表');
          res.watchNum = res.watchNum - 1; // 这里重新会重复加人数
          dispatch(updateLivingInfo({...res?.data, liveId, anchorId}));
          return;
        }
        // 错误返回
        goBack();
      })
      .catch((err: any) => {
        // 错误返回
        goBack();
        console.log(`apiEnterLive: ${err}`)
      })

    // 直播加群
    dispatch(joinGroup({groupID}))
      .then((success?: boolean) => {
        setIsIMJoinSecceed(!!success);
      })
      .catch((err: any) => {
        console.log(err, "err");
        // 找不到指定群组 显示结束
        setIsIMJoinSecceed(false);
      });
  }, []);
  
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

  // console.log(isLiveOver, 'isLiveEnd')

  /**
   * 点击关注, 发送关注消息
   */
  const onFollowPress = (isFollowed: boolean) => {
    // 发送关注消息
    if (!isFollowed) {
      dispatch(sendRoomMessage({text: '关注了主播', type: MessageType.follow}))
    }
  }

  // 直播结束
  if (isLiveOver) {
    console.log(12312312312312)
    replace('AudienceLivingEnd');
  }

  // console.log( 'anchorInfoanchorInfoanchorInfo');

  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <Image
        source={smallPic ? {uri: smallPic} : defaultImages.livingBg}
        resizeMode="cover"
        style={styles.imgBg}
      />
      <LivePuller
        ref={player}
        inputUrl={pullUrl}
        onStatus={onPlayerStatus}
        style={styles.video}
      />
      <View style={styles.livingBottomBlock}>
        <LivingBottomBlock.Audience 
          onPressShopBag={() => shopCardAnim(true)} 
        />
      </View>
      {!!noticeBubbleText ? <NoticeBubble text={noticeBubbleText} /> : null}
      <LiveIntro
        showFollowButton
        onFollowPress={onFollowPress}
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
  livingBottomBlock: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderColor: "red",
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

export default withPage(LiveWindow);
