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
import {vh} from '../../utils/metric';
import {dataAdapterType} from '../LiveMsg/MsgRow';
import {sendRoomMessage} from '../../actions/im';
import {RoomMessageType} from '../../reducers/im';
import {Modal} from '@ant-design/react-native';

const BottomBlock = (props) : any =>  {
  const dispatch = useDispatch();

  // 房间消息
  const roomMessages = useSelector(state => state?.im?.roomMessages);

  // 房间信息
  const room = useSelector(state => state?.im?.room);

  // 发送消息
  const sendMessage = (text: string) => {
    dispatch(sendRoomMessage({to: room?.groupID, description: 'roomMessage', text}));
  }

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
      <AudienceLiveToolBar onSubmitEditing={sendMessage} />
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