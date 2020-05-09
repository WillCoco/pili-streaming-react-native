import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, View, NativeModules, Text } from 'react-native';
import { SplashScreen, AppLoading } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'

import { Provider as AntdProvider } from '@ant-design/react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configStore from './src/store'
import { getStatusBarHeight } from './src/actions/public'
import { login } from './src/actions/im'

import Root from './src/navigation/BottomTabNavigator'
import HomeSearch from './src/pages/HomeSearch/HomeSearch'
import FoundSearch from './src/pages/FoundSearch/FoundSearch'
import Brand from './src/pages/Brand/Brand'
import BrandShop from './src/pages/BrandShop/BrandShop'
import GoodsInfo from './src/pages/GoodsInfo/GoodsInfo'
import Classify from './src/pages/Classify/Classify'
import Belt from './src/pages/Belt/Belt'
import Sale from './src/pages/Sale/Sale'
import Login from './src/pages/Login/Login'
import SelectGoods from './src/pages/SelectGoods/SelectGoods'
import SelectGoodsInfo from './src/pages/SelectGoodsInfo/SelectGoodsInfo'
import ActivityWebView from './src/pages/ActivityWebView/ActivityWebView'
import CreateOrder from './src/pages/CreateOrder/CreateOrder'
import CreateOrEditAddr from './src/pages/CreateOrEditAddr/CreateOrEditAddr'
import AddressList from './src/pages/AddressList/AddressList'
import OrderList from './src/pages/OrderList/OrderList'
import AccountInfo from './src/pages/AccountInfo/AccountInfo'
import CollectGoods from './src/pages/CollectGoods/CollectGoods'
import LikeContent from './src/pages/LikeContent/LikeContent'
import Coupon from './src/pages/Coupon/Coupon'
import PublishedWork from './src/pages/PublishedWork/PublishedWork'
import FocusedAnchor from './src/pages/FocusedAnchor/FocusedAnchor'
import OrderDetail from './src/pages/OrderDetail/OrderDetail'
import ExpressInfo from './src/pages/ExpressInfo/ExpressInfo'
import ApplyForAfterSales from './src/pages/ApplyForAfterSales/ApplyForAfterSales'
import AfterSaleDetail from './src/pages/AfterSaleDetail/AfterSaleDetail'
import Setting from './src/pages/Setting/Setting'
import AboutUs from './src/pages/AboutUs/AboutUs'
import Tenants from './src/pages/Tenants/Tenants'
import ServiceAgreement from './src/pages/ServiceAgreement/ServiceAgreement'
import FoundInfo from './src/pages/FoundInfo/FoundInfo'
import PublishWork from './src/pages/PublishWork/PublishWork'
import WorksGoodsList from './src/pages/WorksGoodsList/WorksGoodsList'

import NavBar from './src/components/NavBar'
import AnchorTabs from './src/navigation/AnchorTabs'
import LiveSearch from './src/pages/Live/LiveSearchScreen'
import AnchorDetail from './src/pages/Live/AnchorDetailScreen'
import LivingRoom from './src/pages/Live/LivingRoomScreen'
import CreateLive from './src/pages/AnchorTabs/PublishScreen/CreateLiveScreen'
import CreateTeaser from './src/pages/AnchorTabs/PublishScreen/CreateTeaserScreen'
import LiveGoodsPicker from './src/pages/AnchorTabs/PublishScreen/LiveGoodsPickerScreen'
import LiveGoodsManage from './src/pages/AnchorTabs/PublishScreen/LiveGoodsManageScreen'
import AnorchLivingRoom from './src/pages/AnchorTabs/PublishScreen/AnorchLivingScreen'
import AnchorTrailers from './src/pages/AnchorTabs/AnorchMeScreen/AnchorTrailers'
import AnchorRecords from './src/pages/AnchorTabs/AnorchMeScreen/AnchorRecords'
import LivesAnalyze from './src/pages/AnchorTabs/AnorchMeScreen/LivesAnalyze'
import GoodsSupply from './src/pages/AnchorTabs/AnorchMeScreen/GoodsSupply'
import LivingGoodsWareHouse from './src/pages/AnchorTabs/AnorchMeScreen/LivingGoodsWareHouse'
import AnchorShowcaseManage from './src/pages/AnchorTabs/AnorchMeScreen/AnchorShowcaseManage'
import AssetManage from './src/pages/AnchorTabs/MyShopScreen/AssetManage'
import GoodsManage from './src/pages/AnchorTabs/MyShopScreen/GoodsManage'
import ShopAddressManage from './src/pages/AnchorTabs/MyShopScreen/ShopAddressManage'
import AddNewAddress from './src/pages/AnchorTabs/MyShopScreen/AddNewAddress'
import ShopAgreement from './src/pages/AnchorTabs/MyShopScreen/ShopAgreement'
import AnchroBill from './src/pages/AnchorTabs/MyShopScreen/AnchroBill'
import GoodEdit from './src/pages/AnchorTabs/MyShopScreen/GoodEdit'
import BrandGoods from './src/pages/AnchorTabs/BrandGoods'
import AnchorAgreement from './src/pages/AnchorTabs/AnchorAgreement'
import AnchorLivingEndScreen from './src/pages/AnchorTabs/AnorchMeScreen/AnchorLivingEndScreen'
import BankCardBag from './src/pages/AnchorTabs/CardBag'
import AddBankCard from './src/pages/AnchorTabs/AddBankCard'
import Withdraw from './src/pages/AnchorTabs/Withdraw'
import Message from './src/pages/AnchorTabs/Message'
import MessageDetail from './src/pages/AnchorTabs/Message/MessageDetail'
import MaskProvider, {MaskContext} from './src/components/Mask/Provider';

const { StatusBarManager } = NativeModules
const { store, persistor } = configStore()
const Stack = createStackNavigator()

export default function App(props: { skipLoadingScreen: any; }) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {

        SplashScreen.preventAutoHide()

        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf')
        })

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)

        if (Platform.OS === 'ios') {
          StatusBarManager.getHeight((h: any) => {
            store.dispatch(getStatusBarHeight(h.height))
          })
        } else {
          store.dispatch(getStatusBarHeight(Number(StatusBar.currentHeight)))
        }

        SplashScreen.hide()
      }
    }

    loadResourcesAndDataAsync();

    // 登录im
    store.dispatch(login());
  }, [])

  const navHeadOption = (title?: string) => ({
    header: (p: any) => <NavBar {...p} title={title} />,
  })

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null
    // return <AppLoading /> // tofix: 在android上报错
  } else {
    return (
      <MaskProvider>
      <AntdProvider>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <View style={{flex: 1}}>
            {
              Platform.OS !== 'ios' && <StatusBar barStyle='light-content' translucent={true} backgroundColor='transparent' />
            }
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name='AnchorTabs' component={AnchorTabs} options={{headerShown: false}} />
                <Stack.Screen name='Root' component={Root} />
                <Stack.Screen name='HomeSearch' component={HomeSearch} />
                <Stack.Screen name='FoundSearch' component={FoundSearch} />
                <Stack.Screen name='Brand' component={Brand} />
                <Stack.Screen name='BrandShop' component={BrandShop} />
                <Stack.Screen name='GoodsInfo' component={GoodsInfo} />
                <Stack.Screen name='Classify' component={Classify} />
                <Stack.Screen name='Belt' component={Belt} />
                <Stack.Screen name='Sale' component={Sale} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='SelectGoods' component={SelectGoods} />
                <Stack.Screen name='SelectGoodsInfo' component={SelectGoodsInfo} />
                <Stack.Screen name='OrderList' component={OrderList} />
                <Stack.Screen name='AccountInfo' component={AccountInfo} />
                <Stack.Screen name='CollectGoods' component={CollectGoods} />
                <Stack.Screen name='LikeContent'component={LikeContent} />
                <Stack.Screen name='Coupon' component={Coupon} />
                <Stack.Screen name='PublishedWork' component={PublishedWork} />
                <Stack.Screen name='FocusedAnchor' component={FocusedAnchor} />
                <Stack.Screen name='OrderDetail' component={OrderDetail} />
                <Stack.Screen name='ExpressInfo' component={ExpressInfo} />
                <Stack.Screen name='ApplyForAfterSales'component={ApplyForAfterSales} />
                <Stack.Screen name='AfterSaleDetail' component={AfterSaleDetail} />
                <Stack.Screen name='CreateOrder' component={CreateOrder} />
                <Stack.Screen name='CreateOrEditAddr' component={CreateOrEditAddr} />
                
                <Stack.Screen name='AnchorDetail' component={AnchorDetail} options={{ headerShown: false }} />
                <Stack.Screen name='LivingRoomScreen' component={LivingRoom} options={{ headerShown: false }} />
                <Stack.Screen name='LiveSearchScreen' component={LiveSearch} />
                {/* <Stack.Screen name='AnchorTabs' component={AnchorTabs} options={{headerShown: false}} /> */}
                <Stack.Screen name='CreateLiveScreen' component={CreateLive} options={{headerShown: false}} />
                <Stack.Screen name='CreateTeaserScreen' component={CreateTeaser} />
                <Stack.Screen name='LiveGoodsPicker' component={LiveGoodsPicker} options={{headerShown: false}} />
                <Stack.Screen name='LiveGoodsManageScreen' component={LiveGoodsManage} options={{headerShown: false}} />
                <Stack.Screen name='AnorchLivingRoomScreen' component={AnorchLivingRoom} options={{headerShown: false}} />
                <Stack.Screen name='AnchorTrailers' component={AnchorTrailers} options={{headerShown: false}} />
                <Stack.Screen name='AnchorRecords' component={AnchorRecords} options={{headerShown: false}} />
                <Stack.Screen name='LivesAnalyze' component={LivesAnalyze} options={{headerShown: false}} />
                <Stack.Screen name='LivingGoodsWareHouse' component={LivingGoodsWareHouse} options={{headerShown: false}} />
                <Stack.Screen name='AnchorShowcaseManage' component={AnchorShowcaseManage} options={{headerShown: false}} />
                <Stack.Screen name='ShopAgreement' component={ShopAgreement} options={{headerShown: false}} />
                <Stack.Screen name='ShopAddressManage' component={ShopAddressManage} options={{headerShown: false}} />
                <Stack.Screen name='GoodsManage' component={GoodsManage} options={{headerShown: false}} />
                <Stack.Screen name='GoodEdit' component={GoodEdit} options={{headerShown: false}} />
                <Stack.Screen name='AssetManage' component={AssetManage} options={{headerShown: false}} />
                <Stack.Screen name='AnchroBill' component={AnchroBill} options={{headerShown: false}} />
                <Stack.Screen name='ActivityWebView' component={ActivityWebView} />
                <Stack.Screen name='AddressList' component={AddressList} />
                <Stack.Screen name='AnchorDetailScreen' component={AnchorDetail} options={{headerShown: false}} />
                <Stack.Screen name='Setting' component={Setting} />
                <Stack.Screen name='AboutUs' component={AboutUs} />
                <Stack.Screen name='Tenants' component={Tenants} />
                <Stack.Screen name='ServiceAgreement' component={ServiceAgreement} />
                <Stack.Screen name='FoundInfo' component={FoundInfo} />
                <Stack.Screen name='PublishWork' component={PublishWork} />
                <Stack.Screen name='WorksGoodsList' component={WorksGoodsList} />
                <Stack.Screen name='AddNewAddress' component={AddNewAddress} options={{headerShown: false}} />
                <Stack.Screen name='GoodsSupply' component={GoodsSupply} options={{headerShown: false}} />
                <Stack.Screen name='BrandGoods' component={BrandGoods} options={{headerShown: false}} />
                <Stack.Screen name='AnchorAgreement' component={AnchorAgreement} options={{headerShown: false}} />
                <Stack.Screen name='AnchorLivingEnd' component={AnchorLivingEndScreen} options={{headerShown: false}} />
                <Stack.Screen name='BankCardBag' component={BankCardBag} options={{headerShown: false}} />
                <Stack.Screen name='AddBankCard' component={AddBankCard} options={{headerShown: false}} />
                <Stack.Screen name='Withdraw' component={Withdraw} options={{headerShown: false}} />
                <Stack.Screen name='Message' component={Message} options={{headerShown: false}} />
                <Stack.Screen name='MessageDetail' component={MessageDetail} options={{headerShown: false}} />

              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </PersistGate>
      </Provider>
      </AntdProvider>
      </MaskProvider>
    )
  }
}