/**
 * 用户信息
*/
declare const UserInfoProps = {
  userName: string,
  id: number,
  avatar: string,
}

// 主播信息
declare interface AnchorInfoProps extends UserInfoProps {

  // 粉丝数量
  // 直播数量
  // 是否在直播
}