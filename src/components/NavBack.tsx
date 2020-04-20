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
import Iconback from '../components/Iconfont/Iconback';
import Iconbacklight from '../components/Iconfont/Iconbacklight';
import withSafeArea from '../components/HOCs/withSafeArea';
import {pad} from '../constants/Layout';

const NavBack = (props: {
  theme?: 'light' | 'dark',
  style?: StyleProp<any>,
  safeTop?: number,
}) => {
  const top = (props?.safeTop || 0) + 10
  const Icon = props.theme === 'dark' ? Iconback : Iconbacklight;

  const {goBack} = useNavigation();

  return (
    <TouchableOpacity style={StyleSheet.flatten([styles.style, {top}, props.style])} onPress={() => goBack()}>
      <Icon />
    </TouchableOpacity>
  )
};

NavBack.defaultProps = {
}

const styles = StyleSheet.create({
  style: {
    position: 'absolute',
    padding: pad,
  },
})

export default withSafeArea(NavBack);