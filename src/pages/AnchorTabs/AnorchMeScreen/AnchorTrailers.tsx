/**
 * 主播端直播结束
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import LiveWindow from '../../../components/LiveWindow';
import withPage from '../../../components/HOCs/withPage';

const AnorchLivingEndScreen = (props: any) : any =>  {
  return (
    <View>
      <PrimaryText>预告</PrimaryText>
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