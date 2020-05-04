/**
 * 添加银行卡
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-tiny-toast';
import NavBar from '../../../components/NavBar';
import ButtonRadius from '../../../components/Buttons/ButtonRadius';
import {Colors} from '../../../constants/Theme';
import {vw} from '../../../utils/metric';
import {pad} from '../../../constants/Layout';
import {addBankCard} from '../../../actions/asset';

const ROW_HEIGHT = 120;

const defaultCards: [] = [];
const AddBankCard = () =>  {
  const {navigate, goBack} = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  /**
   * 提交绑定
   */
  const onSumbit = async () => {
    Toast.showLoading('');
    const success = await dispatch(addBankCard());
    Toast.hide('')
    Toast.show('添加成功')
    if (success) {
      goBack();
    }
  };

  return (
    <View style={styles.style}>
      <NavBar
        leftTheme="light"
        title="添加银行卡"
        titleStyle={styles.navTitle}
        style={styles.nav}
      />
      <View style={styles.contentWrapper}>
        <PrimaryText>姓名</PrimaryText>
        <PrimaryText>银行卡号</PrimaryText>
      </View>
     
      <ButtonRadius
        text="提交"
        style={styles.button}
        onPress={onSumbit}
      />
    </View>
  )
};

AddBankCard.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: Colors.bgColor
  },
  nav: {
    backgroundColor: Colors.basicColor,
  },
  navTitle: {
    color: '#fff',
    
  },
  contentWrapper: {
    flex: 1,
  },
  button: {
    width: vw(80),
    marginBottom: pad
  },
});

export default AddBankCard;