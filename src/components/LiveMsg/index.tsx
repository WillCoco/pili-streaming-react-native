/**
 * 直播消息
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StyleProp,
  TouchableWithoutFeedback,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import MsgRow from './MsgRow'
import { vw } from '../../utils/metric';

export type msgList = any[] | undefined;

interface LiveMsgProps {
  msgList: msgList,
  renderItem?: (d: string | object, i: number) => any,
  style?: StyleProp<any>,
}

const DEFAULT_HEIGTH = 200; // 默认消息窗高度
const DEFAULT_WIDTH = vw(65); // 默认消息窗高度
const RECTIFY_OFFSET = 10; // 底部矫正距离

const LiveMsg = (props: LiveMsgProps) : any =>  {
  /**
   * 是否滚动在最底部
   */
  const isButtom: {current: boolean} = React.useRef(true);
  
  /**
   * 是否在滚动
   */
  const isScrolling: {current: boolean} = React.useRef(false);

  /**
   * 滚动实例
  */
 const scroll: {current?: ScrollView | null} = React.useRef()

 /**
   * 滑动中
   */
  const onScrollBeginDrag = () => {
    isScrolling.current = true;
  }

 /**
   * 滑到底部, setIsButtom: true
   */
  const msgHeight = props.style?.maxHeight || DEFAULT_HEIGTH;
  const onMomentumScrollEnd = (e: any) => {
    const isScrollToBottom = e.nativeEvent.contentSize.height - e.nativeEvent.contentOffset.y <= msgHeight + RECTIFY_OFFSET;
    isButtom.current = isScrollToBottom;
    isScrolling.current = false;
  }
  
  /**
   * 来新消息
   * 1. 如果在最底部, 继续滚到底部
   * 2. 如果不在最底部, 不滚动
   */
  React.useEffect(() => {
    if (!isScrolling.current && isButtom.current) {
      // 滚动到底部
      scroll.current?.scrollToEnd()
      isButtom.current = true;
      isScrolling.current = false;
    }
  }, [props.msgList])

  const m = React.useRef(
    PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log('子开始')
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log('子move')
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      // onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('子结束')
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    })
  )

  return (
    <View
      style={StyleSheet.flatten([styles.wrapper, props.style])}
      // {...m.current.panHandlers}
    >
      <ScrollView
        ref={c => scroll.current = c}
        style={StyleSheet.flatten([styles.scrollerWrapper])}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentWrapper}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollBeginDrag={onScrollBeginDrag}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
      >
        {
          props.msgList?.map((d, i) => {
            return (
              <MsgRow
                key={`msg_${i}`}
                // onLayout={(e) => {
                  // 接近顶部的透明度
                  // console.log(e.nativeEvent.layout, i)
                // }}
              />
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 'auto',
    maxHeight: DEFAULT_HEIGTH,
    width: DEFAULT_WIDTH,
    justifyContent: 'flex-end',
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  }
})

export default LiveMsg;