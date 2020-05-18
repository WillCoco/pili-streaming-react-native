/**
 * 分享赚
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {TinyText, SmallText, PrimaryText} from 'react-native-normalization-text';
import { Colors } from '../../constants/Theme';
import { radio } from '../../constants/Layout';

const ShareProfit = (props: {
  profit: string | number,
  textStyle?: StyleProp<any>,
  style?: StyleProp<any>,
  shareTextStyle?: StyleProp<any>,
  color?: string,
}) =>  {
  return (
    <View
      style={
        StyleSheet.flatten([
          styles.style,
          {borderColor: props.color},
          props.style
        ])}
    >
      <View style={StyleSheet.flatten([styles.shareWrapper, {backgroundColor: props.color}])}>
        <SmallText
          color="white"
          style={StyleSheet.flatten([styles.shareText, props.shareTextStyle])}
          numberOfLines={1}
        >
          分享
        </SmallText>
      </View>
      <SmallText
        style={StyleSheet.flatten([styles.profitText, {color: props.color}, props.textStyle])}
        numberOfLines={1}
      >
        ¥{props.profit}
      </SmallText>
    </View>
  )
};

ShareProfit.defaultProps = {
  color: Colors.basicColor
};

const styles = StyleSheet.create({
  style: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    overflow: 'hidden',
  },
  shareWrapper: {
    flex: -1
  },
  shareText: {
    marginHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  profitText: {
    flex: -1,
    marginHorizontal: 4,
    paddingVertical: 1,
    maxWidth: 100,
  },
});

export default ShareProfit;