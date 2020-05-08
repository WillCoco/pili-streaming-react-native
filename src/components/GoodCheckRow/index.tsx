/**
 * 商品选择行
 * 用于:
 *  商品管理
 */
import * as React from 'react';
import { Colors } from '../../constants/Theme';
import Iconchecked from '../../components/Iconfont/Iconchecked';
import { PrimaryText, SmallText} from 'react-native-normalization-text';
import Iconarrowright from '../Iconfont/Iconarrowright';
import images from '../../assets/images/index';
import { radio } from '../../constants/Layout';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


interface GoodCheckRowProps {
  isChecked: boolean,
  good: any,
  onPress: () => any
}

const GoodCheckRow = (props: GoodCheckRowProps) =>  {
  const checkImg = props.isChecked ? images.checkedYellowIcon : images.uncheckedIcon


  return (
    <TouchableOpacity style={styles.style} onPress={props.onPress}>
      <TouchableOpacity onPress={props.onPress}>
        <Image
          resizeMode="contain"
          source={checkImg}
          style={styles.checkImg}
        />
      </TouchableOpacity>
      <View>
        <Image style={styles.img} source={props.good?.img || images.goodCover} />
      </View>
      <View style={styles.contentWrapper}>
        <PrimaryText>{props.good?.title}</PrimaryText>
        <SmallText>数量: {props.good?.quantity}</SmallText>
      </View>
      {/* <Iconarrowright size={30} style={styles.arrow} /> */}
    </TouchableOpacity>
  )
};

GoodCheckRow.defaultProps = {
};

const ROW_HEIGHT = 124;
const IMG_HEIGHT = 100;

const styles = StyleSheet.create({
  style: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    height: ROW_HEIGHT,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.divider
  },
  arrow: {
    transform: [{skewX: '180deg'}]
  },
  contentWrapper: {
    flex: 1
  },
  img: {
    height: IMG_HEIGHT,
    width: IMG_HEIGHT,
    borderRadius: radio
  },
  checkImg: {
    height: 20,
    width: 20
  }
});

export default GoodCheckRow;