import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'

export default function Tenants() {
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '商家入驻',
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
        <Text style={styles.text}>云闪播致力于向消费者提供更丰富的品牌商品及更优质的品质服务，欢迎优质品牌和商家入驻，共同打造全球消费者至爱的品质购物之城。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>第一章 品质云闪播</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第一条</Text>  云闪播以消费者的需求和市场需要建立热招品牌库，寻找提供优质商品和服务的商家；同时也欢迎商家将好商品和好品牌推荐给云闪播，为消费者提供更优质商品和服务。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>第二章 入驻须知</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第二条</Text>  云闪播可根据实际情况（包括但不仅限于品牌需求、公司经营状况、服务水平等因素）决定是否准许入驻；同时云闪播可在申请入驻及后续经营阶段要求客户提供其他资质；云闪播将结合国家相关规定、各行业发展动态及消费者购买需求，不定期更新入驻标准。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第三条</Text>  商家必须如实提供资料和信息。</Text>
        <Text style={styles.text}>（一） 请务必确保您申请入驻及后续经营阶段提供的相关资质和信息的真实性（若您提供的相关资质（包括但不限于商标注册证、授权书）为第三方提供的，请务必先行核实文件的真实有效性），一旦发现资质或信息虚假的，您的公司将被列入非诚信客户名单，云闪播将不再与您进行合作；</Text>
        <Text style={styles.text}>（二） 商家应如实提供其店铺运营的主体及相关信息，包括但不限于代理运营商、实际店铺经营主体等信息；</Text>
        <Text style={styles.text}>（三） 云闪播关于商家信息和资料变更有相关规定的从其规定，但商家如变更第二款所列信息，应提前十五天书面告知云闪播。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>第三章 云闪播店铺类型及相关要求</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第四条</Text> 旗舰店指以自有品牌或由商标权人提供独占授权的品牌入驻云闪播开设的店铺。</Text>
        <Text style={styles.text}>旗舰店分为以下几种：</Text>
        <Text style={styles.text}>1、经营一个品牌的旗舰店；</Text>
        <Text style={styles.text}>2、经营多个品牌且各品牌归同一实际控制人的旗舰店；</Text>
        <Text style={styles.text}>3、以服务类商标开设且经营多个品牌的旗舰店（以下称“卖场型旗舰店”）。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第五条</Text>  专卖店指以商标权人提供普通授权的品牌入驻云闪播开设的店铺。</Text>
        <Text style={styles.text}>（一）专卖店分为以下几种：</Text>
        <Text style={styles.text}>1、经营一个品牌的专卖店；</Text>
        <Text style={styles.text}>2、经营多个品牌且各品牌归同一实际控制人的专卖店。</Text>
        <Text style={styles.text}>（二）商标权人出具的授权文件不得有地域限制（个别类目除外），且授权有效期不得少于半年。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>第四章 入驻限制</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第六条</Text>  云闪播暂不接受个体工商户的入驻申请，亦不接受非中国大陆企业的入驻申请。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第七条</Text>  云闪播暂不接受未取得商标注册证或商标受理通知书的品牌的入驻申请，亦不接受无图形类商标的入驻申请。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第八条</Text>  品牌限制</Text>
        <Text style={styles.text}>（一） 与云闪播的品牌、业务等相同或近似；</Text>
        <Text style={styles.text}>（二）以“网”、“网货”结尾的品牌；</Text>
        <Text style={styles.text}>（三）包含行业名称、通用名称、知名人士或地名的品牌；</Text>
        <Text style={styles.text}>（四）与知名品牌相同或近似的品牌。</Text>
        <Text style={styles.text}>（五）含其他不宜入驻品牌的。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第九条</Text>  企业名称中含以下字号的，限制入驻：</Text>
        <Text style={styles.text}>（一） 与云闪播的品牌、业务等相同或近似；</Text>
        <Text style={styles.text}>（二） 与知名品牌相同或近似的。</Text>
        <Text style={styles.text}>（三）含其他不宜入驻字号的。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第十条</Text>  跨类目经营限制：</Text>
        <Text style={styles.text}>专营店（部分特殊商品除外）不允许跨经营大类 。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第十一条</Text>  同一主体开多家云闪播店铺限制：</Text>
        <Text style={styles.text}>（一） 店铺间经营的品牌及/或商品不得重复；</Text>
        <Text style={styles.text}>（二） 一个经营大类下专营店只能申请一家。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第十二条</Text>  同一主体重新入驻云闪播限制：</Text>
        <Text style={styles.text}>（一） 严重违规、资质造假等被云闪播清退的，永久限制入驻；</Text>
        <Text style={styles.text}>（二） 一个自然年内主动退出2次的，6个月内限制入驻。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>第五章 其他</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第十三条</Text> 商家需在费用缴纳成功之日起30天内发布规定数量商品并且点击店铺上线，如逾期未操作，本次入驻申请失效，需重新提交入驻申请。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第十四条</Text> 云闪播暂未授权任何机构提供收费代理入驻服务，入驻申请流程及相关的收费说明均以云闪播规则页面为准。
</Text>
        <Text style={styles.text}><Text style={styles.boldText}>第十五条</Text> 随着消费者需求及商业模式的不断发展变化，云闪播将适时通过主动邀约或开放入驻等方式与商家共同探索新的店铺类型及经营模式。</Text>
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