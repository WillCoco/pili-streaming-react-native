/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const Iconarrowright = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M384 349.866667l166.4 166.4L384 682.666667a41.258667 41.258667 0 0 0 0 59.733333 41.258667 41.258667 0 0 0 59.733333 0l196.266667-196.266667a41.258667 41.258667 0 0 0 0-59.733333l-196.266667-196.266667A42.24 42.24 0 1 0 384 349.866667z"
        fill={getIconColor(color, 0, '#cccccc')}
      />
    </Svg>
  );
};

Iconarrowright.defaultProps = {
  size: 18,
};

export default Iconarrowright;
