/**
 * @author: Xu Ke
 * @date: 2020/1/8 5:58 PM
 * @Description: 404页面
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, ImageBackground, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';
import pxToDp from '../../utils/px2dp';
import pad from '../../constants/Layout';
import {PrimaryText} from 'react-native-normalization-text';



const RootError = (props) => {
  const {goBack, navigate, reset} = useNavigation();

  const goHome = () => {
    reset({
      index: 0,
      routes: [{ name: 'Root', params: {initialRoute: '首页'}}],
    });
  };
  
  return (
    <View style={styles.wrapper}>
      <View>
        <Image
          resizeMode="contain"
          source={images.errorPage}
          style={styles.img}
        />
        <PrimaryText style={styles.text}>页面出错</PrimaryText>
        <PrimaryText style={styles.link} onPress={goHome}>返回首页</PrimaryText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  title: {
    textAlign: 'center',
  },
  img: {
    width: pxToDp(380),
    height: pxToDp(360)
  },
  text: {
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
  },
});

export default RootError;
