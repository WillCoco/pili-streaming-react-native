import { IS_LOGIN, TOKEN, SET_USER_INFO } from '../constants/User'

const INITIAL_STATE = {
  isLogin: false,
  token: '',
  userInfo: {}
}

export default function publicData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case IS_LOGIN:
      return { ...state, isLogin: action.payload }
    case TOKEN:
      return { ...state, token: action.payload }
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload }
    default:
      return state
  }
}