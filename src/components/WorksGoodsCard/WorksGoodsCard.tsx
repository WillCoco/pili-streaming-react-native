import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'
import { connect } from 'react-redux'
import { setWorkGoodsList, setAddedGoodsList } from '../../actions/works'
import formatSinglePrice from '../../utils/formatGoodsPrice'

function GoodsCard(props: {
  type: string
  dispatch?: any
  goodsInfo?: any
  goodsList: Array<any>
  addedGoodsList: Array<any>
}) {
  const { goodsInfo, goodsList, addedGoodsList, type } = props

  const addGoods = () => {
    if (goodsInfo.isAdd) {  // 删除
      addedGoodsList.forEach((item: any, index: number) => {
        if (goodsInfo.goods_id === item.goods_id) {
          addedGoodsList.splice(index, 1)
        }
      })
    }

    goodsList.forEach((item: { goods_id: any; isAdd: boolean }) => {
      if (item.goods_id === goodsInfo.goods_id) {
        if (!goodsInfo.isAdd) {
          addedGoodsList.push(item)
        }
        item.isAdd = !item.isAdd
      }
    })

    props.dispatch(setAddedGoodsList(JSON.parse(JSON.stringify(addedGoodsList))))
    props.dispatch(setWorkGoodsList(JSON.parse(JSON.stringify(goodsList))))
  }

  const delGoods = () => {
    addedGoodsList.forEach((item: any, index: number) => {
      if (goodsInfo.goods_id === item.goods_id) {
        addedGoodsList.splice(index, 1)
      }
    })

    props.dispatch(setAddedGoodsList(JSON.parse(JSON.stringify(addedGoodsList))))
  }


  return (
    <View style={styles.container}>
      <Image source={{ uri: goodsInfo.original_img }} style={styles.goodsImg} />
      <View style={styles.goodsInfo}>
        <Text style={styles.goodsName} numberOfLines={2}>{goodsInfo.goods_name}</Text>
        <View style={styles.goodsOtherInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.rmbIcon}>¥</Text>
            <Text style={styles.price}>{formatSinglePrice(goodsInfo.shop_price)}</Text>
          </View>
          {
            type === 'add'
              ? <TouchableOpacity style={[styles.addBtn, goodsInfo.isAdd && { backgroundColor: Colors.pinkColor }]} onPress={addGoods}>
                <Text style={styles.btnText}>{goodsInfo.isAdd ? '已添加' : '添加'}</Text>
              </TouchableOpacity>
              : <TouchableOpacity style={styles.addBtn} onPress={delGoods}>
                <Text style={styles.btnText}>删除</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  )
}

export default connect(
  (state: any) => state.worksData
)(GoodsCard)

const styles = StyleSheet.create({
  container: {
    padding: pxToDp(10),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    backgroundColor: Colors.whiteColor,
    marginTop: pxToDp(10),
    flexDirection: 'row'
  },
  goodsImg: {
    width: pxToDp(180),
    height: pxToDp(180),
    borderRadius: pxToDp(10),
    marginRight: pxToDp(20)
  },
  goodsInfo: {
    paddingTop: pxToDp(10),
    paddingBottom: pxToDp(18),
    justifyContent: 'space-between'
  },
  goodsName: {
    fontSize: pxToDp(28),
    color: Colors.darkBlack,
    lineHeight: pxToDp(40),
    width: pxToDp(510)
  },
  goodsOtherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rmbIcon: {
    color: Colors.basicColor,
    fontSize: pxToDp(24)
  },
  price: {
    color: Colors.basicColor,
    fontSize: pxToDp(32),
    fontWeight: '500'
  },
  addBtn: {
    width: pxToDp(120),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
    backgroundColor: Colors.basicColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: pxToDp(24),
    color: Colors.whiteColor
  }
})