/** 
 * 提供机型上下安全区域
 */
import React from 'react';
import { safeBottom, safeTop } from '../../constants/DeviceInfo';

interface componentProps {
  [key: string]: any
}

const withSafeArea = (Component: (props: componentProps) => React.ReactElement): React.FC => {
  return (props: componentProps): React.ReactElement => {
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
