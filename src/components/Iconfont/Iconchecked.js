/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const Iconchecked = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1011.2C236.8 1011.2 12.8 787.2 12.8 512S236.8 12.8 512 12.8s499.2 224 499.2 499.2-224 499.2-499.2 499.2zM441.6 595.2L326.4 480c-12.8-12.8-38.4-12.8-51.2 0-19.2 19.2-19.2 38.4 0 57.6l121.6 121.6s6.4 6.4 12.8 6.4c6.4 12.8 12.8 19.2 25.6 19.2s25.6 0 32-12.8L768 377.6c12.8-12.8 12.8-38.4 0-51.2-12.8-12.8-38.4-12.8-51.2 0L441.6 595.2z m0 0"
        fill={getIconColor(color, 0, '#ff321b')}
      />
    </Svg>
  );
};

Iconchecked.defaultProps = {
  size: 18,
};

export default Iconchecked;
