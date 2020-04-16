import React, { useState } from 'react'
import { StyleSheet, Image } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'

import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

import homeIcon from '../../assets/tab-bar-icon/home.png'
import homeActiveIcon from '../../assets/tab-bar-icon/homeActive.png'
import foundIcon from '../../assets/tab-bar-icon/found.png'
import foundActiveIcon from '../../assets/tab-bar-icon/foundActive.png'
import cartIcon from '../../assets/tab-bar-icon/cart.png'
import cartActiveIcon from '../../assets/tab-bar-icon/cartActive.png'
import mineIcon from '../../assets/tab-bar-icon/me.png'
import mineActiveIcon from '../../assets/tab-bar-icon/meActive.png'

import Home from '../Home/Home'
import Found from '../Found/Found'
import Cart from '../Cart/Cart'
import Live from '../Live/Live'
import Mine from '../Mine/Mine'

export default function Index() {
  const [selectedTab, setSelectedTab] = useState('home')
  const [tabBarList] = useState([
    {
      title: '首页',
      label: 'home',
      icon: homeIcon,
      activeIcon: homeActiveIcon,
      component: <Home />
    }, {
      title: '发现',
      label: 'found',
      icon: foundIcon,
      activeIcon: foundActiveIcon,
      component: <Found />
    }, {
      title: '直播',
      label: 'live',
      icon: foundIcon,
      activeIcon: foundActiveIcon,
      component: <Live />
    }, {
      title: '购物车',
      label: 'cart',
      icon: cartIcon,
      activeIcon: cartActiveIcon,
      component: <Cart />
    }, {
      title: '我的',
      label: 'mine',
      icon: mineIcon,
      activeIcon: mineActiveIcon,
      component: <Mine />
    }
  ])

  return (
    <TabNavigator
      tabBarStyle={styles.tabBarStyle}
    >
      {
        tabBarList.map((item, index) => {
          return (
            <TabNavigator.Item
              title={item.title}
              key={`tab-${index}`}
              selected={selectedTab === item.label}
              titleStyle={{ color: Colors.lightBlack }}
              selectedTitleStyle={{ color: Colors.basicColor }}
              renderIcon={() => <Image style={styles.tabBarImage} source={item.icon} />}
              renderSelectedIcon={() => <Image style={styles.tabBarImage} source={item.activeIcon} />}
              onPress={() => setSelectedTab(item.label)}
            >
              {item.component}
            </TabNavigator.Item>
          )
        })
      }
    </TabNavigator>
  )
}


const styles = StyleSheet.create({
  tabBarStyle: {
    height: pxToDp(100),
    alignItems: 'center',
    backgroundColor: Colors.whiteColor
  },

  tabBarImage: {
    width: pxToDp(50),
    height: pxToDp(50)
  }
})
