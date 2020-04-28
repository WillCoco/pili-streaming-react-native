import * as React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {T1, SmallText} from 'react-native-normalization-text';
import {useNavigation} from '@react-navigation/native';
import NavBar from '../../../components/NavBar';
import withPage from '../../../components/HOCs/withPage';
import Avatar from '../../../components/Avatar';
import images from '../../../assets/images/index';
import {vw, vh} from '../../../utils/metric';
import {pad} from '../../../constants/Layout';

const PublishScreen = (props: any) =>  {
  const {navigate, reset} = useNavigation();

  /**
   * tab的返回到 我的 
   */
  const onBackPress = () => {
    reset({
      index: 0,
      routes: [{ name: 'Root', params: {initialRoute: '我的'}}],
    });
  }
  return (
    <View style={styles.style}>
      <NavBar leftTheme="light" title="" style={styles.navWrapper} onLeftPress={onBackPress} />
      <Avatar size={65} style={{marginTop: props.safeTop + vh(8)}} />
      <T1 style={styles.nameText}>主播昵称</T1>
      <SmallText style={styles.followText}>{0}粉丝</SmallText>
      <View style={styles.entranceWrapper}>
        <TouchableOpacity
          style={styles.entranceImgWrapper}
          onPress={() => navigate('CreateLiveScreen')}
        >
          <Image
            style={StyleSheet.flatten([styles.entranceImg])}
            source={images.publishLive}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.entranceImg}
          onPress={() => navigate('CreateTeaserScreen')}
        >
          <Image
            style={styles.entranceImg}
            source={images.publishTeaser}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
};

PublishScreen.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    alignItems: 'center'
  },
  nameText: {
    color: '#fff',
    marginTop: pad
  },
  followText: {
    color: '#fff',
  },
  entranceWrapper: {
    flex: 1,
    width: vw(72),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(6)
  },
  entranceImgWrapper: {
  },
  entranceImg: {
    width: vw(30),
    height: vw(81),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent'
  },
});

export default withPage(PublishScreen, {
  statusBarOptions: {
    barStyle: 'light-content',
    backgroundColor: 'transparent'
  }
});