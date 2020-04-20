/* eslint-disable */

import React from 'react';

import Iconback from './Iconback';
import Iconbacklight from './Iconbacklight';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'back':
      return <Iconback {...rest} />;
    case 'backlight':
      return <Iconbacklight {...rest} />;
  }

  return null;
};

export default IconFont;
