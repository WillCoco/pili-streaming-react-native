import React from 'react'
import { StyleSheet, Image, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import pxToDp from '../utils/px2dp'
import { Colors } from '../constants/Theme'

import PublishScreen from '../pages/Mine/AnorchTabs/PublishScreen'
import AnorchMeScreen from '../pages/Mine/AnorchTabs/AnorchMeScreen'
import MyShopScreen from '../pages/Mine/AnorchTabs/MyShopScreen'

import homeIcon from '../assets/tab-bar-icon/home.png'
import homeActiveIcon from '../assets/tab-bar-icon/homeActive.png'
import liveIcon from '../assets/tab-bar-icon/live.png'
import liveActiveIcon from '../assets/tab-bar-icon/liveActive.png'
import foundIcon from '../assets/tab-bar-icon/found.png'
import foundActiveIcon from '../assets/tab-bar-icon/foundActive.png'
import cartIcon from '../assets/tab-bar-icon/cart.png'
import cartActiveIcon from '../assets/tab-bar-icon/cartActive.png'
import mineIcon from '../assets/tab-bar-icon/me.png'
import mineActiveIcon from '../assets/tab-bar-icon/meActive.png'

import SearchBar from '../components/SearchBar/SearchBar'

const BottomTab = createBottomTabNavigator()

function BottomTabNavigator({ navigation, route }: any) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  navigation.setOptions({
    // headerTitle: () => getTabItemComponent(getHeaderTitle(route), navigation),
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerShown: false
  })

  return (
    <BottomTab.Navigator
      initialRouteName="publish"
      tabBarOptions={{
        activeTintColor: Colors.basicColor,
        inactiveTintColor: Colors.lightGrey
      }}
    >
      <BottomTab.Screen
        name="publish"
        component={PublishScreen}
        options={{
          title: '首页',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? homeActiveIcon : homeIcon} />,
        }}
      />
      <BottomTab.Screen
        name="anorchShop"
        component={AnorchMeScreen}
        options={{
          title: '店铺',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? liveActiveIcon : liveIcon} />,
        }}
      />
      <BottomTab.Screen
        name="anorchMe"
        component={MyShopScreen}
        options={{
          title: '我的',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? foundActiveIcon : foundIcon} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * 获取页面标题
 * @param route 路由信息
 */
function getHeaderTitle(route:
  {
    state:
    {
      routes:
      { [x: string]: { name: string } };
      index: React.ReactText
    }
  }) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME

  return routeName
}

const styles = StyleSheet.create({
  tabBarImage: {
    width: pxToDp(50),
    height: pxToDp(50)
  },
  homeSearchBar: {
    width: pxToDp(710),
    height: pxToDp(56),
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: pxToDp(28),
    paddingLeft: pxToDp(26)
  },
  searchKey: {
    color: Colors.lightGrey,
    marginLeft: pxToDp(20)
  }
})

export default BottomTabNavigator