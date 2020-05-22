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
import {apiAnchorParticular} from '../../../service/api';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {EMPTY_OBJ} from '../../../constants/freeze';

const AnchorDetail = () =>  {
  const isLiving = true;
  const bgUrl = 'https://goss.veer.com/creative/vcg/veer/800water/veer-302989341.jpg';
  const trailers = [1, 2]
  const liveRecords = [1, 2, 3]
  const route = useRoute()
  const anchorId = route?.params?.anchorId || ''
  const userId = useSelector(state => state?.userData?.userInfo?.userId) || ''
  const [anchorDetail, setAnchorDetail] = React.useState(EMPTY_OBJ)
  const PAGE_SIZE = 14

  const onFollowPress = (isFollow: boolean) => {
    console.log(isFollow, 'isFollow');
  }

  React.useEffect(() => {
    const params = {
      anchorId,
      pageNo: 1,
      pageSize: PAGE_SIZE,
      userId
    }

    apiAnchorParticular(params)
      .then((res: any) => {
        console.log(res, 124231532152315)
        setAnchorDetail(res?.data);
      })
      .catch(console.warn);
  }, []);

  return (
    <View
      style={styles.wrapper}
    >
      <View style={styles.headerBlcokWrapper}>
        <View style={styles.headerWrapper}>
          <Image style={styles.headerBg} source={{uri: bgUrl}} resizeMode="cover" resizeMethod="resize" />
          <AnorchDetailAvatar
            isLiving={anchorDetail?.liveStatus === 2}
            onPress={() => {}}
            style={{marginTop: 36}}
            source={anchorDetail?.anchorLogo}
          />
          <T3 style={styles.nickName}>{anchorDetail?.anchorName || '主播'}</T3>
          <View style={styles.row}>
            <PrimaryText style={styles.anchorInfo}>粉丝: {anchorDetail?.fansNum || 0}</PrimaryText>
            <View style={styles.strip} />
            <PrimaryText style={styles.anchorInfo}>直播: {anchorDetail?.liveNum || 0}</PrimaryText>
          </View>
          <FollowButton
            isFollow={anchorDetail?.isAttention}
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