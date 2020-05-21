// import {consts} from 'pili-streaming-react-native';
import liveActionTypes from '../constants/Live';
import { EMPTY_OBJ } from '../constants/freeze';

export interface LiveConfig {
  cover?: { // 封面
    uri?: string,
    name?: string,
    type?: string,
  },
  title?: string, // 标题
  // 美颜
  // 滤镜
}

export enum AttentionTypes {
  isAttention = '0',
  notAttention = '1',
}

// interface AudienceLivingOverInfo {
  
// }

// interface AnchorLivingOverInfo {
  
// }

interface InitStateTypes {
  // 直播配置
  liveConfig: LiveConfig,
  // 推流配置
  pusherConfig: any,
  livingGoods: Array<any>, // 直播商品管理
  livingGoodsQuantity: number, // 直播商品数量
  livingInfo?: {
    groupId: string, //
    watchNum: number, // 当前观看人次
    anchorLogo: string, //
    anchorName: string, //
    pushUrl?: string, // 推流地址
    pullUrl?: string, // 观看地址
    advance?: string, // 预告视频地址
    liveTime?: string, // 预告直播时间
    isAttention?: AttentionTypes, // 是否关注
    likeSum?: boolean, // 是
    bigPic?: string, // 
    liveGoodsNum?: string, // 直播商品数量
  },
  isLiveOver: boolean | undefined, // 所在房间直播是否结束(观众端)
  // livingOverInfo: AudienceLivingOverInfo | AnchorLivingOverInfo, // 结束时数据(观众端)
}

const DEFAULT_OPTIONS: any = {
  // outputUrl: "rtmp://pili-publish.qnsdk.com/sdk-live/111",
  // outputUrl: "rtmp://77154.livepush.myqcloud.com/live/test003?txSecret=e6aaf45458ce4f0626c0dafca4b6bf5a&txTime=5EB581FF",
  // outputUrl: "rtmp.youzfx.cn",
  camera: {cameraId: 1, cameraFrontMirror: false},
  audio: {bitrate: 32000, profile: 1, samplerate: 44100},
  video: {preset: 30, bitrate: 400000, profile: 1, fps: 60, videoFrontMirror: false},
  autopreview: true,
};

const INITIAL_STATE: InitStateTypes = {
  liveConfig: {
    cover: undefined,
    title: '',
  },
  pusherConfig: DEFAULT_OPTIONS,
  livingGoods: [],
  livingGoodsQuantity: 0,
  livingInfo: undefined,
  isLiveOver: undefined,
}

export default function live(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case liveActionTypes.UPDATE_LIVE_CONFIG:
      if (!action.payload.liveConfig) {
        return {...state, liveConfig: {cover: undefined, title: ''}};
      }
      return {...state, liveConfig: {...state.liveConfig, ...action.payload.liveConfig}};
    case liveActionTypes.UPDATE_PUSHER_CONFIG:
      return {...state, pusherConfig: {...state.pusherConfig, ...action.payload.pusherConfig}};
    case liveActionTypes.UPDATE_LIVING_INFO:
      return {...state, livingInfo: {...state.livingInfo, ...action.payload.livingInfo}};
    case liveActionTypes.UPDATE_LIVING_STATUS:
      return {...state, isLiveOver: action.payload.isLiveOver};
    default:
      return state;
  }
}