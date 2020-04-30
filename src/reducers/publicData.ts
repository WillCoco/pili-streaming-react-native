import { STATUS_BAR_HEIGHT, IS_LOGIN } from '../constants/Public'

const INITIAL_STATE = {
  statusBarHeight: 0,
  isLogin: false
}

export default function publicData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case STATUS_BAR_HEIGHT:
      return {
        ...state,
        statusBarHeight: action.payload
      }
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload
      }
    default:
      return state
  }
}