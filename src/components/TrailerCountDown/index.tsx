/**
 * 预告直播倒计时
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
} from 'react-native';
import moment from 'moment'
import CountDown from '../CountDown'
import { PrimaryText, SmallText, scale } from 'react-native-normalization-text';
import { Colors } from '../../constants/Theme';
import { radio, pad } from '../../constants/Layout';
import Icontv from '../../components/Iconfont/Icontv';
import { Toast } from '@ant-design/react-native';

const Trailer = (props: {
  deadline: number,
  style: StyleProp<any>
}) =>  {
  const t = moment(props.deadline);
  const deadline = t.format("YYYY/MM/DD HH:mm");

  const renderCell = (value: number | string, unit: string) => {
    return (
      <View style={styles.cellWrapper}>
        <View style={styles.vauleWrapper}>
          <SmallText color="white">{value}</SmallText>
        </View>
        <SmallText color="white">{unit}</SmallText>
      </View>
    )
  }

  const onStop = () => {
    Toast.show('开播时间到啦')
  }

  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      <View style={{flexDirection: 'row', marginLeft: 3}}>
        <Icontv style={{marginRight: 6}} />
        <PrimaryText color="white">{deadline}</PrimaryText>
      </View>
      <CountDown
        deadline={props.deadline}
        onStop={onStop}
        renderTime={(seconds) => {
          const duration = moment.duration(seconds, 'seconds')
          const d = Math.floor(duration.asDays()) || '0';
          const h = Math.floor(duration.asHours()) || '0';
          const m = Math.floor(duration.asMinutes()) || '0';
          const s = Math.floor(duration.asSeconds()) || '0';
          return (
            <View style={styles.renderTimeWrapper}>
              {renderCell(d, '天')}
              {renderCell(h, '小时')}
              {renderCell(m, '分')}
              {renderCell(s, '秒')}
            </View>
          )
        }}
      />
    </View>
  )
};

Trailer.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    justifyContent: 'center',
  },
  cellWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vauleWrapper: {
    backgroundColor: Colors.basicColor,
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: radio,
    marginHorizontal: 3
  },
  renderTimeWrapper: {
    flexDirection: 'row',
    marginTop: pad
  }
});

export default Trailer;