import { IS_LOGIN, TOKEN } from '../constants/User'

const INITIAL_STATE = {
  isLogin: false,
  token: ''
}

export default function publicData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload
      }
    case TOKEN:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state
  }
}