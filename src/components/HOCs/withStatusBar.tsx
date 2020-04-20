import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { isAndroid } from '../../constants/DeviceInfo';

export interface optionTypes extends StatusBarProps {

}

const withStatusBar = (Component: React.FC, options?: optionTypes) => {
  return (props: any): React.ReactElement => {
    const defaultStatusBarProps = {
      translucent: true,
      hidden: false,
      barStyle: 'light-content',
      backgroundColor: 'transparent',
    };
  
    const statusBarProps = {
      ...defaultStatusBarProps,
      ...options,
    };

    const isFocused = useIsFocused();
    React.useEffect(() => {
      if (isFocused) {
        if (statusBarProps.barStyle) {
          StatusBar.setBarStyle(statusBarProps.barStyle);
        }

        if (isAndroid() && statusBarProps.backgroundColor) {
          StatusBar.setBackgroundColor(statusBarProps.backgroundColor);
        }
      }
    }, [isFocused, statusBarProps]);

    return (
      <>
        <StatusBar {...statusBarProps} />
        <Component
          {...props}
        />
      </>
    ) 
  }
}

export default withStatusBar;
