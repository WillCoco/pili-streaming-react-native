/**
 * 直播首页
 */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  PanResponder,
} from 'react-native';
import LiveBanner from './LiveBanner';
import LiveHomeTabs from './LiveHomeTabs';
import withPage from '../../../components/HOCs/withPage';

const LiveHomeScreen = () : any =>  {
  return (
    <View
      style={styles.wrapper}
    >
      <Text>搜索组件</Text>
      <LiveBanner/>
      <LiveHomeTabs/>
    </View>
  )
};

LiveHomeScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default withPage(LiveHomeScreen);