import { STATUS_BAR_HEIGHT } from '../constants/Public'

/**
 * 获取状态栏高度
 * @param height 高度
 */
export const getStatusBarHeight = (height: number) => {
  return { type: STATUS_BAR_HEIGHT, payload: height }
}
