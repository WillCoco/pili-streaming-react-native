import pxToDp from "./px2dp";

/**
 * 检测是否滑动到底部
 * @param e 事件参数
 */
export default function checkIsBottom(e: any, onReachBottomDistance: number = 100) {
  let offsetY = e.nativeEvent.contentOffset.y // 滑动距离
  let contentSizeHeight = e.nativeEvent.contentSize.height // 内容高度
  let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height // scrollView 高度

  if (offsetY + oriageScrollHeight + onReachBottomDistance >= contentSizeHeight) {
    return true
  }

  return false
}
