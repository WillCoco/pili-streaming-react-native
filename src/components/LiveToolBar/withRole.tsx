/**
 * 直播消息工具栏
 */
import React from 'react';
import LiveToolBar from './LiveToolBar';
import AnchorLiveToolBar from './AnchorLiveToolBar';

export enum Role {
  anchor,
  audience
};

export default (role: Role) => () => {
  if (role === Role.anchor) {
    return <AnchorLiveToolBar />
  }
  return <LiveToolBar />
};