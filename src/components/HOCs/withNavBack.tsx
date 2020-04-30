import React from 'react';
import withAttachment from './withAttachment';
import NavBack, {NavBarProps} from '../NavBar/NavBack';

export interface optionTypes {
  navBackTheme?: 'light' | 'dark',
  navBackIcon?: 'arrow' | 'close',
  navBackPosition?: 'left' | 'right'
}

const withNavBack = (Component: React.FC, options?: optionTypes) => {
  const attachment = !!options?.navBackTheme && (
    <NavBack
      theme={options.navBackTheme}
      icon={options.navBackIcon}
      position={options.navBackPosition}
    />
  )

  return withAttachment(Component, attachment)
}

export default withNavBack;
