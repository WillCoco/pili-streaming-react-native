/**
 * 带头像 和 昵称的禁言弹窗
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {PrimaryText, T4} from 'react-native-normalization-text';
import { vw } from '../../../utils/metric';
import ButtonRadius from '../../Buttons/ButtonRadius';
import { radioLarge, pad, radio } from '../../../constants/Layout';
import { StyleProp } from 'react-native';
import { Colors } from '../../../constants/Theme';
import MaskContext from '../MaskContext';
import {Actions} from '../reducer';
import pxToDp from '../../../utils/px2dp';

const WithAvatar = (props: {
  avatar: any,
  name: string,
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
      <Image source={props.avatar} style={styles.avatar}/>
      <PrimaryText>{props.name}</PrimaryText>
      <View style={styles.btnsWrapper}>
        <ButtonRadius
          size={40}
          disabled={props.disabledLeft}
          text={props.leftBtnText}
          onPress={onPressLeft}
          style={StyleSheet.flatten([styles.button, styles.leftButton])}
        />
        <ButtonRadius
          size={40}
          disabled={props.disabledRight}
          text={props.rightBtnText}
          onPress={onPressRight}
          style={StyleSheet.flatten([styles.button, styles.rightButton])}
        />
      </View>
    </View>
  )
};

WithAvatar.defaultProps = {
  leftBtnText: '取消',
  rightBtnText: '禁言',
};

const styles = StyleSheet.create({
  style: {
    width: vw(86),
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: radioLarge,
    padding: pad * 2,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    maxWidth: vw(40),
    marginTop: pad * 2

  },
  avatar: {
    width: pxToDp(160),
    height: pxToDp(160),
  },
  btnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginTop: pad * 2
  },
  button: {
    width: 120,
    borderRadius: radio,
    marginTop: pad * 2
  },
  leftButton: {
    backgroundColor: Colors.lightGrey
  },
  rightButton: {

  }
});

export default WithAvatar;