/**
 * 带有上边框的弹窗
 */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {PrimaryText, T4} from 'react-native-normalization-text';
import { vw } from '../../../utils/metric';
import { radioLarge, pad } from '../../../constants/Layout';
import { StyleProp } from 'react-native';
import { Colors } from '../../../constants/Theme';
import MaskContext from '../MaskContext';
import {Actions} from '../reducer';
import pxToDp from '../../../utils/px2dp';

const WithBorderTop = (props: {
  title: string,
  text: string,
  leftBtnText: string,
  rightBtnText: string,
  disabledLeft?: boolean,
  disabledRight?: boolean,
  onPressLeft: (v?: any) => any,
  onPressRight: (v?: any) => any,
  textStyle: StyleProp<any>,
  titleStyle: StyleProp<any>,
}) =>  {
  const [, dispatch] = React.useContext(MaskContext)

  /**
   * 左默认关闭
   */
  const onPressLeft = () => {
    props.onPressLeft ? props.onPressLeft() : dispatch({type: Actions.REMOVE});
  }
  /**
   * 左默认关闭
   */
  const onPressRight = () => {
    props.onPressRight();
    dispatch({type: Actions.REMOVE});
  }

  return (
    <View style={styles.style}>
      <T4 style={StyleSheet.flatten([styles.title, props.titleStyle])}>{props.title}</T4>
      <PrimaryText style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.text}</PrimaryText>
      <View style={styles.btnsWrapper}>
        <Text 
          onPress={onPressLeft}
          style={StyleSheet.flatten([styles.button, styles.leftButton])}
        >
          {props.leftBtnText}
        </Text>
        <Text 
          onPress={onPressRight}
          style={StyleSheet.flatten([styles.button, styles.rightButton])}
        >
          {props.rightBtnText}
        </Text>
      </View>
    </View>
  )
};

WithBorderTop.defaultProps = {
  leftBtnText: '取消'
};

const styles = StyleSheet.create({
  style: {
    width: vw(86),
    maxWidth: pxToDp(570),
    backgroundColor: '#fff',
    borderRadius: radioLarge,
    padding: pad * 2,
    alignItems: 'center',
    borderTopWidth: 10,
    borderTopColor: Colors.basicColor,
  },
  title: {
    textAlign: 'left',
    alignSelf: 'stretch',
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'left',
    lineHeight: pxToDp(40),
    marginTop: pad * 2

  },
  btnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    marginTop: pad * 4
  },
  button: {
    fontWeight: 'bold'
  },
  leftButton: {
    color: Colors.lightGrey
  },
  rightButton: {
    marginLeft: pxToDp(70),
    color: Colors.basicColor,
  }
});

export default WithBorderTop;