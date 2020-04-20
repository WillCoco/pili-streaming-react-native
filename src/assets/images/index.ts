export default {
  // 默认头像
  get userAvatar() {
    return require('./userAvatar.jpg')
  },
  // 默认播封面
  get liveCover() {
    return require('./userAvatar.jpg')
  },
  // 默认banner
  get liveBanner() {
    return require('./userAvatar.jpg')
  },
  // ❤️ 喜欢
  get heart() {
    return require('./heart.png')
  },
  // 直播中icon
  get livingTypeIcon() {
    return require('./livingTypeIcon.png')
  },
  // 回放、预告背景icon
  get liveTypeBgIcon() {
    return require('./liveTypeBgIcon.png')
  },
}