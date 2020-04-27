/**
 * 货物分类单元
 */
import * as React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StyleProp,
  TouchableOpacity
} from 'react-native';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import { Colors } from '../../constants/Theme';

interface GoodsCategoryCellProps {
  title?: string,
  isChecked: boolean,
  textColor?: string,
  checkedTextColor?: boolean,
  background?: string,
  checkedBackground?: string,
  data: Array<any>,
  quantity?: number,
  style?: StyleProp<any>,
  onPress: () => any
}

const GoodsCategoryCell = (props: GoodsCategoryCellProps) =>  {
  const textColor = props.isChecked ? props.checkedTextColor : props.textColor;
  const backgroundColor = props.isChecked ? props.checkedBackground : props.background;

  return (
    <TouchableOpacity style={styles.style} onPress={props.onPress}>
      <View style={StyleSheet.flatten([styles.style, props.style, {backgroundColor}])}>
        <PrimaryText style={{color: textColor}}>{props.title}</PrimaryText>
      </View>
      <View style={styles.quantityWrapper}>
        <SmallText>{props.quantity}</SmallText>
      </View>
    </TouchableOpacity>
  )
};

GoodsCategoryCell.defaultProps = {
  title: '货物分类',
  onPress: () => {},
  textColor: '#555',
  checkedTextColor: Colors.basicColor,
  background: Colors.bgColor1,
  checkedBackground: Colors.opacityBasicColor,
};

const styles = StyleSheet.create({
  style: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
  }
});

export default GoodsCategoryCell;