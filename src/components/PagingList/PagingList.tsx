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
  numColumns?: number,
  initPage?: number,
  initialNumToRender?: number,
  ListFooterComponent?: any,
  data: Array<any>,
  initListData?: Array<any>,
  setData?: (d: any) => any,
  size: number,
  isInitGetData?: boolean,
  renderItem: (data?: any) => JSX.Element,
  onRefresh: () => Promise<any> | undefined | null,
  onEndReached: (page: number, size: number) => Promise<any> | undefined | null,
  contentHeight: number, // 内容区域高度, 用于显示空时展开
}

const PagingList = React.forwardRef((props: PageListProps, ref: any) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false); // 下拉刷新
  const [isLoading, setIsLoading] = React.useState(false); // 加载中
  const [empty, setEmpty] = React.useState(false);
  const [noMore, setNoMore] = React.useState();

 /**
  * 列表数据
  * 模式1: 需要外部维护数据的
  * 模式2: 只需内部维护数据的
  */
  const [listData, setListData] = React.useState(props.initListData || []);
  const data = props.data || listData;
  const setData = props.setData || setListData;


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
    page.current = props.initPage;
    const {result, code} = (await props.onRefresh(page.current, size)) || {};
    setIsRefreshing(false);
    console.log(result, '====');
    setData(result || []);

    if (result && result.length > 0) {
      if (result.length < size) {
        setNoMore(true);
      }
      setData(result);
    } else {
      setData([]);
      setEmpty(true);
    }
  };

  /**
   * 加载更多
   */
  const onEndReached = async () => {
    setIsLoading(true);
    page.current++;

    if (page.current === props.initPage) {
      return;
    }
    const {result, code} = await props.onEndReached(page.current, size) || {};

    if (!result || result.length === 0) {
      page.current--;
      setNoMore(true);
    } else {
      setData(listData => {
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
          <SmallText color="grey">没有更多啦~</SmallText>
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
      let height = (contentHeight || props.contentHeight || 0) - 32; // footer
      return <Empty style={{height}} />;
    }
    return null;
  };

  // console.log(listData, 'listDatalistData');
  React.useEffect(() => {
    if (props.isInitGetData) {
      onRefresh()
    }
  }, [])

  // React.useEffect(() => {
  //   /**
  //    * 暴露组件内部方法
  //    */
  //   if (ref) {
  //     ref({
  //       actions: {
  //         setData,
  //         getListData: () => listData
  //       }
  //     })
  //   }
  // }, [listData])

  return (
    <View style={StyleSheet.flatten([styles.flatList, props.style])}>
      <FlatList
        refreshing
        data={data}
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
  initPage: 1,
  onRefresh: () => undefined,
  onEndReached: () => undefined,
  initialNumToRender: 10,
  showItemSeparator: false,
  numColumns: 1
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
    // borderTopWidth: StyleSheet.hairlineWidth * 2,
    // borderColor: colors.lightGrey,
  },
  divider: {
    marginHorizontal: vw(4),
    backgroundColor: colors.lightGrey,
  },
});
