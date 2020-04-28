/**
 * 直播数据分析
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import withPage from '../../../components/HOCs/withPage';

const LivesAnalyze = () =>  {
  return (
    <View style={styles.style}>
      <PrimaryText>数据分析</PrimaryText>
    </View>
  )
};

LivesAnalyze.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
});

export default withPage(LivesAnalyze);