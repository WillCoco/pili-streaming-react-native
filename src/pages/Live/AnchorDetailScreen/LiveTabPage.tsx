/**
 * 直播tab
 */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {PrimaryText, SmallText, T4} from 'react-native-normalization-text';
import {useNavigation} from '@react-navigation/native';
import LiveRecord from './LiveRecord';
import {Colors} from '../../../constants/Theme';
import {pad} from '../../../constants/Layout';
import Iconbacklight from '../../../components/Iconfont/Iconbacklight';
import {vw} from '../../../utils/metric';

const Row = (props: {
  title: string,
  typeText: string,
  subText: string,
  showDivider?: boolean,
  onPress?: (v?: any) => void
}) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.rowWrapper, props.showDivider && styles.divider])}
      onPress={props.onPress}
    >
      <PrimaryText>{props.title}</PrimaryText>
      <View style={StyleSheet.flatten([styles.rowLine2])}>
        <SmallText style={styles.typeText}>{props.typeText}</SmallText>
        <SmallText style={styles.subText}>{props.subText}</SmallText>
      </View>
    </TouchableOpacity>
  )
}


Row.defaultProps = {
  title: '[标题] 内容',
  typeText: '类型',
  subText: '文字内容',
}

const LiveTabPage = (props: {
  isLiving: boolean,
  trailers: any[],
  liveRecords: any[],
  tabLabel?: string
}) =>  {
  const {navigate} = useNavigation();
  return (
    <ScrollView style={styles.style}>
      {props.isLiving && (
        <Row
          title="[新年好礼] 精美研制摄像头"
          typeText="直播中"
          subText="123人观看"
          showDivider
          onPress={() => navigate('LivingRoomScreen')}
        />
      )}
      {
        props.trailers?.map((trailer, index) => {
          return (
            <Row
              key={`_${index}`}
              title={trailer?.title }
              typeText={trailer?.title}
              subText={trailer?.title}
              showDivider={index !== props.trailers.length}
              onPress={() => navigate('LivingRoomScreen')} // 预告片
            />
          )
        })
      }
      {
        props.liveRecords && (
          <View style={styles.liveRecordsWrapper}>
            <T4>精彩回放</T4>
            {
              props.liveRecords.map((record, index) => (
                <LiveRecord
                  key={`record_${index}`}
                  onPress={() => navigate('LivingRoomScreen')} // 预告片
                />
              ))
            }
          </View>
        )
      }
    </ScrollView>
  )
};

LiveTabPage.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: '#fff'
  },
  rowWrapper: {
    paddingVertical: 9,
    paddingHorizontal: pad,
  },
  rowLine2: {
    flexDirection: 'row',
    marginTop: 4
  },
  typeText: {
    height: 24,
    width: 70,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: Colors.basicColor,
    color: '#fff',
    marginRight: 14
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.divider
  },
  subText: {
  },
  liveRecordsWrapper: {
    padding: pad
  }
});

export default LiveTabPage;
