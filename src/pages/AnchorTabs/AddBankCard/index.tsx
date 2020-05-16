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
import FormRow from '../../../components/FormRow';
import withPage from '../../../components/HOCs/withPage';
import {apiBindingBankCard} from '../../../service/api';
import Mask from '../../../components/Mask';

const ROW_HEIGHT = 120;

const defaultCards: [] = [];
const AddBankCard = (props: any) =>  {
  const {navigate, goBack} = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [cardNum, setCardNum] = React.useState('');
  let [maskList, maskDispatch] = React.useContext(Mask.context);

  /**
   * 提交绑定
   */
  const onSumbit = async () => {
    // Toast.showLoading('');
    // const success = await dispatch(addBankCard());
    // Toast.hide('')
    // Toast.show('添加成功', {
    //   position: 0
    // })
    // if (success) {
    //   goBack();
    // }
    const params = {
      bankAccountNo: '1234',
    }

    apiBindingBankCard(params).then(res => {
      // console.log(res, 423155231);
      // TODO:
      maskDispatch({
      type: Mask.Actions.PUSH,
      payload: {
        type: Mask.ContentTypes.Normal,
        data: {
          text: '为了您的资金安全，请先前往实名认证！',
          title: '提示',
          rightBtnText: '去实名认证',
          onPressRight: () => {alert(421)}
        }
      }});
    })
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
          placeholder={'请输入真实姓名'}
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
        <PrimaryText style={styles.tip}>为了资金安全，请填写{'*大勇'}名下单银行卡</PrimaryText>
      </View>
      <ButtonRadius
        text="提交"
        style={StyleSheet.flatten([styles.button, {marginBottom: props.safeBottom}])}
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
  },
});

export default withPage(AddBankCard);