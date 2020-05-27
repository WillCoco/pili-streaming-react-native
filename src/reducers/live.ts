// import {consts} from 'pili-streaming-react-native';
import liveActionTypes from '../constants/Live';
import {EMPTY_OBJ} from '../constants/freeze';
import {consts} from 'pili-streaming-react-native';
import {Platform} from 'react-native';
import window from '../constants/Layout';

const isAndroid = Platform.OS === 'android';
console.log(window, '12300000');

export interface LiveConfig {
  cover?: {
    // 封面
    uri?: string;
    name?: string;
    type?: string;
  };
  title?: string; // 标题
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
  liveConfig: LiveConfig;
  // 推流配置
  pusherConfig: any;
  livingGoods: Array<any>; // 直播商品管理
  livingGoodsQuantity: number; // 直播商品数量
  livingInfo?: {
    groupId: string; //
    watchNum: number; // 当前观看人次
    anchorLogo: string; //
    anchorName: string; //
    pushUrl?: string; // 推流地址
    pullUrl?: string; // 观看地址
    advance?: string; // 预告视频地址
    liveTime?: string; // 预告直播时间
    isAttention?: AttentionTypes; // 是否关注
    likeSum?: boolean; // 是
    bigPic?: string; //
    liveGoodsNum?: string; // 直播商品数量
  };
  isLiveOver: boolean | undefined; // 所在房间直播是否结束(观众端)
  isAnchorLiveOver: boolean | undefined; // 所在房间直播是否结束(主播端违规等后台)
}

export enum CameraType {
  front = 'front',
  back = 'back',
}

const INIT_STREAMING_CONFIG: any = {
  rtmpURL: '',
  camera: CameraType.front,
  started: true, // 推流
  faceBeautyEnable: true, // 内置美颜 为true才能设置美白磨皮红润
  faceBeautySetting: {
    beautyLevel: 0, //磨皮程度
    whiten: 0, //美白程度
    redden: 0, //红润程度
  },
  // previewMirrorEnable:true, // 镜像
  profile: {
    videoStreamingSetting: {
      fps: 30,
      bps: 1000 * 1024,
      maxFrameInterval: 60,
      encodeOrientation: consts.videoEncodeOrientations.portrait,
      h264Profile: isAndroid
        ? consts.videoH264Profiles_android.baseline
        : consts.videoH264Profiles_iOS.baseline31,
      customVideoEncodeSize: {
        // 根据窗口设置镜头远近
        width: window.window.width,
        height: window.window.height,
      },
    },
    audioStreamingSetting: {
      rate: 44100,
      bitrate: 96 * 1024,
    },
    encodingSize: consts.videoEncodings.e480,
    avCodecType: isAndroid
      ? consts.avCodecTypes_android.SW_VIDEO_WITH_SW_AUDIO_CODEC
      : consts.avCodecTypes_iOS.PLH264EncoderType_AVFoundation,
    cameraStreamingSetting: {
      resolution: isAndroid
        ? consts.cameraResolutions_android.MEDIUM_RATIO_16_9
        : consts.cameraResolutions_iOS.AVCaptureSessionPresetMedium,
      focusMode: consts.cameraFocusModes.continuousVideo,
      videoOrientation: consts.cameraVideoOrientations.portrait,
    },
    microphoneSteamingSetting: {
      sampleRate: consts.microphoneSampleRates.r44100,
      channel: consts.microphoneChannels.mono,
      isAecEnable: false,
    },
    quicEnable: false,
    bitrateAdjustMode: consts.bitrateAdjustModes.auto,
    adaptiveBitrateRange: {
      minBitrate: 1024,
      maxBitrate: 1024 * 1024,
    },
    encoderRCMode: consts.encoderRCModes.bitratePriority,
    streamInfoUpdateInterval: 5,
  },
  style: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
};
const DEFAULT_OPTIONS: any = {
  // outputUrl: "rtmp://pili-publish.qnsdk.com/sdk-live/111",
  // outputUrl: "rtmp://77154.livepush.myqcloud.com/live/test003?txSecret=e6aaf45458ce4f0626c0dafca4b6bf5a&txTime=5EB581FF",
  // outputUrl: "rtmp.youzfx.cn",

  // camera: {cameraId: 1, cameraFrontMirror: false},
  // audio: {bitrate: 32000, profile: 1, samplerate: 44100},
  // video: {preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false},
  // autopreview: true,
  ...INIT_STREAMING_CONFIG,
  profile: {
    ...INIT_STREAMING_CONFIG.profile,
    video: INIT_STREAMING_CONFIG.profile.videoStreamingSetting,
    audio: INIT_STREAMING_CONFIG.profile.audioStreamingSetting,
  },
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
  isAnchorLiveOver: undefined,
};

export default function live(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case liveActionTypes.UPDATE_LIVE_CONFIG:
      if (!action.payload.liveConfig) {
        return {...state, liveConfig: {cover: undefined, title: ''}};
      }
      console.log(action.payload.liveConfig, '???pp');
      return {
        ...state,
        liveConfig: {...state.liveConfig, ...action.payload.liveConfig},
      };
    case liveActionTypes.UPDATE_PUSHER_CONFIG:
      return {
        ...state,
        pusherConfig: {...state.pusherConfig, ...action.payload.pusherConfig},
      };
    case liveActionTypes.UPDATE_LIVING_INFO:
      return {
        ...state,
        livingInfo: {...state.livingInfo, ...action.payload.livingInfo},
      };
    case liveActionTypes.UPDATE_LIVING_STATUS:
      return {...state, isLiveOver: action.payload.isLiveOver};
    case liveActionTypes.UPDATE_ANCHOR_LIVING_STATUS:
      return {...state, isAnchorLiveOver: action.payload.isAnchorLiveOver};
    default:
      return state;
  }
}
