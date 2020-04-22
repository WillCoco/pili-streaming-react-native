/**
 * 导航返回键
*/
import React from 'react';
import {
  StyleSheet,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import {useNavigation} from '@react-navigation/native';
import Iconback from '../Iconfont/Iconback';
import Iconbacklight from '../Iconfont/Iconbacklight';
import Iconcloselight from '../Iconfont/Iconcloselight';
import withSafeArea from '../HOCs/withSafeArea';
import {pad} from '../../constants/Layout';

export interface NavBarProps {
  theme: 'light' | 'dark',
  icon: 'arrow' | 'close',
  style?: StyleProp<any>,
  safeTop?: number,
  position: 'left' | 'right',
}

const NavBack = (props: NavBarProps) => {
  const {goBack} = useNavigation();

  /**
   * Icon
   */
  let Icon;
  if (props.icon === 'close') {
    Icon = Iconcloselight;
  } else {
    if (props.theme === 'dark') {
      Icon = Iconback;
    } else {
      Icon = Iconbacklight;
    }
  }

  /**
   * 位置
   */
  const positionStyle: StyleProp<any> = {};
  positionStyle.top = (props?.safeTop || 0) + 10;
  positionStyle[props.position] = 0;

  return (
    <TouchableOpacity style={StyleSheet.flatten([styles.style, positionStyle, props.style])} onPress={() => goBack()}>
      <Icon />
    </TouchableOpacity>
  )
};

NavBack.defaultProps = {
  theme: 'dark',
  icon: 'arrow',
  position: 'left',
}

const styles = StyleSheet.create({
  style: {
    position: 'absolute',
    padding: pad,
  },
})

export default withSafeArea(NavBack);