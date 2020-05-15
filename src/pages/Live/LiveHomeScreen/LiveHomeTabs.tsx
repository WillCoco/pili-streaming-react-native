/**
 * 直播首页轮播
 */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import PagingList from '../../../components/PagingList';
import ScrollableTab from '../../../components/ScrollableTab';
import LiveSummaryBlock from '../../../components/LiveSummaryBlock';
import {pad} from '../../../constants/Layout';
import {Colors} from '../../../constants/Theme';
import {vw} from '../../../utils/metric';
import {getGroupList} from '../../../actions/im';
import {useDispatch} from 'react-redux';
import {apiGetLiveStreamList} from '../../../service/api';
import {useSelector} from 'react-redux';
import images from '../../../assets/images';

interface LiveBannerProps {
  style?: StyleProp<any>,
  imageStyle?: StyleProp<any>,
}

const LiveBanner = (props: LiveBannerProps) : any =>  {

  const userId = useSelector(state => state?.userData?.userInfo?.userId)
  const [followList, setFollowList]: [Array<any>, any] = React.useState([]) // 关注列表
  const [selectList, setSelectlist]: [Array<any>, any] = React.useState([]) // 精选列表

  const mockList = [
    {
      anchorId: 123,
      anchorLogo: '',
      anchorName: '1234',
      isAdvance: '1', // string 是否有预告（1：有；2：没有）
      isBack: '1', // string 是否有回放（1：有；2：没有）
      likeSum: 200,	// string 点赞数量
      liveId: 234213,	// integer($int64)直播间id
      livePic: 'https://goss.veer.com/creative/vcg/veer/800water/veer-302989341.jpg', // string 直播封面
      liveStatus: '1',	// string 直播状态（1：预告；2：直播中；3：回放）
      liveTitle: '1234',	// string 直播标题
      viewsNum: '999', // 	string观看人数
    }
  ]

  /**
   * 进入页面获取数据
   */
  React.useEffect(() => {
    getDataList('2')
  }, [])

  const renderItem = (d) => {
    return (
      <LiveSummaryBlock
        liveInfo={d.item}
      />
    )
  }

  /**
   * 获取关注/精选列表
   */
  const getDataList = (type: string) => {
    apiGetLiveStreamList({ // 直播类型不能为空（1：精选；2：关注
      liveType: type,
      page: 1,
      pageSize: 10,
      userId
    }).then(res => {
      if (type === '2') {
        setFollowList(res?.records)
      } else {
        setSelectlist(res?.records)
      }
    })
  }

  /**
   * 切换tab
   */
  const changeTab = (e) => {
    console.log(e.i);
    if (e.i === 0) { // 关注
      getDataList('2')
    } else {
      getDataList('1')
    }
  }

  /**
   * 刷新
   * @param type 类型 1-精选 2-关注
   */
  const onRefresh = async (type: string) => {
    const result = await apiGetLiveStreamList({
      liveType: type,
      page: 1,
      pageSize: 10,
      userId
    }).then(res => {
      return res?.records
    })
    return Promise.resolve({
      result: mockList
    });
    return Promise.resolve({result})
  };

  /**
   * 更多
   */
  const onEndReached = () => {};

  return (
    <View
      style={StyleSheet.flatten([styles.wrapper, props.style])}
    >
      <ScrollableTabView
        initialPage={0}
        // tabBarBackgroundColor="red"
        tabBarTextStyle={{
        }}
        tabBarUnderlineStyle={{
          backgroundColor: Colors.basicColor,
          width: 50,
          alignSelf: 'center',
          left: vw(25) - 25,
        }}
        tabBarActiveTextColor="#000"
        renderTabBar={(props) => {
          return (
            <ScrollableTab
              {...props}
              // tabsLength={4} // 分成几份
              // style={{width: '50%'}} // 所有宽度
            />
          )
        }}
        onChangeTab={changeTab}
      >
        <PagingList
          tabLabel="关注"
          size={10}
          initListData={followList}
          //item显示的布局
          renderItem={(renderItem)}
          //下拉刷新相关
          onRefresh={() => onRefresh('2')}
          //加载更多
          onEndReached={onEndReached}
          // ItemSeparatorComponent={separator}
          keyExtractor={(item, index) => 'index' + index + item}
          initialNumToRender={14}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          style={{borderTopWidth: 4, borderColor: Colors.pageGreyBg}}
          contentContainerStyle={{paddingHorizontal: pad}}
        />
        <PagingList
          tabLabel="精选"
          size={10}
          initListData={selectList}
          //item显示的布局
          renderItem={renderItem}
          //下拉刷新相关
          onRefresh={() => onRefresh('1')}
          //加载更多
          onEndReached={onEndReached}
          // ItemSeparatorComponent={separator}
          keyExtractor={(item, index) => 'index' + index + item}
          initialNumToRender={14}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          style={{borderTopWidth: 4, borderColor: Colors.pageGreyBg}}
          contentContainerStyle={{paddingHorizontal: pad}}
        />
        
      </ScrollableTabView>
    </View>
  )
};

LiveBanner.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopWidth: 4,
    borderColor: Colors.pageGreyBg
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default LiveBanner;