/** 
 * 提供机型上下安全区域
 * todo: 参数泛型
 */
import React from 'react';
import {useSelector} from 'react-redux';
import {safeBottom} from '../../constants/DeviceInfo';

export interface componentProps {
  [key: string]: any
}

const withSafeArea = (Component: any): React.FC => {
  return (props: any): React.ReactElement => {
    const statusBarHeight = useSelector((state) => state?.publicData?.statusBarHeight)

    return (
      <Component
        {...props}
        safeTop={statusBarHeight || 0}
        safeBottom={safeBottom}
      />
    ) 
  }
}

export default withSafeArea;
