/**
 * 图片选择组件
 */
import * as React from 'react';
import {
  View,
  Image,
  PrimaryText,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SmallText} from 'react-native-normalization-text';
import * as ImagePicker from 'expo-image-picker';
import pickCameraRoll from '../../utils/pickCameraRoll';
import Iconadd from '../../components/Iconfont/Iconadd';
import Iconclosebg from '../../components/Iconfont/Iconclosebg';
import { Colors } from '../../constants/Theme';
import { pad } from '../../constants/Layout';

interface ImagePickerBoxProps {
  style?: StyleProp<any>,
  imgStyle?: StyleProp<any>,
  contentWrapper?: StyleProp<any>,
  placeholderText?: string,
  placeholderIcon?: any,
  onPicked: (uri?: string) => any,
  canClose?: boolean,
  initImg?: any, // 初始图
}

const ImagePickerBox = (props: ImagePickerBoxProps) =>  {
  /**
   * 选择图片
   */
  const [coverUri, setCoverUri]: Array<any> = React.useState(props.initImg);
  const pickCover = async () => {
    const r = await pickCameraRoll({mediaTypes: ImagePicker.MediaTypeOptions.Images});

    const {uri} = r || {};
    if (uri) {
      setCoverUri(uri)
      props.onPicked(r);
    }
  };

  /**
   * 取消选择图片
   */
  const cancel = async () => {
    setCoverUri()
    props.onPicked();
  };

  return (
    <TouchableOpacity style={StyleSheet.flatten([styles.style, props.style])} onPress={pickCover}>
      {/* <View style={StyleSheet.flatten([styles.contentWrapper, props.contentWrapper])}> */}
        {
          coverUri ? (
            <>
              <Image
                style={StyleSheet.flatten([styles.img, props.imgStyle])}
                source={{uri: coverUri}}
                resizeMode="cover"
              />
            </>
          ) : (
            <>
              {props.placeholderIcon || <Iconadd />}
              <SmallText style={styles.placeholderText}>{props.placeholderText}</SmallText>
            </>
          )
        }
        {
          coverUri ?
          <TouchableOpacity style={styles.close} onPress={cancel}>
            <Iconclosebg size={24} />
          </TouchableOpacity> : null
        }
      {/* </View> */}
    </TouchableOpacity>
  )
};

ImagePickerBox.defaultProps = {
  placeholderText: '选择图片',
  canClose: true
};

const styles = StyleSheet.create({
  style: {
    height: 120,
    width: 120,
    backgroundColor: Colors.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  imgStyle: {

  },
  placeholderText: {
    color: Colors.lightGrey,
    marginTop: '8%'
  },
  close: {
    position: 'absolute',
    padding: 5,
    top: -16,
    right: -12,
  }
});

export default ImagePickerBox;