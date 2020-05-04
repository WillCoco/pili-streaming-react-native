/**
 * 提现
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
import { sleep } from '../../../utils/tools';


const Withdraw = () =>  {
  const {navigate, goBack} = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  console.log(route.params?.card, '提现的银行卡')

  /**
   * 提交提现
   */
  const onSumbit = async () => {
    Toast.showLoading('');
    // const success = await dispatch(addBankCard());
    await sleep(1000)
    Toast.hide('')
    Toast.show('提现成功')
    goBack();
  };

  return (
    <View style={styles.style}>
      <NavBar
        leftTheme="light"
        title="提现"
        titleStyle={styles.navTitle}
        style={styles.nav}
      />
      <View style={styles.contentWrapper}>
        <PrimaryText>什么银行</PrimaryText>
        <PrimaryText>提现金额</PrimaryText>
        <PrimaryText>验证码</PrimaryText>
      </View>
     
      <ButtonRadius
        text="提交"
        style={styles.button}
        onPress={onSumbit}
      />
    </View>
  )
};

Withdraw.defaultProps = {
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

export default Withdraw;