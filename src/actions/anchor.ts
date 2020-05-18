import anchorTypes from '../constants/Anchor';
import {Dispatch} from 'redux';
import {apiEnterLive} from '../service/api';
import {updateLivingInfo} from '../actions/live';

/**
 * 设置主播信息
 */
export const setAnchorInfo = (anchorInfo: any) => {
  return {type: anchorTypes.SET_ANCHOR_INFO, payload: {anchorInfo}}
}

/**
 * 获取主播信息
 */
// interface GetAnchorInfoParam {
//   liveId: string | number
//   userId: string | number
//   dispatch: Dispatch
// }

// export const setAnchorInfo = (params: GetAnchorInfoParam) => {
//   return function(dispatch: Dispatch<any>, getState: any) {
//     apiEnterLive(params)
//       .then((res: any) => {
//         // const safeRes = res || {};
//         console.log(res, '进入列表');
//         res.watchNum = res.watchNum - 1; // 这里重新会重复加人数
//         dispatch(updateLivingInfo(res))
//         setAnchorInfo(res);
//       })
//     return {type: anchorTypes.SET_ANCHOR_INFO, payload: {anchorInfo}}
//   }
// }