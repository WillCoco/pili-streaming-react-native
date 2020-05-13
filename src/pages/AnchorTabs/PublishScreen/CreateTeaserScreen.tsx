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
import DateTimePicker, {PickTimeMode} from '../../../components/DateTimePicker';
import NavBar from '../../../components/NavBar';
import { pad, radio, radioLarge } from '../../../constants/Layout';
import {Colors} from '../../../constants/Theme';
import {isIOS, isAndroid} from '../../../constants/DeviceInfo';
import {vw} from '../../../utils/metric';
import { Toast } from '@ant-design/react-native';

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
   * 直播时间
   */
  const liveTime: {current: [string | undefined, string | undefined]} = React.useRef([undefined, undefined]);

  /**
   * 标题
   */
  const [title, setTitle]: Array<any> = React.useState();

  /**
   * 内容简介
   */
  const [introductoryText, setIntroductoryText]: Array<any> = React.useState();

  // 时间戳
  const liveTimeStamp: {current: any} = React.useRef();

  console.log(liveTimeStamp, 'liveTimeStampliveTimeStampliveTimeStamp')

  const onPickedTime = (type: string, time: string) => {
    console.log(type, time, 123123)

    if (isAndroid()) {
      if (type === PickTimeMode.date) {
        liveTime.current[0] = time;
      } else if (type === PickTimeMode.time) {
        liveTime.current[1] = time;
      }

      // 收集满了计算时间戳
      if (liveTime.current[0] && liveTime.current[1]) {
        const t = new Date(liveTime.current.join(' '))
        liveTimeStamp.current = t.getTime && t.getTime();
      }
    }

    // todo: ios
  }

  /**
   * 提交前审核 
   */
  const isDataVaild = (): boolean => {
    console.log(title, '123123')
    if (!cover1Uri) {
      Toast.show('请选择封面图');
      return false;
    }
    if (!liveTimeStamp.current) {
      Toast.show('请选择开播时间');
      return false;
    }
    Toast.show('请填写标题');
    if (!title) {
      return false;
    }

    return true;
  }

  /**
   * 提交 
   */
  const onSubmitPress = () => {
    if (!isDataVaild()) {
      return;
    }

    Toast.show('发布成功')
    goBack();
  }

  return (
    <ScrollView style={styles.style}>
      <NavBar title="发布预告" />
      <View style={styles.contentWrapper}>
        <PrimaryText style={styles.title}>直播封面图(必填)</PrimaryText>
        <View style={styles.row}>
          <ImagePickerBox
            placeholderText="封面图1"
            onPicked={(v) => setCover1Uri(v)}
            style={{marginRight: pad}}
          />
          {/* <ImagePickerBox
            placeholderText="封面图2"
            onPicked={(v) => setCover2Uri(v)}
            style={{flex: 1}}
          /> */}
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
          <DateTimePicker
            onPicked={onPickedTime}
            style={{position: 'absolute', left: -pad, paddingLeft: scale(70) + pad * 3}}
          />
          {/* <PrimaryText onPress={() => onPressPickDate('date')} style={styles.title}>{formatDate(liveTime) || '选择日期'}</PrimaryText> */}
          {/* <PrimaryText onPress={() => onPressPickDate('time')} style={styles.title}>{formatTime(liveTime) || '选择时间'}</PrimaryText> */}
        </View>
        <View style={StyleSheet.flatten([styles.rowWrapper, styles.bottomDivider])}>
          <PrimaryText style={styles.title}><PrimaryText color="theme">* </PrimaryText> 直播标题</PrimaryText>
          <TextInput
            placeholder="请输入10个汉字内直播间名称"
            maxLength={10}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <PrimaryText style={styles.title}>内容简介</PrimaryText>
        <TextInput
          multiline
          textAlignVertical="top"
          placeholder="介绍直播内容或注意事项，少于60字"
          maxLength={60}
          value={introductoryText}
          onChangeText={setIntroductoryText}
          style={styles.contentInput}
        />
      </View>
      <TouchableOpacity style={styles.btnWrapper} onPress={onSubmitPress}>
        <PrimaryText color="white">发布预告</PrimaryText>
      </TouchableOpacity>
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
    backgroundColor: 'transparent',
  }
});