/**
 * 渐出消息
 * 下单、关注消息
 */
import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  Animated,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SmallText, scale } from 'react-native-normalization-text';
// import {MessageType} from '../../reducers/im';
import {popScrollMessage} from '../../actions/im';
import { vw } from '../../utils/metric';
import { pad } from '../../constants/Layout';

export type dataAdapterType = (data: any) => {
  id: string,
  name: string,
  text: string,
  Icon: any,
  backgroundColor: string,
} | null;

interface MsgRowProps {
  dataList: Array<any>,
  dataAdapter?: dataAdapterType,
  style?: StyleProp<any>,
}

const MsgRow = (props: MsgRowProps) : any =>  {
  const dispatch = useDispatch();

  /**
   * 
   */

  /**
   * 消息队列位置0的消息
   */
  const data = React.useMemo(() => {
    return (props.dataList && {...props.dataList[0]})
  }, [props.dataList])

  /**
   * 数据适配
   */
  const dataFmt = (props.dataAdapter ? props.dataAdapter(data) : data) || {};

  /**
   * 空
   */
  const isEmpty = !props.dataList || props.dataList.length === 0;

  /**
   * 动画
   */
  const [aniValue, setAniValue] = React.useState(new Animated.Value(0));
  const isRunning: {current: boolean} = React.useRef(false);

  /**
   * data变化
   */
  React.useEffect(() => {
    let timer: any;
    if (data.data && !isRunning.current) {
      isRunning.current = true;
      // console.log('1111-start-1', aniValue)
      Animated
      .timing(aniValue, {
        toValue: 1,
        duration: 500
      })
      .start(({finished}) => {
        // console.log('1111-start-2', aniValue)
        timer = setTimeout(() => {
          Animated
          .timing(aniValue, {
            toValue: 2,
            duration: 500
          }).start(() => {
            // 重置动画
            setAniValue(new Animated.Value(0));

            timer = setTimeout(() => {
              dispatch(popScrollMessage());
              isRunning.current = false;
            }, 1000)
          })
        }, 2000)

        // 出队列
        return () => {
          if (timer) {
            clearTimeout(timer)
          }
        }
      })
    }
  }, [data])

  if (isEmpty) {
    return null;
  }

  return (
    <Animated.View
      style={StyleSheet.flatten([styles.wrapper, props.style, {
        transform: [{
          translateX: aniValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [vw(100), 0, -vw(100)],
          }),
        }],
        opacity: aniValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 1, 0],
        }),
        backgroundColor: dataFmt.backgroundColor
      }])}
    >
      <View style={styles.imgWrapper}>
        <dataFmt.Icon size={16} style={styles.icon} />
      </View>
      <SmallText style={styles.text} color="white">
        <SmallText style={styles.userName} color="white">{dataFmt.name || '游客'}</SmallText>
        {dataFmt.text}
      </SmallText>
    </Animated.View>
  )
}

MsgRow.defaultProps = {
  // dataAdapter: (d: any = {}) => ({name: d.name, text: d.text, isFollowed: d.isFollowed}),
  onPress: () => {},
}

const styles = StyleSheet.create({
  wrapper: {
    flex: -1,
    flexDirection: 'row',
    marginVertical: 2,
    paddingHorizontal: pad,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: 'center'
  },
  icon: {
    height: scale(16),
    width: scale(36),
    marginRight: 6,
    paddingTop: scale(1),
    alignSelf: 'flex-start'
  },
  imgWrapper: {
    // borderWidth: 1,
    // borderColor: 'white'
  },
  text: {
    // height: 20,
    // lineHeight: 20,
  },
  userName: {
    // color: Colors.yellowColor,
    // height: 20,
    // lineHeight: 20,
  },
})

export default MsgRow;