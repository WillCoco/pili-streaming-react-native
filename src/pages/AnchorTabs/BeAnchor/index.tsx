/**
 * 主播权益
 */
import * as React from 'react'
import {
  View,
  StyleSheet,
  Image,
} from 'react-native'
import NavBar from '../../../components/NavBar'
import {Colors} from '../../../constants/Theme'
import {pad} from '../../../constants/Layout'
import images from '../../../assets/images'
import {PrimaryText} from 'react-native-normalization-text'
import ButtonRadius from '../../../components/Buttons/ButtonRadius'
import {useSelector} from 'react-redux'
import withPage from '../../../components/HOCs/withPage'
import pxToDp from '../../../utils/px2dp'
import BeAnchorRow from './BeAnchorRow'
import {apiAddAnchorUser} from'../../../service/api'
import { useNavigation } from '@react-navigation/native'
import CheckBox from '../../../components/CheckBox'
import { Toast } from '@ant-design/react-native'

const BeAnchor = (props) =>  {
  const {navigate} = useNavigation()
  const beAnchorPrice = useSelector(state => state?.userData?.userInfo?.liveMoney) // 开通主播的价格
  const userId = useSelector(state => state?.userData?.userInfo?.userId) || ''
  
  const [checked, setChecked] = React.useState(false) // 勾选框

  const anchorRights = [
    {title: '直播权限', text: '一键直播、简单卖货', source: require('../../../assets/be-anchor-image/bg0.png')},
    {title: '入驻特权', text: '开启个人店铺、上架商品', source: require('../../../assets/be-anchor-image/bg1.png')},
    {title: '专属培训', text: '专业导师 专门指导', source: require('../../../assets/be-anchor-image/bg2.png')},
    {title: '解锁特权', text: '解锁成为经纪人的权益', source: require('../../../assets/be-anchor-image/bg3.png')},
    {title: '更高返佣', text: '扩大返佣人数  提高返佣收益', source: require('../../../assets/be-anchor-image/bg4.png')},
  ]

  /**
   * 开通
   */
  const submit = () => {
    if (!checked) {
      Toast.info('您还未同意服务协议')
      return
    }

    apiAddAnchorUser({userId}).then(res => {
      console.log(userId);
      console.log(res, 4231532152);
    })
  }
 
  return (
    <View style={styles.style}>
      <NavBar
        leftTheme="light"
        title="主播权益"
        titleStyle={styles.navTitle}
        style={styles.nav}
      />
      <View style={styles.rightsWrapper}>
        {
          anchorRights.map((item, index) => {
            return <BeAnchorRow 
              key={item.title}
              {...item}
            />
          })
        }
        <View style={{flexDirection: 'row'}}>
          <CheckBox 
            isChecked={checked}
            onPress={() => {setChecked((c) =>  !c)}}
            style={{paddingHorizontal: pad}}
          />
          <PrimaryText>同意<PrimaryText style={{color: Colors.blueColor}} onPress={() => navigate('AnchorEntryAgreement')}>《云闪播主播入驻服务协议》</PrimaryText></PrimaryText>
        </View>
      </View>
      <View style={styles.beAnchorWrapper}>
        <Image source={images.beAnchorIcon} style={styles.beAnchorIconStyle}/>
        <View>
          <PrimaryText style={styles.price}>圈品主播套餐¥{beAnchorPrice}/年</PrimaryText>
          <ButtonRadius 
            text="立即开通"
            onPress={submit}
          />
        </View>
      </View>
    </View>
  )
};

BeAnchor.defaultProps = {
}

const styles = StyleSheet.create({
  style: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  nav: {
    backgroundColor: Colors.basicColor,
  },
  navTitle: {
    color: '#fff',
  },
  rightsWrapper: {
    flex: 1,
    padding: pad,
    paddingTop: pad * 1.5
  },
  beAnchorWrapper: {
    flexDirection: 'row',
    padding: pad * 1.5,
    paddingBottom: pad * 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: Colors.whiteColor,
  },
  beAnchorIconStyle: {
    width: pxToDp(120),
    height: pxToDp(120),
    marginRight: pad * 2,
  },
  price: {
    fontWeight: '600',
    marginBottom: pad,
  }
})

export default withPage(BeAnchor)