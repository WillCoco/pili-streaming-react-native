/* eslint-disable */

import React from 'react';

import Icontv from './Icontv';
import Iconremove from './Iconremove';
import Iconclosebg from './Iconclosebg';
import Iconvideo from './Iconvideo';
import Iconadd from './Iconadd';
import Iconcartlight from './Iconcartlight';
import Iconarrowright from './Iconarrowright';
import Iconchecked from './Iconchecked';
import Iconchangecamera from './Iconchangecamera';
import Iconcloselight from './Iconcloselight';
import Iconback from './Iconback';
import Iconbacklight from './Iconbacklight';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'tv':
      return <Icontv {...rest} />;
    case 'remove':
      return <Iconremove {...rest} />;
    case 'closebg':
      return <Iconclosebg {...rest} />;
    case 'video':
      return <Iconvideo {...rest} />;
    case 'add':
      return <Iconadd {...rest} />;
    case 'cartlight':
      return <Iconcartlight {...rest} />;
    case 'arrowright':
      return <Iconarrowright {...rest} />;
    case 'checked':
      return <Iconchecked {...rest} />;
    case 'changecamera':
      return <Iconchangecamera {...rest} />;
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
