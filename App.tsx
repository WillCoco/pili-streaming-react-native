import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, View, NativeModules } from 'react-native'
import { SplashScreen, AppLoading } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'

import { Provider } from 'react-redux'
import configStore from './src/store'
import { getStatusBarHeight } from './src/actions/public'

import Root from './src/navigation/BottomTabNavigator'
import HomeSearch from './src/pages/HomeSearch/HomeSearch'
import AnchorDetailScreen from './src/pages/Live/AnchorDetailScreen';
import LivingRoomScreen from './src/pages/Live/LivingRoomScreen';

const { StatusBarManager } = NativeModules
const store = configStore()
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

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          {
            Platform.OS !== 'ios' && <StatusBar translucent={ true } backgroundColor='transparent' />
          }
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Root' component={Root} />
              <Stack.Screen name='HomeSearch' component={HomeSearch} />
              <Stack.Screen name='AnchorDetailScreen' component={AnchorDetailScreen} />
              <Stack.Screen name='LivingRoomScreen' component={LivingRoomScreen} options={{headerShown: false}} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
      
    )
  }
}
