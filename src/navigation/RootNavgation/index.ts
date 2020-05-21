import * as React from 'react';

export const navigationRef = React.createRef();

export function getNavigation() {
  return navigationRef.current;
}