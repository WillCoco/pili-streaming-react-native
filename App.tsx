import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, View, NativeModules, Text } from 'react-native';
import { SplashScreen, AppLoading } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configStore from './src/store'
import { getStatusBarHeight } from './src/actions/public'

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
import AnchorPickGoods from './src/pages/AnchorTabs/AnorchMeScreen/AnchorPickGoods'
import AnchorLiveGoodsManage from './src/pages/AnchorTabs/AnorchMeScreen/AnchorLiveGoodsManage'
import AssetManage from './src/pages/AnchorTabs/MyShopScreen/AssetManage'
import GoodsManage from './src/pages/AnchorTabs/MyShopScreen/GoodsManage'
import ShopAddressManage from './src/pages/AnchorTabs/MyShopScreen/ShopAddressManage'
import ShopAgreement from './src/pages/AnchorTabs/MyShopScreen/ShopAgreement'
import AnchroBill from './src/pages/AnchorTabs/MyShopScreen/AnchroBill'

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

    loadResourcesAndDataAsync()
  }, [])

  const navHeadOption = (title?: string) => ({
    header: (p: any) => <NavBar {...p} title={title} />,
  })

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null
    // return <AppLoading /> // tofix: 在android上报错
  } else {
    return (
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
                {/* <Stack.Screen name='AnchorTabs' component={AnchorTabs} options={{headerShown: false}} /> */}
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
                <Stack.Screen name='AnchorDetail' component={AnchorDetail} options={{ headerShown: false }} />
                <Stack.Screen name='LivingRoomScreen' component={LivingRoom} options={{ headerShown: false }} />
                <Stack.Screen name='LiveSearchScreen' component={LiveSearch} options={{headerShown: false}} />
                <Stack.Screen name='AnchorTabs' component={AnchorTabs} options={{headerShown: false}} />
                <Stack.Screen name='CreateLiveScreen' component={CreateLive} options={{headerShown: false}} />
                <Stack.Screen name='CreateTeaserScreen' component={CreateTeaser} options={navHeadOption('发布预告')} />
                <Stack.Screen name='LiveGoodsPicker' component={LiveGoodsPicker} options={{headerShown: false}} />
                <Stack.Screen name='LiveGoodsManageScreen' component={LiveGoodsManage} options={navHeadOption('直播商品管理')} />
                <Stack.Screen name='AnorchLivingRoomScreen' component={AnorchLivingRoom} options={{headerShown: false}} />
                <Stack.Screen name='AnchorTrailers' component={AnchorTrailers} options={navHeadOption('我的预告片')} />
                <Stack.Screen name='AnchorRecords' component={AnchorRecords} options={{headerShown: false}} />
                <Stack.Screen name='LivesAnalyze' component={LivesAnalyze} options={{headerShown: false}} />
                <Stack.Screen name='AnchorPickGoods' component={AnchorPickGoods} options={{headerShown: false}} />
                <Stack.Screen name='AnchorLiveGoodsManage' component={AnchorLiveGoodsManage} options={{headerShown: false}} />
                <Stack.Screen name='ShopAgreement' component={ShopAgreement} options={navHeadOption('商家入驻')} />
                <Stack.Screen name='ShopAddressManage' component={ShopAddressManage} options={navHeadOption('寄回地址管理')} />
                <Stack.Screen name='GoodsManage' component={GoodsManage} options={navHeadOption('直播商品')} />
                <Stack.Screen name='AssetManage' component={AssetManage} options={{headerShown: false}} />
                <Stack.Screen name='AnchroBill' component={AnchroBill} options={navHeadOption('账单')} />
                <Stack.Screen name='ActivityWebView' component={ActivityWebView} />
                <Stack.Screen name='CreateOrder' component={CreateOrder} />
                <Stack.Screen name='CreateOrEditAddr' component={CreateOrEditAddr} />
                <Stack.Screen name='AddressList' component={AddressList} />
                <Stack.Screen name='AnchorDetailScreen' component={AnchorDetail} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </PersistGate>
      </Provider>

    )
  }
}