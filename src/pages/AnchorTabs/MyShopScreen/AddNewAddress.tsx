/**
 * 添加地址
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import NavBar from '../../../components/NavBar';
import {SmallText} from 'react-native-normalization-text'

const AddNewAddress = () =>  {

  /**
   * 保存
   */
  const save = () => {
    alert('baocun')
  };

  return (
    <View style={styles.style}>
      <NavBar
        title="添加新地址"
        right={(
          <SmallText color="white" onPress={save}>保存</SmallText>
        )}
      />
    </View>
  )
};

AddNewAddress.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  }
});

export default AddNewAddress;