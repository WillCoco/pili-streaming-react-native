/**
 * @author: Xu Ke
 * @date: 2020/1/8 6:21 PM
 * @Description: 防止render闪退, 不能捕获子孙组件
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import FallbackUI from '../FallbackUI';

export interface optionTypes {
  fallbackomponent?: any
}

const withSafeComponent = (componentFn: (props: any) => any, options?: optionTypes) => {
  const {fallbackomponent} = options || {};
  try {
    return componentFn;
  } catch (err) {
    console.log(err, 'page_crash');
    return fallbackomponent || FallbackUI;
  }
};

export default withSafeComponent;
