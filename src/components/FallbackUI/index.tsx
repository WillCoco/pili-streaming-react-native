/**
 * @author: Xu Ke
 * @date: 2020/1/8 5:58 PM
 * @Description: 404页面
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
// import {useNavigation} from 'react-navigation-hooks';

const RootError = (props) => {
  // const {goBack} = useNavigation();
  const goBack = () => {}
  return (
    <View style={styles.wrapper}>
      <View>
        <ImageBackground
          resizeMode="contain"
          // source={require('../images/error404.png')}
          style={styles.img}
        />
        <Text style={styles.text}>页面出错</Text>
        <Text style={styles.link} onPress={() => goBack()}>返回</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 15,
  },
  title: {
    textAlign: 'center',
  },
  img: {

  },
  text: {
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
  },
});

export default RootError;
