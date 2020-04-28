import imActionType from '../constants/im';
import timModlue from '../helpers/tim'; //LibGenerateTestUserSig
import {
  Dispatch,
} from 'redux';
const {tim, TIM, userSig} = timModlue;

console.log(userSig, 'userss1')
let onMessageReceived = function(event) {
  // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
  // event.name - TIM.EVENT.MESSAGE_RECEIVED
  // event.data - 存储 Message 对象的数组 - [Message]
};

tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

const onReadyHandler = function (event) {
  // SDK ready 后接入侧才可以调用 sendMessage 等需要鉴权的接口，否则会提示失败！
  // event.name - TIM.EVENT.SDK_READY
  console.log(event, 'onReadyHandler');
}
tim.on(TIM.EVENT.SDK_READY, onReadyHandler);

/**
 * 获取im userSig
 */
export const getUserSig = () => {
  return async function(dispatch: Dispatch, getState: any) {
    const stateUserSig = getState()?.im?.userSig;

    if (stateUserSig) {
      return Promise.resolve(stateUserSig);
    }

    // todo fetch 获取userSig
    updateUserStatus({userSig})
    return userSig;
  }
}

/**
 * 登录im
 */
export function login(params: {
  userID: string,
}) {
  return async function(dispatch: Dispatch<any>, getState: any) {
    const userSig = await dispatch(getUserSig());

    tim.login({userID: params.userID, userSig})
      .then(function(imResponse: any) {
        if (imResponse?.actionStatus === 'OK') {
          updateUserStatus({isOnLine: true}) // tinyID
        }
        console.log(imResponse.data, 'loginIm'); // 登录成功
        // if (imResponse.data.repeatLogin === true) {
        //   // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
        //   console.log(imResponse.data.errorInfo);
        // }
      })
      .catch(function(imError: any) {
        console.warn('login error:', imError); // 登录失败的相关信息
      });
  }
}

/**
 * 退出im登录
 */
export const logout = () => {
  return function(dispatch, getState) {
    tim.logout()
      .then(function(imResponse) {
        console.log(imResponse.data); // 登出成功
      })
      .catch(function(imError) {
        console.warn('logout error:', imError);
      });
  }
}

/**
 * 创建房间
 */
export const createGroup = () => {
  return function(dispatch, getState) {
    tim.createGroup({
      ttype: TIM.TYPES.GRP_CHATROOM,
      name: 'dd的直播间',
    })
      .then(function(imResponse) {
        console.log(imResponse.data); // 登出成功
      })
      .catch(function(imError) {
        console.warn('logout error:', imError);
      });
  }
}

/**
 * 解散房间
 */
export const dismissGroup = () => {
  return function(dispatch, getState) {
    tim.dismissGroup()
      .then(function(imResponse) {
        console.log(imResponse.data); // 登出成功
      })
      .catch(function(imError) {
        console.warn('logout error:', imError);
      });
  }
}

/**
 * 进入房间
 */
export const joinGroup = (params: {
  groupID: string,
}): any => {
  return async function (): Promise<boolean> {
    return tim.joinGroup(params)
      .then(r => {
        console.log(r, 'rrr3');
        switch (imResponse?.data?.status) {
          case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
            break;
          case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
            console.log(imResponse.data.group); // 加入的群组资料
            return Promise.resolve(true);
          case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
            return Promise.resolve(true);
          default:
            break;
        };
        return Promise.resolve(false)
      })
      .catch(err => {
        console.log('joinGroup_err:', err)
        return Promise.resolve(false)
      })
  }
}

/**
 * 退出房间
 */
export const quitGroup = (groupId: string) => {
  return function(dispatch, getState) {
    tim.quitGroup(groupId)
      .then(function(imResponse) {
        console.log(imResponse.data); // 登出成功
      })
      .catch(function(imError) {
        console.log('logout error:', imError);
      });
  }
}

/**
 * 发送消息
 */
export const sendMessage = () => {
  return function(dispatch, getState) {
    let message = tim.createTextMessage({
      to: 'groupID',
      conversationType: TIM.TYPES.CONV_C2C,
      // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
      // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
      // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
      payload: {
        text: 'Hello world!'
      }
    });

    let promise = tim.sendMessage(message);
    promise.then(function(imResponse) {
      // 发送成功
      console.log(imResponse);
    }).catch(function(imError) {
      // 发送失败
      console.warn('sendMessage error:', imError);
    });
  }
}

/**
 * 修改群信息
 */
export const updateGroupProfile = (parmas: {
  name?: string, // 群名称
  muteAllMembers?: boolean, // 全体禁言
  introduction?: string, // 修改群公告(气泡)
}) => {
  return async function(dispatch, getState) {
    tim.updateGroupProfile({
      // groupID: 'group1',
      // name: 'new name', // 修改群名称
      introduction: '气泡', // 修改群公告
      // v2.6.0 起，群成员能收到群自定义字段变更的群提示消息，且能获取到相关的内容，详见 Message.payload.newGroupProfile.groupCustomField
      // groupCustomField: [{ key: 'group_level', value: 'high'}] // 修改群组维度自定义字段
    })
      .then(function(imResponse) {
        console.log(imResponse.data); // 登出成功
      })
      .catch(function(imError) {
        console.warn('logout error:', imError);
      });
  }
}

/**
 * 获取room成员列表信息
 */
// getGroupMemberList

/**
 * 获取room成员信息
 */

// getGroupMemberProfile

/**
 * 设置room成员禁言
 */
export const setGroupMemberMuteTime = (parmas: {
  groupID: string,
  userID: string,
  muteTime: number // 禁言10分钟；设为0，则表示取消禁言
}) => {
  return async function(dispatch, getState) {
    tim.setGroupMemberMuteTime(parmas)
      .then(function(imResponse) {
        console.log(imResponse.data); // 登出成功
      })
      .catch(function(imError) {
        console.warn('logout error:', imError);
      });
  }
}


/**
 * 收到 SDK 发生错误通知
 */
tim.on(TIM.EVENT.ERROR, function(event) {
  alert(event.data.message)
  // event.name - TIM.EVENT.ERROR
  // event.data.code - 错误码
  // event.data.message - 错误信息
});

/**
 * 收到被踢下线通知
 */
tim.on(TIM.EVENT.KICKED_OUT, function(event) {
  // event.name - TIM.EVENT.KICKED_OUT
  // event.data.type - 被踢下线的原因，例如 :
  //   - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
  //   - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
  //   - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢（v2.4.0起支持）。
});

/**
 * 更新im sdk状态
 */
export function updateIMSdkStatus(isReady: boolean) {
  return {type: imActionType.UPDATE_IM_SDK_READY_STATUS, payload: {isReady}}
}

/**
 * 更新用户登录状态
 */
interface paramsType {isOnLine?: boolean, userSig?: string};
export function updateUserStatus(params: paramsType) {
  const payload: paramsType = {};
  params.isOnLine && (payload.isOnLine = params.isOnLine);
  params.userSig && (payload.userSig = params.userSig);

  return {type: imActionType.UPDATE_USER_IM_STATUS, payload}
}

/**
 * 更新房间消息
 */
export function updateRoomMessage(message) {
  return {type: imActionType.UPDATE_ROOM_MESSAGES, payload: {message}}
}