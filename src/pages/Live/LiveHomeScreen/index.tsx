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
  SafeAreaView,
} from 'react-native';
import LiveBanner from './LiveBanner';
import LiveHomeTabs from './LiveHomeTabs';
import withPage from '../../../components/HOCs/withPage';

const LiveHomeScreen = (props: any) : React.ReactElement =>  {
  console.log(props.safeTop, 'safeTop')
  const a = React.useState()
  
  return (
    <SafeAreaView
      style={StyleSheet.flatten([styles.wrapper])}
    >
      <View style={{marginTop: props.safeTop}}>
        <Text>搜索组件</Text>
      </View>
      <LiveBanner />
      <LiveHomeTabs />
    </SafeAreaView>
  )
};

LiveHomeScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default withPage(LiveHomeScreen, {
  statusBarOptions: {
    // hidden: true,
    // barStyle: 'dark-content',
  }
});