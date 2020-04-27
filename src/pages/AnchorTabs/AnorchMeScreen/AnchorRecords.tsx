/**
 * 直播记录
 * AnchorRecords
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import withPage from '../../../components/HOCs/withPage';

const AnchorRecords = () =>  {
  return (
    <View style={styles.style}>
      <PrimaryText>回放</PrimaryText>
    </View>
  )
};

AnchorRecords.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
});

export default withPage(AnchorRecords);