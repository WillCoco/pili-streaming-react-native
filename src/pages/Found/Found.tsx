import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, StyleSheet, TouchableWithoutFeedback, Animated, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { apiGetWorks } from '../../service/api'
import { connect } from 'react-redux'
import waterFall from '../../utils/waterFall'
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'
import { Ionicons } from '@expo/vector-icons'

import WorkCard from '../../components/WorkCard/WorkCard'

function Found(props: any) {
  const navigation = useNavigation()
  const pageSize = 20
  const { isLogin } = props
  const [sort, setSort] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [workList, setWorkList] = useState([])
  const [maxHeight, setMaxHeight] = useState(0)
  const [showMask, setShowMask] = useState(false)
  const rotateAnim = new Animated.Value(0)

  useEffect(() => {
    // navigation.addListener('focus', () => {
    getFoundList()
    // })
  }, [])

  const getFoundList = () => {
    const params = { page: pageNo, pageSize, sort }
    apiGetWorks(params).then((res: any) => {
      console.log('发现数据', res)
      res.worksInfoList.forEach((item: any) => {
        item.imageWidth = item.worksMoreInfo.imageWidth
        item.imageHeight = item.worksMoreInfo.imageHeight
      })

      setWorkList(waterFall(res.worksInfoList).items)
      setMaxHeight(waterFall(res.worksInfoList).maxHeight)
    })
  }

  const showAddAction = () => {
    if (showMask) {
      setShowMask(false)
    } else {
      setShowMask(true)
    }
  }

  const publishWork = (type: string) => {
    navigation.push('PublishWork', { type })
  }

  return (
    <View>
      <ScrollView>
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
          showMask && <TouchableWithoutFeedback onPress={() => publishWork('video')}>
            <Image source={require('../../assets/works-image/video.png')} style={styles.mediaIcon} />
          </TouchableWithoutFeedback>
        }

        {
          showMask && <TouchableWithoutFeedback onPress={() => publishWork('photo')}>
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
        showMask && <View style={styles.mask}></View>
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