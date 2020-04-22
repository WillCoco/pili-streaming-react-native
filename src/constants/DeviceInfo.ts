/**
 * 设备相关信息
*/
import {Platform, StatusBar, NativeModules} from 'react-native';
import Layout from './Layout';
const {StatusBarManager} = NativeModules;


const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Layout.window

/**
 * platform
 */
export const isAndroid = () => Platform.OS === 'android';

export const isIOS = () => Platform.OS === 'ios';

export const isIphoneX = () =>
  Platform.OS === 'ios' && (DEVICE_WIDTH === 375 && DEVICE_HEIGHT === 812);

export const isIphone11 = () =>
  Platform.OS === 'ios' && (DEVICE_WIDTH === 414 && DEVICE_HEIGHT === 896);

// 刘海屏
export const isNotchScreen = () => {
  if (Platform.OS !== 'ios') {
    return false;
  }

  return isIphoneX() || isIphone11();
};

/**
 * 上下安全区域
 */
let iosStatusBarHeight;
if (isIOS()) {
  StatusBarManager.getHeight((h: number) => {
    iosStatusBarHeight = h
  })
}

export const safeTop = isAndroid ? StatusBar.currentHeight : iosStatusBarHeight;

// export const safeTop = isAndroid ? StatusBar.currentHeight : (
//   isNotchScreen() ? 44 : 20
// )

export const safeBottom = isNotchScreen() ? 20 : 0;

