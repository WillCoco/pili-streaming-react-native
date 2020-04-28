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

  const onPress = (i: number) => {
    setFocusedIndex(i);
    props.onChecked(i);
  }

  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      <SmallText style={styles.title}>{props.title}</SmallText>
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
      >
        {
          props.data.map((d, i) => {
            return (
              <GoodsCategoryCell
                key={`category_${i}`}
                quantity={d.q}
                title={d.t}
                isChecked={focusedIndex === i}
                onPress={() => onPress(i)}
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
  title: '选择分类'
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