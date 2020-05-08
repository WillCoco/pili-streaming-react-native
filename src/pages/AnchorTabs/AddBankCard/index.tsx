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
import {Input} from 'react-native-elements';
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
import FormRow from '../../../components/FormRow'

const ROW_HEIGHT = 120;

const defaultCards: [] = [];
const AddBankCard = () =>  {
  const {navigate, goBack} = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [cardNum, setCardNum] = React.useState('');

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
        <FormRow 
          title={'姓名:'}
          value={name}
          onChangeText={setName}
          bottomDivider
        />
        <FormRow 
          title={'银行卡号:'}
          placeholder={'请填写银行卡号'}
          value={cardNum}
          onChangeText={setCardNum}
        />
        <PrimaryText style={styles.tip}>为了资金安全，请填写*大勇名下单银行卡</PrimaryText>
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
  tip: {
    color: Colors.basicColor,
    padding: pad
  },
  button: {
    width: vw(80),
    marginBottom: pad
  },
});

export default AddBankCard;