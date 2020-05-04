/**
 * 地址行
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import pxToDp from '../../utils/px2dp'
import { Colors } from '../../constants/Theme'

interface AddressManageRowProps {
  onEditPress?: (v: any) => void,
  province?: string,
  city?: string,
  district?: string,
  address?: string,
  consignee: string, // 收件人
  mobile: string, // 手机号
  onRowPress?: (item: any) => void,
  disabled?: boolean,
}


const AddressManageRow = (props: AddressManageRowProps) =>  {

  /**
   * 详细地址
   */
  const addressDetail = React.useMemo(() => {
    const data = [props.province, props.city, props.district, props.address];
    // const data = ['生', '是', 'ji', '详细地址阿时间的黑科技啊是的空间阿什顿看见阿什顿看见啊实打实健康的好阿斯顿就看哈收到就好'];

    const b = data.reduce((p, n) => {
      if (n) {
        return p + n;
      }
      return p;
    }, '')

    return b;
  }, [props])

  /**
   * 点击 
   */
  const onRowPress = () => {
    props.onRowPress && props.onRowPress(props)
  }

  return (
    <View style={styles.style}>
      <View style={styles.addrItem}>
        <Text style={styles.nameAvatar}>{props?.consignee?.slice(0, 1)}</Text>

        <TouchableOpacity disabled={!props.onRowPress || props.disabled} onPress={onRowPress} style={styles.contentWrapper}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text style={styles.userName}>{props.consignee}</Text>
              <Text style={styles.userTel}>{props.mobile}</Text>
            </View>
            <Text style={styles.addrInfo} numberOfLines={2}>{addressDetail}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={props.onEditPress}>
          <View style={styles.editBtn}>
            <Text style={styles.editBtnText}>编辑</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
};

AddressManageRow.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
  },
  nameAvatar: {
    width: pxToDp(72),
    height: pxToDp(72),
    lineHeight: pxToDp(72),
    textAlign: 'center',
    backgroundColor: '#bbb',
    fontSize: pxToDp(30),
    fontWeight: '500',
    color: Colors.whiteColor,
    borderRadius: pxToDp(36),
    overflow: 'hidden',
    marginRight: pxToDp(28)
  },
  editBtn: {
    width: pxToDp(120),
    height: pxToDp(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1 / PixelRatio.get(),
    borderLeftColor: Colors.borderColor,
    marginLeft: pxToDp(28)
  },
  editBtnText: {
    fontSize: pxToDp(26),
    color: Colors.darkGrey,
    fontWeight: '500'
  },
  userName: {
    fontSize: pxToDp(32),
    fontWeight: '500',
    color: Colors.darkBlack
  },
  userTel: {
    fontSize: pxToDp(24),
    color: Colors.darkGrey,
    marginLeft: pxToDp(40)
  },
  addrItem: {
    paddingLeft: pxToDp(20),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(30),
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  addrInfo: {
    marginTop: pxToDp(10),
    fontSize: pxToDp(26),
    color: Colors.lightBlack,
    lineHeight: pxToDp(37),
  },
  contentWrapper: {
    flex: 1
  }
});

export default AddressManageRow;