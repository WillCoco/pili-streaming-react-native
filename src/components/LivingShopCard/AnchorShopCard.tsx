/**
 * 主播在播商品管理
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  StyleProp,
  LayoutAnimation,
  SafeAreaView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { PrimaryText, SmallText, T4, scale, T3 } from 'react-native-normalization-text';
import PhoneShapWrapper from '../../components/PhoneShapWrapper';
import CheckBox from '../../components/CheckBox';
import {pad} from '../../constants/Layout';
import PagingList from '../../components/PagingList';
import Iconback from '../../components/Iconfont/Iconback';
// import images from '../../assets/images';
import AnchorRow from './AnchorRow';
// import { joinGroup, quitGroup, createGroup, dismissGroup, updateGroupProfile } from '../../actions/im';
import { vh, vw } from '../../utils/metric';
import Empty from '../Empty/index';
import { Colors } from '../../constants/Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const emptyList: [] = [];
const ROW_HEIGHT = 120;

const AnchorShopCard = (props: {
  goods: Array<any>,
  goodsQuantity: number,
  visible: boolean,
  setVisible: (visible: boolean) => any,
  style: StyleProp<any>,
  onPressClose: () => any,
  safeBottom: number,
}) =>  {

  const {navigate} = useNavigation();

  /**
   * 直播商品
   */
  const onPressBuy = () => {
    navigate('go');
  }

  /**
   * 直播商品
   */
  const livingGoods = useSelector(state => (state?.live?.livingGoods || emptyList));

  const [dataList, setDataList]: [Array<any>, any] = React.useState(livingGoods);

  /**
   * 过滤出选中的
   */
  const checkedFilter = (list: Array<any>) => {
    return list.filter(o => o.isChecked) // todo: 字段修正
  }

  /**
   * 选中的列表
   */
  const checkedList = React.useMemo(() => {
    return checkedFilter(dataList)
  }, [dataList]);


  /**
   * 现在是否全选
   */
  const isCheckedAll = React.useMemo(() => {
    return !dataList.find(o => (!o.isChecked)) // todo: 标识
  }, [dataList]);

  /**
   * 加工原数据
   * 加上isChecked字段
   * @params: {Array} dataList - 预组货列表原数据
   * @params: {Array} checkList - 本地操作选择的
   */
  const dataFormat = (dataList: Array<any>, checkList?: Array<any>) => {
    // 本地选择过之后刷新, format数据
    if (checkList) {
      const checked = checkedFilter(checkList);
      const result: Array<any> = [];

      dataList.forEach(d => {
        const matchedGood = checked.find(o => (o.id === d.id && !!o.id)) // todo: 标识
        if (matchedGood) {
          result.push({...d, isChecked: matchedGood.isChecked})
        } else {
          result.push(d)
        }
      })

      return result;
    }

    // 本地没有选择过, format数据默认未选中
    return dataList.map((d: any) => {
      return {
        ...d,
        isChecked: false
      }
    });
  }

  /**
   * 刷新
   */
  const onRefresh = () => {
    const d = [{id: 1, canAdd: true},{id: 2}, {id: 3}];
    const r = Promise.resolve({result: dataFormat(d, dataList)});
    return r;
  }

  /**
   * 更多
   */
  const onEndReached = () => {
    
  }

  /**
   * 提交选中
   */
  const onPressSubmit = () => {


  }

   /**
   * 全选/反选
   */
  const onPressCheckAll = () => {
    // 全选
    if (!isCheckedAll) {
      const newCheckedList = (dataList || emptyList).map((good: any) => ({...good, isChecked: true}));
      setDataList(newCheckedList);
      return;
    }

    // 取消全选
    const newCheckedList = (dataList || emptyList).map((good: any) => ({...good, isChecked: false}));
    setDataList(newCheckedList);
  }

  if (!props.visible) {
    return null
  }
  
  return (
    <TouchableWithoutFeedback onPress={props.onPressClose}>
      <View style={StyleSheet.flatten([styles.style])}>
        <TouchableWithoutFeedback onPress={() => {alert(1)}}>
          <PhoneShapWrapper
            style={StyleSheet.flatten([styles.contentStyle, {paddingBottom: props.safeBottom}])}
          >
            <View style={styles.cardTitleWrapper}>
              <TouchableOpacity
                style={StyleSheet.flatten([styles.titleLeft])}
                onPress={() => props.setVisible(false)}
              >
                <Iconback size={scale(10)} />
                <SmallText style={{}}>返回直播间</SmallText>
              </TouchableOpacity>
              <T4 style={styles.titleCenter}>直播商品管理</T4>
              <SmallText style={styles.titleRight}>重新组货</SmallText>
            </View>
            <View style={styles.scrollWrapper}>
              <PagingList
                data={dataList}
                setData={setDataList}
                size={14}
                // initListData={warehouseGoods}
                renderItem={({item, index}: any) => {
                  return (
                    <AnchorRow
                      // data={livingGoods}
                      key={`anchorShopCard_${index}`}
                      onPressBuy={onPressBuy}
                      index={index}
                      style={{borderBottomWidth: 1, borderColor: Colors.divider}}
                    />
                  )
                }}
                getItemLayout={(data, index) => (
                  {length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index}
                )}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                keyExtractor={(item, index) => 'index' + index + item}
                initialNumToRender={14}
                numColumns={1}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                contentContainerStyle={styles.pagingListWrapper}
              />
            </View>
            <View style={StyleSheet.flatten([styles.rowBetween, {backgroundColor: '#fff'}])}>
              <View style={StyleSheet.flatten([styles.rowBetween, {flex: 1}])}>
                <CheckBox
                  label="全选"
                  isChecked={isCheckedAll}
                  labelStyle={{color: Colors.lightBlack, fontSize: scale(11)}}
                  onPress={onPressCheckAll}
                />
                <View style={styles.textWrapper}>
                  <SmallText style={styles.summaryText}>共</SmallText>
                  <T3 color="theme" style={StyleSheet.flatten([styles.summaryText, {lineHeight: scale(20)}])}>2</T3>
                  <SmallText style={styles.summaryText}>件商品</SmallText>
                </View>
              </View>
              
              <TouchableOpacity onPress={onPressSubmit} style={styles.submit}>
                <T4 color="white">上架</T4>
              </TouchableOpacity>
            </View>
          </PhoneShapWrapper>
          </TouchableWithoutFeedback>
        </View>
    </TouchableWithoutFeedback>
  )
};

AnchorShopCard.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-end',
    backgroundColor: Colors.opacityDarkBg,
  },
  cardTitleWrapper: {
    padding: pad,
    paddingBottom: pad * 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.divider,
  },
  titleRight: {
    textAlign: 'right',
    alignItems: 'center',
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleCenter: {
    flexDirection: 'row',
    textAlign: 'center',
    marginRight: scale(20)
  },
  contentStyle: {
    height: vh(70),
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: pad,
  },
  pagingListWrapper: {
    paddingHorizontal: pad,
    backgroundColor: Colors.bgColor,
  },
  scrollWrapper: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  scroll: {
  },
  rowBetween: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: pad
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  submit: {
    backgroundColor: Colors.basicColor,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: vw(34),
    maxWidth: 200,
    minWidth: 140,
  },
  summaryText: {
    lineHeight: scale(16),
  }
});

export default AnchorShopCard;