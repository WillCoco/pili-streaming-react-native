/**
 * 主播行
 */
import * as React from 'react';
import {
  View,
  Image,
  StyleSheet,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {PrimaryText, SmallText, T4, scale} from 'react-native-normalization-text';
import { pad, radio } from '../../constants/Layout';
import ShareProfit from '../../components/ShareProfit';
import DiscountPrice from '../../components/DiscountPrice';
import Iconremove from '../../components/Iconfont/Iconremove';
import ButtonRadius from '../../components/Buttons/ButtonRadius';
import CheckBox from '../../components/CheckBox';
import images from '../../assets/images/index';
import { Colors } from '../../constants/Theme';
import { EMPTY_OBJ } from '../../constants/freeze';

interface AnchorRowManageRowProps {
  data: any,
  dataAdapter: (d?: any) => any,
  isChecked: boolean,
  imgStyle: StyleProp<any>,
  style: StyleProp<any>,
  onPressCheck: (d?: any) => any,
  onPressAddShop: (d?: any) => any,
  onPressRemoveShop: (d?: any) => any,
}

const AnchorRowManageRow = (props: AnchorRowManageRowProps) =>  {
  const data = (props.dataAdapter ? props.dataAdapter(props.data) : props.data) || EMPTY_OBJ;

  const btnText = !data.isAdded ? '添加橱窗' : '取消添加';
  const btnBg = !data.isAdded ? Colors.basicColor : Colors.lightGrey;

  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      <CheckBox 
        isChecked={props.isChecked}
        onPress={props.onPressCheck}
        style={{height: '100%', paddingHorizontal: pad}}
      />
      <Image source={data.img ? {uri: data.img} : images.goodCover} style={StyleSheet.flatten([styles.img, props.imgStyle])} resizeMode="cover" />
      <View style={styles.contentWrapper}>
        <View style={styles.titleWrapper}>
          <PrimaryText numberOfLines={2} style={{flex: 1}}>{data.title}</PrimaryText>
          {/* <TouchableOpacity onPress={onPressRemove} style={styles.removeBtn}>
            <Iconremove />
          </TouchableOpacity> */}
        </View>
        <View style={styles.rowBetween}>
          <SmallText color="grey" style={{flex: -1}}>总库存:  {data.storeCount}</SmallText>
          <ShareProfit profit={data.profit} style={{flex: -1}} />
        </View>
        <View style={styles.rowBetween}>
          <DiscountPrice discountPrice={data.discountPrice} price={data.pirce} />
          <ButtonRadius
            text={btnText}
            size={20}
            style={{width: scale(75), backgroundColor: btnBg}}
            onPress={data.isAdded ? props.onPressRemoveShop : props.onPressAddShop}
          />
        </View>
      </View>
    </View>
  )
};

AnchorRowManageRow.defaultProps = {
  data: {
    title: '',
    skuQuantity: ''
  }
};

export const ROW_HEIGHT = 120;
const styles = StyleSheet.create({
  style: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: ROW_HEIGHT,
    backgroundColor: '#fff'
    // paddingHorizontal: pad
  },
  rowBetween: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
    height: 100,
    marginRight: pad,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: radio,
    marginRight: pad
  },
  checkImg: {
    height: 20,
    width: 20,
    paddingHorizontal: pad
  },
  checkImgWrapper: {
    height: '100%',
    paddingHorizontal: pad,
    justifyContent: 'center'
  },
  titleWrapper: {
    // width: '100%',
    height: scale(42),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  removeBtn: {
    padding: pad
  }
});

export default AnchorRowManageRow;
