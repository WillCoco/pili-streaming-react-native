const images : {
  [key: string]: any
} = {
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
  // 默认直播间背景
  get livingbg() {
    return require('./livingbg.png')
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
  // 购物
  get shoppingIcon() {
    return require('./shoppingIcon.png')
  },
  // 转发
  get forwardIcon() {
    return require('./forwardIcon.png')
  },
  // 用户消息等级tag
  get userLv1() {
    return require('./userLv1.png')
  },
  get userLv2() {
    return require('./userLv2.png')
  },
  get userLv3() {
    return require('./userLv3.png')
  },
  get userLv4() {
    return require('./userLv4.png')
  },
  get userLv5() {
    return require('./userLv4.png')
  },
  get userLv6() {
    return require('./userLv4.png')
  },
}

export default images;