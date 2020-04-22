/**
 * 主播端直播结束
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {PrimaryText, SmallText} from 'react-native-normalization-text'
import LiveWindow from '../../../../components/LiveWindow';
import withPage from '../../../../components/HOCs/withPage';

const AnorchLivingEndScreen = (props: any) : any =>  {
  return (
    <View>
      <PrimaryText>直播已结束</PrimaryText>
      <PrimaryText>直播ID:7777777</PrimaryText>
      <SmallText></SmallText>
      <PrimaryText>本场直播数据</PrimaryText>
      <PrimaryText>本场销量最佳商品</PrimaryText>
      <PrimaryText>本场销量人气商品</PrimaryText>
    </View>
  )
};

AnorchLivingEndScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default withPage(AnorchLivingEndScreen, {
  statusBarOptions: {
  }
});