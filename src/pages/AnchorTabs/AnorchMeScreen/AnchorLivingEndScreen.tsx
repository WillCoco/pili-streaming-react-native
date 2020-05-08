/**
 * 主播端直播结束
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {PrimaryText, SmallText, T4} from 'react-native-normalization-text'
import LiveWindow from '../../../components/LiveWindow';
import withPage from '../../../components/HOCs/withPage';
import images from '../../../assets/images';
import {Colors} from '../../../constants/Theme';

const data = {
  duration: '1h 34min',
  like: '9900000',
  audience: '400000',
  newFans: '30000',
  orderNum: '900',
  turnoverAmount: '100,0000'
}

const AnorchLivingEndScreen = (props: any) : any =>  {
  return (
    <View style={styles.wrapper}>
      <PrimaryText>直播已结束</PrimaryText>
      <PrimaryText>直播ID:7777777</PrimaryText>
      <SmallText></SmallText>
      <View>
        <T4 style={styles.title}>本场直播数据</T4>
        <T4 style={styles.title}>本场销量最佳商品</T4>
        <T4 style={styles.title}>本场销量人气商品</T4>
      </View>
    </View>
  )
};

AnorchLivingEndScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: Colors.basicColor,
  }
});

export default withPage(AnorchLivingEndScreen, {
  statusBarOptions: {
  }
});