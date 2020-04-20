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

interface LiveBannerProps {
  // bannerList?: any[],
  style?: StyleProp<any>,
  imageStyle?: StyleProp<any>,
}

const LiveBanner = (props: LiveBannerProps) : any =>  {
  const renderItem = (d) => {
    return (
      <LiveSummaryBlock
        {...d}
      />
    )
  }

  const onRefresh = () => Promise.resolve({
    result: [111,222,1,1,1,1,1]
  });

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
          console.log(props, 123)
          return (
            <ScrollableTab
              {...props}
              // tabsLength={4} // 分成几份
              // style={{width: '50%'}} // 所有宽度
            />
          )
        }}
      >
        <PagingList
          tabLabel="关注"
          size={10}
          // initListData={['1223', '2222']}
          //item显示的布局
          renderItem={(renderItem)}
          //下拉刷新相关
          onRefresh={onRefresh}
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
          // initListData={['1223', '2222']}
          //item显示的布局
          renderItem={renderItem}
          //下拉刷新相关
          onRefresh={onRefresh}
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