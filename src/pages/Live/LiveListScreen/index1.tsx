/**
 * 直播页
 */
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  StyleProp,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LiveWindow from '../../../components/LiveWindow';

interface LiveScreenProps {
  dataList: any[],
  focusedDataId?: number | string, // 初始显示第几个数据
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

const LiveScreen = (props: LiveScreenProps) : any =>  {
  /**
   * 当前数据真正index
   */
  const focusedData : {id: number, data: string} | undefined
   = mockData.find(d => {
      return d.id === (props.focusedDataId || 0)
    })
  console.log(focusedData, 'index')
  const focusedDataIndex: {current: number} = React.useRef(focusedData?.id || 0);

  /**
   * 数据列表
   */
  const defaultSwiperData = mockData.slice(0, 4);
  const [swiperData, setSwiperData] = React.useState(defaultSwiperData);

  /**
   * 设置循环
   * @param i 
   */
  const onIndexChanged = (i: number) => {
      const addIndex = (i + 2) % 4
      const addData = mockData[focusedDataIndex.current]
      const newSwiperData = [...swiperData]
      newSwiperData[addIndex] = addData;
      setSwiperData(newSwiperData)
      
    console.log(i, addIndex, 'changed')
  }

  return (
    <View style={styles.wrapper}>
      <Swiper
        horizontal={false}
        containerStyle={{
          flex: 1,
        }}
        onIndexChanged={onIndexChanged}
        onScrollBeginDrag={() => {
          console.log('onScrollBeginDrag')
          return false
        }}
        // onTouchStartCapture={() => {
        //   console.log('onTouchStartCapture')
        //   return false
        // }}
        onStartShouldSetResponderCapture={() => {
          return false;
        }}
        onStartShouldSetResponder={() => false}
        onMoveShouldSetResponder={() => false}
        onMoveShouldSetResponderCapture={() => false}
      >
        {
          swiperData.map((d, i) => {
            return (
              <LiveWindow
                key={`${d.id}`}
                style={{flex: 1, height: 600, borderWidth: 1}}
                liveData={d.data}
                msgList={d}
                onMsgListResponse={(v) => 0}
              />
            )
            return <Text key={`${i}`}>{d.data}</Text>
          })
        }
      </Swiper>
      <FlatList
        data={swiperData}
        renderItem={({item}) => {
          return <Text>{item.data}</Text>  
        }}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderWidth: 1,
  },
  scrollerWrapper: {
  },
  contentWrapper: {
    justifyContent: 'flex-end',
  }
});

export default LiveScreen;