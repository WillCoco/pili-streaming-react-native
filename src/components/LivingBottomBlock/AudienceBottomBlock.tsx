/**
 * 直播间底部bock业务组件
 */
import * as React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LiveMsg from '../LiveMsg';
import {Audience as AudienceLiveToolBar} from '../LiveToolBar';
import {pad} from '../../constants/Layout';
import {sendRoomMessage} from '../../actions/im';
import {RoomMessageType} from '../../reducers/im';
import Poller from '../../utils/poller';

const BottomBlock = (props: any) : any =>  {
  const dispatch = useDispatch();

  const [likeQuantity, setLikeQuantity] = React.useState(0); // 获取来的数量

  // 房间消息
  const roomMessages = useSelector(state => state?.im?.roomMessages);

  // 房间信息
  const room = useSelector(state => state?.im?.room);

  // 发送消息
  const sendMessage = (text: string) => {
    dispatch(sendRoomMessage({to: room?.groupID, description: 'roomMessage', text}));
  }
  
  // 喜欢
  const onPressLike = () => {
    setLikeQuantity(quantity => ++quantity)
  }
  
  // 提交喜欢
  const submitLike = React.useCallback((quantity: number) => {
    if (likeQuantity) {
      // 提交、返回新值
      alert(likeQuantity)
    }
  }, [likeQuantity])
  
  // 发送消息
  const onPressForward = () => {
    
  }

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
      poller.current.stop();
    }
  }, [likeQuantity])

  // 观众
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <LiveMsg
        msgList={roomMessages}
        msgAdapter={(msg: RoomMessageType): any => {
          const {data, description} = msg || {};
          const {userName, text, userId} = data || {};
          return {
            name: userName,
            id: userId,
            text,
            type: description,
            isFollowed: props.isFollowed, // todo: 和主播是否关注
          }
        }}
        // style={{maxHeight: 200, width: 200}}
      />
      <AudienceLiveToolBar
        likeQuantity={likeQuantity}
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