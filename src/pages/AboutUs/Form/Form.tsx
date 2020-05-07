import React from 'react'
import { View, Text, StyleSheet, PixelRatio, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import pxToDp from '../../../utils/px2dp'
import { Colors } from '../../../constants/Theme'

export default function Form() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.push('Tenants')}>
        <View style={styles.formItem}>
          <Text style={styles.title}>商家入驻</Text>
          <Ionicons size={20} name='ios-arrow-forward' color={Colors.darkGrey} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.push('ServiceAgreement')}>
        <View style={styles.formItem}>
          <Text style={styles.title}>云闪播服务协议</Text>
          <Ionicons size={20} name='ios-arrow-forward' color={Colors.darkGrey} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    backgroundColor: Colors.whiteColor,
    marginTop: pxToDp(10)
  },
  formItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: pxToDp(100),
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1 / PixelRatio.get()
  },
  title: {
    fontSize: pxToDp(30),
    color: Colors.darkBlack,
    fontWeight: '500'
  }
})