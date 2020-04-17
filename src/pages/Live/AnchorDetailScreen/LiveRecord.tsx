/**
 * 回放卡片
 */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  
} from 'react-native';
import {PrimaryText, SmallText, H2, scale} from 'react-native-normalization-text';
import images from '../../../assets/images';
import {pad, radio} from '../../../constants/Layout';
import {vw} from '../../../utils/metric';

const LiveRecord = (props: {
  img: any,
  title: string,
  time: string,
  viewTimes: number,
  goodsQuantity: number,
}) => (
  <View style={styles.style}>
    <Image source={props.img} style={styles.img} />
    <View style={styles.contentWrapper}>
      <PrimaryText style={styles.title} numberOfLines={2} ellipsizeMode="tail">{props.title}</PrimaryText>
      <SmallText style={styles.timeText}>{props.time}</SmallText>
      <SmallText style={styles.line3Text}>{props.viewTimes}次观看 | {props.goodsQuantity}件宝贝</SmallText>
    </View>
  </View>
)

LiveRecord.defaultProps = {
  img: images.liveCover,
  title: '直播标题',
  time: '2020.01.01',
  viewTimes: 0,
  goodsQuantity: 0,
}

const styles = StyleSheet.create({
  style: {
    flexDirection: 'row',
    paddingVertical: pad,
  },
  img: {
    height: 90,
    width: 160,
    marginRight: pad,
    borderRadius: radio
  },
  contentWrapper: {
    flex: 1,
  },
  title: {
    flex: 1,
    lineHeight: scale(18)
  },
  rowLine2: {
    flexDirection: 'row',
  },
  
  timeText: {

  },
  line3Text: {
  }
});

export default LiveRecord;