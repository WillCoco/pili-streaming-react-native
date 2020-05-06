/**
 * 直播记录
 * AnchorRecords
 */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import {PrimaryText, SmallText, T1 } from 'react-native-normalization-text';
import {useNavigation} from '@react-navigation/native';
import withPage from '../../../components/HOCs/withPage';
import NavBar from '../../../components/NavBar';
import images from '../../../assets/images';
import {pad} from '../../../constants/Layout';
import {Colors} from '../../../constants/Theme';
import pxToDp from '../../../utils/px2dp';


const RecordsCard = (props: {
  cover: any,
  title: string,
  proportion: String,
  watch: number,
  goodsNum: number,
  soldNum: number,
  addfans: number,
  onPress: () => void,
  onSharePress: () => void,
  onDownloadPress: () => void
}) => {
  return (
    <View style={styles.liveCardView}>
      <TouchableOpacity onPress={props.onPress} style={styles.liveDetail}>
        <View style={styles.coverView}>
          <Image source={props.cover} style={styles.coverImg}/>
          <Image source={images.iconPlay} style={styles.livePlayIcon}/>
        </View>
        <View style={{flexDirection: 'row', marginTop: pxToDp(pad * 3), width: pxToDp(629), justifyContent: 'space-between', alignItems: 'center'}}>
          <PrimaryText color="emphasis" style={styles.liveTitle}>{props.title}</PrimaryText>
          <Text style={styles.proportion}>{props.proportion}</Text>
        </View>
        <View style={{flexDirection: 'row', width: pxToDp(629), marginTop: pxToDp(pad * 2), alignItems: 'center'}}>
          <SmallText style={styles.status}>回放</SmallText>
          <View style={{flexDirection: 'row', width: pxToDp(480), alignItems: 'center'}}>
            <SmallText color="grey" style={styles.listItem}>{props.watch}次观看</SmallText>
            <View style={styles.interval}></View>
            <SmallText color="grey" style={styles.listItem}>{props.goodsNum}件商品</SmallText>
            <View style={styles.interval}></View>
            <SmallText color="grey" style={styles.listItem}>卖出{props.soldNum}件</SmallText>
            <View style={styles.interval}></View>
            <SmallText color="grey" style={styles.listItem}>增粉{props.addfans}</SmallText>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', width: pxToDp(300), marginTop: pxToDp(pad * 3), justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity onPress={props.onSharePress} style={{flexDirection: 'row', width: pxToDp(115), alignItems: 'center'}}>
          <Image source={images.iconShare} style={styles.shareImg} />
          <T1 style={styles.operationButton} color="grey">分享</T1>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onDownloadPress} style={{flexDirection: 'row', width: pxToDp(115), alignItems: 'center'}}>
          <Image source={images.iconDownload} style={styles.downloadImg} />
          <T1 color="grey" style={styles.operationButton}>下载</T1>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const AnchorRecords = () =>  {
  const liveList = [
    {
      cover: images.watchLiveCover,
      title: '我就知道你想看杨迪和薇娅互黑薇娅',
      proportion: '1/12',
      watch: 123,
      goodsNum: 123,
      soldNum: 123,
      addfans: 123
    },
    {
      cover: images.watchLiveCover,
      title: '我就知道你想看杨迪和薇娅互黑薇娅',
      proportion: '1/12',
      watch: 345,
      goodsNum: 345,
      soldNum: 345,
      addfans: 345
    }
  ];

  const {navigate} = useNavigation();

  /**
   * 点击前往直播页面
   */
  const onPress = () => {
    alert('前往直播页面')
  };

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
          liveList.map((item, index) => {
            return (
              <RecordsCard
                key={`_${index}`}
                cover={item.cover}
                title={item.title}
                proportion={item.proportion}
                watch={item.watch}
                goodsNum={item.goodsNum}
                soldNum={item.soldNum}
                addfans={item.addfans}
                onPress={onPress}
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
  liveCardView: {
    width: pxToDp(690),
    borderRadius: pxToDp(24),
    padding: pxToDp(pad * 3),
    backgroundColor: '#fff',
    marginLeft: pxToDp(pad * 3),
    marginTop: pxToDp(pad * 4)
  },
  liveDetail: {

  },
  coverView: {
    width: pxToDp(629),
    height: pxToDp(254),
    borderRadius: pxToDp(20),
    position: 'relative',
    overflow: 'hidden'
  },
  coverImg: {
    width: pxToDp(629),
    height: pxToDp(254)
  },
  livePlayIcon: {
    width: pxToDp(70),
    height: pxToDp(70),
    position: 'absolute',
    top: pxToDp(93),
    left: pxToDp(280)
  },
  liveTitle: {
    fontWeight: 'bold'
  },
  proportion: {
    fontSize: pxToDp(24),
    color: Colors.darkGrey
  },
  status: {
    color: '#FF321B',
    overflow: 'hidden',
    paddingTop: pxToDp(pad),
    paddingBottom: pxToDp(pad),
    paddingLeft: pxToDp(pad * 2),
    paddingRight: pxToDp(pad * 2),
    marginRight: pxToDp(pad),
    borderRadius: pxToDp(pad * 2),
    backgroundColor: 'rgba(255,50,27,0.1)'
    // borderWidth: 1 / PixelRatio.get(),
    // borderColor: Colors.basicColor,
  },
  listItem: {
    width: pxToDp(125),
    marginRight: pxToDp(pad),
    marginLeft: pxToDp(pad)
  },
  interval: {
    width: pxToDp(2),
    height: pxToDp(18),
    backgroundColor: Colors.lightGrey
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
  }
});

export default withPage(AnchorRecords, {
  statusBarOptions: {
    backgroundColor: 'red'
  }
});