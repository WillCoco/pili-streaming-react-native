import * as React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import NavBar from '../../components/NavBar'
import FormRow from '../../components/FormRow'
import {PrimaryText, SmallText} from 'react-native-normalization-text'
import {Colors} from '../../constants/Theme'
import ButtonRadius from '../../components/Buttons/ButtonRadius'
import {vw} from '../../utils/metric'
import {pad} from '../../constants/Layout'
import withPage from '../../components/HOCs/withPage'
import pxToDp from '../../utils/px2dp'
import { useNavigation } from '@react-navigation/native'
import Mask from '../../components/Mask'

const RealName = props => {
  const [name, setName] = React.useState('')
  const [idNumber, setIdNumber] = React.useState('')
  let [maskList, maskDispatch] = React.useContext(Mask.context);
  const {navigate} = useNavigation()

  const beforeSubmit = () => {
    maskDispatch({
      type: Mask.Actions.PUSH,
      payload: {
        type: Mask.ContentTypes.Normal,
        data: {
          text: '实名认证信息一旦提交将无法更改！',
          title: '提示',
          rightBtnText: '确定',
          onPressRight: () => {alert(421)}
        }
      }});
  }

  return (
    <View style={styles.style}>
      <NavBar
        leftTheme="light"
        title="实名认证"
        titleStyle={{color: Colors.whiteColor}}
        style={{backgroundColor: Colors.basicColor}}
      />
      <FormRow 
        title={'真实姓名'}
        value={name}
        placeholder={'请输入姓名'}
        onChangeText={setName}
        bottomDivider
      />
      <FormRow 
        title={'身份证号'}
        value={idNumber}
        placeholder={'请输入身份证号码'}
        onChangeText={setIdNumber}
        bottomDivider
      />
      <PrimaryText style={styles.tip}>继续表示同意
        <PrimaryText style={{color: Colors.blueColor}} onPress={() => navigate('PrivacyPolicy')}>用户协议隐私条款</PrimaryText>
      </PrimaryText>
      <ButtonRadius
        text="开始视频认证"
        style={styles.button}
        onPress={beforeSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  style: {
    flex: 1,
  },
  tip: {
    marginTop: pad,
    marginHorizontal: pad,
  },
  button: {
    position: 'absolute',
    width: vw(80),
    bottom: pxToDp(100)
  },
})

export default withPage(RealName)