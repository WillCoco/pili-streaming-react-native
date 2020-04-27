/**
 * 直播店铺商品管理
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import withPage from '../../../components/HOCs/withPage';


const AnchorLiveGoodsManage = () =>  {
  return (
    <View style={styles.style}>
      <PrimaryText>dianpu shangp guanli </PrimaryText>
    </View>
  )
};

AnchorLiveGoodsManage.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
});

export default withPage(AnchorLiveGoodsManage);