/**
 * 直播封面、标题编辑
 */
import * as React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Permission
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { pad, radioLarge } from '../../constants/Layout';
import {PrimaryText, SmallText} from 'react-native-normalization-text';
import * as ImagePicker from 'expo-image-picker';
import images from '../../assets/images';
import {isAndroid} from '../../constants/DeviceInfo';
import {updateLiveConfig} from '../../actions/live';

const LiveReadyCard = (props) =>  {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
  }, [])

  /**
   * 封面
   */
  const liveCover = useSelector(state => state?.live?.liveConfig?.cover)

  /**
   * 标题
   */
  const title = useSelector(state => state?.live?.liveConfig?.title)

  /**
   * 提交直播配置更改
   */
  // 标题
  const onChangeTitle = (title: string) => {
    dispatch(updateLiveConfig({title}))
  }

  // 封面
  const onChangeCover = (cover: string) => {
    dispatch(updateLiveConfig({cover}))
  }

  const pickImage = async () => {
    try {
      console.log(ImagePicker.launchImageLibraryAsync, '333')
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true, // 这引起了cancelled
        allowsMultipleSelection: false,
        aspect: [4, 3],
        quality: 1,
        exif: false,
      });
      if (!result.cancelled) {
        onChangeCover(result.uri);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  console.log('liveCover', liveCover)

  const coverImgSource = liveCover ? {uri: liveCover} : images.editLiveCover;
  return (
    <View style={styles.style}>
      <TouchableOpacity
        onPress={() => {pickImage()}}
        style={styles.imgWrapper}
      >
        <Image
          style={styles.cover}
          source={coverImgSource}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.contentWrapper}>
        <TextInput
          multiline
          blurOnSubmit
          value={title}
          onChangeText={onChangeTitle}
          textAlignVertical="top"
          placeholder="编辑直播标题"
          maxLength={20}
          returnKeyLabel="完成"
          returnKeyType="done"
          style={styles.input}
          onSubmitEditing={props.onSubmitEditing}
        />
      </View>
    </View>
  )
};

LiveReadyCard.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: pad,
    borderRadius: radioLarge,
    height: 135,
  },
  imgWrapper: {
    width: 115,
    height: 115,
    marginRight: pad,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    flex: 1,
  },
  input: {
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    // lineHeight: 12
  }
});

export default LiveReadyCard;