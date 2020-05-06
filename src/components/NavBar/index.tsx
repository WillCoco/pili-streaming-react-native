/**
 * 自定义导航
 */
import * as React from 'react';
import { Text, TouchableOpacity, StyleProp } from 'react-native';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import withPage from '../HOCs/withPage';
import Iconback from '../Iconfont/Iconback';
import { Colors } from '../../constants/Theme';
import Iconbacklight from '../Iconfont/Iconbacklight';
import { pad } from '../../constants/Layout';

interface NavBarProps {
  safeTop: number,
  title: string,
  left: (props: any) => any,
  right?: (props: any) => any,
  style?: StyleProp<any>,
  leftWrapperStyle?: StyleProp<any>,
  titleWrapperStyle?: StyleProp<any>,
  rightWrapperStyle?: StyleProp<any>,
  titleStyle?: StyleProp<any>,
  leftTheme?: 'light' | 'dark',
  onLeftPress?: () => void,
}

const NavBar = (props: NavBarProps) =>  {
  const {goBack} = useNavigation();

  const LeftComponent = props.left;
  const RightComponent = props.right;

 /**
   * 左侧事件
   */
  const onLeftPress = () => {
    props.onLeftPress ? props.onLeftPress() : goBack()
  }

  /**
   * 左侧
   */
  const defaultLeftComponent = (
    <TouchableOpacity onPress={onLeftPress} style={styles.leftWrapper}>
      {props.leftTheme === 'light' ? <Iconbacklight /> : <Iconback />}
    </TouchableOpacity>
  );

  // console.log(props.style, 'navstyle')

  return (
    <View style={StyleSheet.flatten([styles.style, {paddingTop: props.safeTop, height: 44 + props.safeTop}, props.style])}>
      <View style={StyleSheet.flatten([styles.leftWrapper, props.leftWrapperStyle])}>
        {
          LeftComponent ? <LeftComponent {...props} /> : defaultLeftComponent
        }
      </View>
      <View style={StyleSheet.flatten([styles.titleWrapper, props.titleWrapperStyle])}>
        <Text style={StyleSheet.flatten([styles.title, props.titleStyle])}>{props.title}</Text>
      </View>
      <View style={StyleSheet.flatten([styles.rightWrapper, props.rightWrapperStyle])}>
        {
          RightComponent ? <RightComponent {...props} /> : null
        }
      </View>
    </View>
  )
};

NavBar.defaultProps = {
  leftTheme: 'dark'
};

const styles = StyleSheet.create({
  style: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.navDivider,
    backgroundColor: '#fff',
  },
  leftWrapper: {
    width: 34,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 1,
  },
  leftText: {

  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600'
  },
  rightWrapper: {
    // width: 34,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: pad,
    flex: -1,
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});

export default withPage(NavBar);