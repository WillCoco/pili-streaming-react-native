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
import {apiUserLiveBanner} from '../../../service/api';

interface LiveBannerProps {
  // bannerList?: any[],
  style?: StyleProp<any>,
  imageStyle?: StyleProp<any>,
}

const LiveBanner = (props: LiveBannerProps) : React.ReactElement =>  {

  const [bannerList, setBannerList] = React.useState([]);

  React.useEffect(() => {
    apiUserLiveBanner().then((res: any) => {
      setBannerList(res)
    })
  }, [])

  return (
    <View
      style={StyleSheet.flatten([styles.wrapper, props.style])}
    >
      <Swiper
        showsPagination={false} // FIXME:圆点不随着图切换
      >
        {
          bannerList.map((banner, i) => {
            const bannerSource = typeof banner?.bimgobject === 'string' ? {uri: banner?.bimgobject} : banner?.bimgobject;
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