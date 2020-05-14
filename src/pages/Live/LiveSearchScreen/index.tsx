/**
 * 直播首页
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import LiveHomeTabs from './LiveHomeTabs';
import withPage from '../../../components/HOCs/withPage';
import { Colors } from '../../../constants/Theme';
import LiveSummaryBlock from '../../../components/LiveSummaryBlock';
import {pad} from '../../../constants/Layout';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../../../components/SearchBar/SearchBar';
import {apiSearchLiveStreamList} from '../../../service/api';
import Empty from '../../../components/Empty';
import images from '../../../assets/images';
import '../../../actions/im';

const LiveHomeScreen = (props: any) : React.ReactElement =>  {
  console.log(props.safeTop, 'safeTop')
  const [data] = React.useState(['1', '2'])
  const navgation = useNavigation();

  navgation.setOptions({
    headerTitle: () => <SearchBar
      hasSearchKey={false}
      isPlaceHolder={false}
      inputSearchKey={(text: string) => setSearchKey(text)}
      toSearch={(value: string) => toSearch(value)}
    />,
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  const pageSize = 20
  const [searchKey, setSearchKey] = useState('')
  const [sortValue, setSortValue] = useState('sort')
  const [isEmpty, setIsEmpty] = useState(false)
  const [emptySearchKey, setEmptySearchKey] = useState('')
  const [livingRoomList, setLivingRoomList] = useState([])
  let [pageNo, setPageNo] = useState(1)

  /**
   * 搜索
   * @param placeholderSearchKey 搜索占位符
   */
  const toSearch = (placeholderSearchKey: string) => {
    const params = {
      pageSize,
      pageNo: 1,
      searchName: searchKey
    }

    apiSearchLiveStreamList(params).then((res: any) => {
      console.log('直播搜索', res)
      setIsEmpty(!res.count)
      if (!res.count) {
        setEmptySearchKey(searchKey)
        return
      }

      setLivingRoomList(res.list)
    })
  }

  /**
   * 列表尾部
   */
  const ListFooterComponent = () => {
    return (
      livingRoomList.length 
        && 
        (
          <View style={styles.listFooterWrapper}>
            <Text>没有更多啦~</Text>
          </View>
        )
        || <Text></Text>
    );
  }

  return (
    <SafeAreaView
      style={StyleSheet.flatten([styles.wrapper])}
    >
      {/* <View style={StyleSheet.flatten([styles.contentWrapper, {marginTop: props.safeTop}])}> */}
      <View style={StyleSheet.flatten([styles.contentWrapper])}>
        <FlatList
          refreshing
          data={livingRoomList}
          initialNumToRender={props.initialNumToRender}
          //item显示的布局
          renderItem={(d) => <LiveSummaryBlock {...d} />}
          // 空布局
          ListEmptyComponent={
            <Empty 
              img={images.emptySearch}
              text='对不起，没有找到你想要找的直播间，换一个关键词试试！'
              textStyle={{width: '70%', textAlign: 'center'}}
            />
          }
          ListFooterComponent={ListFooterComponent}
          keyExtractor={(item: any, index: number) => 'index' + index + item}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={StyleSheet.flatten([props.contentContainerStyle, {flex: 1}])}
        />
      </View>
    </SafeAreaView>
  )
};

LiveHomeScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },

  listFooterWrapper: {
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.lightGrey,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: pad
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  }
});

export default withPage(LiveHomeScreen, {
  statusBarOptions: {
    // barStyle: 'dark-content',
  },
});