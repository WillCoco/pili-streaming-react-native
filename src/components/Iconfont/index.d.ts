/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'guanzhu' | 'tv' | 'remove' | 'closebg' | 'video' | 'add' | 'cartlight' | 'arrowright' | 'checked' | 'changecamera' | 'closelight' | 'back' | 'backlight';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
