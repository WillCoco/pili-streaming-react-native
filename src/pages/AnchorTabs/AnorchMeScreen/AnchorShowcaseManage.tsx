/**
 * 直播店铺(主播详情橱窗)商品管理
 */
import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavBar from '../../../components/NavBar';
import withPage from '../../../components/HOCs/withPage';
import LiveGoodManageRow from '../../../components/GoodManageRow/LiveGoodManageRow';
import ButtonRadius from '../../../components/Buttons/ButtonRadius';
import {pad} from '../../../constants/Layout';
import {Colors} from '../../../constants/Theme';
import ScrollableTab from '../../../components/ScrollableTab';
import { vw, vh } from '../../../utils/metric';
import Empty from '../../../components/Empty';
import PagingList from '../../../components/PagingList';
import { getShowcaseGoods, AddGoodsTargetType } from '../../../actions/shop';
import Toast from 'react-native-tiny-toast'

const exampleData = [...Array(5)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));

const ROW_HEIGHT = 125;

const AnchorShowcaseManage = () =>  {
  const {navigate} = useNavigation();
  /**
   * store橱窗商品
   */
  const goodsList = useSelector(state => state?.showcase?.showcaseGoods);

  React.useEffect(() => {
    // 获取数据
    let loading: any;
    const getData = async () => {
      loading = Toast.showLoading('');
      const data = await dispatch(getShowcaseGoods())
      setData(data);
      Toast.hide(loading);
    };
    getData();

    return () => {
      if (loading) {
        Toast.hide(loading);
      }
    }
  }, [])

  const dispatch = useDispatch();
  const [data, setData]: Array<any> = React.useState(goodsList || []);

  /**
   * 渲染行
   */
  const renderItem = ({item, index, drag, isActive}: any): React.ReactNode => {
    console.log(index, 'indexxxx')
    return (
      <LiveGoodManageRow
        data={item}
        drag={drag}
        isActive={isActive}
        onMoveDownPress={() => onMoveDownPress(index, item)}
        onMoveUpPress={() => onMoveUpPress(index, item)}
        onRemovePress={() => onRemovePress(index, item)}
      />
    )
  }

  /**
   * 下移
   */
  const onMoveDownPress = (index: number, item: any) => {
    setData((data: Array<any>) => {
      const newData = [...data];
      newData[index + 1] = item;
      newData[index] = data[index + 1];

      console.log(newData, 'newData')
      return newData;
    })
  };

  /**
   * 上移
   */
  const onMoveUpPress = (index: number, item: any) => {
    setData((data: Array<any>) => {
      const newData = [...data];
      newData[index - 1] = item;
      newData[index] = data[index - 1];

      return newData;
    })
  };

  /**
   * 删除
   */
  const onRemovePress = (index: number, item: any) => {
    setData((data: Array<any>) => {
        console.log(data, '删除')
      const newData = [...data];
        alert(index)
      newData.splice(index, 1);
      return newData;
    })
  };

  /**
   * 提交修改
   */
  const onSubmit = () => {
    alert('提交')
  }

  /**
   * 是否空
   */
  const isEmpty = !goodsList || goodsList.length === 0;
  console.log(data, 'dataaa')
  return (
    <View style={styles.style}>
      <NavBar title="店铺商品管理" leftTheme="light" titleStyle={{color: '#fff'}} style={{backgroundColor: Colors.basicColor}} />
      {
        !isEmpty ? <Empty text="暂无商品" /> : (
          <DraggableFlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => `draggable-item-${index}`}
            onDragEnd={({ data }) => setData(data)}
            contentContainerStyle={styles.contentContainerStyle}
            ListFooterComponent={() => {
              return (
                <SmallText color="grey" style={styles.footer}>没有更多啦~</SmallText>
              )
            }}
            getItemLayout={(data, index) => (
              {length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index}
            )}
          />
        )
      }
      <View style={styles.btnsWrapper}>
        <ButtonRadius
          text="添加商品"
          textStyle={styles.addText}
          style={styles.addBtn}
          onPress={() => navigate('GoodsSupply', {type: AddGoodsTargetType.showcaseGoods})}
        />
        <ButtonRadius
          text="提交保存"
          textStyle={styles.submitText}
          onPress={onSubmit}
        />
      </View>
    </View>
  )
};

AnchorShowcaseManage.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  },
  btnsWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: pad * 1.5,
    paddingHorizontal: pad
  },
  addBtn: {
    backgroundColor: Colors.pink
  },
  addText: {
    color: Colors.basicColor,
  },
  submitText: {
    color: '#fff',
  },
  contentContainerStyle: {
    paddingBottom: vh(20)
  },
  footer: {
    width: '100%',
    textAlign: 'center',
    // borderTopWidth: StyleSheet.hairlineWidth * 2,
    // borderColor: Colors.navDivider,
    marginTop: pad,
    // paddingTop: pad / 2
  }
});

export default withPage(AnchorShowcaseManage);