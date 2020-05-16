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
  TouchableHighlight,
} from 'react-native';
import Swiper from 'react-native-swiper';
import images from '../../../assets/images';
import {apiUserLiveBanner} from '../../../service/api';
import {useNavigation} from '@react-navigation/native';

interface LiveBannerProps {
  // bannerList?: any[],
  style?: StyleProp<any>,
  imageStyle?: StyleProp<any>,
}

const LiveBanner = (props: LiveBannerProps) : React.ReactElement =>  {

  const [bannerList, setBannerList] = React.useState([]);
  const {navigate} = useNavigation();

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
        autoplay={true}
      >
        {
          bannerList.map((banner: any, i) => {
            const bannerSource = typeof banner?.bimgobject === 'string' ? {uri: banner?.bimgobject} : banner?.bimgobject;
            return (
              <TouchableHighlight 
                key={`banner_${i}`}
                onPress={() => navigate('LivingRoomScreen', {liveId: banner?.extend})}
              >
                <Image
                  key={`banner_${i}`}
                  source={bannerSource}
                  resizeMode="cover"
                  resizeMethod="resize"
                  style={StyleSheet.flatten([styles.image, props.imageStyle])}
                />
              </TouchableHighlight>
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