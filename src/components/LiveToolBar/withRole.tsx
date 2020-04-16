/**
 * 直播消息工具栏
 */
import React from 'react';
import LiveToolBar from './LiveToolBar'

export enum Role {
  anchor,
  audience
};

export default (role: Role) => () => {
  const options = role === Role.anchor ? {} : {};
  return <LiveToolBar {...options} />
};