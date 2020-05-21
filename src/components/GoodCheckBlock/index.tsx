// /**
//  * 商品选择单元块
//  * 用于:
//  *  直播组货页面
//  */
// import * as React from 'react';
// import { Colors } from '../../constants/Theme';
// import Iconchecked from '../../components/Iconfont/Iconchecked';
// import { PrimaryText, SmallText} from 'react-native-normalization-text';
// import Iconarrowright from '../Iconfont/Iconarrowright';
// import images from '../../assets/images/index';
// import { vw } from '../../utils/metric';
// import { pad, radio } from '../../constants/Layout';
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';


// interface GoodCheckBlockProps {
//   isChecked: boolean,
//   good: any,
//   onPress: () => any
// }

// const GoodCheckBlock = (props: GoodCheckBlockProps) =>  {
//   const checkImg = props.isChecked ? images.checkedYellowIcon : images.uncheckedIcon;
  
//   return (
//     <TouchableOpacity style={styles.style} onPress={props.onPress}>
//       <View style={styles.imgWrapper}>
//         <Image
//           style={styles.img}
//           source={props.good?.img || images.goodCover}
//           resizeMode="cover"
//         />
//       </View>
//       <Image
//         source={checkImg}
//         style={styles.icon}
//       />
//     </TouchableOpacity>
//   )
// };

// GoodCheckBlock.defaultProps = {
// };

// const cellWidth = (vw(100 - 28) - 3 * pad) / 3 ;
// const styles = StyleSheet.create({
//   style: {
//     width: cellWidth,
//     height: cellWidth,
//     backgroundColor: '#fff',
//     marginBottom: pad / 2,
//   },
//   imgWrapper: {
//     width: '100%',
//     height: '100%',
//   },
//   img: {
//     width: '100%',
//     height: '100%',
//     borderRadius: radio,
//   },
//   icon: {
//     width: 16,
//     height: 16,
//     position: 'absolute',
//     right: 6,
//     bottom: 6
//   },
// });

// export default GoodCheckBlock;