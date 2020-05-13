/**
 * 主播权益
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../../constants/Theme';
import {pad} from '../../../constants/Layout';
import {PrimaryText, T3} from 'react-native-normalization-text';
import pxToDp from '../../../utils/px2dp';

const BeAnchorRow = (props: any) =>  {
  return (
    <View style={styles.rowStyle}>
      <ImageBackground source={props.source} style={styles.backgroundStyle}>
        <T3 style={styles.title}>{props.title}</T3>
        <PrimaryText style={styles.text}>{props.text}</PrimaryText>
      </ImageBackground>
    </View>
  )
};

BeAnchorRow.defaultProps = {
};

const styles = StyleSheet.create({
  rowStyle: {
    width: '100%',
    height: pxToDp(160),
    marginBottom: pad,
  },
  backgroundStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    marginLeft: '30%',
    color: Colors.whiteColor,
    fontWeight: 'bold'
  },
  text: {
    marginLeft: '30%',
    marginTop: pad,
    color: Colors.whiteColor,
  }
});

export default BeAnchorRow;