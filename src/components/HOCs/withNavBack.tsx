import React from 'react';
import withAttachment from './withAttachment';
import NavBack from '../../components/NavBack';

export interface optionTypes {
  navBackTheme?: 'light'
}

const withNavBack = (Component: React.FC, options?: optionTypes) => {
    const attachment = !!options?.navBackTheme && <NavBack theme={options.navBackTheme} />

    return withAttachment(Component, attachment)
}

export default withNavBack;
