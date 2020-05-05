import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

export default function ServiceAgreement() {
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '云闪播服务协议',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>圈品商城电商平台服务协议、交易规则</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>【总则】</Text>
        <Text style={styles.text}>针对浙江紫薇科技有限公司所属电子商务平台“圈品商城”，以下简称平台。在业务开展过程中制定本服务协议、交易规则。为了保障圈品商城平台各方主体的合法权益，规范各方主体行为，维护商务市场秩序，遵守和维护国家法律法规，制定本方案。
圈品商城平台所有电子商务活动，适用本方案。 本方案所称电子商务活动，是指通过互联网等信息网络销售商品或者提供服务的经营活动。《中华人民共和国电子商务法》对销售商品或者提供服务有规定的，适用其规定。金融类产品和服务，利用信息网络提供新闻信息、音视频节目、出版以及文化产品等内容方面的服务，根据《中华人民共和国电子商务法》相关规定，不适用本方案。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>【服务协议】</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}></Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: pxToDp(20),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(50)
  },
  section: {
    marginBottom: pxToDp(40)
  },
  text: {
    fontSize: pxToDp(24),
    lineHeight: pxToDp(36),
    color: Colors.darkBlack
  },
  title: {
    fontSize: pxToDp(26),
    lineHeight: pxToDp(36),
    color: Colors.darkBlack,
    fontWeight: '600'
  },
  boldText: {
    fontWeight: '600'
  }
})