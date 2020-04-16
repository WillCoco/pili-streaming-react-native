/**
 * 直播间底部bock业务组件
 */
import * as React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import LiveMsg from '../../../components/LiveMsg';
import {Anchor as AnchorLiveToolBar, Audience as AudienceLiveToolBar} from '../../../components/LiveToolBar';

const LivingRoomScreen = (props) : any =>  {
  /**
   * 测试聊天
   */
  const initData: any[] = ['等级- 用户: 测试消息'];
  const [data, setData] = React.useState(initData);
  React.useEffect(() => {
    const add = () => {
      const newData = [...data, '等级- 用户: 测试消息']
      setData(newData);
    }

    const timer = setInterval(() => {
      add()
    }, 3000)

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [data])

  // 观众
  return (
    <View style={StyleSheet.flatten([styles.wrapper, props.style])}>
      <LiveMsg
        msgList={data}
      />
      <AudienceLiveToolBar />
    </View>
    
  )
};

LivingRoomScreen.defaultProps = {
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderWidth: 1
  },
});

export default LivingRoomScreen;