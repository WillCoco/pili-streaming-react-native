/**
 * 寄回地址管理
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import NavBar from '../../../components/NavBar';
import withPage from '../../../components/HOCs/withPage';

const AddressManage = () =>  {
  return (
    <View style={styles.style}>
      <NavBar title="寄回地址管理" />

    </View>
  )
};

AddressManage.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
});

export default withPage(AddressManage, {
  statusBarOptions: {
    barStyle: 'dark-content'
  }
});