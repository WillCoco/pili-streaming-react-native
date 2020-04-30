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
      // barStyle: 'light-content',
      // backgroundColor: 'transparent',
    };
  
    const statusBarProps = React.useRef({
      ...defaultStatusBarProps,
      ...options,
    });


    const isFocused = useIsFocused();

    React.useEffect(() => {
      if (isFocused) {
        if (statusBarProps.current.barStyle) {
          StatusBar.setBarStyle(statusBarProps.current.barStyle);
        }

        if (isAndroid() && statusBarProps.current.backgroundColor) {
          StatusBar.setBackgroundColor(statusBarProps.current.backgroundColor);
        }
      }
    }, [isFocused, statusBarProps]);

    return (
      <>
        {<StatusBar {...statusBarProps} />}
        <Component
          {...props}
        />
      </>
    ) 
  }
}

export default withStatusBar;
