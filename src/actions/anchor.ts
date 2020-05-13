import anchorTypes from '../constants/Anchor'
/**
 * 设置主播信息
 */
export const setAnchorInfo = (anchorInfo: any) => {
  return {type: anchorTypes.SET_ANCHOR_INFO, payload: {anchorInfo}}
}