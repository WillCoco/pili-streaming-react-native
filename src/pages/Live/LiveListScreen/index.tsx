/**
 * 直播页
 */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  PanResponder,
} from 'react-native';
import LiveWindow from '../../../components/LiveWindow';
import Swiper from 'react-native-swiper';

interface LiveScreenProps {
  liveList: any[],
  initFocusedDataId?: number | string, // 初始显示第几个数据
}

const mockData = [{
  id: 0,
  data: '0000',
},{
  id: 1,
  data: '1111',
},{
  id: 2,
  data: '2222',
},{
  id: 3,
  data: '3333',
},{
  id: 4,
  data: '4444',
},{
  id: 5,
  data: '5555',
},{
  id: 6,
  data: '6666',
},{
  id: 7,
  data: '7777',
},];

const DEFAULT_BOUNDARY_Y = 100; // 切换上下的临界值
const GET_MORE_BOUNDARY_PERCENT = 0.3; // 获取更多直播百分比临界值
const GET_MORE_BOUNDARY_COUNT = 2; // 获取更多直播数量临界值
// const LIVES_PAGE_SIZE = 10;

const LiveScreen = (props: LiveScreenProps) : any =>  {
  /**
   * 当前数据真正index
   */
  let defaultFocusedDataIndex: number | undefined;
  const focusedData : {id: number, data: string} | undefined
   = mockData.find((d, i) => {
     if (d.id === props.initFocusedDataId) {
       defaultFocusedDataIndex = i;
       return d;
     }
    })
  console.log(defaultFocusedDataIndex, 'index')
  const focusedDataIndex: {current: number} = React.useRef(defaultFocusedDataIndex || 0);

  // console.log(props.liveList, 'props.liveList')

  /**
   * 测试聊天
   */
  const initData: any[] = ['等级- 用户: 测试消息'];
  const [data, setData] = React.useState(initData);
  React.useEffect(() => {
    const add = () => {
      const newData = [...data, '等级- 用户: 测试消息']
      setData(newData);
    }

    const timer = setInterval(() => {
      add()
    }, 3000)

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [data])
  
  /**
   * 聊天消息是否获取响应
   */
  const [isMsgListResponsing, setIsMsgListResponsing] = React.useState(false);

  const onMsgListResponse = (isResponsing: boolean) => {
    if (isResponsing !== isMsgListResponsing) {
      setIsMsgListResponsing(isResponsing)
    }
  }
  
  /**
   * 正在获取更多
   */
  const isGetingMore: {current: boolean} = React.useRef(false);

  /**
   * swiper实例
   */
  const swiper: {current?: Swiper | null} = React.useRef(null)

  /**
   * 手势响应
   */
  // const distanceY = React.useRef(0); // 开始-结束响应后Y距离
  const m = React.useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        console.log('父开始')
        console.log(focusedDataIndex.current, 'focusedDataIndex.current')
      },
      onPanResponderMove: (evt, gestureState) => {
        // console.log('父移动', gestureState.dy)
        // 滑动是最后一个, 则滑动到
        const {length: liveListLength} = props.liveList;

        // 底部上拉
        if (focusedDataIndex.current === liveListLength && gestureState.dy < 0) {

        }

        // 顶部下拉
        if (focusedDataIndex.current === 0 && gestureState.dy > 0) {

        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('父结束')
        // 滑动足够距离
        if (gestureState.dy > Math.abs(DEFAULT_BOUNDARY_Y)) {

        }

        // 往上滑动足够距离
        if (gestureState.dy < -DEFAULT_BOUNDARY_Y) {
          // 下一个
          const {length: liveListLength} = props.liveList;
          const remainingCount = liveListLength - 1 - focusedDataIndex.current - 1; // 剩下没刷的主播数量
          const remainingPercent = remainingCount / liveListLength; // 剩下没刷的主播百分比

          if (!isGetingMore.current && (
              remainingCount <= GET_MORE_BOUNDARY_COUNT ||
              remainingPercent <= GET_MORE_BOUNDARY_PERCENT
            )
          ) {
            console.log(!isGetingMore.current, 2222)
            isGetingMore.current = true
            alert('获取更多主播列表');
          }

          // 最后一个了, 滑的很快或者无网络会滑倒最后一个
          if (remainingCount < 0) {
            if (!isGetingMore.current) {
              alert('获取更多主播列表1');
            }
            return;
          }

          // 滑动到下一个
          ++focusedDataIndex.current;
          console.log(focusedDataIndex.current, '++focusedDataIndex.current');
          swiper.current?.scrollTo(focusedDataIndex.current);
        }

        // 往下滑动足够距离
        if (gestureState.dy >= DEFAULT_BOUNDARY_Y) {
          // 执行刷新
          if (focusedDataIndex.current <= 0) {
            alert('去刷新主播列表')
            return;
          }

          // 上一个
          --focusedDataIndex.current;
          console.log(focusedDataIndex.current, '--focusedDataIndex.current')
          swiper.current?.scrollTo(focusedDataIndex.current);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    })
  , [isGetingMore.current])
  console.log('isGetingMore-out', isGetingMore);

  /**
   * onIndexChanged 
   */
  // const onIndexChanged = (i: number) => {
    // focusedDataIndex.current = i;
  // }

  return (
    <View
      style={styles.wrapper}
      {...m.panHandlers}
    >
      <Swiper
        loop={false}
        ref={c => swiper.current = c}
        horizontal={false}
        scrollEnabled={false}
        containerStyle={{
          flex: 1,
        }}
        // onIndexChanged={onIndexChanged}
      >
        {
          [
            ...props.liveList,
          ].map((d, i) => {
            return (
              <LiveWindow.Audience
                key={`${d.id}`}
                style={{flex: 1, borderWidth: 10}}
                liveData={d.data}
              />
            )
            return <Text key={`${i}`}>{d.data}</Text>
          })
        }
      </Swiper>
    </View>
  )
  return (
    <View style={styles.wrapper}>
      <FlatList
        pagingEnabled
        scrollEnabled={!isMsgListResponsing}
        initialScrollIndex={focusedDataIndex.current}
        data={props.liveList}
        renderItem={({item}) => {
          return (
            <LiveWindow
              key={`${item.id}`}
              style={{flex: 1, height: 600, borderWidth: 1}}
              liveData={item.data}
              msgList={data}
              onMsgListResponse={(v) => 0}
            />
          )
        }}
        onStartShouldSetResponderCapture={() => true}
        onTouchStart={(a) => {
          console.log(a.currentTarget, 123)
        }}
      />
    </View>
  )
};

LiveScreen.defaultProps = {
  initFocusedDataId: 0,
  liveList: mockData,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  }
});

export default LiveScreen;