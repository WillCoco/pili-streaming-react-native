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
import {useNavigation} from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import LiveBanner from './LiveBanner';
import LiveHomeTabs from './LiveHomeTabs';
import withPage from '../../../components/HOCs/withPage';
import {Colors} from '../../../constants/Theme';
import {login} from '../../../actions/im';

const LiveHomeScreen = (props: any): React.ReactElement =>  {
  console.log(props.safeTop, 'safeTop')
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    // 测试登录
    // dispatch(login({userID: 'test01'}));
  }, [])

  return (
    <SafeAreaView
      style={StyleSheet.flatten([styles.wrapper])}
    >
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
    backgroundColor: Colors.basicColor
  },
});

export default withPage(LiveHomeScreen, {
  statusBarOptions: {
    // barStyle: 'dark-content',
  }
});