/**
 * 银行卡
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation, useRoute} from '@react-navigation/native';
import BandCardRow from './BandCardRow'
import PagingList from '../../../components/PagingList';
import NavBar from '../../../components/NavBar';
import {Colors} from '../../../constants/Theme';
import {vw} from '../../../utils/metric';
import {pad} from '../../../constants/Layout';
import images from '../../../assets/images/index';
import Empty from '../../../components/Empty/index';
import {getBankCards} from '../../../actions/asset';

const ROW_HEIGHT = 120;

const defaultCards: [] = [];
const CardBag = () =>  {
  const {navigate, goBack} = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  /**
   * 获取参数
   */
  const {
    onPicked, // 选中银行卡后的动作
  } = route.params || {};

  console.log(onPicked, 'onPicked')

  const bankCards = useSelector(state => state.asset?.bankCards) || defaultCards;

  /**
   * 
   */
  React.useEffect(() => {
    dispatch(getBankCards());
  }, [])

  /**
   * 跳转
   */
  const onPress = (card: any) => {
    onPicked({card});
  }

  /**
   * 无数据
   */
  const isEmpty = !bankCards || bankCards.length === 0;

  return (
    <View style={styles.style}>
      <NavBar
        leftTheme="light"
        title="银行卡管理"
        titleStyle={styles.navTitle}
        style={styles.nav}
      />
      {
        isEmpty ? <Empty /> : (
          <ScrollView>
            {
              bankCards.map((card: any, index: number) => {
                return (
                  <BandCardRow
                    key={`card_${index}`}
                    onPress={() => onPress(card)}
                  />
                )
              })
            }
          </ScrollView>
        )
      }
      <TouchableOpacity onPress={() => navigate('AddBankCard')} style={styles.footer}>
        <PrimaryText>添加银行卡</PrimaryText>
      </TouchableOpacity>
    </View>
  )
};

CardBag.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: Colors.bgColor
  },
  nav: {
    backgroundColor: Colors.basicColor,
  },
  navTitle: {
    color: '#fff',
    
  },
  footer: {
    ...Platform.select({
      ios: {

      },
      android: {
        elevation: 1
      }
    }) 
  }
});

export default CardBag;