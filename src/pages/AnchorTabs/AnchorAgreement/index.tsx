/**
 * 主播入驻协议
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import NavBar from '../../../components/NavBar';
import {Colors} from '../../../constants/Theme';
import {vw} from '../../../utils/metric';
import {pad} from '../../../constants/Layout';
import agreement from './agreement';

const ROW_HEIGHT = 120;

const AnchorAgreement = () =>  {
 
  return (
    <View style={styles.style}>
      <NavBar
        leftTheme="light"
        title="主播入驻协议"
        titleStyle={styles.navTitle}
        style={styles.nav}
      />
      
    </View>
  )
};

AnchorAgreement.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  },
  nav: {
    backgroundColor: Colors.basicColor,
  },
  navTitle: {
    color: '#fff',
  },
});

export default AnchorAgreement;