import {consts} from 'pili-streaming-react-native';
import {isAndroid} from '../constants/DeviceInfo';
import liveActionTypes from '../constants/Live';

interface InitStateTypes {
  // 直播配置
  liveConfig: {
    cameraIndex: number, // 摄像头
    cover: any, // 封面
    title: string, // 标题
  },
  // 推流配置
  pusherConfig: any,
  returnAddresses: Array<any>, // 寄回地址
}

const DEFAULT_OPTIONS: any = {
  outputUrl: "rtmp://pili-publish.qnsdk.com/sdk-live/111",
  camera: {cameraId: 1, cameraFrontMirror: false},
  audio: {bitrate: 32000, profile: 1, samplerate: 44100},
  video: {preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false},
  autopreview: true
};

const INITIAL_STATE: InitStateTypes = {
  liveConfig: {
    cameraIndex: 0,
    cover: undefined,
    title: '',
  },
  pusherConfig: DEFAULT_OPTIONS,
  returnAddresses: [],
}

export default function live(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case liveActionTypes.UPDATE_LIVE_CONFIG:
      return {...state, liveConfig: {...state.liveConfig, ...action.payload.liveConfig}};
    case liveActionTypes.UPDATE_PUSHER_CONFIG:
      return {...state, pusherConfig: {...state.pusherConfig, ...action.payload.pusherConfig}};
    default:
      return state;
  }
}