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
import images from '../../../assets/images';

interface LiveBannerProps {
  // bannerList?: any[],
  style?: StyleProp<any>,
  imageStyle?: StyleProp<any>,
}

const LiveBanner = (props: LiveBannerProps) : React.ReactElement =>  {
  const bannerList = [images.liveBanner];
  return (
    <View
      style={StyleSheet.flatten([styles.wrapper, props.style])}
    >
      <Swiper>
        {
          bannerList.map((banner, i) => {
            const bannerSource = typeof banner === 'string' ? {uri: banner} : banner;
            return (
              <Image
                key={`banner_${i}`}
                source={bannerSource}
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