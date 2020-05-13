/**
 * 寄回地址管理
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PrimaryText} from 'react-native-normalization-text';
import NavBar from '../../../components/NavBar';
import withPage from '../../../components/HOCs/withPage';
import ButtonRadius from '../../../components/Buttons/ButtonRadius';
import Empty from '../../../components/Empty';
import { Colors } from '../../../constants/Theme';
import { vw } from '../../../utils/metric';
import { pad } from '../../../constants/Layout';
import AddressManageRow from '../../../components/AddressManageRow';
import {} from '../../../actions/shop';
import { apiGetReturnAddressList } from '../../../service/api';
import PagingList from '../../../components/PagingList';

const AddressManage = () =>  {
  const {navigate} = useNavigation();
  const [addressList, setAddressList] = React.useState([]);

  /**
   * 初始化页面
   */
  React.useEffect(() => {
    // 获取地址列表
    
  }, [])

  /**
   * 点击地址行的回调, 有可能没有
   */
  const route = useRoute();

  /**
   * 寄回地址
   */
  const returnAddresses = useSelector(state => state?.shop?.returnAddresses);

  /**
   * 刷新
   */
  const onRefresh = () => {
    const params = {
      pageNo: 1,
      pageSize: 10,
    }

    apiGetReturnAddressList(params).then(res => {
      console.log(res)
      Promise.resolve(res)
    })
  }

  /**
   * 更多
   */
  const onEndReached = () => {
    
  }

  /**
   * 是否显示空
   */
  const showEmpty = !returnAddresses || returnAddresses.length === 0;

  return (
    <View style={styles.style}>
      <NavBar title="寄回地址管理" leftTheme="light" titleStyle={{color: '#fff'}} style={styles.navWrapper} />
      <SafeAreaView style={{flex: 1}}>
          {/* {
            !showEmpty ? <Empty /> : (
              <ScrollView
                style={{flex: 1}}
              >
                {
                  [{}].map((address, index) => {
                    return (
                      <AddressManageRow
                        key={`address_${index}`}
                        city={address?.city || 't城市'}
                        district={address?.district || 't地址'}
                        address={address?.district || 'tdistrict'}
                        consignee={address?.consignee || 't收件人'} // 收件人
                        mobile={address?.mobile} // 手机号
                        onRowPress={route?.params?.onPicked}
                        onEditPress={() => navigate('AddNewAddress', {type: 'edit', addressInfo: {}})}
                      />
                    )
                  })
                }
              </ScrollView>
            )
          } */}
          <PagingList
            data={addressList}
            setData={setAddressList}
            size={14}
            // initListData={warehouseGoods}
            renderItem={({item, index}: any) => {
              return (
                <AddressManageRow
                  key={`address_${index}`}
                  city={address?.city || 't城市'}
                  district={address?.district || 't地址'}
                  address={address?.district || 'tdistrict'}
                  consignee={address?.consignee || 't收件人'} // 收件人
                  mobile={address?.mobile} // 手机号
                  onRowPress={route?.params?.onPicked}
                  onEditPress={() => navigate('AddNewAddress', {type: 'edit', addressInfo: {}})}
                />
              )
            }}
            // getItemLayout={(data, index) => (
            //   {length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index}
            // )}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
            keyExtractor={(item, index) => 'index' + index + item}
            initialNumToRender={10}
            numColumns={1}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            // contentContainerStyle={styles.pagingListWrapper}
          />
          <ButtonRadius
            style={styles.button}
            onPress={() => navigate('AddNewAddress', {type: 'add', addressInfo: {}})}
          >
            <PrimaryText color="white">
              + 添加寄回地址
            </PrimaryText>
          </ButtonRadius>
      </SafeAreaView>
    </View>
  )
};

AddressManage.defaultProps = {
};

const styles = StyleSheet.create({
  style: {
    flex: 1,
    backgroundColor: Colors.bgColor
  },
  navWrapper: {
    backgroundColor: Colors.basicColor,
  },
  button: {
    width: vw(80),
    position: 'absolute',
    bottom: pad * 2
  }
});

export default withPage(AddressManage, {
  statusBarOptions: {
    barStyle: 'light-content'
  }
});