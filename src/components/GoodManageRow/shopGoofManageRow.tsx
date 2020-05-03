/**
 * 店铺商品管理行
 *  预览、编辑、上架、删除
 * 用于:
 *  商品管理
 */
import * as React from 'react';
import { Colors } from '../../constants/Theme';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { T3, PrimaryText, SmallText, scale } from 'react-native-normalization-text';
import Iconarrowright from '../Iconfont/Iconarrowright';
import ButtonOutLine from '../Buttons/ButtonOutLine';
import images from '../../assets/images/index';
import { pad, radio } from '../../constants/Layout';

interface goodTypes {
  isOnSale: boolean,
  img: any,
  title: string,
  SKUQuantity: number, // 库存
  saleQuantity: number, // 销量
  price: number | string,
  priceSign: string, // 法币符号
}

interface GoodManageRowProps {
  data: any, // 原数据
  onPreviewPress: () => any,
  onEditPress: () => any,
  onPutawayPress?: () => any,
  onTakedownPress?: () => any,
  onRemovePress: () => any,
  dataAdapter: (data: any) => goodTypes, // 返回组件需要的数据
}

const GoodManageRow = (props: GoodManageRowProps) =>  {
  /**
   * 适配数据
   */
  const data: goodTypes = React.useMemo(() => {
    return props.dataAdapter(props.data);
  }, [props]);

  return (
    <View style={styles.style}>
      <View style={StyleSheet.flatten([styles.row])}>
        {/* 图 */}
        <View style={styles.imgWrapper}>
          <Image
            resizeMode="cover"
            source={data.img}
            style={styles.img}
          />
        </View>
        {/* 描述 */}
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <PrimaryText style={styles.title} numberOfLines={2}>{data.title}</PrimaryText>
          </View>
          <T3 style={styles.price}>{data.priceSign}{data.price}</T3>
          <View style={StyleSheet.flatten([styles.row, {}])}>
            <SmallText
              color="grey"
              style={{minWidth: 80, maxWidth: 100, marginRight: pad}}
              numberOfLines={1}
            >
              总库存: {data.SKUQuantity}
            </SmallText>
            <SmallText
              color="grey"
              style={{minWidth: 80, maxWidth: 100}}
              numberOfLines={1}
            >
              总销量: {data.saleQuantity}
            </SmallText>
          </View>
        </View>
      </View>
       {/* 操作 */}
       <View style={StyleSheet.flatten([styles.buttonsWrapper, ])}>
          <ButtonOutLine
            text="预览"
            size={scale(26)}
            style={styles.btn}
            onPress={props.onPreviewPress}
          />
          <ButtonOutLine
            text="编辑"
            size={scale(26)}
            style={styles.btn}
            onPress={props.onEditPress}
          />
          {
            data.isOnSale ? (
              <ButtonOutLine
                text="下架"
                size={scale(26)}
                textStyle={{color: Colors.yellowColor}}
                style={StyleSheet.flatten([styles.btn, {color: Colors.yellowColor, borderColor: Colors.yellowColor}])}
                onPress={props.onPutawayPress}
            />
            ) : (
              <ButtonOutLine
                text="上架"
                size={scale(26)}
                textStyle={{color: Colors.yellowColor}}
                style={StyleSheet.flatten([styles.btn, {color: Colors.yellowColor, borderColor: Colors.yellowColor}])}
                onPress={props.onTakedownPress}
            />
            )
          }
          <ButtonOutLine
            text="删除"
            size={scale(26)}
            textStyle={{color: Colors.basicColor}}
            style={StyleSheet.flatten([styles.btn, {color: Colors.basicColor, borderColor: Colors.basicColor}])}
            onPress={props.onRemovePress}
          />
        </View>
    </View>
  )
};

GoodManageRow.defaultProps = {
  dataAdapter: (data: any) => ({
    isOnSale: data.isOnSale,
    img: data.img || images.goodCover,
    title: data.title || 'Nike耐克男鞋AJ',
    SKUQuantity: data.SKUQuantity || 1, // 库存
    saleQuantity: data.salesQuantity || 123, // 销量
    priceSign: data.priceSign || '¥ ', // 销量
    price: data.price || 't123.33', // 销量
  }),
};

const ROW_HEIGHT = 166;

const styles = StyleSheet.create({
  style: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    height: ROW_HEIGHT,
    backgroundColor: '#fff',
    borderBottomWidth: 4,
    borderColor: Colors.divider,
    padding: pad
  },
  titleWrapper: {
    height: scale(42),
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
  },
  price: {
    color: Colors.basicColor,
  },
  imgWrapper: {
    marginRight: pad
  },
  arrow: {
    transform: [{skewX: '180deg'}]
  },
  contentWrapper: {
    flex: 1,
    paddingBottom: pad,
    justifyContent: 'space-between'
  },
  img: {
    height: 110,
    width: 110,
    borderRadius: radio
  },
  row: {
    flexDirection: 'row'
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8
  },
  btn: {
    width: scale(50),
    marginLeft: pad
  }
});

export default GoodManageRow;