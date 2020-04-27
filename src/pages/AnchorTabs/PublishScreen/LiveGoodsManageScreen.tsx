/**
 * 直播货物管理 
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
import withPage from '../../../components/HOCs/withPage';
import {vw} from '../../../utils/metric';
import {Colors} from '../../../constants/Theme';
import {pad} from '../../../constants/Layout';
import Empty from '../../../components/Empty';
import GoodCheckRow from '../../../components/GoodCheckRow';

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
   * 确认
   */
  const onSubmit = () => {
    // 提交更改

    // 跳转
    navigate('AnorchLivingRoomScreen');
  }

  const data = [1,2,3,4];

  const onPress = () => {

  }

  /**
   * 选择和反选
   */
  const checkGood = () => {

  }

  return (
    <View style={styles.style}>
      {
        data && data.length > 0 ? (
          <ScrollView style={styles.scroll}>
            {
              data.map((good, index) => {
                return (
                  <View key={`g_${index}`} style={styles.rowWrapper}>
                    <GoodCheckRow 
                      data={{goodTitle: 1}}
                      isChecked={false}
                      onPress={() => checkGood()}
                      style={{
                        borderWidth: index === 0
                      }}
                    />
                  </View>
                )
              })
            }
          </ScrollView>
        ) : (
          <Empty style={{backgroundColor: Colors.bgColor}} text="暂无商品" />
        )
      }
      <View style={styles.summaryWrapper}>
        <View style={styles.row}>
          <PrimaryText>
            全选
          </PrimaryText>
          <PrimaryText>共 </PrimaryText>
          <T1 color="theme" style={{top: scale(4)}}>{data.length}</T1>
          <PrimaryText> 件商品</PrimaryText>
        </View>
        
        <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
          <PrimaryText style={styles.deleteText}>删除</PrimaryText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.bottomWrapper} onPress={onSubmit}>
        <PrimaryText color="white">确认开启直播间</PrimaryText>
      </TouchableOpacity>
    </View>
  )
};

LiveGoodsManage.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  summaryWrapper: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: pad,
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
    backgroundColor: '#fff',
    barStyle: 'dark-content',
  }
});