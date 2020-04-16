import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../pages/Home/HomeScreen';
import FoundScreen from '../pages/Found/FoundScreen';
import LiveNavigator from './LiveNavigator';
import CartScreen from '../pages/Cart/CartScreen';
import MineScreen from '../pages/Mine/MineScreen';

import { Colors } from '../constants/Theme'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = '首页';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor
  });

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
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="发现"
        component={FoundScreen}
        options={{
          title: '发现',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-compass" />,
        }}
      />
      <BottomTab.Screen
        name="直播"
        component={LiveNavigator}
        options={{
          title: '直播',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-compass" />,
        }}
      />
      <BottomTab.Screen
        name="购物车"
        component={CartScreen}
        options={{
          title: '购物车',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-cart" />,
        }}
      />
      <BottomTab.Screen
        name="我的"
        component={MineScreen}
        options={{
          title: '我的',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  return routeName
}
