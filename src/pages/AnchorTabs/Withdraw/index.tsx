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
import {apiGetUserBankCards, apiWithdraw} from '../../../service/api';
import pxToDp from '../../../utils/px2dp';
import images from '../../../assets/images';
import {updateCurBankCards} from '../../../actions/asset';

const Withdraw = (props: any) =>  {
  const {navigate, goBack, replace} = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [withdrawNum, setWithdrawNum] = React.useState('');
  const [verifyCode, setVerifyCode] =  React.useState('');
  let [maskList, maskDispatch] = React.useContext(Mask.context);
  const curBankCard = useSelector(state => state?.asset?.curBankCard) || {}; // 当前选中银行卡
  const [showCountDown, setShowCountDown] = React.useState(false); // 是否显示获取验证码倒计时
  const accountMoney = useSelector(state => state?.asset?.anchorAssetsInfo?.accountMoney) || 0; // 可提现金额

  React.useEffect(() => {
    apiGetUserBankCards().then(res => {
      if (!curBankCard?.id) {
        const defaultBankCard = res?.length !== 0 && res?.[0] || {};
        // setDefaultBankCard(defaultBankCard);
        dispatch(updateCurBankCards(defaultBankCard));
      }
    })
  }, []);

  /**
   * 当前银行卡
   */
  const {
    card,
  } = route.params || {}

  /**
   * 展示倒计时
   */
  const renderCoundDown = (second: number) => {
    return <PrimaryText onPress={getCode}>{'' + second}s后重发</PrimaryText>
  }
  
  /**
   * 获取验证码
   */
  const getCode = () => {
    setShowCountDown(true);
  };

  /**
   * 提交提现
   */
  const onSumbit = async () => {
    // maskDispatch({
    //   type: Mask.Actions.PUSH,
    //   payload: {
    //     type: Mask.ContentTypes.Normal,
    //     data: {
    //       text: '验证码错误，请重新输入!',
    //       title: '提示',
    //       rightBtnText: '确定',
    //       onPressRight: () => {alert(421)}
    //     }
    //   }});
    // Toast.showLoading('');
    // // const success = await dispatch(addBankCard());
    // await sleep(1000)
    // Toast.hide('')
    // Toast.show('提现成功')
    // goBack();

    const params = {
      "amount": withdrawNum,
      "code": "string",
      "userBankCardId": curBankCard.id
    };

    apiWithdraw(params).then(async res => {
      await sleep(1000)
      Toast.show('提现成功')
      goBack();
    });
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
        {
          curBankCard?.id
          && 
          <ListItem
            title={
              <T4 style={{marginBottom: pad}}>{curBankCard?.bankName}</T4>
            }
            subtitle={
              <TinyText>尾号{curBankCard?.bankAccountNo}储蓄卡</TinyText>
            }
            leftAvatar={{ source: images.bankIcon}}
            chevron
            style={{marginBottom: pad}}
            onPress={() => replace('BankCardBag')}
          />
          ||
          <TouchableOpacity onPress={() => navigate('AddBankCard')} style={styles.addButton}>
            <Image source={images.addBankCardIcon} style={styles.addIcon} />
            <PrimaryText >添加银行卡</PrimaryText>
          </TouchableOpacity>
        }
        <FormRow 
          title={'提现金额'}
          placeholder={`可提现金额¥${accountMoney}`}
          value={withdrawNum}
          onChangeText={setWithdrawNum}
        />
        <FormRow 
          title={'验证码'}
          value={verifyCode}
          onChangeText={setVerifyCode}
          rightTitle={
            showCountDown
            && <CountDown
              deadline={Date.now() + 60000}
              renderTime={
                second => renderCoundDown(second)
              }
              onStop={() => setShowCountDown(false)}
            />
            || <PrimaryText style={{color: Colors.blueColor}} onPress={getCode}>获取验证码</PrimaryText>
          }
          maxLength={6}
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
  addIcon: {
    width: 18,
    height: 18,
    marginRight: pad,
  },
  addButton: {
    height: pxToDp(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    marginBottom: pad
  },
});

export default withPage(Withdraw);