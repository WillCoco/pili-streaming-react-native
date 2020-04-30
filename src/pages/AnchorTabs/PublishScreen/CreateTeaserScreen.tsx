import * as React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useNavigation} from '@react-navigation/native';
import {PrimaryText, SmallText, scale} from 'react-native-normalization-text';
import DateTimePicker1 from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import withPage from '../../../components/HOCs/withPage';
import ImagePickerBox from '../../../components/ImagePickerBox';
import VedioPickerBox from '../../../components/VedioPickerBox';
import DateTimePicker from '../../../components/DateTimePicker';
import { pad, radio, radioLarge } from '../../../constants/Layout';
import {Colors} from '../../../constants/Theme';
import {isIOS, isAndroid} from '../../../constants/DeviceInfo';
import {vw} from '../../../utils/metric';

const CreateTraserScreen = () =>  {
  const {goBack} = useNavigation();

  /**
   * 选择图片
   */
  const [cover1Uri, setCover1Uri]: Array<any> = React.useState();
  const [cover2Uri, setCover2Uri]: Array<any> = React.useState();

  /**
   * 选择视频
   */
  const [vedioUri, setVedioUri]: Array<any> = React.useState();

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

  /**
   * 提交 
   */
  const onSubmitPress = () => {
    alert('提交');

    // 跳转
    goBack();
  }

  console.log(isShowDatePicker, 'isShowDatePicker')

  return (
    <ScrollView style={styles.style}>
      <View style={styles.contentWrapper}>
        <PrimaryText style={styles.title}>直播封面图(必填)</PrimaryText>
        <View style={styles.row}>
          <ImagePickerBox
            placeholderText="封面图1"
            onPicked={(v) => setCover1Uri(v)}
            style={{marginRight: pad}}
          />
          <ImagePickerBox
            placeholderText="封面图2"
            onPicked={(v) => setCover2Uri(v)}
            style={{flex: 1}}
          />
        </View>
        <PrimaryText style={styles.title}>预告片(可选)</PrimaryText>
        <VedioPickerBox
          onPicked={setVedioUri}
        />
        <SmallText style={styles.vedioDescText}>时长: 20s内</SmallText>
        <SmallText style={styles.vedioDescText}>大小: 2M内</SmallText>
        <SmallText style={styles.vedioDescText}>建议：化妆小视频（加速版），室内换衣（加速版），室外造型秀（视觉冲击）等等</SmallText>
      </View>
      <View style={StyleSheet.flatten([styles.divider])} />
      <View style={styles.contentWrapper}>
        <View style={StyleSheet.flatten([styles.rowWrapper, styles.bottomDivider])}>
          <PrimaryText style={styles.title}><PrimaryText color="theme">* </PrimaryText> 直播时间</PrimaryText>
          <PrimaryText onPress={() => onPressPickDate('date')} style={styles.title}>{formatDate(liveTime) || '选择日期'}</PrimaryText>
          <PrimaryText onPress={() => onPressPickDate('time')} style={styles.title}>{formatTime(liveTime) || '选择时间'}</PrimaryText>
        </View>
        <DateTimePicker />
        <View style={StyleSheet.flatten([styles.rowWrapper, styles.bottomDivider])}>
          <PrimaryText style={styles.title}><PrimaryText color="theme">* </PrimaryText> 直播标题</PrimaryText>
          <TextInput
            placeholder="请输入10个汉字内直播间名称"
          />
        </View>
        <PrimaryText style={styles.title}>内容简介</PrimaryText>
        <TextInput
          multiline
          textAlignVertical="top"
          placeholder="介绍直播内容或注意事项，少于60字"
          style={styles.contentInput}
        />
      </View>
      <TouchableOpacity style={styles.btnWrapper} onPress={onSubmitPress}>
        <PrimaryText color="white">发布预告</PrimaryText>
      </TouchableOpacity>
      {
        // isShowDatePicker && (
        //   <DateTimePicker
        //     testID="dateTimePicker"
        //     timeZoneOffsetInMinutes={0}
        //     value={new Date(1598051730000)}
        //     mode={datePickerMode}
        //     is24Hour={true}
        //     display="default"
        //     onChange={onDeteChange}
        //   />
        // )
      }
    </ScrollView>
  )
};

CreateTraserScreen.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    padding: pad
  },
  title: {
    fontWeight: '600',
    // marginTop: 24,
    marginVertical: 10,
    marginRight: pad
  },
  row: {
    flexDirection: 'row'
  },
  coverWrapper: {
    height: 120,
    width: 120,
    backgroundColor: Colors.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImg: {
    height: 120,
    width: 120
  },
  videoWrapper: {
    height: 194,
    backgroundColor: Colors.bgColor,
    borderRadius: radio,
    justifyContent: 'center',
    alignItems: 'center',
    padding: pad,
  },
  vedioDescText: {
    marginVertical: 4
  },
  backgroundVideo: {
    flex: -1,
    height: '100%',
    width: 120,
  },
  btnWrapper: {
    height: 48,
    backgroundColor: Colors.basicColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3 * pad
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  divider: {
    borderTopWidth: 8,
    borderColor: Colors.divider
  },
  bottomDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.divider
  },
  contentInput: {
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: radioLarge,
    borderColor: Colors.divider,
    minHeight: 146,
    padding: pad
  }
});

export default withPage(CreateTraserScreen, {
  statusBarOptions: {
    barStyle: 'dark-content',
    backgroundColor: '#fff',
  }
});