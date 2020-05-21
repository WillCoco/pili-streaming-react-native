/**
 * 日期选择组件
 */
import * as React from 'react';
import {
  View,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
    Image
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import {DatePicker,List} from '@ant-design/react-native'
import dayjs from 'dayjs';
import {pad} from '../../constants/Layout';

interface ImagePickerBoxProps {
  onPicked: (time?: string) => any
}

const ImagePickerBox = (props: ImagePickerBoxProps) =>  {

  const {onPicked} = props;

  /**
   * 显示时间选择器
   */
  const [visible, setVisible]: Array<any> = React.useState(false);

  /**
   *  显示时间
   */
  const nowTimeStamp = Date.now();
  const now = new Date(nowTimeStamp);
  const [time, setTime]: Array<any> = React.useState(now);


  React.useEffect(() => {
      onPicked(formatTime(time))
  },[]);

  /**
   * 时间format
   */
  const formatTime = (timestamp: number, format: any = {
    Y: '-',
  }) => {
    if (!timestamp) {
      return;
    };
    const t =  dayjs(timestamp);
    const m = (t.month() + 1) > 10 ? t.month() + 1 : `0${t.month() + 1}`
    return `${t.year()}${format.Y || ''}${m}`;
  };

  /*
  * 时间选择器子组件
  */
  const CustomChildren = (props: {
      onChange: () => void,
      extra: string,
      children: any
  }) => (
      <TouchableOpacity onPress={props.onChange} style={styles.childrenStyle}>
          <PrimaryText style={styles.title}>{props.extra && formatTime(props.extra)}</PrimaryText>
          <Image style={styles.img} source={require('../../assets/images/pullDown.png')} />
      </TouchableOpacity>
  );

  /*
  * 确定
  * */
  const onOK = (time) => {
      setTime(time);
      onPicked(formatTime(time));
      setVisible(false);
  };

  return (
          <DatePicker
              mode="month"
              visible={visible}
              value={time}
              onOk={onOK}
              onDismiss={() => {setVisible(false)}}>
              <CustomChildren onChange={() => setVisible(true)} />
          </DatePicker>
  )
};

ImagePickerBox.defaultProps = {
};

const styles = StyleSheet.create({
  childrenStyle: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      height: 30,
      width: 100,
      borderRadius: 5,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center'
  },
  img: {
      width: 13,
      height: 8.5,
      marginLeft: 10
  },
    title: {
        color:'#333333',
        fontSize: 12
    }
});

export default ImagePickerBox;