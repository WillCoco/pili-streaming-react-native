/**
 * 我的店铺
 */
import * as React from 'react';
import Avatar from '../../../components/Avatar';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  RefreshControl,
} from 'react-native';
import { T4, SmallText, PrimaryText, T2, T3, Prim } from 'react-native-normalization-text';
import {useNavigation} from '@react-navigation/native';
import NavBar from '../../../components/NavBar';
import withPage from '../../../components/HOCs/withPage';
import ImageText from '../../../components/ImageText';
import Iconarrowright from '../../../components/Iconfont/Iconarrowright';
import images from '../../../assets/images';
import ToolRow from '../../../components/ToolRow';
import Badge from '../../../components/Badge';
import {pad} from '../../../constants/Layout';
import {Colors} from '../../../constants/Theme';
import {apiGetUserAssetsStatistics} from '../../../service/api';

const ToolCell = (props: {
  text: string,
  img: any,
  onPress: () => void,
  style?: StyleProp<any>,
  imgStyle?: StyleProp<any>,
}): React.ReactElement => {
  return (
    <TouchableOpacity onPress={props.onPress} style={StyleSheet.flatten([styles.toolCellWrapper, props.style])}>
      <Image source={props.img} style={StyleSheet.flatten([styles.toolImg, props.imgStyle])} resizeMode="contain" />
      <PrimaryText color="secondary" style={styles.greyText}>{props.text}</PrimaryText>
    </TouchableOpacity>
  )
}

const MyShopScreen = (props) =>  {
  const {navigate, reset, goBack} = useNavigation();
  const [assetsInfo, setAssetsInfo] = React.useState({})

  React.useEffect(() => {
    apiGetUserAssetsStatistics().then(res => {
      console.log(res);
      setAssetsInfo(res);
    })
  }, []);

  /**
   * 店铺资金
   */
  const assetTypes = [
    {key: 'accountMoney', img: images.assetAvailable, text: '可提现金额', onPress: () => navigate('AnchorRecords')},
    {key: 'willSettle', img: images.assetWaitForSettle, text: '待结算金额', onPress: () => navigate('AnchorTrailers')},
    {key: 'frozenMoney', img: images.assetFrozen, text: '冻结金额', onPress: () => navigate('LivesAnalyze')},
  ];

  /**
   * 我的订单
   */
  const orderTypes = [
    {img: images.orderUnpaid, text: '待付款', onPress: () => navigate('AnchorRecords')},
    {img: images.orderUnfilled, text: '待发货', onPress: () => navigate('AnchorTrailers')},
    {img: images.orderWaitForReceiving, text: '待收货', onPress: () => navigate('LivesAnalyze')},
    {img: images.orderCompleted, text: '已完成', onPress: () => navigate('LivesAnalyze')},
    {img: images.orderAfterSale, text: '退款/售后', onPress: () => navigate('LivesAnalyze')},
  ];

  /**
   * 我的工具
   */
  const toolsList = [
    {img: images.toolGoodsManage, text: '商品管理', onPress: () => navigate('GoodsManage')},
    {img: images.toolassetsManage, text: '资金管理', onPress: () => navigate('AssetManage')},
    {img: images.toolAddressManage, text: '寄回地址', onPress: () => navigate('ShopAddressManage')},
    {img: images.toolAnchorManage, text: '签约主播', onPress: () => navigate('AnchorDetail')},
    {img: images.toolShopEnter, text: '店铺入驻规范', onPress: () => navigate('ShopAgreement')},
  ];

  /**
   * tab的返回到 我的 
   */
  const onBackPress = () => {
    reset({
      index: 0,
      routes: [{ name: 'Root', params: {initialRoute: '我的'}}],
    });

    // navigate('我的')
  }

  /**
   * 下拉刷新 
   */
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    // 请求数据
    setTimeout(() => {
      setRefreshing(false);
    }, 1000)
  }

  return (
    <View
     style={styles.style}
    >
      <NavBar leftTheme="light" title="个人店铺" style={styles.navWrapper} titleStyle={styles.navText} onLeftPress={onBackPress} />
      <View style={StyleSheet.flatten([styles.headerWrapper])}>
        <Image style={styles.imgBg} source={images.anchorShopBg} resizeMode="stretch" />
        <View style={StyleSheet.flatten([styles.shopAssetWrapper, {marginTop: props.safeTop + (pad * 5)}])}>
          <T4 color="white" style={styles.title}>店铺资金</T4>
          <SmallText color="white">保证金: {0}元</SmallText>
        </View>

        <View style={styles.assetContentWrapper}>
          {
            assetTypes.map((row, index) => {
              return (
                <ImageText
                  key={`assetTypes_${index}`}
                  disabled
                  text={row.text}
                  img={row.img}
                  onPress={row.onPress}
                  style={{flex: 1}}
                  imgStyle={{height: 40, width: 40}}
                  textStyle={{color: '#fff', marginTop: 6}}
                >
                  <PrimaryText color="white" style={{marginTop: 2}}>¥{assetsInfo[row.key] || 0}</PrimaryText>
                </ImageText>
              )
            })
          }
        </View>
      </View>
      <ScrollView
      style={styles.style}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.basicColor]}
          />
         }
      >
        <View style={StyleSheet.flatten([styles.blockWrapper])}>
          <T4 style={styles.title}>订单统计</T4>
          <View style={StyleSheet.flatten([styles.row, styles.contentWrapper])}>
            <View style={styles.orderCellWrapper}>
              <T3>0</T3>
              <SmallText color="grey">今日新增订单</SmallText>
            </View>
            <View style={styles.orderCellWrapper}>
              <T3>0</T3>
              <SmallText color="grey">本月新增订单</SmallText>
            </View>
            <View style={styles.orderCellWrapper}>
              <T3>0</T3>
              <SmallText color="grey">历史总订单</SmallText>
            </View>
          </View>
        </View>

        <View style={StyleSheet.flatten([styles.blockWrapper])}>
          <View style={styles.orderTitleWrapper}>
            <T4 style={styles.title}>我的订单</T4>
            <TouchableOpacity style={styles.orderTitleWrapper} onPress={() => navigate('全部订单')}>
              <SmallText >查看全部</SmallText>
              <Iconarrowright/>
            </TouchableOpacity>
            
          </View>
          <View style={StyleSheet.flatten([styles.row, {justifyContent: 'space-around', marginTop: pad * 1.5}])}>
            {
              orderTypes.map((row, index) => {
                return (
                  <ImageText
                    key={`orderTypes_${index}`}
                    showBadge
                    quantity={0}
                    text={row.text}
                    img={row.img}
                    onPress={row.onPress}
                    style={{flex: 1}}
                    imgStyle={{height: 40, width: 40}}
                  />
                )
              })
            }
          </View>
        </View>
        <View style={StyleSheet.flatten([styles.blockWrapper])}>
        <T4 style={styles.title}>我的工具</T4>
        <View style={StyleSheet.flatten([styles.row, styles.toolsWrapper])}>
          {
            toolsList.map((row, index) => {
              return (
                <ToolCell
                  key={`_${index}`}
                  text={row.text}
                  img={row.img}
                  onPress={row.onPress}
                />
              )
            })
          }
        </View>
      </View>
      </ScrollView>
    </View>
  )
};

MyShopScreen.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  shopAssetWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: pad,
  },
  assetContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: pad
  },
  navWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  orderCellWrapper: {
    alignItems: 'center'
  },
  navText: {
    color: '#fff'
  },
  headerWrapper: {
    height: 230,
    backgroundColor: 'transparent',
  },
  imgBg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute'
  },
  nickText: {
    // marginTop: pad
  },
  followText: {
    marginBottom: pad
  },
  title: {
  },
  blockWrapper: {
    paddingTop: pad,
    paddingBottom: pad * 2,
    paddingHorizontal: pad,
    borderBottomWidth: 4,
    borderBottomColor: Colors.bgColor,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    paddingHorizontal: pad * 2,
    paddingTop: pad,
  },
  orderTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toolsWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingTop: pad,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  toolCellWrapper: {
    alignItems: 'center',
    width: '33.33%',
    flex: -1,
    padding: pad,
  },
  toolImg: {
    width: 46,
    height: 46,
  },
  greyText: {
    marginTop: 4
  }
});

export default withPage(MyShopScreen, {
  statusBarOptions: {
    barStyle: 'light-content',
    backgroundColor: 'transparent',
  }
});