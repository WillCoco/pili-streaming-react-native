import { CommonActions } from '@react-navigation/native';
import { IS_LOGIN, TOKEN, SET_USER_INFO } from '../constants/User'
import { getNavigation } from '../navigation/RootNavgation'
import { Dispatch } from 'redux';

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

/**
 * 清除登录信息
 */
export const clearLoginStatus = (options: {
  reset2Login: boolean
} = {
  reset2Login: true
}) => {
  return function(dispatch: Dispatch<any>, getState: any) {
    // 清除
    dispatch(toggleLoginState(false));
    dispatch(setToke(""));
    dispatch(setUserInfo({}));

    if (options.reset2Login) {
      const navigation: any = getNavigation();
      console.log(navigation, 'navigation')
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Home' },
            {
              name: 'Profile',
              params: { user: 'jane' },
            },
          ],
        })
      );
    }
  }
}