/**
 * 直播首页
 */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  PanResponder,
  SafeAreaView,
} from 'react-native';
import LiveHomeTabs from './LiveHomeTabs';
import withPage from '../../../components/HOCs/withPage';
import { Colors } from '../../../constants/Theme';
import LiveSummaryBlock from '../../../components/LiveSummaryBlock';
import {pad} from '../../../constants/Layout';
import '../../../actions/im';

const LiveHomeScreen = (props: any) : React.ReactElement =>  {
  console.log(props.safeTop, 'safeTop')
  const [data] = React.useState(['1', '2'])

  /**
   * 列表尾部
   */
  const ListFooterComponent = () => {
    return (
      <View style={styles.listFooterWrapper}>
        <Text>没有更多啦~</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={StyleSheet.flatten([styles.wrapper])}
    >
      <View style={{marginTop: props.safeTop}}>
        <Text>搜索组件</Text>
      </View>
      <View style={StyleSheet.flatten([styles.contentWrapper, {marginTop: props.safeTop}])}>
        <FlatList
          refreshing
          data={data}
          initialNumToRender={props.initialNumToRender}
          //item显示的布局
          renderItem={(d) => <LiveSummaryBlock {...d} />}
          // 空布局
          ListEmptyComponent={() => <Text>空</Text>}
          ListFooterComponent={ListFooterComponent}
          keyExtractor={(item: any, index: number) => 'index' + index + item}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={props.contentContainerStyle}
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
    backgroundColor: Colors.basicColor,
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
    justifyContent: 'space-between'
  }
});

export default withPage(LiveHomeScreen, {
  statusBarOptions: {
    // barStyle: 'dark-content',
  },
});