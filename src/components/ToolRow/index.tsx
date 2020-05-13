/**
 * 工具栏
 * 图片 文字 > 
 */
import * as React from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import Iconarrowright from '../Iconfont/Iconarrowright'
import { StyleProp } from 'react-native';
import { pad } from '../../constants/Layout';
import { Colors } from '../../constants/Theme';

interface ToolRowBasicProps {
  img: any,
  title: string,
  rightTitle?: string,
  showArrow: boolean,
  showRightText: boolean,
  imgStyle?: StyleProp<any>,
  rightContentWrapperStyle?: StyleProp<any>,
  onPress?: () => void,
}

const ToolRowBasic = (props: ToolRowBasicProps) =>  {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.style}>
      <>
        <View style={styles.leftContentWrapper}>
          <Image
          style={StyleSheet.flatten([styles.img, props.imgStyle])}
          source={props.img}
          resizeMode="contain"
          />
          <PrimaryText>{props.title}</PrimaryText>
        </View>
        <View style={StyleSheet.flatten([styles.rightContentWrapper, props.rightContentWrapperStyle])}>
          {props.showRightText && <PrimaryText style={{color: Colors.darkGrey}}>{props.rightTitle}</PrimaryText>}
          {props.showArrow && <Iconarrowright size={20} />}
        </View>
      </>
    </TouchableOpacity>
  )
};

ToolRowBasic.defaultProps = {
  showArrow: true,
  showRightText: false,
};

const styles = StyleSheet.create({
  style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginVertical: 8,
  },
  leftContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 22,
    width: 22,
    marginRight: pad
  },
});

export default ToolRowBasic;