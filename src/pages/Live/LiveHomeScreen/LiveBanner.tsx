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

interface LiveBannerProps {
  // bannerList?: any[],
  style?: StyleProp<any>,
  imageStyle?: StyleProp<any>,
}

const LiveBanner = (props: LiveBannerProps) : React.ReactElement =>  {
  const bannerList = [
    'https://sponsor-static.segmentfault.com/2778c80a0247bc4d241af08a4f76f12b.jpg',
    'https://sponsor-static.segmentfault.com/2778c80a0247bc4d241af08a4f76f12b.jpg',
    'https://sponsor-static.segmentfault.com/2778c80a0247bc4d241af08a4f76f12b.jpg'
  ];
  return (
    <View
      style={StyleSheet.flatten([styles.wrapper, props.style])}
    >
      <Swiper>
        {
          bannerList.map((banner, i) => {
            return (
              <Image
                key={`banner_${i}`}
                source={{uri: banner}}
                resizeMode="cover"
                resizeMethod="resize"
                style={StyleSheet.flatten([styles.image, props.imageStyle])}
              />
            )
          })
        }
      </Swiper>
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