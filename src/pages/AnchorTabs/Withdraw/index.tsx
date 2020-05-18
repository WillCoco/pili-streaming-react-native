/**
 * 提现
 */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Image,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {PrimaryText, TinyText, T4} from 'react-native-normalization-text';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-tiny-toast';
import NavBar from '../../../components/NavBar';
import ButtonRadius from '../../../components/Buttons/ButtonRadius';
import {Colors} from '../../../constants/Theme';
import {vw} from '../../../utils/metric';
import {pad} from '../../../constants/Layout';
import {addBankCard} from '../../../actions/asset';
import { sleep } from '../../../utils/tools';
import FormRow from '../../../components/FormRow';
import CountDown from '../../../components/CountDown';
import Mask from '../../../components/Mask';
import withPage from '../../../components/HOCs/withPage';
import {apiGetUserBankCards} from '../../../service/api';

const Withdraw = (props: any) =>  {
  const {navigate, goBack, replace} = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [withdrawNum, setWithdrawNum] = React.useState('');
  const [verifyCode, setVerifyCode] =  React.useState('');
  const [countDownNum, setCountDownNum] = React.useState(0); // 倒计时
  let [maskList, maskDispatch] = React.useContext(Mask.context);
  const [curBankCard, setCurBankCard] = React.useState({}); // 默认银行卡，没有则提示添加

  console.log(route.params?.card, '提现的银行卡')

  React.useEffect(() => {
    // setCurCard()
    apiGetUserBankCards().then(res => {
      
    })
  }, [])

  /**
   * 当前银行卡
   */
  const {
    card,
  } = route.params || {}
  

  /**
   * 获取验证码
   */
  const getCode = () => {
    
  }

  /**
   * 提交提现
   */
  const onSumbit = async () => {
    maskDispatch({
      type: Mask.Actions.PUSH,
      payload: {
        type: Mask.ContentTypes.Normal,
        data: {
          text: '验证码错误，请重新输入!',
          title: '提示',
          rightBtnText: '确定',
          onPressRight: () => {alert(421)}
        }
      }});
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
        <ListItem
          title={
            <T4 style={{marginBottom: pad}}>{card?.name}</T4>
          }
          subtitle={
            <TinyText>尾号{card?.cardNum.slice(-4)}储蓄卡</TinyText>
          }
          leftAvatar={{ source: card?.icon}}
          chevron
          style={{marginBottom: pad}}
          onPress={() => replace('BankCardBag')}
        />
        <FormRow 
          title={'提现金额'}
          placeholder={'可提现金额¥999.00'}
          value={withdrawNum}
          onChangeText={setWithdrawNum}
        />
        <FormRow 
          title={'验证码'}
          value={verifyCode}
          onChangeText={setVerifyCode}
          rightTitle={
            countDownNum > 0 
              && <PrimaryText>{'' + countDownNum}s后重发</PrimaryText>
              || <PrimaryText style={{color: Colors.blueColor}} onPress={getCode}>获取验证码</PrimaryText>
          }
          maxLength={6}
          // inputStyle={{borderWidth: 2, borderColor: 'red'}}
        />
        <CountDown
          deadline={Date.now() + 6000}
          onStop={() => {alert('结束')}}
        />
        <TinyText style={{padding: pad}}>每次提现将会收取1.00元手续费，建议减少提现次数，避免造成资金损失</TinyText>
      </View>
     
      <ButtonRadius
        text="提交"
        style={StyleSheet.flatten([styles.button, {marginBottom: props.safeBottom}])}
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
  },
});

export default withPage(Withdraw);