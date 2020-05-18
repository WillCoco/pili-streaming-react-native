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
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  PermissionsAndroid,
  Linking,
  Platform
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { PrimaryText, SmallText, T1 } from 'react-native-normalization-text';
import { useNavigation } from '@react-navigation/native';
import withPage from '../../../components/HOCs/withPage';
import NavBar from '../../../components/NavBar';
import images from '../../../assets/images';
import { pad } from '../../../constants/Layout';
import { Colors } from '../../../constants/Theme';
import pxToDp from '../../../utils/px2dp';
import { apiGetLiveList } from '../../../service/api'
import { connect } from 'react-redux';
import PagingList from '../../../components/PagingList';
import share from '../../../utils/share';
import usePermissions from '../../../hooks/usePermissions';
import RNFS from 'react-native-fs'
import { Toast, portal } from '@ant-design/react-native';
import Share from 'react-native-share';

const PAGE_SIZE = 10;
const INIT_PAGE_NO = 1;

const RecordsCard = (props: {
  smallPic: any,
  title: string,
  watchNum: number, // 观看次数
  liveGoodsNum: number, // 直播商品
  goodsNum: number, // 销售商品总量
  addFavourite: number, // 增粉
  moneyNum: number, // 销售额
  startTime: string,
  rtmpPath: string,
  onPress: () => void,
  onSharePress: () => void,
  onDownloadPress: () => void
}) => {
  return (
    <View style={{ width: pxToDp(690), borderRadius: pxToDp(24), backgroundColor: '#fff', marginLeft: pxToDp(pad * 3), marginTop: pxToDp(pad * 4), flexDirection: 'row', overflow: 'hidden' }}>
      <TouchableOpacity onPress={props.onPress} style={styles.liveDetail}>
        <Image source={{uri: props.smallPic}} style={styles.coverImg} />
        <Image source={images.iconPlay} style={styles.livePlayIcon} />
      </TouchableOpacity>
      <View style={styles.recordsDetail}>
        <TouchableOpacity onPress={props.onPress} style={styles.detail}>
          <PrimaryText color="emphasis" style={styles.liveTitle} numberOfLines={2}>{props.title}</PrimaryText>
          <View style={{ flexDirection: 'row', width: pxToDp(360), marginTop: pxToDp(pad), alignItems: 'center' }} >
            <SmallText color="grey" style={styles.listItem} numberOfLines={2}>
                {props.watchNum || 0}次观看 丨 {props.liveGoodsNum}件商品 | 卖出{props.goodsNum}件 | 销售额 {props.moneyNum} | 增粉 {props.addFavourite}</SmallText>
          </View>
          <SmallText color="grey" style={styles.liveTime}>{props.startTime}</SmallText>
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
          <SmallText style={styles.status} onPress={props.onPress}>回放</SmallText>
        </View>
      </View>
    </View>
  )
}
const AnchorRecords = (props) => {

  /*
  * 获取可写权限
  * */
  const isPermissionGranted = usePermissions([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);

  const {anchorInfo = {}} = props;
  const [liveList, setLiveList] = useState([]);

  const { navigate } = useNavigation();

  useEffect(() => {

  }, []);

  /**
   * 获取直播列表
   */
  const getLiveListFn = (page,size) => {
      const {anchorId} = anchorInfo;
      const params = {
          anchorId,
          pageNo: page,
          pageSize: size
      };
      apiGetLiveList(params).then(res => {
          console.log(res, 'sync get liveList')
          const {records = []} = res;
          records.length !== 0 &&  setLiveList(records)
      })
  };

  /**
   * 下拉刷新
   * */
  const onRefresh = (page, size) => {
      getLiveListFn(page,size)
  };

  /**
   * 上拉刷新
   */
  const onEndReached = (page, size) => {
      getLiveListFn(page,size)
  };

  /**
   * 点击分享按钮
   */
  const onSharePress = (url) => {
      share({
          title: '分享',
          url,
          failOnCancel: false,
      }).then((res) => { console.log(res) })
          .catch((err) => { err && console.log(err); });
  };

  /**
   * 点击下载按钮
   */
  const onDownloadPress = (url) => {
      const t = Toast.loading('')
      // const saveImageUrl = 'https://gslb.miaopai.com/stream/9Q5ADAp2v5NHtQIeQT7t461VkNPxvC2T.mp4?vend=miaopai&';
      if(Platform.OS === 'ios') {
          CameraRoll.saveToCameraRoll(url).then(function(result) {
              portal.remove(t)
              Toast.success("视频已保存至相册")
          }).catch(function(error) {
              console.log(error, '67890')
              portal.remove(t)
              Toast.fail("视频保存失败")
          });
      }else {
          const storeLocation = `${RNFS.DocumentDirectoryPath}`;
          let pathName = new Date().getTime() + ".mp4";
          let downloadDest = `${storeLocation}/${pathName}`;
          const ret = RNFS.downloadFile({fromUrl:url,toFile:downloadDest});
          ret.promise.then(res => {
              if(res && res.statusCode === 200){
                  if(isPermissionGranted) {
                      CameraRoll.saveToCameraRoll("file://" + downloadDest).then(function(result) {
                          portal.remove(t)
                          Toast.success("视频已保存至相册")
                      }).catch(function(error) {
                          portal.remove(t)
                          Toast.fail("视频保存失败")
                      });
                  }
              }
          })
      }
  };

  return (
    <View style={styles.style}>
        <NavBar title="我的直播" />
        <PagingList
            size={10}
            data={liveList}
            setData={setLiveList}
            initListData={liveList}
            renderItem={({item, index}) => {
                return (
                    <RecordsCard
                        key={`_${index}`}
                        smallPic={item.smallPic}
                        title={item.title}
                        sale={item.sale}
                        watchNum={item.watchNum}
                        goodsNum={item.goodsNum}
                        liveGoodsNum={item.liveGoodsNum}
                        addFavourite={item.addFavourite}
                        moneyNum={item.moneyNum}
                        startTime={item.startTime}
                        onPress={() => navigate('LivingRoomScreen')}
                        onSharePress={() => onSharePress(item.rtmpPath)}
                        onDownloadPress={() => onDownloadPress(item.rtmpPath)}
                    />
                )
            }}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            initialNumToRender={10}>
        </PagingList>
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