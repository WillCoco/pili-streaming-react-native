/**
 * 折扣价 划线价格
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {SmallText, PrimaryText} from 'react-native-normalization-text';
import { radio, pad } from '../../constants/Layout';
import { Colors } from '../../constants/Theme';

interface DiscountPriceProps {
  price: string | number,
  discountPrice: string | number,
  priceStyle?: StyleProp<any>,
  discountPriceStyle?: StyleProp<any>,
  style?: StyleProp<any>,
}

const DiscountPrice = (props: DiscountPriceProps) =>  {
  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      <PrimaryText style={StyleSheet.flatten([styles.discountPrice, props.discountPriceStyle])}>¥{props.discountPrice}</PrimaryText>
      <SmallText color="grey" style={StyleSheet.flatten([styles.price, props.priceStyle])}>{props.price}</SmallText>
    </View>
  )
};

DiscountPrice.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1
  },
  price: {
    // color: Colors.basicColor
    textDecorationLine: 'line-through'
  },
  discountPrice: {
    color: Colors.basicColor,
    marginRight: pad / 2
  }
});

export default DiscountPrice;