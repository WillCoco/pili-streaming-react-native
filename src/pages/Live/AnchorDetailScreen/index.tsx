/**
 * 主播详情
 */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  PanResponder,
} from 'react-native';

const LiveHomeScreen = () : any =>  {
  return (
    <View
      style={styles.wrapper}
    >
      <Text>主播详情</Text>
    </View>
  )
};

LiveHomeScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default LiveHomeScreen;