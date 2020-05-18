import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Image,
  Animated,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { connect } from 'react-redux'
import { apiGetWorks } from '../../service/api'

import waterFall from '../../utils/waterFall'
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'
import { Ionicons } from '@expo/vector-icons'

import WorkCard from '../../components/WorkCard/WorkCard'
import checkIsBottom from '../../utils/checkIsBottom'

function Found(props: any) {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const pageSize = 20
  let pageNoRef = useRef(1)
  let hasMoreRef = useRef(true)
  const { isLogin } = props
  const [sort, setSort] = useState(0)
  const [workList, setWorkList] = useState([])
  const [maxHeight, setMaxHeight] = useState(0)
  const [showMask, setShowMask] = useState(false)
  const [loading, setLoading] = useState(false)
  const rotateAnim = new Animated.Value(0)

  useEffect(() => {
    getFoundList(false)
  }, [])

  useEffect(() => {
    if (!isFocused) setShowMask(false)
  }, [isFocused])

  /**
   * 加载发现数据
   * @param isPullDown 是否是下拉刷新
   */
  const getFoundList = async (isPullDown: boolean) => {
    const params = {
      page: pageNoRef.current,
      pageSize: pageSize,
      sort: 0
    }

    apiGetWorks(params).then((res: any) => {
      console.log('发现数据', res)
      if (!res.worksInfoList) return

      res.worksInfoList.forEach((item: any) => {
        item.imageWidth = item.worksMoreInfo.imageWidth
        item.imageHeight = item.worksMoreInfo.imageHeight
      })

      let tempList = [...workList, ...waterFall(res.worksInfoList).items]
      let maxH = waterFall(tempList).maxHeight

      const totalPage = Math.ceil(res.totalCount / pageSize)

      hasMoreRef.current = pageNoRef.current < totalPage
      setWorkList(isPullDown ? waterFall(res.worksInfoList).items : tempList)
      setMaxHeight(isPullDown ? waterFall(res.worksInfoList).maxHeight : maxH)
    }).catch(err => {
      console.log(err, '232222')
    })
  }

  const showAddAction = () => {
    if (showMask) {
      setShowMask(false)
    } else {
      setShowMask(true)
    }
  }

  /**
   * 下拉刷新
   */
  const onPullDownRefresh = () => {
    pageNoRef.current = 1
    getFoundList(true)
  }

  /**
   * 触底加载
   */
  const onReachBottom = (e: any) => {
    if (hasMoreRef.current && checkIsBottom(e)) {
      pageNoRef.current += 1
      getFoundList(false)
    }
  }

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(e) => onReachBottom(e)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onPullDownRefresh}
          />
        }
      >
        <View style={{ height: maxHeight }}>
          {
            workList && workList.map((item: any, index: number) => {
              return (
                <WorkCard key={`work-${index}`} workInfo={item} />
              )
            })
          }
        </View>
      </ScrollView>


      <View style={styles.addContainer}>
        {
          showMask && <TouchableWithoutFeedback
            onPress={() => navigation.push('PublishWork', { type: 'video' })}
          >
            <Image source={require('../../assets/works-image/video.png')} style={styles.mediaIcon} />
          </TouchableWithoutFeedback>
        }

        {
          showMask && <TouchableWithoutFeedback
            onPress={() => navigation.push('PublishWork', { type: 'photo' })}
          >
            <Image source={require('../../assets/works-image/photo.png')} style={styles.mediaIcon} />
          </TouchableWithoutFeedback>
        }

        {
          isLogin && <TouchableWithoutFeedback onPress={showAddAction}>
            <Animated.View style={[styles.icon]}>
              <Ionicons name='ios-add' size={40} color={Colors.whiteColor} style={{ lineHeight: pxToDp(100) }} />
            </Animated.View>
          </TouchableWithoutFeedback>
        }
      </View>

      {
        showMask && <TouchableOpacity style={styles.mask} onPress={() => setShowMask(false)} />
      }
    </View>
  )
}

export default connect(
  (state: any) => state.userData
)(Found)

const styles = StyleSheet.create({
  addContainer: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    zIndex: 999
  },
  icon: {
    width: pxToDp(100),
    height: pxToDp(100),
    borderRadius: pxToDp(50),
    backgroundColor: Colors.basicColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  mediaIcon: {
    width: pxToDp(100),
    height: pxToDp(100),
    marginBottom: pxToDp(40)
  }
})