/**
 * 直播间底部bock业务组件
 */
import * as React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {
  Modal, Toast,
} from '@ant-design/react-native';
import {useSelector, useDispatch} from 'react-redux';
import LiveMsg from '../LiveMsg';
import {Anchor as AnchorLiveToolBar} from '../LiveToolBar';
import MsgSlowOut from '../LiveMsg/MsgSlowOut';
import {vh} from '../../utils/metric';
import Mask from '../../components/Mask';
import {pad} from '../../constants/Layout';
import {RoomMessageType, MessageType} from '../../reducers/im';
import {setGroupMemberMuteTime, getGroupMemberProfile} from '../../actions/im';
import Iconcartlight from '../../components/Iconfont/Iconcartlight';
import Iconguanzhu from '../../components/Iconfont/Iconguanzhu';
import { Colors } from '../../constants/Theme';

const emptyList: [] = [];

const LivingRoomScreen = (props: any) : any =>  {
  const dispatch = useDispatch();
  const [maskList, maskDispatch] = React.useContext(Mask.context);

  // 房间消息
  const roomMessages = useSelector((state: any) => state?.im?.roomMessages);

  // 下单消息
  const orderMessages = useSelector((state: any) => (state?.im?.orderMessages || emptyList));

  // 房间信息
  // const room = useSelector((state: any) => state?.im?.room);
  const livingInfo = useSelector((state: any) => state?.live?.livingInfo);

  // 获取成员是否禁言
  const getUserSilent = async (userID: string) => {
    const info: any = await dispatch(getGroupMemberProfile({userID})) || {};

    console.log(info, 'sdkadjalkas')

    // 未禁言中
    if (info && (info.muteUntil * 1000 <= Date.now())) {
      return false;
    }

    return true;
  }

  // 观众
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <View style={styles.msgSlowOutWrapper}>
        <MsgSlowOut
          dataList={orderMessages}
          dataAdapter={(msg: RoomMessageType) => {
            if (!msg?.data) {
              return null
            }

            const {userName, text, userId, type} = msg?.data || {};

            return {
              name: userName,
              id: userId,
              text,
              Icon: type === MessageType.order ? Iconcartlight : Iconguanzhu,
              backgroundColor: type === MessageType.order ? Colors.basicColor : Colors.yellowColor
            }
          }}
          style={styles.msgSlowOut}
        />
      </View>
      <LiveMsg
        msgList={roomMessages}
        msgAdapter={(msg: RoomMessageType) => {
          const {data} = msg || {};
          const {userName, text, userId, type, isFollowed} = data || {};
          return {
            name: userName,
            id: userId,
            text,
            type,
            isFollowed
          }
        }}
        onPressMsg={async (data: any) => {
          const {userName, userId, userAvatar} = data.data;
          // 查询是否禁言
          const isSilent = await getUserSilent(userId);

          const title = isSilent ? '是否取消禁言' : '是否禁言'

          maskDispatch({
            type: Mask.Actions.PUSH,
            payload: {
              type: Mask.ContentTypes.WithAvatar,
              data: {
                avatar: userAvatar,
                name: userName,
                rightBtnText: title,
                onPressRight: () => {
                  // 禁言或者取消禁言
                  const options: any = {userID: userId}
                  if (isSilent) {
                    options.muteTime = 0;
                  }

                  dispatch(setGroupMemberMuteTime(options))
                }
              }
          }})
        }}
        // style={{borderWidth: 1, borderColor: 'red'}}
      />
      <AnchorLiveToolBar
        style={{marginTop: 28}}
        onPressShopBag={props.onPressShopBag}
        onPressBubble={props.onPressBubble}
        onPressShare={props.onPressShare}
        onPressFaceBeauty={props.onPressFaceBeauty}
        // onPressWhiten={props.onPressWhiten}
        // onPressRedden={props.onPressRedden}
        // onPressFilter={props.onPressFilter}
        onPressFace={props.onPressFace}
      />
    </View>

  )
};

LivingRoomScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: pad,
    paddingBottom: pad,
  },
  msgSlowOutWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: pad * 2
  },
  msgSlowOut: {
  }
});

export default LivingRoomScreen;