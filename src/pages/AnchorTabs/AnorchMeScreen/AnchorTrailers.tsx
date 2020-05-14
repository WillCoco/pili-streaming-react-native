/**
 * 我的预告
 */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {PrimaryText, SmallText, T2} from 'react-native-normalization-text';
import LiveWindow from '../../../components/LiveWindow';
import withPage from '../../../components/HOCs/withPage';
import NavBar from '../../../components/NavBar';
import images from '../../../assets/images';
import {pad} from '../../../constants/Layout';
import {Colors} from '../../../constants/Theme';
import pxToDp from '../../../utils/px2dp';

const TrailersCard = (props: {
  img: any,
  remind: boolean,
  title: string,
  liveTime: string,
  onSharePress: () => void,
  onRemindPress: () => void
}) => {
  return (
    <View style={{flexDirection: 'row', width: pxToDp(690), borderRadius: pxToDp(pad * 2), overflow: 'hidden', backgroundColor: Colors.whiteColor, marginLeft: pxToDp(pad * 3), marginTop: (pad * 3)}}>
      <Image source={props.img} style={styles.trailersCover} />
      <View style={styles.trailersDetail}>
        <PrimaryText color="emphasis" style={styles.liveTitle} numberOfLines={2}>{props.title}</PrimaryText>
        <T2 color="grey" style={styles.liveTime}>{props.liveTime}</T2>
        <View style={{width: pxToDp(360), marginTop: pxToDp(50), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: pxToDp(180)}}>
            <TouchableOpacity onPress={props.onSharePress} style={styles.operationButton}>
              <Image source={images.iconShare} style={styles.shareImg} />
              <T2 style={styles.buttonText} color="grey">分享</T2>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onRemindPress} style={styles.operationButton}>
              <Image source={props.remind ? images.iconHasRemind : images.iconRemind} style={styles.remindImg} />
              <T2 style={styles.buttonText} color="grey">{props.remind ? '已提醒' : '开播提醒'}</T2>
            </TouchableOpacity>
          </View>
          <Text style={styles.punctuality}>准时开播</Text>
        </View>
      </View>
    </View>
  )
}

const AnchorTrailers = () =>  {
  const trailersList = [
    {
      remind: false,
      img: images.liveCover,
      title: '我就知道你想看杨迪和薇娅互黑薇娅互黑薇娅互黑薇娅',
      liveTime: '开播时间：2020年1月13日19:00'
    },
    {
      remind: false,
      img: images.liveCover,
      title: '我就知道你想看杨迪和薇娅互黑薇娅互黑薇娅互黑薇娅',
      liveTime: '开播时间：2020年1月13日19:00'
    },
  ];

  /**
   * 点击分享按钮
   */
  const onSharePress = () => {
    alert('分享预告')
  };

  /**
   * 点击开播提醒
   */
  const onRemindPress = (remind: boolean, index: number) => {
    console.log('提醒flag：', remind)
    console.log('索引：', index)
    if(!remind) {
      trailersList[index].remind = true
    }else {
      trailersList[index].remind = false
    }
  }

  return (
    <View style={styles.style}>
      <NavBar title="我的预告" />
      <ScrollView style={styles.myTrailersPage}>
        {
          trailersList.map((item, index) => {
            return (
              <TrailersCard
                key={`_${index}`}
                img={item.img}
                title={item.title}
                remind={item.remind}
                liveTime={item.liveTime}
                onSharePress={onSharePress}
                onRemindPress={() => onRemindPress(item.remind, index)}
              />
            )
          })
        }
      </ScrollView>
    </View>
  )
};

AnchorTrailers.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  },
  myTrailersPage: {

  },
  trailersCover: {
    width: pxToDp(300),
    height: pxToDp(300),
    marginRight: pad
  },
  trailersDetail: {
    flex: 1,
    paddingTop: pxToDp(pad * 3),
    paddingBottom: pxToDp(pad * 3),
    paddingRight: pxToDp(pad * 2)
  },
  liveTitle: {
    fontSize: pxToDp(30),
    width: pxToDp(360)
  },
  liveTime: {
    width: pxToDp(360),
    marginTop: pxToDp(pad * 2),
    fontSize: pxToDp(20)
  },
  operationButton: {
    flex: 1
  },
  shareImg: {
    width: pxToDp(40),
    height: pxToDp(34),
    marginBottom: pxToDp(pad)
  },
  buttonText: {
    fontSize: pxToDp(20),
  },
  remindImg: {
    width: pxToDp(34),
    height: pxToDp(38),
    marginBottom: pxToDp(8),
    marginLeft: pxToDp(23)
  },
  punctuality: {
    width: pxToDp(160),
    height: pxToDp(62),
    fontSize: pxToDp(26),
    fontWeight: 'bold',
    borderRadius: pxToDp(31),
    backgroundColor: Colors.basicColor,
    color: Colors.whiteColor,
    lineHeight: pxToDp(62),
    textAlign: 'center',
    overflow: 'hidden'
  }
});

export default withPage(AnchorTrailers, {
  statusBarOptions: {
    backgroundColor: 'red'
  }
});