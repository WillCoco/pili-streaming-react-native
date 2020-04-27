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
import Video from 'react-native-video';
import * as ImagePicker from 'expo-image-picker';
import pickCameraRoll from '../../utils/pickCameraRoll';
import Iconvideo from '../../components/Iconfont/Iconvideo';
import {Colors} from '../../constants/Theme';
import { radio, pad } from '../../constants/Layout';

interface ImagePickerBoxProps {
  style?: StyleProp<any>,
  imgStyle?: StyleProp<any>,
  placeholderText?: string,
  placeholderIcon?: any,
  onPicked: (uri: string) => undefined,
}

const ImagePickerBox = React.forwardRef((props: ImagePickerBoxProps, ref: any) =>  {
  /**
   * 选择
   */
  const [vedioUri, setVedioUri]: Array<any> = React.useState();
  const pickCover = async () => {
    const uri = await pickCameraRoll({mediaTypes: ImagePicker.MediaTypeOptions.Videos});
    if (uri) {
      setVedioUri(uri)
      props.onPicked(uri);
    }
  };

  return (
    <TouchableOpacity style={StyleSheet.flatten([styles.style, props.style])} onPress={pickCover}>
      {
        vedioUri ? (
          <Video source={{uri: vedioUri}}   // Can be a URL or a local file.
              paused
              ref={ref}                                        // Store reference
              // onBuffer={this.onBuffer}                // Callback when remote video is buffering
              // onError={this.videoError}               // Callback when video cannot be loaded
              style={styles.img}
            />
        ) : (
          <>
            {props.placeholderIcon || <Iconvideo size={24} style={styles.icon} />}
            <SmallText style={styles.placeholderText}>{props.placeholderText}</SmallText>
          </>
        )
      }
    </TouchableOpacity>
  )
});

ImagePickerBox.defaultProps = {
  placeholderText: '预告视频'
};

const styles = StyleSheet.create({
  style: {
    height: 194,
    backgroundColor: Colors.bgColor,
    borderRadius: radio,
    justifyContent: 'center',
    alignItems: 'center',
    padding: pad,
  },
  icon: {
    marginBottom: 20
  },
  img: {
    height: '100%',
    width: '100%',
  },
  placeholderText: {
    color: Colors.lightGrey
  }
});

export default ImagePickerBox;