/**
 * 直播间底部bock业务组件
 */
import * as React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import LiveMsg from '../LiveMsg';
import {Audience as AudienceLiveToolBar} from '../LiveToolBar';
import {pad} from '../../constants/Layout';
import {sendRoomMessage} from '../../actions/im';
import {RoomMessageType, MessageType} from '../../reducers/im';
import {apiLiveLike} from '../../service/api';
import Poller from '../../utils/poller';
import { isSucceed } from '../../utils/fetchTools';

const BottomBlock = (props: any) : any =>  {
  const dispatch = useDispatch();

  // 是否有数据未提交
  const needSubmit = React.useRef(false);

  // 本地点击喜欢数量
  const [likeQuantity, setLikeQuantity] = React.useState(0);
    
  // 喜欢数量
  const likeSum = useSelector((state: any) => +state?.live?.livingInfo?.likeSum || 0);

  // im房间消息
  const roomMessages = useSelector((state: any) => state?.im?.roomMessages);

  // im房间信息
  const room = useSelector((state: any) => state?.im?.room);

  // 直播房间信息 (退出会现执行外层useEffect, 清除liveID, 用memo保存)
  const liveId = useSelector((state: any) => state?.live?.livingInfo?.liveId);
  const liveIdPersist = React.useMemo(() => {
    return liveId
  }, [])

  // 发送消息
  const sendMessage = (text: string) => {
    dispatch(sendRoomMessage({to: room?.groupID, type: MessageType.roomMessage, text}));
  }
  
  // 喜欢
  const onPressLike = () => {
    needSubmit.current = true;
    setLikeQuantity((quantity: number) => ++quantity);
  }
  
  // 提交喜欢
  const submitLike = React.useCallback((quantity: number) => {
    if (needSubmit.current && likeQuantity > 0) {
      // 提交、返回新值
      const params = {
        liveId: liveId || liveIdPersist,
        likeNum: quantity || likeQuantity
      }
      apiLiveLike(params)
        .then(res => {
          if (isSucceed(res)) {
            setLikeQuantity(0);
          }
          // 重置
          needSubmit.current = false;
        })
        .catch(error => {
          // 重置
          needSubmit.current = false;
          console.log(`apiLiveLike: ${error}`)
        })
    }
  }, [likeQuantity, needSubmit.current]);

  /**
   * 轮询器
   */
  const poller = React.useRef(new Poller({
    interval: 1000 * 10,
    initExec: false,
    callback: submitLike,
  }));

  React.useEffect(() => {
    if (poller.current) {
      poller.current.stop();
    }

    poller.current = new Poller({
      interval: 1000 * 10,
      initExec: false,
      callback: submitLike,
    });

    poller.current.start();
    
    return () => {
      /**
       * 页面退出提交点赞
       */
      poller.current.execOnce();
      poller.current.stop();
    }
  }, [likeQuantity]);

  /**
   * 分享
  */
 const onPressForward = () => {

 }


  // 观众
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <LiveMsg
        msgList={roomMessages}
        msgAdapter={(msg: RoomMessageType): any => {
          const {data} = msg || {};
          const {userName, text, userId, type} = data || {};
          return {
            name: userName,
            id: userId,
            text,
            type,
            isFollowed: props.isFollowed, // todo: 和主播是否关注
          }
        }}
      />
      <AudienceLiveToolBar
        likeQuantity={(likeQuantity + likeSum) || 0}
        onPressShopBag={props.onPressShopBag}
        onSubmitEditing={sendMessage}
        onPressLike={onPressLike}
        onPressForward={onPressForward}
      />
    </View>
  )
};

BottomBlock.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: pad,
    justifyContent: 'flex-end',
  },
});

export default BottomBlock;