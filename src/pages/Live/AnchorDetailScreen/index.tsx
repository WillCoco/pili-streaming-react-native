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
import {PrimaryText, SmallText, T3, scale} from 'react-native-normalization-text';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import AnorchDetailAvatar from './AnorchDetailAvatar';
import LiveTabPage from './LiveTabPage';
import ShopTabPage from './ShopTabPage';
import {Colors} from '../../../constants/Theme';
import withPage from '../../../components/HOCs/withPage';
import {vw} from '../../../utils/metric';
import ScrollableTab from '../../../components/ScrollableTab';
import FollowButton from '../../../components/FollowButton';
import {pad} from '../../../constants/Layout';

const AnchorDetail = () =>  {
  const isLiving = true;
  const bgUrl = 'https://goss.veer.com/creative/vcg/veer/800water/veer-302989341.jpg';
  const trailers = [1, 2]
  const liveRecords = [1, 2, 3]

  const onFollowPress = (isFollow: boolean) => {
    console.log(isFollow, 'isFollow');
  }
  return (
    <View
      style={styles.wrapper}
    >
      <View style={styles.headerBlcokWrapper}>
        <View style={styles.headerWrapper}>
          <Image style={styles.headerBg} source={{uri: bgUrl}} resizeMode="cover" resizeMethod="resize" />
          <AnorchDetailAvatar
            isLiving={isLiving}
            onPress={() => {}}
            style={{marginTop: 36}}
          />
          <T3 style={styles.nickName}>主播昵称</T3>
          <View style={styles.row}>
            <PrimaryText style={styles.anchorInfo}>粉丝: 100</PrimaryText>
            <View style={styles.strip} />
            <PrimaryText style={styles.anchorInfo}>直播: 20</PrimaryText>
          </View>
          <FollowButton
            isFollow={false}
            onPress={onFollowPress}
            style={{paddingHorizontal: 40, marginTop: pad}}
            size={{width: 200, height: 26}}
          />
        </View>
      </View>
      <ScrollableTabView
        initialPage={0}
        tabBarActiveTextColor="#000"
        tabBarUnderlineStyle={{
          backgroundColor: Colors.basicColor,
          width: 50,
          alignSelf: 'center',
          left: vw(25) - 25,
        }}
        renderTabBar={(props) => {
          console.log(props, 'renderTabBar')
          return (
            <ScrollableTab {...props} />
          )
        }}
      >
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
    backgroundColor: '#fff',
  },
  headerBlcokWrapper: {
    height: vw(75),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  nickName: {
    color: '#fff',
    marginTop: pad,
  },
  anchorInfo: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center'
  },
  strip: {
    width: 1,
    height: '80%',
    backgroundColor: '#fff',
    marginHorizontal: pad * 1.5
  }
});

export default withPage(AnchorDetail, {
  navBackOptions: {
    navBackTheme: 'light'
  }
});