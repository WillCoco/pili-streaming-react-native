/**
 * 直播前的预组货
 */
import * as React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {PrimaryText, SmallText, T1, scale} from 'react-native-normalization-text';
import {useNavigation} from '@react-navigation/native';
import withPage from '../../../../components/HOCs/withPage';
import {vw} from '../../../../utils/metric';
import {Colors} from '../../../../constants/Theme';
import {pad} from '../../../../constants/Layout';
import Empty from '../../../../components/Empty';
import GoodCheckRow from './LiveGoodsManageRow';
import NavBar from '../../../../components/NavBar';
import ButtonRadius from '../../../../components/Buttons/ButtonRadius';
import CheckBox from '../../../../components/CheckBox';

const emptyList: Array<any> = [];

const LiveGoodsManage = (props: any) =>  {
  const {navigate, goBack} = useNavigation();
  const dispatch = useDispatch();

  const liveConfig = useSelector(state => state?.live?.liveConfig);

  /**
   * 删除
   */
  const onDeletePress = () => {
    console.log('shanchu')
  }

  /**
   * 预组货列表
   *  添加是否选中
   */
  const warehouseGoods = useSelector(state => {
    const list = state?.shop?.warehouseGoods;
    return list.map((good: any) => {
      return ({
        ...good,
        isChecked: false
      })
    }) || emptyList;
  });

  /**
   * 选中的预组货
   */
  const [checkedList, setCheckedList] = React.useState(warehouseGoods);

  /**
   * 选择
   */
  const checkGood = (index: number) => {
    const newCheckedList = [...checkedList];
    newCheckedList[index].isChecked = !newCheckedList[index].isChecked;

    console.log(newCheckedList, 'newCheckedList')
    setCheckedList(newCheckedList);
  }

  /**
   * 现在是否全选
   */
  const isCheckedAll = !checkedList.find((o: any) => !o.isChecked);

  /**
   * 全选/反选
   */
  const onPressCheckAll = () => {
    // 全选
    if (!isCheckedAll) {
      const newCheckedList = checkedList.map((good: any) => ({...good, isChecked: true}));
      setCheckedList(newCheckedList);
      return;
    }

    const newCheckedList = checkedList.map((good: any) => ({...good, isChecked: false}));
    setCheckedList(newCheckedList);
  }

  /**
   * 添加/取消店铺
   */
  const addShop = () => {
    alert('根据是否在店铺列表执行删除或添加操作')
  }

  /**
   * 确认
   */
  const onSubmit = () => {
    // 提交更改
    console.log(checkedList, '选中要去直播卖的商品');


    // 跳转
    navigate('AnorchLivingRoomScreen');
  }

  return (
    <View style={styles.style}>
      <NavBar title="预组货" leftTheme="light" titleStyle={{color: '#fff'}} style={{backgroundColor: Colors.basicColor}} />
      {
        checkedList && checkedList.length > 0 ? (
          <ScrollView style={styles.scroll} contentContainerStyle={{backgroundColor: Colors.bgColor}}>
            {
              checkedList.map((good: any, index: number) => {
                return (
                  // <View key={`g_${index}`} style={styles.rowWrapper}>
                    <GoodCheckRow 
                      // data={{goodTitle: 1}}
                      isChecked={good.isChecked}
                      onPressCheck={() => checkGood(index)}
                      onPressAddShop={() => addShop(good?.isInShopList)} // 是否在橱窗列表
                      style={{
                        marginBottom: 4,
                      }}
                    />
                  // </View>
                )
              })
            }
          </ScrollView>
        ) : (
          <Empty style={{backgroundColor: Colors.bgColor}} text="暂无商品" />
        )
      }
      <View style={styles.summaryWrapper}>
        <CheckBox
          label="全选"
          isChecked={isCheckedAll}
          labelStyle={{color: Colors.darkGrey}}
          onPress={onPressCheckAll}
        />
        <ButtonRadius
          text={`开播(${0})`}
          onPress={onSubmit}
        />
      </View>
    </View>
  )
};

LiveGoodsManage.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  summaryWrapper: {
    flexDirection: 'row',
    height: scale(58),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: pad,
    backgroundColor: '#fff'
  },
  deleteButton: {
    height: 28,
    width: 60,
    backgroundColor: Colors.opacityBasicColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  deleteText: {
    color: Colors.basicColor,
  },
  bottomWrapper: {
    height: 48,
    backgroundColor: Colors.basicColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 8,
  },
  rowWrapper: {
    paddingHorizontal: pad,
    backgroundColor: '#fff'
  }
});

export default withPage(LiveGoodsManage, {
  statusBarOptions: {
    backgroundColor: 'transparent',
    barStyle: 'light-content',
  }
});