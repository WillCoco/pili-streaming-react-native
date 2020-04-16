import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, View, NativeModules } from 'react-native'
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

  if (!isLoadingComplete && !props.skipLoadingScreen) {
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
                <Stack.Screen name='Root' component={Root} />
                <Stack.Screen name='HomeSearch' component={HomeSearch} />
                <Stack.Screen name='FoundSearch' component={FoundSearch} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </PersistGate>
      </Provider>
      
    )
  }
}
