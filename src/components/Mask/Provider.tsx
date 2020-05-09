
/**
 * 
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  reducer,
  Actions,
  MaskContentTypes,
  MaskContent
} from './reducer';
import MaskWrapper from './MaskWrapper';
import pickMaskContent from './pickMaskContent';
import MaskContext from './MaskContext';

const defaultState: {
  list: Array<MaskContent>,
} = {
  list: [], // 弹窗队列
}

const MaskProvider = (props: any) =>  {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  const [currentItem] = state.list || [];
  const MaskContent = currentItem ? pickMaskContent(currentItem.type) : null;
  const maskContentProps = currentItem?.data;

  console.log(MaskContent, maskContentProps, state, 1232133333333)

  return (
    <MaskContext.Provider value={[state, dispatch]}>
      {props.children}
      <MaskWrapper style={StyleSheet.flatten([styles.style, props.style])}>
        {MaskContent ? <MaskContent {...maskContentProps} /> : null}
      </MaskWrapper>
    </MaskContext.Provider>
  )
};

MaskProvider.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
});

export default MaskProvider;