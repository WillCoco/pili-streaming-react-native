/**
 * 回放底部bock业务组件
 */
import * as React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {AudienceTeaserToolBar} from '../LiveToolBar';
import {pad} from '../../constants/Layout';
import Poller from '../../utils/poller';

const BottomBlock = (props: any) : any =>  {
  const dispatch = useDispatch();

  const [likeQuantity, setLikeQuantity] = React.useState(0); // 获取来的数量

  // 喜欢
  const onPressLike = () => {
    setLikeQuantity(quantity => ++quantity)
  }
  
  // 提交喜欢
  const submitLike = React.useCallback((quantity: number) => {
    if (likeQuantity) {
      // 提交、返回新值
      alert(likeQuantity)
    }
  }, [likeQuantity])
  
  // 转发分享
  const onPressForward = () => {
    
  }

  /**
   * 轮询器
   */
  const poller = React.useRef(new Poller({
    interval: 1000 * 10,
    initExec: false,
    callback: submitLike,
  }));

  React.useEffect(() => {
    if (poller.current) {
      poller.current.stop();
    }

    poller.current = new Poller({
      interval: 1000 * 10,
      initExec: false,
      callback: submitLike,
    });

    poller.current.start();
    
    return () => {
      poller.current.stop();
    }
  }, [likeQuantity])

  // 观众
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <AudienceTeaserToolBar
        likeQuantity={likeQuantity}
        onPressLike={onPressLike}
        onPressForward={onPressForward}
      />
    </View>
  )
};

BottomBlock.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: pad,
    justifyContent: 'flex-end',
  },
});

export default BottomBlock;