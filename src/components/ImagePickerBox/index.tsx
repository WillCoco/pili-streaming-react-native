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
import {SmallText} from 'react-native-normalization-text';
import * as ImagePicker from 'expo-image-picker';
import pickCameraRoll from '../../utils/pickCameraRoll';
import Iconadd from '../../components/Iconfont/Iconadd';
import { Colors } from '../../constants/Theme';
import { pad } from '../../constants/Layout';

interface ImagePickerBoxProps {
  style?: StyleProp<any>,
  imgStyle?: StyleProp<any>,
  placeholderText?: string,
  placeholderIcon?: any,
  onPicked: (uri: string) => undefined,
}

const ImagePickerBox = (props: ImagePickerBoxProps) =>  {
  /**
   * 选择图片
   */
  const [coverUri, setCoverUri]: Array<any> = React.useState();
  const pickCover = async () => {
    const uri = await pickCameraRoll({mediaTypes: ImagePicker.MediaTypeOptions.Images});
    if (uri) {
      setCoverUri(uri)
      props.onPicked(uri);
    }
  };

  return (
    <TouchableOpacity style={StyleSheet.flatten([styles.style, props.style])} onPress={pickCover}>
      <View style={styles.style}>
        {
          coverUri ? (
            <Image
              style={StyleSheet.flatten([styles.img, props.imgStyle])}
              source={{uri: coverUri}}
              resizeMode="cover"
            />
          ) : (
            <>
              {props.placeholderIcon || <Iconadd />}
              <SmallText style={styles.placeholderText}>{props.placeholderText}</SmallText>
            </>
          )
        }
      </View>
    </TouchableOpacity>
  )
};

ImagePickerBox.defaultProps = {
  placeholderText: '选择图片'
};

const styles = StyleSheet.create({
  style: {
    height: 120,
    width: 120,
    backgroundColor: Colors.bgColor,
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
    marginTop: pad * 2
  }
});

export default ImagePickerBox;