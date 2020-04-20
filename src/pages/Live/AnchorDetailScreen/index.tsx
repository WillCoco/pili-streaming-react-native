/**
 * 主播详情
 */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  PanResponder,
} from 'react-native';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import AnorchDetailAvatar from './AnorchDetailAvatar';
import LiveTabPage from './LiveTabPage';
import ShopTabPage from './ShopTabPage';
import {Colors} from '../../../constants/Theme';
import withPage from '../../../components/HOCs/withPage';
import {vw} from '../../../utils/metric';

const AnchorDetail = () =>  {
  const isLiving = true;
  const bgUrl = 'https://goss.veer.com/creative/vcg/veer/800water/veer-302989341.jpg';
  const trailers = [1, 2]
  const liveRecords = [1, 2, 3]
  return (
    <View
      style={styles.wrapper}
    >
      <View style={styles.headerBlcokWrapper}>
        <View style={styles.headerBlcokWrapper}>
          <Image style={styles.headerBg} source={{uri: bgUrl}} resizeMode="cover" resizeMethod="resize" />
          <AnorchDetailAvatar
            isLiving={isLiving}
            onPress={() => {}}
          />
        </View>
      </View>
      <ScrollableTabView>
        <LiveTabPage
          tabLabel="直播"
          isLiving={isLiving}
          trailers={trailers}
          liveRecords={liveRecords}
        />
        <ShopTabPage
          tabLabel="店铺"
        />
      </ScrollableTabView>
    </View>
  )
};

AnchorDetail.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerBlcokWrapper: {
    height: vw(75),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default withPage(AnchorDetail, {
  navBackOptions: {
    navBackTheme: 'light'
  }
});