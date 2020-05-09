/**
 * 
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text'

const Normal = () =>  {
  return (
    <View style={styles.style}>
      <PrimaryText>normal</PrimaryText>
    </View>
  )
};

Normal.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
});

export default Normal;