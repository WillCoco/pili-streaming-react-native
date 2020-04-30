import { IS_LOGIN, TOKEN, SET_USER_INFO } from '../constants/User'

/**
 * 更改是否登录的状态
 */
export const toggleLoginState = (flag: boolean) => {
  return { type: IS_LOGIN, payload: flag }
}

/**
 * 设置 token
 */
export const setToke = (token: string) => {
  return { type: TOKEN, payload: token }
}

/**
 * 设置用户信息
 */
export const setUserInfo = (userInfo: any) => {
  return { type: SET_USER_INFO, payload: userInfo }
}