/**
 * 图片选择组件
 */
import * as React from 'react';
import {
  View,
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SmallText, PrimaryText} from 'react-native-normalization-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import pickCameraRoll from '../../utils/pickCameraRoll';
import Iconadd from '../../components/Iconfont/Iconadd';
import {Colors} from '../../constants/Theme';
import {pad} from '../../constants/Layout';
import {isIOS, isAndroid} from '../../constants/DeviceInfo';

interface ImagePickerBoxProps {
  style?: StyleProp<any>,
  dateWrapper?: StyleProp<any>,
  dateWrapperStyle?: StyleProp<any>,
  timeWrapper?: StyleProp<any>,
  timeWrapperStyle?: StyleProp<any>,
  onPicked?: (uri: string) => undefined,
}

const ImagePickerBox = (props: ImagePickerBoxProps) =>  {
  /**
   * 显示时间选择器
   */
  const [isShowDatePicker, setIsShowDatePicker]: Array<any> = React.useState();

  /**
   * 时间选择器模式
   */
  const initMode = isIOS ? 'datetime' : 'date'; // 初始化mode
  const [datePickerMode, setDatePickerMode]: Array<any> = React.useState(initMode);

  const [liveTime, setLiveTime]: Array<any> = React.useState(Date.now());

  const onPressPickDate = (mode?: 'date' | 'time' | 'datetime' | 'countdown') => {
    // android 时间和日期需要分开选择
    if (isAndroid()) {
      setDatePickerMode(mode);
    }
    
    // ios datetime一次选择
    setIsShowDatePicker(true);
  }

  const onDeteChange = (e: any) => {
    setIsShowDatePicker(false);

    if (e.type === 'set') {
      setLiveTime(e.nativeEvent.timestamp)
    }
  }

  /**
   * 时间format
   */
  const formatDate = (timestamp: number) => {
    if (timestamp) {
      return null;
    };
    const t =  dayjs(timestamp);
    return `${t.month()+1}月${t.date()}日`
  }

  const formatTime = (timestamp: number) => {
    if (timestamp) {
      return null;
    };
    const t =  dayjs(timestamp);
    return `${dayjs().hour()}点${dayjs().minute()}分`
  }

  const date = formatDate(liveTime);
  const time = formatTime(liveTime);

  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      {
        isAndroid() ? (
          <>
            <TouchableOpacity style={StyleSheet.flatten([styles.dateWrapper, props.dateWrapperStyle])} onPress={() => onPressPickDate('date')}>
              <PrimaryText style={styles.dateText}>{date || '选择日期'}</PrimaryText>
            </TouchableOpacity>
            <TouchableOpacity style={StyleSheet.flatten([styles.timeWrapper, props.timeWrapperStyle])} onPress={() => onPressPickDate('time')}>
              <PrimaryText style={styles.timeText}>{time || '选择时间'}</PrimaryText>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={StyleSheet.flatten([styles.dateWrapper, props.dateWrapperStyle])} onPress={() => onPressPickDate('datetime')}>
            <PrimaryText style={styles.dateText}>{liveTime ? `${date} ${time}` : '选择时间'}</PrimaryText>
          </TouchableOpacity>
        )
      }
      {
        isShowDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date(1598051730000)}
            mode={datePickerMode}
            is24Hour={true}
            display="default"
            onChange={onDeteChange}
          />
        )
      }
    </View>
  )
};

ImagePickerBox.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flexDirection: 'row',
    // backgroundColor: Colors.bgColor,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {

  },
  dateWrapper: {

  },
  dateText: {
    marginRight: pad
  },
  timeText: {},
  timeWrapper: {},
  placeholderText: {
    color: Colors.lightGrey,
    marginTop: pad * 2
  }
});

export default ImagePickerBox;