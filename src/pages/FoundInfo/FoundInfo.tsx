import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { connect } from 'react-redux'
import { apiGetWorksDetailInfo, apiGetMoreComment, apiFollowWorks, apiGetMoreReply } from '../../service/api'
import Toast from 'react-native-tiny-toast'
import pxToDp from '../../utils/px2dp'
import { Ionicons } from '@expo/vector-icons'

import Header from './Header/Header'
import Swiper from './Swiper/Swiper'
import WorksCard from './WorksCard/WorksCard'
import Comment from './Comment/Comment'
import Footer from './Footer/Footer'
import ActionSheet from '../../components/ActionSheet/ActionSheet'
import GoodsCard from './GoodsCard/GoodsCard'
import { Colors } from '../../constants/Theme'

function FoundInfo(props: any) {
  const commentPageSize = 10

  const navigation = useNavigation()
  const route = useRoute()
  const worksId = route.params.id
  const { isLogin } = props.userData
  const [worksInfo, setWorksInfo] = useState({})
  const [swiperList, setSwiperList] = useState([])
  const [commentList, setCommentList] = useState([])
  const [navOpacity, setNavOpacity] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const [showGoods, setShowGoods] = useState(false)
  let [commentPageNo, setCommentPageNo] = useState(1)


  navigation.setOptions({
    headerShown: false
  })

  useEffect(() => {
    getWorksInfo()
  }, [])

  /**
   * 获取作品信息
   */
  const getWorksInfo = () => {
    let params = {
      worksId
    }

    if (isLogin) {
      params[`userId`] = props.userData.userInfo.userId
    }

    console.log(params)

    apiGetWorksDetailInfo(params).then((res: any) => {
      console.log('发现详情', res)
      if (!res) {
        Toast.show('作品不存在')
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
        return
      }

      initShowReplyList(res.commentInfoList, true)
      setCommentCount(res.commentCount)
      setSwiperList(res.worksMoreInfoList)
      setWorksInfo(res)
    })
  }

  /**
   * 监听页面滚动
   * @param e 事件参数
   */
  const scrollPage = (e: any) => {
    const scrollY = e.nativeEvent.contentOffset.y

    if ((scrollY / pxToDp(460)) <= 1) {
      setNavOpacity(scrollY / pxToDp(460))
    }
  }

  /**
   * 展开 or 收起 评论
   */
  const toggleCommentCount = () => {
    if (commentList.length < commentCount) {  // 展开更多
      getMoreComment()
    } else {  // 收起评论
      setCommentList(commentList.slice(0, 5))
      setCommentPageNo(1)
    }
  }

  /**
   * 获取更多评论
   */
  const getMoreComment = () => {
    const params = {
      page: commentPageNo,
      pageSize: commentPageSize,
      worksId: worksInfo.worksId
    }

    if (isLogin) params[`userId`] = props.userData.userInfo.userId

    apiGetMoreComment(params).then((res) => {
      console.log('获取更多评论', res)
      if (commentPageNo === 1) {
        initShowReplyList(res, false)
      } else {
        initShowReplyList([...commentList, ...res], false)
      }

      setCommentPageNo(++commentPageNo)
    })
  }

  /**
   * 关注 or 取消关注 作品
   */
  const followWorks = () => {
    const { worksId, isFollow } = worksInfo

    const params = {
      followOperate: isFollow ? 0 : 1,
      worksId
    }

    console.log(params)

    apiFollowWorks(params).then(res => {
      console.log('关注or取消关注作品', res)

      worksInfo.isFollow = res.isFollow
      worksInfo.followCount
        = res.isFollow
          ? worksInfo.followCount + 1
          : worksInfo.followCount - 1

      setWorksInfo(JSON.parse(JSON.stringify(worksInfo)))
    })
  }

  /**
   * 初始化展示的回复数据（前两条）
   */
  const initShowReplyList = (list: any, isInit: boolean) => {
    list.forEach((item: any) => {
      if (isInit) {
        if (item.replyInfoList.length > 2) {
          item.showReplyInfoList = item.replyInfoList.slice(0, 2)
        } else {
          item.showReplyInfoList = item.replyInfoList
        }

        item.totalReplyCount = item.unexpandedRepayCount + item.replyInfoList.length
        item.replyPageNo = 1
      } else {
        commentList.forEach((_item: any) => {
          if (_item.commentId === item.commentId && _item.showReplyInfoList.length > 2) {
            item.showReplyInfoList = _item.showReplyInfoList
            item.replyPageNo = _item.replyPageNo
          } else {
            item.showReplyInfoList = item.replyInfoList.slice(0, 2)
            item.replyPageNo = 1
          }
        })
        item.totalReplyCount = item.unexpandedRepayCount + 2
      }
    })

    setCommentList(list)
  }

  /**
   * 展开 or 收起 回复
   */
  const toggleReplyCount = (id: string) => {
    commentList.forEach((item: any) => {
      if (item.commentId === id) {
        if (item.totalReplyCount === (item.showReplyInfoList && item.showReplyInfoList.length)) {  // 收起回复
          packUpReply(id)
        } else {  // 获取更多回复
          getMoreReply(id, item.replyPageNo)
        }
      }
    })
  }

  /**
   * 获取更多回复
   */
  const getMoreReply = (id: string, pageNo: number) => {
    const params = {
      page: pageNo,
      pageSize: 10,
      commentId: id,
    }

    apiGetMoreReply(params).then(res => {
      console.log('获取更多回复', res)
      commentList.forEach((item: any) => {
        if (item.commentId === id) {
          if (pageNo === 1) {
            item.showReplyInfoList = res
          } else {
            item.showReplyInfoList = [...item.showReplyInfoList, ...res]
          }
        }

        item.replyPageNo = ++item.replyPageNo
      })

      setCommentList(JSON.parse(JSON.stringify(commentList)))
    })
  }

  /**
   * 收起回复
   */
  const packUpReply = (id: string) => {
    commentList.forEach((item: any) => {
      if (item.commentId === id) {
        item.showReplyInfoList = item.showReplyInfoList.slice(0, 2)
        item.replyPageNo = 1
      }
    })

    setCommentList(JSON.parse(JSON.stringify(commentList)))
  }

  /**
   * 展示商品窗口
   */
  const showGoodsActionSheet = () => {
    if (!!worksInfo.worksRelationGoods.length) {
      setShowGoods(true)
      return
    }
    Toast.show('没有相关商品')
  }

  const hiddenGoodsActionSheet = () => {
    setShowGoods(false)
  }

  return (
    <View style={styles.container}>
      <Header opacity={navOpacity} />

      <ScrollView
        onScroll={(e) => scrollPage(e)}
        scrollEventThrottle={200}
        style={styles.container}
      >
        {
          worksInfo.worksType === 'PICTURE'
            ? <Swiper swiperList={swiperList} />
            : <Text>1</Text>
        }

        {/* <WorksCard worksInfo={worksInfo} /> */}
        <Comment
          commentInfoList={commentList}
          commentCount={commentCount}
          toggleCommentCount={toggleCommentCount}
          toggleReplyCount={(id: string) => toggleReplyCount(id)}
        />
      </ScrollView>

      <Footer
        worksInfo={worksInfo}
        followWorks={followWorks}
        showGoodsActionSheet={showGoodsActionSheet}
      />

      <ActionSheet
        isShow={showGoods}
      >
        <TouchableOpacity style={styles.closeIcon} onPress={() => setShowGoods(false)}>
          <Ionicons
            size={25}
            name='ios-close-circle-outline'
            color={Colors.darkGrey}
          />
        </TouchableOpacity>
        {
          worksInfo.worksRelationGoods && worksInfo.worksRelationGoods.map((item: any, index: number) => {
            return (
              <GoodsCard
                key={`goods-${index}`}
                goodsInfo={item}
                hiddenGoods={hiddenGoodsActionSheet}
              />
            )
          })
        }
      </ActionSheet>
    </View>
  )
}

export default connect(
  (state: any) => state
)(FoundInfo)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closeIcon: {
    alignItems: 'flex-end',
    padding: pxToDp(20)
  }
})