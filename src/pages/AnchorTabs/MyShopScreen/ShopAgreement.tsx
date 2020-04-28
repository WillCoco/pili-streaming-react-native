/**
 * 店家须知
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import NavBar from '../../../components/NavBar';

const ShopAgreement = () =>  {
  return (
    <View style={styles.style}>
      <NavBar title="商家入驻" />
    </View>
  )
};

ShopAgreement.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
});

export default ShopAgreement;