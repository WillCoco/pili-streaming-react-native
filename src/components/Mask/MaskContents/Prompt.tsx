/**
 * 
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  StyleProp,
} from 'react-native';
import {PrimaryText, SmallText, T4} from 'react-native-normalization-text';
import { vw } from '../../../utils/metric';
import ButtonRadius from '../../Buttons/ButtonRadius';
import { radioLarge, pad, radio } from '../../../constants/Layout';
import { Colors } from '../../../constants/Theme';
import MaskContext from '../MaskContext';
import {Actions} from '../reducer';

const Normal = (props: {
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
  const [value, setValue] = React.useState('')

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
    const isSuccess = props.onPressRight(value);
    if (isSuccess) {
      dispatch({type: Actions.REMOVE})
    }
  }

  return (
    <View style={styles.style}>
      <T4 style={StyleSheet.flatten([styles.title, props.titleStyle])}>{props.title}</T4>
      <TextInput
        autoFocus
        value={value}
        onChangeText={setValue}
        placeholder="气泡内容"
        maxLength={20}
        style={{paddingVertical: 4, marginTop: pad, textAlign: 'left', alignSelf: 'stretch'}}
      />
      <View style={styles.divider} />
      <SmallText color="grey" style={{alignSelf: 'flex-start', color: Colors.lightGrey}}>最多20字</SmallText>
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

Normal.defaultProps = {
  leftBtnText: '取消'
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
  btnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginTop: pad * 2
  },
  button: {
    width: 120,
    borderRadius: radio,
  },
  leftButton: {
    backgroundColor: Colors.lightGrey
  },
  rightButton: {

  },
  divider: {
    borderTopWidth: 1,
    borderColor: Colors.bgColor,
    alignSelf: 'stretch',
  },
});

export default Normal;