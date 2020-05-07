import React, { useState, useEffect } from 'react'
import { View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  } from 'react-native'
import { PrimaryText } from 'react-native-normalization-text'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { Colors } from '../../../constants/Theme'
import { connect } from 'react-redux'
import pxToDp from '../../../utils/px2dp'
import NavBar from '../../../components/NavBar'
import { useNavigation, useRoute } from '@react-navigation/native'
import withPage from '../../../components/HOCs/withPage'
import { pad } from '../../../constants/Layout'
import images from '../../../assets/images'
import MessageRow from './MessageRow'

const mockList = [
  {
    avatarSource: images.messageDefaultAvatar,
    title: '开播提醒',
    time: '2020.12.12 12:21',
    content: '根据直播预报，今天晚上20:00，您有直播任务需要完成，请注意。',
  },
  {
    avatarSource: images.messageDefaultAvatar,
    title: '开播提醒',
    time: '2020.12.12 12:20',
    content: '根据直播预报，今天晚上20:00，您有直播任务需要完成，请注意。',
  },
  {
    avatarSource: images.messageDefaultAvatar,
    title: '开播提醒',
    time: '2020.12.12 12:22',
    content: '根据直播预报，今天晚上20:00，您有直播任务需要完成，请注意。',
  },
]

function Message(props) {
  const { navigate } = useNavigation()
  const route = useRoute()
  const [pageNo, setPageNo] = useState(1)
  const pageSize = 20
  const tabList = ['通知', '公告']
  const [messageList, setMessageList] = useState([]) // 通知
  const [noticeList, setNoticeList] = useState([]) // 公告
  const [activeIndex, setActiveIndex] = useState(0)

  /**
   * 全部标记已读
   */
  const markReaded = () => {

  }

  /**
   * 获取通知，公告列表
   */
  const getList = () => {

  }

  /**
   * 切换Tab
   */
  const changeTab = (e: any) => {
    const index = e.i
    setActiveIndex(index)
  }

  return (
    <View style={styles.style}>
      <NavBar
        title="消息"
        leftTheme="light"
        right={() => (
          <TouchableOpacity onPress={markReaded} style={{padding: pad}}>
            <PrimaryText color="white" >全部已读</PrimaryText>
          </TouchableOpacity>
        )}
        style={styles.nav}
        titleStyle={styles.navTitle}
      />
      <ScrollableTabView
        tabBarUnderlineStyle={{ backgroundColor: Colors.basicColor }}
        tabBarActiveTextColor={Colors.darkBlack}
        tabBarInactiveTextColor={Colors.darkBlack}
        tabBarBackgroundColor={Colors.whiteColor}
        renderTabBar={() => <ScrollableTabBar />}
        onChangeTab={(e) => changeTab(e)}
      >
        {
          tabList.map((item: string, index: number) => {
            return (
              <ScrollView key={`tab-${index}`} tabLabel={item + `(${12})`} style={{ paddingTop: pxToDp(20) }}>
                {
                  mockList.map((_item: any, _index: number) => {
                    return (
                      <MessageRow 
                        {..._item}
                        key={_item.time}
                      />
                    )
                  })
                }
              </ScrollView>
            )
          })
        }
      </ScrollableTabView>
    </View>
  )
}

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  nav: {
    backgroundColor: Colors.basicColor,
  },
  navTitle: {
    color: '#fff',
  },
  navRightText: {
    position: 'relative',
    top: -20
  },
})

export default withPage(Message, {
  statusBarOptions: {
    backgroundColor: 'red'
  }
});