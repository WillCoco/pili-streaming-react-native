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
  LayoutAnimation
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {PrimaryText, T4} from 'react-native-normalization-text';
// import LiveIntro from '../LiveIntro';
// import LivingBottomBlock from '../LivingBottomBlock';
// import LivePusher from '../LivePusher';
// import L from '../../constants/Layout';
// import Iconcloselight from '../../components/Iconfont/Iconcloselight';
// import Iconchangecamera from '../../components/Iconfont/Iconchangecamera';
// import NoticeBubble from '../../components/NoticeBubble';
import {pad} from '../../constants/Layout';
// import images from '../../assets/images';
import AnchorRow from './AnchorRow';
// import { joinGroup, quitGroup, createGroup, dismissGroup, updateGroupProfile } from '../../actions/im';
import { vh } from '../../utils/metric';
import Empty from '../Empty/index';
import { Colors } from '../../constants/Theme';

const emptyList: [] = [];
const AnchorShopCard = (props: {
  goods: Array<any>,
  goodsQuantity: number,
  visible: boolean,
  style: StyleProp<any>,
  onPressClose: () => any,
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
  const livingGoods = useSelector(state => state?.live?.livingGoods);

  const goods = props.goods || [1,1,1]||emptyList;
  const goodsQuantity = Math.max(props.goodsQuantity, goods.length) || 0;
  const showEmpty = goods.length === 0;

  console.log(props.visible, 'props.visible')
  if (!props.visible) {
    return null
  }

  return (
    <TouchableWithoutFeedback onPress={props.onPressClose}>
      <View style={StyleSheet.flatten([styles.style])}>
        <TouchableWithoutFeedback>
          <View style={styles.contentStyle}>
            <T4 style={styles.title}>共{goodsQuantity}件商品</T4>
            <ScrollView style={styles.scroll}>
              {
                showEmpty ? <Empty /> :
                  goods.map((good: any, index: number) => {
                    return (
                      <AnchorRow
                        // data={livingGoods}
                        key={`anchorShopCard_${index}`}
                        onPressBuy={onPressBuy}
                        index={index}
                        style={{borderBottomWidth: 1, borderColor: Colors.divider}}
                      />
                    )
                  })
              }
            </ScrollView>
          </View>
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
  contentStyle: {
    height: vh(70),
    width: '100%',
    backgroundColor: '#fff',
    padding: pad,
  },
  title: {
    marginBottom: pad * 2
  },
  scroll: {
  }
});

export default AnchorShopCard;