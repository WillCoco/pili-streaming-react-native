/**
 * 主播账单
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {PrimaryText, T4} from 'react-native-normalization-text';
import ImageText from '../../../components/ImageText';
import ButtonOutLine from '../../../components/Buttons/ButtonOutLine';
import NavBar from '../../../components/NavBar';
import withPage from '../../../components/HOCs/withPage';
import { Colors } from '../../../constants/Theme';
import { pad } from '../../../constants/Layout';
import images from '../../../assets/images/index';

const AnchroBill = () =>  {
  return (
    <View style={styles.style}>
      <NavBar title="账单" />
    </View>
  )
};

AnchroBill.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
});

export default withPage(AnchroBill, {
  statusBarOptions: {
    barStyle: 'light-content',
  }
});