/**
 * 预组货行
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
import { pad, radio } from '../../../../constants/Layout';
import ShareProfit from '../../../../components/ShareProfit';
import DiscountPrice from '../../../../components/DiscountPrice';
import Iconremove from '../../../../components/Iconfont/Iconremove';
import CheckBox from '../../../../components/CheckBox';
import images from '../../../../assets/images/index';

interface WarehouseRowProps {
  data: any,
  dataAdapter: (d: any) => any,
  imgStyle: StyleProp<any>,
  style: StyleProp<any>,
  isChecked: boolean,
  onPressCheck: (d?: any) => any,
  onPressRemove: (d?: any) => any,
  onPressAddShop: (d?: any) => any,
}

const WarehouseRow = (props: WarehouseRowProps) =>  {

  const data = (props.dataAdapter ? props.dataAdapter(props.data) : props.data) || {};

  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      <CheckBox
        isChecked={props.isChecked}
        onPress={props.onPressCheck}
        style={{height: '100%', paddingHorizontal: pad}}
      />
      <Image source={data.img || images.goodCover} style={StyleSheet.flatten([styles.img, props.imgStyle])} resizeMode="cover" />
      <View style={styles.contentWrapper}>
        <View style={styles.titleWrapper}>
          <PrimaryText numberOfLines={2} style={{flex: 1, marginRight: pad * 2}}>{data.title}</PrimaryText>
          <TouchableOpacity onPress={props.onPressRemove} style={styles.removeBtn}>
            <Iconremove />
          </TouchableOpacity>
        </View>
        <ShareProfit profit={111} style={{flex: -1}} />
        <DiscountPrice discountPrice={120} price={110} />
      </View>
    </View>
  )
};

WarehouseRow.defaultProps = {
  data: {
    title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
  }
};

const ROW_HEIGHT = 120;
const styles = StyleSheet.create({
  style: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: ROW_HEIGHT,
    backgroundColor: '#fff',
    // paddingHorizontal: pad
  },
  contentWrapper: {
    flex: 1,
    height: 100,
    marginRight: pad,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
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

export default WarehouseRow;