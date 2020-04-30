/**
 * 资产管理
 */
import * as React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {PrimaryText, T4} from 'react-native-normalization-text';
import ImageText from '../../../components/ImageText';
import ButtonOutLine from '../../../components/Buttons/ButtonOutLine';
import NavBar from '../../../components/NavBar';
import withPage from '../../../components/HOCs/withPage';
import { Colors } from '../../../constants/Theme';
import { pad } from '../../../constants/Layout';
import images from '../../../assets/images/index';

const AssetManage = (props: any) =>  {
  const {navigate} = useNavigation();

  /**
   * 店铺资金
   */
  const assetTypes = [
    {img: images.assetAvailable, text: '可提现金额'},
    {img: images.assetHaveSettled, text: '已结算金额'},
    {img: images.assetWaitForSettle, text: '待结算金额'},
  ];

  /**
   * 我的收入
   */
  const incomeTypes = [
    {img: images.incomeLive, text: '直播收入'},
    {img: images.incomeShop, text: '店铺收入'},
    {img: images.incomeInvite, text: '邀请收入'},
  ];

  const RenderRow = (props: {
    text: string,
    quantity: number,
    img: any,
    style?: StyleProp<any>
  }) => {
    return (
      <View style={StyleSheet.flatten([styles.row, props.style])}>
          <Image source={props.img} style={styles.img} resizeMode="contain" />
          <View style={styles.rowTextWrapper}>
            <PrimaryText style={{marginBottom: 8}}>{props.text}</PrimaryText>
            <T4>¥{props.quantity}</T4>
          </View>
      </View>
    )
  }

  return (
    <View style={styles.style}>
      <NavBar
        title="资金管理"
        titleStyle={{color: '#fff'}}
        leftTheme="light"
        right={() => (
          <TouchableOpacity onPress={() => navigate('AnchroBill')} style={{padding: pad}}>
            <PrimaryText color="white">账单</PrimaryText>
          </TouchableOpacity>
        )}
        style={styles.navWrapper}
      />
      <View style={StyleSheet.flatten([styles.headerWrapper, {height: 230 + props.safeTop}])}>
        <Image style={styles.imgBg} source={images.anchorShopBg} resizeMode="stretch" />
        <View style={styles.assetContentWrapper}>
          {
            assetTypes.map((row, index) => {
              return (
                <ImageText
                  key={`assetTypes_${index}`}
                  disabled
                  text={row.text}
                  img={row.img}
                  style={{flex: 1}}
                  imgStyle={{height: 40, width: 40}}
                  textStyle={{color: '#fff', marginTop: 6}}
                >
                  <PrimaryText color="white" style={{marginTop: 2}}>¥{123.00}</PrimaryText>
                </ImageText>
              )
            })
          }
        </View>
        <ButtonOutLine
          text="提现"
          style={styles.buttonStyle}
        />
      </View>
      <View style={styles.contentWrapper}>
        <T4 style={styles.title}>我的收入</T4>
        {
          incomeTypes.map((income, index) => {
            return (
              <RenderRow
                key={`income_row_${index}`}
                text={income.text}
                img={income.img}
                quantity={income.quantity || 1000100010}
                style={{borderTopWidth: index !== 0 ? 1 : 0, borderColor: Colors.divider}}
              />
            )
          })
        }
      </View>
    </View>
  )
};

AssetManage.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: Colors.bgColor
  },
  navWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  headerWrapper: {
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    marginBottom: pad,
  },
  assetContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: pad * 3
  },
  imgBg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute'
  },
  contentWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: pad,
    paddingTop: pad * 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: pad * 2,
    paddingHorizontal: pad
  },
  rowTextWrapper: {
    flex: 1,
  },
  img: {
    width: 48,
    height: 48,
    marginRight: pad
  }
});

export default withPage(AssetManage, {
  statusBarOptions: {
    barStyle: 'light-content'
  }
});