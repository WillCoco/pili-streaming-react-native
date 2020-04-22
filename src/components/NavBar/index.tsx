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

interface NavBarProps {
  safeTop: number,
  title: string,
  left: (props: any) => any,
  right: (props: any) => any,
  leftWrapperStyle: StyleProp<any>,
  titleWrapperStyle: StyleProp<any>,
  rightWrapperStyle: StyleProp<any>,
  titleStyle: StyleProp<any>,
}

const NavBar = (props: NavBarProps) =>  {
  console.log(props, 'props8888888')
  const {goBack} = useNavigation();

  const LeftComponent = props.left;
  const RightComponent = props.right;
  return (
    <View style={StyleSheet.flatten([styles.style, {marginTop: props.safeTop}])}>
      <View style={StyleSheet.flatten([styles.leftWrapper, props.leftWrapperStyle])}>
        {
          LeftComponent ? <LeftComponent {...props} /> : (
            <TouchableOpacity onPress={() => goBack()} style={styles.leftWrapper}>
              <Iconback />
            </TouchableOpacity>
          )
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
};

const styles = StyleSheet.create({
  style: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.navDivider,
    backgroundColor: '#fff'
  },
  leftWrapper: {
    width: 44,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default withPage(NavBar);