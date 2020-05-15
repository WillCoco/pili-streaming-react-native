/**
 * 直播组货选择分类
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StyleProp,
} from 'react-native';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import GoodsCategoryCell from './GoodsCategoryCell'
import { Colors } from '../../constants/Theme';
import { pad } from '../../constants/Layout';

interface GoodsCategoryScrollProps {
  title?: string,
  data: Array<any>,
  style: StyleProp<any>,
  onChecked: (i: number) => any
}

const GoodsCategoryScroll = (props: GoodsCategoryScrollProps) => {
  const [focusedIndex, setFocusedIndex] = React.useState(0)

  const onPress = (id: number, i: number) => {
    setFocusedIndex(i);
    props.onChecked(i);
  }


  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      {props.title && <SmallText style={styles.title}>{props.title}</SmallText>}
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
      >
        {
          props.data.map((d, i) => {
            const brand = d || {};
            return (
              <GoodsCategoryCell
                key={`category_${i}`}
                // quantity={brand.quantity}
                title={brand.categoryName}
                isChecked={focusedIndex === i}
                onPress={() => onPress(brand.categoryId, i)}
                style={{
                  borderTopWidth: i === 0 ? StyleSheet.hairlineWidth : 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: Colors.navDivider,
                }}
              />
            )
          })
        }
      </ScrollView>
    </View>
  )
};

GoodsCategoryScroll.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
  },
  title: {
    color: Colors.darkGrey,
    textAlign: 'center',
    paddingVertical: 12
  }
});

export default GoodsCategoryScroll;