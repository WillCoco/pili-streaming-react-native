/**
 * mask外壳
 * 透明,
 * 点击关闭,
 * 动画
*/
/**
 * 
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  TouchableWithoutFeedback,
} from 'react-native';
import MaskContext from './MaskContext';
import {Actions} from './reducer';

const defaultOptions = {
  canBgPressClose: true
}

const MaskWrapper = (props: {
  children: any,
  style: StyleProp<any>,
}) =>  {
  const [state, dispatch] = React.useContext(MaskContext);

  const [currentItem] = state?.list || {};
  const ops = {...defaultOptions, ...currentItem?.options};

  /**
   * 背景移除
   */
  const onPress = () => {
    dispatch({type: Actions.remove})
  }

  return (
    <TouchableWithoutFeedback disabled={!ops.canBgPressClose} onPress={onPress}>
      <View style={StyleSheet.flatten([styles.style, props.style, {height: currentItem ? 'auto' : 0}])}>
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  )
};

MaskWrapper.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  }
});

export default MaskWrapper;