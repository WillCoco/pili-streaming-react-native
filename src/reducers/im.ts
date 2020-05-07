import {TIM} from '../helpers/tim';
import imActionTypes from '../constants/im';

// export type messageType = 'roomMessage' | 'enter' | 'leave' | 'follow' | 'unfollow' | 'order';
export enum MessageType  {
  roomMessage,
  enter,
  leave,
  follow,
  unfollow,
  order
}

export interface RoomMessageType {
  data: {
    userId: string,
    userName: string,
    userAvatar: string,
    text: string,
  },
  description: MessageType,
  extension: string
}

export interface RoomType {
  groupID: string,
  // type: string,
}

interface InitStateTypes {
  isIMSDKReady: boolean,
  isOnLine: boolean,
  userSig?: string,
  rooms?: Array<RoomType>,
  room?: RoomType,
  roomMessages: Array<RoomMessageType>,
}

const INITIAL_STATE: InitStateTypes = {
  isIMSDKReady: false, // sdk准备完成
  isOnLine: false, // 是否在线
  userSig: undefined, // 登录签名(自动登录?)
  room: undefined, // 所在房间的信息(im group + 观看等数据)
  roomMessages: [], // 房间消息
}

export default function homeData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case imActionTypes.UPDATE_IM_SDK_READY_STATUS:
      return {...state, isIMSDKReady: action.payload.isReady};
    case imActionTypes.UPDATE_USER_IM_STATUS:
      return {...state, isOnLine: action.payload.isReady, userSig: action.payload.userSig};
    case imActionTypes.UPDATE_ROOM_INFO:
      return {...state, room: action.payload.room};
    case imActionTypes.UPDATE_ROOMS:
      return {...state, rooms: action.payload.rooms};
    case imActionTypes.UPDATE_ROOM_MESSAGES:
      return {...state, roomMessages: action.payload.roomMessages};
    default:
      return state
  }
}