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

import NavBar from './src/components/NavBar';
import AnchorTabs from './src/navigation/AnchorTabs';
import LiveSearchScreen from './src/pages/Live/LiveSearchScreen';
import AnchorDetailScreen from './src/pages/Live/AnchorDetailScreen'
import LivingRoomScreen from './src/pages/Live/LivingRoomScreen'
import CreateLiveScreen from './src/pages/Mine/AnorchTabs/PublishScreen/CreateLiveScreen'
import CreateTeaserScreen from './src/pages/Mine/AnorchTabs/PublishScreen/CreateTeaserScreen'

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
    // headerStyle: {
    //   height: 60,
    //   backgroundColor: '#fff',
    //   // color: '#000',
    // },
    // headerTitleAlign: 'center',
    // headerLeft: () => <Text>123</Text>
  })

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <View style={{ flex: 1 }}>
            {
              Platform.OS !== 'ios' && <StatusBar barStyle='light-content' translucent={ true } backgroundColor='transparent' />
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
                <Stack.Screen name='AnchorDetailScreen' component={AnchorDetailScreen} options={{headerShown: false}} />
                <Stack.Screen name='LivingRoomScreen' component={LivingRoomScreen} options={{headerShown: false}} />
                <Stack.Screen name='LiveSearchScreen' component={LiveSearchScreen} options={{headerShown: false}} />
                <Stack.Screen name='CreateLiveScreen' component={CreateLiveScreen} options={{headerShown: false}} />
                <Stack.Screen name='CreateTeaserScreen' component={CreateTeaserScreen} options={(navHeadOption('发布预告'))} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </PersistGate>
      </Provider>
      
    )
  }
}
