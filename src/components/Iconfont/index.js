/* eslint-disable */

import React from 'react';

import Iconcloselight from './Iconcloselight';
import Iconback from './Iconback';
import Iconbacklight from './Iconbacklight';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'closelight':
      return <Iconcloselight {...rest} />;
    case 'back':
      return <Iconback {...rest} />;
    case 'backlight':
      return <Iconbacklight {...rest} />;
  }

  return null;
};

export default IconFont;
