import React from 'react'
import { StyleSheet, Image, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import pxToDp from '../utils/px2dp'
import { Colors } from '../constants/Theme'

import PublishScreen from '../pages/AnchorTabs/PublishScreen'
import AnorchMeScreen from '../pages/AnchorTabs/AnorchMeScreen'
import MyShopScreen from '../pages/AnchorTabs/MyShopScreen'

import images from '../assets/images/index';

const BottomTab = createBottomTabNavigator()

function BottomTabNavigator({ navigation, route }: any) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  const navHeadOption = (title?: string) => ({
    header: (p: any) => <NavBar {...p} title={title} />,
  })

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
      initialRouteName="AnorchPublish"
      tabBarOptions={{
        activeTintColor: Colors.basicColor,
        inactiveTintColor: Colors.lightGrey
      }}
    >
      <BottomTab.Screen
        name="AnorchPublish"
        component={PublishScreen}
        options={{
          title: '首页',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? images.tabLiveActive : images.tabLive} resizeMode="contain" />,
        }}
      />
      {/* 暂不开放 */}
      {/* <BottomTab.Screen
        name="AnorchShop"
        component={MyShopScreen}
        options={{
          title: '店铺',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? images.tabShopActive : images.tabShop} resizeMode="contain" />,
        }}
      /> */}
      <BottomTab.Screen
        name="AnorchMe"
        component={AnorchMeScreen}
        options={{
          title: '我的',
          tabBarIcon: ({ focused }) => <Image style={styles.tabBarImage} source={focused ? images.tabMeActive : images.tabMe} resizeMode="contain" />,
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
  const routeName = route.state?.routes[route.state.index]?.name;

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