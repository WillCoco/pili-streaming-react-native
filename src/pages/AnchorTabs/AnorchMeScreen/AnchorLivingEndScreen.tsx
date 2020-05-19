/**
 * 主播端直播结束
 */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Icon, Divider, ListItem} from 'react-native-elements';
import {PrimaryText, SmallText, T4, TinyText} from 'react-native-normalization-text';
import {useDispatch} from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native'
import withPage from '../../../components/HOCs/withPage';
import images from '../../../assets/images';
import {Colors} from '../../../constants/Theme';
import {vw} from '../../../utils/metric';
import {pad} from '../../../constants/Layout';
import {updateLivingStatus} from '../../../actions/live';

const dataList = [
  {title: '直播时长', data: '1h34min'},
  {title: '获得点赞数', data: '9900000'},
  {title: '观众总数', data: '400000'},
  {title: '新增粉丝数', data: '30000'},
  {title: '下单数量', data: '900'},
  {title: '总成交金额', data: '100,0000'},
]

const goodsInfo = {
  goodsImg: images.BOCIcon,
  goodsName: '耐克乔丹Air Jodan ',
  goodsSku: '1000   红黑',
  goodsPrice: '234,242',
}


const AnorchLivingEndScreen = (props: any) : any =>  {
  const {dispatch: davDispatch} = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      // 重置观看端 结束字段
      dispatch(updateLivingStatus(false));
    }
  }, [])

  // 直接返回到主播tab
  const onPressClose = () => {
    davDispatch((state: any) => {
      const routes = state.routes.filter((r: any) => {
        return !(r.name === 'LiveGoodsManage' || r.name === 'CreateLiveScreen' || r.name === 'AnchorLivingEnd');
      });
      console.log(routes, 111)

      console.log(11)

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    })
  }

  return (
    <ScrollView>
      <ImageBackground source={images.liveEndBg} style={StyleSheet.flatten([styles.wrapper, ])}>
      <View style={{paddingTop: props.safeTop}}>
          <TouchableOpacity style={styles.close}>
            <Icon name="close" color={Colors.whiteColor} onPress={onPressClose} />
          </TouchableOpacity>
          <Image source={images.liveEndTitle} style={styles.title} />
          <PrimaryText color="white" style={{textAlign: 'center', paddingVertical: pad * 1.5}}>直播ID:7777777</PrimaryText>
          <View style={styles.dataWrapper}>
            <View style={styles.subTitleLine}>
              <Image source={images.liveEndData} style={styles.subIcon} />
              <T4 style={styles.subTitle}>本场直播数据</T4>
              <Divider style={{backgroundColor: Colors.yellowColor}}/>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingVertical: pad * 2}}>
              {
                dataList.map(item => {
                  return (
                    <View style={styles.dataItem} key={item.title}>
                      <Text>{item.title}</Text>
                      <Text style={{color: Colors.darkGrey}}>{item.data}</Text>
                    </View>
                  )
                })
              }
            </View>
            <View style={styles.divider}></View>
            <View style={styles.subTitleLine}>
              <Image source={images.liveEndGoods} style={styles.subIcon} />
              <T4 style={styles.subTitle}>本场销量最佳商品</T4>
            </View>
            <ListItem
              leftAvatar={{ source: goodsInfo.goodsImg }}
              title={goodsInfo.goodsName}
              subtitle={goodsInfo.goodsSku}
              subtitleStyle={{color: Colors.darkGrey, paddingVertical: pad}}
              rightTitle={
                <PrimaryText style={styles.fontYellow}>
                  {goodsInfo.goodsPrice}<TinyText style={styles.fontYellow}> 元</TinyText>
                </PrimaryText>
              }
            />
            <View style={styles.divider}></View>
            <View style={styles.subTitleLine}>
              <Image source={images.liveEndGoods} style={styles.subIcon} />
              <T4 style={styles.subTitle}>本场销量人气商品</T4>
            </View>
            <ListItem
              leftAvatar={{ source: goodsInfo.goodsImg }}
              title={goodsInfo.goodsName}
              rightTitle={goodsInfo.goodsPrice}
              rightTitleStyle={{color: Colors.yellowColor}}
              rightSubtitle={'最高观看人数'}
              rightSubtitleStyle={{fontSize: 12}}
            />
          </View>
      </View>
      </ImageBackground>
    </ScrollView>
  )
};

AnorchLivingEndScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: vw(100),
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: pad * 1.5,
  },
  close: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    width: 150,
    height: 28,
    alignSelf: 'center',
    marginTop: pad
  },
  dataWrapper: {
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingVertical: pad * 2,
    paddingHorizontal: pad * 1.5,
  },
  dataItem: {
    width: '33%',
    height: 50,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider
  },
  subTitleLine: {
    flexDirection: 'row',
    paddingVertical: pad,
  },
  subIcon: {
    width: 14,
    height: 16,
    marginRight: 5,
  },
  subTitle: {
    color: Colors.basicColor,
    fontWeight: 'bold',
  },
  fontYellow: {
    color: Colors.yellowColor
  }
});

export default withPage(AnorchLivingEndScreen, {
  statusBarOptions: {
  }
});