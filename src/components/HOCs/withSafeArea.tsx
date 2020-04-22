/** 
 * 提供机型上下安全区域
 * todo: 参数泛型
 */
import React from 'react';
import { safeBottom, safeTop } from '../../constants/DeviceInfo';

export interface componentProps {
  [key: string]: any
}

const withSafeArea = (Component: any): React.FC => {
  return (props: any): React.ReactElement => {
    return (
      <Component
        {...props}
        safeTop={safeTop}
        safeBottom={safeBottom}
      />
    ) 
  }
}

export default withSafeArea;
