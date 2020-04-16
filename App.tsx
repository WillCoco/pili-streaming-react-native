import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, View, NativeModules } from 'react-native'
import { SplashScreen, AppLoading } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Provider } from 'react-redux'
import configStore from './src/store'
import { getStatusBarHeight } from './src/actions/public'

import Root from './src/navigation/BottomTabNavigator'

const { StatusBarManager } = NativeModules
const store = configStore()
const Stack = createStackNavigator()

export default function App(props: { skipLoadingScreen: any; }) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide()
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
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
      
    )
  }
}
