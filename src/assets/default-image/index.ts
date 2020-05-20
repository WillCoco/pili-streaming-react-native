const images : {
  [key: string]: any
} = {
  // 默认头像
  get userAvatarSmall() {
    return require('./userAvatarSmall.png')
  },
  // 默认商品封面
  get goodCover() {
    return require('./goodCover.png')
  },
  // 默认直播、预告、回放封面
  get livingCover() {
    return require('./livingCover.png')
  },
  // 默认直播背景
  get livingBg() {
    return require('./livingBg.png')
  },
}

export default images;