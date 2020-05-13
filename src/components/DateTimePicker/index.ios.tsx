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
import {Colors} from '../../constants/Theme';
import {pad} from '../../constants/Layout';
import Mask from '../../components/Mask';
import {isIOS, isAndroid} from '../../constants/DeviceInfo';
import {vw, vh} from '../../utils/metric';

interface ImagePickerBoxProps {
  style?: StyleProp<any>,
  dateWrapper?: StyleProp<any>,
  dateWrapperStyle?: StyleProp<any>,
  timeWrapper?: StyleProp<any>,
  timeWrapperStyle?: StyleProp<any>,
  onPicked: (uri: string) => undefined,
}

const ImagePickerBox = (props: ImagePickerBoxProps) =>  {
  let [maskList, maskDispatch] = React.useContext(Mask.context);

  const [liveTime, setLiveTime]: Array<any> = React.useState();

  const onPressPickDate = () => {
    // android 时间和日期需要分开选择
    maskDispatch({
      type: Mask.Actions.UNSHIFT,
      payload: {
        type: Mask.ContentTypes.IOSDatePicker,
        data: {
          onPicked: (time: number) => {
            setLiveTime(time);
            props.onPicked(time);
          }
        }
      }
    })
  }

  /**
   * 时间format
   */
  const formatDate = (timestamp: number, format: any = {
    Y: undefined,
    M: '月',
    D: '日',
    h: '点',
    m: '分',
  }) => {
    if (!timestamp) {
      return null;
    };
    const t =  dayjs(timestamp);
    if (format.Y) {
      return `${t.year()}${format.Y || ''}${t.month()+1}${format.M || ''}${t.date()}${format.D || ''} ${t.hour()}${format.h || ''}${t.minute()}${format.m || ''}`;
    }
    return `${t.month()+1}${format.M || ''}${t.date()}${format.D || ''} ${t.hour()}${format.h || ''}${t.minute()}${format.m || ''}`;
  }

  const date = formatDate(liveTime);

  console.log(liveTime, 'liveTimeliveTime', date)

  return (
    <View style={StyleSheet.flatten([styles.style, props.style])}>
      <TouchableOpacity style={StyleSheet.flatten([styles.dateWrapper, props.dateWrapperStyle])} onPress={() => onPressPickDate('datetime')}>
        <PrimaryText style={styles.dateText}>{liveTime ? `${date} ` : '选择时间'}</PrimaryText>
      </TouchableOpacity>
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
  },
  picker: {
    height: 200,
    backgroundColor: 'red',
    opacity: 1,
    borderWidth: 10
  }
});

export default ImagePickerBox;