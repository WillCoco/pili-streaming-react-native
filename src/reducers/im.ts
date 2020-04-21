import {TIM} from '../helpers/tim';
import imActionTypes from '../constants/im';

interface MessageType {
  ID: string,
  type: string,
  payload: {
    text: string
  },
  to: string, // userID
  from: string, // userID
  time: number,
  status: string,
  conversationID: string,
  conversationType: TIM.TYPES.CONV_C2C | TIM.TYPES.CONV_GROUP | TIM.TYPES.CONV_SYSTEM,
}

interface InitStateTypes {
  isIMSDKReady: boolean,
  isOnLine: boolean,
  userSig?: string,
  roomMessages: MessageType[],
}

const INITIAL_STATE: InitStateTypes = {
  isIMSDKReady: false, // sdk准备完成
  isOnLine: false, // 是否在线
  userSig: undefined, // 登录签名(自动登录?)
  roomMessages: [], // 房间消息
}

export default function homeData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case imActionTypes.UPDATE_IM_SDK_READY_STATUS:
      return {...state, isIMSDKReady: action.payload.isReady};
    case imActionTypes.UPDATE_USER_IM_STATUS:
      return {...state, isOnLine: action.payload.isReady, userSig: action.payload.userSig};
    case imActionTypes.UPDATE_ROOM_MESSAGES:
      return {...state, roomMessages: action.payload.message};
    default:
      return state
  }
}