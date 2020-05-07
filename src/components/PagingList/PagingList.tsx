import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
  Text
} from 'react-native';
import {Divider} from 'react-native-elements';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import _get from 'lodash/get';
// import i18n from '../../helpers/i18n';
import {Colors as colors} from '../../constants/Theme';
import {vw} from '../../utils/metric';
import Empty from '../../components/Empty';

interface PageListProps {
  ListFooterComponent?: any,
}

const PagingList = React.forwardRef((props: PageListProps, ref: any) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false); // 下拉刷新
  const [isLoading, setIsLoading] = React.useState(false); // 加载中
  const [listData, setListData] = React.useState(props.initListData || []);
  const [empty, setEmpty] = React.useState(false);
  const [noMore, setNoMore] = React.useState();

  /**
   * 容器高度(空居中)
   */
  const [contentHeight,  setContentHeight] = React.useState(0);

  /**
   * 分页
   */
  let size = props.size;
  let page = React.useRef(props.initPage);

  /**
   * 下拉刷新
   */
  const onRefresh = async ({withRefreshAnimation} = {}) => {
    if (withRefreshAnimation) {
      setIsRefreshing(true);
    }
    setNoMore(false);
    setEmpty(false);
    page.current = 0;
    const {result, code} = (await props.onRefresh(page, size)) || {};
    setIsRefreshing(false);
    console.log(result, '====');
    setListData(result || []);

    if (result && result.length > 0) {
      if (result.length < size) {
        setNoMore(true);
      }
      setListData(result);
    } else {
      setListData([]);
      setEmpty(true);
    }
  };

  /**
   * 加载更多
   */
  const onEndReached = async () => {
    setIsLoading(true);
    page.current++;
    const {result, code} = await props.onEndReached(page, size) || {};

    if (!result || result.length === 0) {
      page.current--;
      setNoMore(true);
    } else {
      setListData(listData => {
        console.log(result, 'r.result');
        return [...listData, ...result];
      });
    }
    setIsLoading(false);
  };

  /**
   * 列表尾部
   */
  const ListFooterComponent = () => {
    if (noMore) {
      return (
        <View style={styles.listFooterWrapper}>
          <SmallText>没有更多啦~</SmallText>
        </View>
      );
    }

    if (isLoading || isRefreshing) {
      return (
        <View style={styles.listFooterWrapper}>
          <ActivityIndicator style={{marginRight: 8}} />
          <Text>加载中...</Text>
        </View>
      );
    }

    return <View style={StyleSheet.flatten([styles.listFooterWrapper, {borderTopWidth: 0}])} />;
  };

  /**
   * 列表空列表
   */
  const DefaultListEmptyComponent = () => {
    if (empty) {
      return <Empty style={{height: contentHeight}} />;
    }
    return null;
  };

  // console.log(listData, 'listDatalistData');
  React.useEffect(() => {
    if (props.isInitGetData) {
      onRefresh()
    }
  }, [])


  React.useEffect(() => {
    /**
     * 暴露组件内部方法 
     */
    ref({
      actions: {
        setListData,
        getListData: () => listData
      }
    })
  }, [listData])

  return (
    <View style={StyleSheet.flatten([styles.flatList, props.style])}>
      <FlatList
        refreshing
        data={listData}
        initialNumToRender={props.initialNumToRender}
        //item显示的布局
        renderItem={props.renderItem}
        // 空布局
        ListEmptyComponent={props.empty || DefaultListEmptyComponent}
        //下拉刷新相关
        refreshControl={
          <RefreshControl
            // title={'Loading'}
            // colors={[colors.theme]}
            refreshing={isRefreshing}
            onRefresh={() => onRefresh({withRefreshAnimation: true})}
          />
        }
        ListFooterComponent={props.ListFooterComponent || ListFooterComponent}
        //加载更多
        onEndReached={onEndReached}
        onEndReachedThreshold={0.01}
        ItemSeparatorComponent={
          props.showItemSeparator
            ? () => <Divider style={styles.divider} />
            : null
        }
        keyExtractor={(item, index) => 'index' + index + item}
        numColumns={props.numColumns}
        getItemLayout={props.getItemLayout}
        columnWrapperStyle={props.numColumns >=2 && props.columnWrapperStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={props.contentContainerStyle}
        onLayout={e => {
          let height = e.nativeEvent.layout.height;
          if (contentHeight < height) {
            setContentHeight(height)
          }
        }}
      />
    </View>
  );
});

PagingList.defaultProps = {
  isInitGetData: true, // 加载组件先获取一次数据
  renderItem: () => <PrimaryText>请指定renderItem</PrimaryText>,
  size: 10,
  initPage: 0,
  onRefresh: () => undefined,
  onEndReached: () => undefined,
  initialNumToRender: undefined,
  showItemSeparator: false,
};

export default PagingList;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  listFooterWrapper: {
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.lightGrey,
  },
  divider: {
    marginHorizontal: vw(4),
    backgroundColor: colors.lightGrey,
  },
});
