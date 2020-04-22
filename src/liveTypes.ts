/**
 * 用户信息
*/
export interface UserInfoProps {
  userName: string,
  id: number,
  avatar: string,
}

// 主播信息
export interface AnchorInfoProps extends UserInfoProps {

  // 粉丝数量
  // 直播数量
  // 是否在直播
}

/**
 * 播放类型
 */
export enum PlayerType {
  living, // 直播
  teaser, // 预告
  record, // 回放
}