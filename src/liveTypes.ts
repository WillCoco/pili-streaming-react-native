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
export enum MediaType {
  teaser = '1', // 预告
  living = '2', // 直播
  record = '3', // 回放
}

/**
 * 用户角色
 */
export enum UserRole {
  anchor, // 主播
  audience // 观众
}

/**
 * 是否关注
 */
export enum Attention {
  notAttention = '0',
  isAttention = '1',
}

/**
 * 是否关注参数
 */
export enum AttentionParams {
  attention = '1',
  cancelAttention = '2',
}

/**
 * 用户等级
 */
export enum UserLevel {
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
}
