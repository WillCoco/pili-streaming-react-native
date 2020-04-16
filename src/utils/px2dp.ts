import { Dimensions } from 'react-native'

// 设备的宽度，单位是 dp
const deviceWidthDp = Dimensions.get('window').width

// 设计稿的宽度，单位是 px
const uiWidthPx = 750

/**
 * px 转 dp
 * @param {Number} uiElePx UI 图像素
 */
const pxToDp = (uiElePx: number) => {
  return uiElePx * deviceWidthDp / uiWidthPx
}

export default pxToDp