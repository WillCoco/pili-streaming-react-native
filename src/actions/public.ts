import { STATUS_BAR_HEIGHT } from '../constants/Public'

export const getStatusBarHeight = (height: number) => {
  return {
    type: STATUS_BAR_HEIGHT,
    payload: height
  }
}