import {Dispatch} from 'redux';
import liveActionType from '../constants/Live';
import {LiveConfig} from '../reducers/live';
import api from '../service/api';

/**
 * 更新直播参数
 */
interface liveConfigType {
  title?: string,
  cover?: string,
}

/**
 * 更新直播配置(标题、封面)
 */
export const updateLiveConfig = (liveConfig: LiveConfig) => {
  return {type: liveActionType.UPDATE_LIVE_CONFIG, payload: {liveConfig}}
}

/**
 * 选择商品开始直播
 */
interface startLiveParams {
  goodsIdList: Array<any>,
}
export const startLive = (params: startLiveParams) => {
  return async function(dispatch: Dispatch, getState: any) {
    const {cover, title} = getState().live?.liveConfig || {};
    const anchorId = getState().live?.liveConfig || {};
    return await api.apiStartLive({
      anchorId,
      goodsIdList: params.goodsIdList,
      title,
      smallPic: cover
    });
  }
}

/**
 * 开始、停止推流
 */
export const updateStarted = (started: boolean) => {
  return async function(dispatch: Dispatch, getState: any) {

    const pusherConfig = getState()?.live?.pusherConfig;
    if (started === pusherConfig.started) {
      return;
    }
    dispatch(updatePusherConfig({...pusherConfig, started}))
  }
}

/**
 * 切换摄像头
 */
export const updatecamera = () => {
  return async function(dispatch: Dispatch, getState: any) {
    const pusherConfig = getState()?.live?.pusherConfig;
    console.log()
    const {camera} = pusherConfig || {};
    const newCameraId = camera?.cameraId === 1 ? 0 : 1;
    dispatch(updatePusherConfig({...pusherConfig, camera: {...pusherConfig.camera, cameraId: 1}}));
  }
}

/**
 * 基础美颜
 */
export const updateFaceBeauty = (camera: 'front' | 'back') => {
  return async function(dispatch: Dispatch, getState: any) {
    const pusherConfig = getState()?.live?.pusherConfig;
    if (camera === pusherConfig.camera) {
      return;
    }
    dispatch(updatePusherConfig({...pusherConfig, camera}))
  }
}

/**
 * 更新推流配置
 */
export const updatePusherConfig = (pusherConfig: any) => {
  return {type: liveActionType.UPDATE_PUSHER_CONFIG, payload: {pusherConfig}}
}
