/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const Iconclosebg = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64zM408.576 363.136a32 32 0 1 0-45.312 45.248l103.808 103.744-103.808 103.744a32 32 0 1 0 45.312 45.248l103.744-103.68 103.744 103.68a32 32 0 1 0 45.248-45.248l-103.744-103.68 103.744-103.808a32 32 0 0 0-45.248-45.248L512.32 466.88z"
        fill={getIconColor(color, 0, '#ff321b')}
      />
    </Svg>
  );
};

Iconclosebg.defaultProps = {
  size: 18,
};

export default Iconclosebg;
