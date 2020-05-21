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
  ScrollView,
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
import PagingList from '../../../components/PagingList';
import '../../../actions/im';
import { EMPTY_ARR, EMPTY_OBJ } from '../../../constants/freeze';
import { isSucceed } from '../../../utils/fetchTools';

const LiveHomeScreen = (props: any) : React.ReactElement =>  {
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

  const PAGE_SIZE = 20
  const [searchKey, setSearchKey] = useState('')
  const [livingRoomList, setLivingRoomList] = useState([])

  /**
   * 搜索
   * @param placeholderSearchKey 搜索占位符
   */
  const toSearch = (placeholderSearchKey: string) => {
    const params = {
      pageSize: PAGE_SIZE,
      pageNo: 1,
      searchName: searchKey
    }

    apiSearchLiveStreamList(params).then((res: any) => {
      console.log('直播搜索', res)
      if (!res.total) {
        setSearchKey('')
        return
      }

      setLivingRoomList(res?.records)
    })
  }

  /**
   * 刷新
   */
  const onRefresh = async () => {
    const result = await apiSearchLiveStreamList({
      searchName: searchKey,
      pageSize: PAGE_SIZE,
      pageNo: 1,
    })
    .catch((r: any) => {console.log(r, 'LiveStreamList')});

    if (isSucceed(result)) {
      return Promise.resolve({result: result?.data?.records || EMPTY_ARR});
    }

    return Promise.resolve({result: EMPTY_ARR});
  };

  /**
   * 加载更多
   */
  const onEndReached = async (pageNo: number, pageSize: number) => {
    const result = await apiSearchLiveStreamList({
      searchName: searchKey,
      pageSize,
      pageNo,
    })
    .catch((r: any) => {console.log(r, 'apiSearchLiveStreamList')});

    console.log(result, 'result')
    if (isSucceed(result)) {
      return Promise.resolve({result: result?.data?.records || EMPTY_ARR});
    }
    return Promise.resolve({result: EMPTY_ARR});
  };

  return (
    <SafeAreaView
      style={StyleSheet.flatten([styles.wrapper])}
    >
      <PagingList
        size={PAGE_SIZE}
        data={livingRoomList}
        //item显示的布局
        renderItem={(d) => <LiveSummaryBlock liveInfo={d.item} />}
        empty={
          <Empty 
            img={images.emptySearch}
            text='对不起，没有找到你想要找的直播间，换一个关键词试试！'
            textStyle={{width: '70%', textAlign: 'center'}}
          />
        }
        //下拉刷新相关
        onRefresh={onRefresh}
        //加载更多
        onEndReached={onEndReached}
        // ItemSeparatorComponent={separator}
        keyExtractor={(item, index) => 'index' + index + item}
        initialNumToRender={PAGE_SIZE}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={{borderTopWidth: 4, borderColor: Colors.pageGreyBg}}
        contentContainerStyle={{paddingHorizontal: pad}}
      />
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
    paddingHorizontal: pad,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    flex: 1,
    padding: pad,
    borderWidth: 4
  }
});

export default withPage(LiveHomeScreen, {
  statusBarOptions: {
    // barStyle: 'dark-content',
  },
});