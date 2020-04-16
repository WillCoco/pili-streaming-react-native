/**
 * 直播首页轮播
 */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  PanResponder,
  Image,
  StyleProp,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PagingList from '../../../components/PagingList';

interface LiveBannerProps {
  // bannerList?: any[],
  style?: StyleProp<any>,
  imageStyle?: StyleProp<any>,
}

const LiveBanner = (props: LiveBannerProps) : any =>  {
  const bannerList = [
    'https://sponsor-static.segmentfault.com/2778c80a0247bc4d241af08a4f76f12b.jpg',
    'https://sponsor-static.segmentfault.com/2778c80a0247bc4d241af08a4f76f12b.jpg',
    'https://sponsor-static.segmentfault.com/2778c80a0247bc4d241af08a4f76f12b.jpg'
  ];

  const renderItem = () => <Text>123</Text>

  const onRefresh = () => {};

  const onEndReached = () => {};
  return (
    <View
      style={StyleSheet.flatten([styles.wrapper, props.style])}
    >
      <PagingList
        size={10}
        numColumns={2}
        //item显示的布局
        renderItem={renderItem}
        //下拉刷新相关
        onRefresh={onRefresh}
        //加载更多
        onEndReached={onEndReached}
        // ItemSeparatorComponent={separator}
        keyExtractor={(item, index) => 'index' + index + item}
        initialNumToRender={14}
      />
    </View>
  )
};

LiveBanner.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default LiveBanner;