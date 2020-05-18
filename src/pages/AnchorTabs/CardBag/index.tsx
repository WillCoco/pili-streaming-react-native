/**
 * 银行卡
 */
import * as React from 'react';
import {
  View,
  Image,
  ImageBackground,
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
import withPage from '../../../components/HOCs/withPage';
import {apiGetUserBankCards} from '../../../service/api';
import {updateBankCards, updateCurBankCards} from '../../../actions/asset';

const ROW_HEIGHT = 120;

const defaultCards: [] = [];
const CardBag = (props: any) =>  {
  const {navigate, goBack, replace} = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const bankCards = useSelector(state => state.asset?.bankCards) || defaultCards;
 
  /**
   * 
   */
  React.useEffect(() => {
    apiGetUserBankCards().then(res => {
      dispatch(updateBankCards(res));
    })
  }, []);

  /**
   * 跳转
   */
  const onPress = (card: any) => {
    dispatch(updateCurBankCards(card))
    replace('Withdraw', {card})
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
          <ScrollView style={{paddingTop: pad}}>
            {
              bankCards.map((card: any, index: number) => {
                return (
                  <BandCardRow
                    bgNum={parseInt(String(index % 4))}
                    key={`card_${index}`}
                    onPress={() => onPress(card)}
                    data={card}
                  />
                )
              })
            }
          </ScrollView>
        )
      }
      <TouchableOpacity onPress={() => navigate('AddBankCard')} style={styles.footer}>
        <ImageBackground source={images.addBankButton} style={StyleSheet.flatten([styles.addButton, {marginBottom: props.safeBottom}])}>
          <Image source={images.addBankCardIcon} style={styles.addIcon} />
          <PrimaryText >添加银行卡</PrimaryText>
        </ImageBackground>
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
    marginBottom: pad,
    ...Platform.select({
      ios: {
      },
      android: {
        elevation: 1
      }
    }),
  },
  addIcon: {
    width: 18,
    height: 18,
    marginRight: pad,
  },
  addButton: {
    height: 64,
    marginHorizontal: pad,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withPage(CardBag);