/**
 * 直播记录
 * AnchorRecords
 */
/**
 * @Author: lyh
 * @Date: 2020/5/13
 * @Last Modified by: lyh
 * @Last Modified time: 2020/5/13
 **/
// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import { PrimaryText, SmallText, T1 } from 'react-native-normalization-text';
import { useNavigation } from '@react-navigation/native';
import withPage from '../../../components/HOCs/withPage';
import NavBar from '../../../components/NavBar';
import images from '../../../assets/images';
import { pad } from '../../../constants/Layout';
import { Colors } from '../../../constants/Theme';
import pxToDp from '../../../utils/px2dp';
import { apiGetLiveList } from '../../../service/api'
import { connect } from 'react-redux'


const RecordsCard = (props: {
  cover: any,
  title: string,
  watch: number,
  goodsNum: number,
  soldNum: number,
  addfans: number,
  liveTime: string,
  onPress: () => void,
  onSharePress: () => void,
  onDownloadPress: () => void
}) => {
  return (
    <View style={{ width: pxToDp(690), borderRadius: pxToDp(24), backgroundColor: '#fff', marginLeft: pxToDp(pad * 3), marginTop: pxToDp(pad * 4), flexDirection: 'row', overflow: 'hidden' }}>
      <TouchableOpacity onPress={props.onPress} style={styles.liveDetail}>
        <Image source={props.cover} style={styles.coverImg} />
        <Image source={images.iconPlay} style={styles.livePlayIcon} />
      </TouchableOpacity>
      <View style={styles.recordsDetail}>
        <TouchableOpacity onPress={props.onPress} style={styles.detail}>
          <PrimaryText color="emphasis" style={styles.liveTitle} numberOfLines={2}>{props.title}</PrimaryText>
          <View style={{ flexDirection: 'row', width: pxToDp(360), marginTop: pxToDp(pad), alignItems: 'center' }} >
            <SmallText color="grey" style={styles.listItem} numberOfLines={2}>{props.watch}次观看 丨 {props.goodsNum}件商品 | 卖出{props.soldNum}件 | 增粉{props.addfans}</SmallText>
          </View>
          <SmallText color="grey" style={styles.liveTime}>{props.liveTime}</SmallText>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', width: pxToDp(360), marginTop: pxToDp(pad * 2), justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={props.onSharePress} style={{ flexDirection: 'row', width: pxToDp(115), alignItems: 'center' }}>
            <Image source={images.iconShare} style={styles.shareImg} />
            <T1 style={styles.operationButton} color="grey">分享</T1>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onDownloadPress} style={{ flexDirection: 'row', width: pxToDp(115), alignItems: 'center' }}>
            <Image source={images.iconDownload} style={styles.downloadImg} />
            <T1 color="grey" style={styles.operationButton}>下载</T1>
          </TouchableOpacity>
          <SmallText style={styles.status}>回放</SmallText>
        </View>
      </View>
    </View>
  )
}
const AnchorRecords = () => {
  // const liveList = [
  //   {
  //     cover: images.watchLiveCover,
  //     title: '我就知道你想看杨迪和薇娅互黑薇娅',
  //     watch: 123,
  //     goodsNum: 123,
  //     soldNum: 123,
  //     addfans: 123,
  //     liveTime: '2020.04.25'
  //   },
  //   {
  //     cover: images.watchLiveCover,
  //     title: '我就知道你想看杨迪和薇娅互黑薇娅',
  //     watch: 345,
  //     goodsNum: 345,
  //     soldNum: 345,
  //     addfans: 345,
  //     liveTime: '2020.04.25'
  //   }
  // ];

  const [liveList, setLiveList] = useState(null);

  const { navigate } = useNavigation();

  useEffect(() => {
      apiGetLiveList({anchorId: 709828778884333568}).then(res => {
          console.log(res, 'sync get liveList')
      })
  });

  /**
   * 点击分享按钮
   */
  const onSharePress = () => {
    alert('分享直播回放')
  };

  /**
   * 点击下载按钮
   */
  const onDownloadPress = () => {
    alert('下载直播回放')
  };
  return (
    <View style={styles.style}>
      <NavBar title="我的直播" />
      <ScrollView style={styles.myLivePage}>
        {
            liveList && liveList.map((item, index) => {
            return (
              <RecordsCard
                key={`_${index}`}
                cover={item.cover}
                title={item.title}
                watch={item.watch}
                goodsNum={item.goodsNum}
                soldNum={item.soldNum}
                addfans={item.addfans}
                liveTime={item.liveTime}
                onPress={() => navigate('LivingRoomScreen')}
                onSharePress={onSharePress}
                onDownloadPress={onDownloadPress}
              />
            )
          })
        }
      </ScrollView>
    </View>
  )
};

AnchorRecords.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    paddingBottom: pxToDp(pad * 2)
  },
  myLivePage: {
  },
  liveDetail: {
    width: pxToDp(300),
    height: pxToDp(300),
    position: 'relative',
    marginRight: pxToDp(pad * 2)
  },
  coverImg: {
    width: pxToDp(300),
    height: pxToDp(300)
  },
  livePlayIcon: {
    width: pxToDp(70),
    height: pxToDp(70),
    position: 'absolute',
    top: pxToDp(115),
    left: pxToDp(115)
  },
  recordsDetail: {
    flex: 1,
    paddingRight: pxToDp(pad),
    paddingTop: pxToDp(pad * 3),
    paddingBottom: pxToDp(pad * 3)
  },
  detail: {
    width: pxToDp(360)
  },
  liveTitle: {
    fontWeight: 'bold'
  },
  listItem: {
    width: pxToDp(360),
    // lineHeight: pxToDp(40),
    marginRight: pxToDp(pad),
    marginLeft: pxToDp(pad)
  },
  interval: {
    width: pxToDp(2),
    height: pxToDp(18),
    backgroundColor: Colors.lightGrey
  },
  liveTime: {
    marginTop: pxToDp(pad * 2)
  },
  operationButton: {
    fontSize: pxToDp(24)
  },
  shareImg: {
    width: pxToDp(41),
    height: pxToDp(35),
    marginRight: pxToDp(pad)
  },
  downloadImg: {
    width: pxToDp(34),
    height: pxToDp(34),
    marginRight: pxToDp(pad)
  },
  status: {
    color: Colors.basicColor,
    overflow: 'hidden',
    paddingTop: pxToDp(pad),
    paddingBottom: pxToDp(pad),
    paddingLeft: pxToDp(pad * 2),
    paddingRight: pxToDp(pad * 2),
    borderRadius: pxToDp(pad * 2),
    backgroundColor: 'rgba(255,50,27,0.1)'
    // borderWidth: 1 / PixelRatio.get()
  }
});

export default connect(
    (state: any) => state.anchorData
)(withPage(AnchorRecords, {
    statusBarOptions: {
        barStyle: 'dark-content',
    }})
);