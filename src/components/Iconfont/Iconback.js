/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const Iconback = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872L387.872 512.032l318.016 318.016c18.752 18.752 18.752 49.12 0 67.872-9.344 9.408-21.632 14.08-33.92 14.08z"
        fill={getIconColor(color, 0, '#555555')}
      />
    </Svg>
  );
};

Iconback.defaultProps = {
  size: 18,
};

export default Iconback;
