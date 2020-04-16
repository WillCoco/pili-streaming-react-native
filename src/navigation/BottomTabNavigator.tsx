import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import pxToDp from '../utils/px2dp'
import { Colors } from '../constants/Theme'

import HomeScreen from '../pages/Home/Home'
import FoundScreen from '../pages/Found/Found'
import LiveScreen from '../pages/Live/Live'
import CartScreen from '../pages/Cart/Cart'
import MineScreen from '../pages/Mine/Mine'

import homeIcon from '../assets/tab-bar-icon/home.png'
import homeActiveIcon from '../assets/tab-bar-icon/homeActive.png'
import foundIcon from '../assets/tab-bar-icon/found.png'
import foundActiveIcon from '../assets/tab-bar-icon/foundActive.png'
import cartIcon from '../assets/tab-bar-icon/cart.png'
import cartActiveIcon from '../assets/tab-bar-icon/cartActive.png'
import mineIcon from '../assets/tab-bar-icon/me.png'
import mineActiveIcon from '../assets/tab-bar-icon/meActive.png'

import SearchBar from '../components/SearchBar/SearchBar'

const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = '首页'

export default function BottomTabNavigator({ navigation, route }: any) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: () => getTabItemComponent(getHeaderTitle(route)),
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor
  })

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Colors.basicColor,
        inactiveTintColor: Colors.lightGrey
      }}
    >
      <BottomTab.Screen
        name="首页"
        component={HomeScreen}
        options={{
          title: '首页',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? homeActiveIcon : homeIcon} />,
        }}
      />
      <BottomTab.Screen
        name="发现"
        component={FoundScreen}
        options={{
          title: '发现',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? foundActiveIcon : foundIcon} />,
        }}
      />
      <BottomTab.Screen
        name="直播"
        component={LiveScreen}
        options={{
          title: '直播',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? homeActiveIcon : homeIcon} />,
        }}
      />
      <BottomTab.Screen
        name="购物车"
        component={CartScreen}
        options={{
          title: '购物车',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? cartActiveIcon : cartIcon} />,
        }}
      />
      <BottomTab.Screen
        name="我的"
        component={MineScreen}
        options={{
          title: '我的',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? mineActiveIcon : mineIcon} />,
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

function getTabItemComponent(routeName: String) {
  switch (routeName) {
    case '首页':
      return <SearchBar isPlaceHolder={true} />
      break
    case '发现':
      return <Text>发现hhhh</Text>
      break
    case '直播':
      return <Text>直播hhhh</Text>
      break
    case '购物车':
      return <Text>购物车hhhh</Text>
      break
    case '我的':
      return <Text>我的hhhh</Text>
      break
    default:
      break
  }
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