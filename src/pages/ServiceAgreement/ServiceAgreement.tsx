import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'
import withPage from '../../components/HOCs/withPage'

function ServiceAgreement(props: any) {
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '云闪播直播平台管理规范',
    headerStyle: {
      backgroundColor: Colors.basicColor,
      elevation: 0,  // 去除安卓状态栏底部阴影
    },
    headerTitleAlign: 'center',
    headerTintColor: Colors.whiteColor,
    headerBackTitleVisible: false
  })

  return (
    <ScrollView style={StyleSheet.flatten([styles.container, {marginBottom: props.safeBottom}])}>
      <View style={styles.section}>
        <Text style={styles.title}>【适用范围】</Text>
        <Text style={styles.text}>适用于在云闪播直播电商服务平台发布内容的所有用户，包括主播和互动参与用户(统称为“用户”) 。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>【总则】</Text>
        <Text style={styles.text}>（一）主播</Text>
        <Text style={styles.text}>1.已成为云闪播主播，且账户状态正常;</Text>
        <Text style={styles.text}>2.具备一定的主播素质和能力。</Text>
        <Text style={styles.text}>3.通过云闪播平台审核。</Text>
        <Text style={styles.text}>(二)商家主播</Text>
        <Text style={styles.text}>1.已成为云闪播平台入驻商，且店铺状态正常;</Text>
        <Text style={styles.text}>2.具有一定的粉丝量、客户运营能力和主播素质;</Text>
        <Text style={styles.text}>3.本自然年度内不存在出售假冒商品、劣质产品或其他违反平台规定（包括但不限于投诉量、介入率超过规定、因违反平台规定被扣分等）或其他违反公序良俗的行为;</Text>
        <Text style={styles.text}>4.对商家准入有特殊要求的，依据另行制定的准入要求或法律法规规定执行。</Text>
        <Text style={styles.text}>(三)互动参与用户</Text>
        <Text style={styles.text}>所有注册云闪播平台的用户均可参与直播互动。</Text>
      </View>



      <View style={styles.section}>
        <Text style={styles.title}>【服务协议】</Text>
        <Text style={styles.text}>（一） 不得发布违法广告</Text>
        <Text style={styles.text}>1.违法广告范围：</Text>
        <Text style={styles.text}>(1)发布不合规信息：发布不以成交为目的的商品或信息；发布易导致交易风险的外部网站的商品或信息；贬低其他商家、生产经营者的商品或者服务；</Text>
        <Text style={styles.text}>(2)宣传推广国家禁止进行广告的产品或未经备案、审批宣传推广国家法律法规规定需要先备案、审批才可进行广告的特殊产品（如：医疗、药品、医疗器械、农药、兽药和保健食品广告等）；</Text>
        <Text style={styles.text}>(3)信息与实际不符：夸大、过度或虚假承诺商品效果及程度；基础信息或资质信息等与实际不符；虚假中奖或活动信息；夸大或曲解政府、平台信息、广告含有虚假或者引人误解的内容，存在欺骗、误导消费者的情况等；</Text>
        <Text style={styles.text}>(4)信息重复、高度近似的广告大量重复宣发；</Text>
        <Text style={styles.text}>(5)信息要素不一致：素材与商品要素不一致；</Text>
        <Text style={styles.text}>(6)品牌不一致；</Text>
        <Text style={styles.text}>(7)其他违反《广告法》、《反不正当竞争法》、《电子商务法》等法律法规或公序良俗的行为。</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>（二）不得发布违法信息</Text>
        <Text style={styles.text}>用户帐号头像、昵称、个性签名等注册信息和认证资料及用户在平台上传、发布、传输的所有文字、图片、视频、音频均不得含有违背国家法律法规政策和社会公序良俗、危害国家及社会公共利益、侵犯第三方合法权益、干扰平台正常运营的内容。</Text>
        <Text style={styles.text}>(1)违反、反对宪法确定的基本原则的；</Text>
        <Text style={styles.text}>(2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</Text>
        <Text style={styles.text}>(3)损害国家荣誉和利益的；</Text>
        <Text style={styles.text}>(4)煽动民族仇恨、民族歧视、破坏民族团结的；</Text>
        <Text style={styles.text}>(5)破坏国家宗教政策，宣扬邪教和封建迷信的；</Text>
        <Text style={styles.text}>(6)散布谣言，扰乱社会秩序，破坏社会稳定的；</Text>
        <Text style={styles.text}>(7)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</Text>
        <Text style={styles.text}>(8)歪曲、丑化、亵渎、否定英雄烈士事迹和精神的；</Text>
        <Text style={styles.text}>(9)侮辱、诽谤或者其他方式侵害国家领导人、英雄烈士的姓名、肖像、名誉、荣誉的；</Text>
        <Text style={styles.text}>(10)直接或间接散布淫秽色情或性暗示内容的，包括但不限于：</Text>
        <Text style={styles.text}>①　表现或描述性行为，暴露或描写人体性器官、隐私部位的；</Text>
        <Text style={styles.text}>②　发布带有淫秽、性暗示、性挑逗内容的；</Text>
        <Text style={styles.text}>③　发布色情低俗小说、色情音视频内容、色情播放链接及色情平台场所的；</Text>
        <Text style={styles.text}>④　发布裸聊、一夜情、换妻、SM等不正当交友信息或色情服务交易信息的；</Text>
        <Text style={styles.text}>(11)宣扬暴力、凶杀、血腥、恐怖、黑社会、教唆犯罪的，包括但不限于：</Text>
        <Text style={styles.text}>①　传播人或动物自虐、自残、自杀、被杀、枪击、刺伤、拷打等令人不适的内容的；</Text>
        <Text style={styles.text}>②　传播诱导他人自虐、自残、自杀或教唆传授他人犯罪等内容的；</Text>
        <Text style={styles.text}>③　传播吸食注射毒品或违禁药品等令人不适的画面内容的；</Text>
        <Text style={styles.text}>④　传播销售仿真枪、弓箭、管制刀具、气枪等含有杀伤力武器内容的；</Text>
        <Text style={styles.text}>⑤　传播以鼓励非法或不当方式使用为目的而描述真实武器内容的。</Text>
        <Text style={styles.text}>⑥　传播替人复仇、收账等具有黑社会性质的信息；</Text>
        <Text style={styles.text}>⑦　雇佣、引诱、传授他人从事恐怖、暴力活动的；</Text>
        <Text style={styles.text}>⑧　其他宣扬暴力、凶杀、血腥、恐怖、黑社会、教唆犯罪内容。</Text>
        <Text style={styles.text}>(12)散布虚假诈骗信息骗取他人信息或财物的，包括但不限于：</Text>
        <Text style={styles.text}>①　通过发布虚假刷单、虚假兼职、票务、中奖信息、钓鱼网站等方式骗取他人钱财的；</Text>
        <Text style={styles.text}>②　通过冒充亲友或以组织活动名义等方式骗取他人个人信息的；</Text>
        <Text style={styles.text}>③　组织、宣传、诱导用户加入传销（或有传销嫌疑）机构或其他非法组织的。</Text>
        <Text style={styles.text}>(13)发布胁迫或诱使他人参与赌博、介绍传授赌博技巧方法、出售赌博器具等宣扬赌博内容的；</Text>
        <Text style={styles.text}>(14)将犯罪或其他违法所得及其产生的收益，在平台内以各种手段掩饰、隐瞒资金的来源和性质，使其在形式上合法化的洗钱行为；</Text>
        <Text style={styles.text}>(15)传播买卖发票、假烟、假币、赃物、走私物品、象牙或虎骨等野生动物制品、毒品、窃听器、军火、人体器官、迷药、国家机密等非法物品内容的；</Text>
        <Text style={styles.text}>(16)传播违法办证刻章、代办身份证、护照、港澳通行证、结婚证、户口本、学历学位证明等证件等内容的；</Text>
        <Text style={styles.text}>(17)传播违法违规办理信用卡、信用卡套现、公积金套现、医保卡套现、手机复制卡等内容的；</Text>
        <Text style={styles.text}>(18)煽动人群歧视、地域歧视等的；</Text>
        <Text style={styles.text}>(19)宣扬低俗、庸俗、媚俗内容的；</Text>
        <Text style={styles.text}>(20)可能引发未成年人模仿不安全行为和违反社会公德行为、诱导未成年人不良嗜好等的；</Text>
        <Text style={styles.text}>(21)炒作绯闻、丑闻、劣迹等的；</Text>
        <Text style={styles.text}>(22)使用夸张标题，内容与标题严重不符的；</Text>
        <Text style={styles.text}>(23)不当评述自然灾害、重大事故等灾难的；</Text>
        <Text style={styles.text}>(24)法律、行政法规限制或禁止的其他内容、违反公序良俗或影响平台正常经营管理的内容（例如伪造虚假交易刷单、虚假评价等）。</Text>
        <Text style={styles.text}>（三）不得发布其他侵权信息</Text>
        <Text style={styles.text}>不得发布侵害第三方合法权益或违反国家法律法规、公序良俗的信息或作出相关行为。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>【行为规范】</Text>
        <Text style={styles.text}>(一)主播</Text>
        <Text style={styles.text}>1.不得违规推广，如推广的商品涉嫌出售假冒商品、主播违反法律法规等:</Text>
        <Text style={styles.text}>2.不得存在易导致交易风险的行为，如公布微信号引导用户进行线下交易、发布外部网站的商品或信息等:</Text>
        <Text style={styles.text}>3.不得侵犯他人权益，如泄露他人信息、不当使用他人权利、骚扰他人等:</Text>
        <Text style={styles.text}>4.不得扰乱平台秩序，如进行造假或作弊、提供虛假信息等;</Text>
        <Text style={styles.text}>5.不得违背承诺:</Text>
        <Text style={styles.text}>6.直播信息不得与入驻信息不符:</Text>
        <Text style={styles.text}>7.不得违反云闪播直播平台主播要求。</Text>
        <Text style={styles.text}>8.不得违反平台规则或其他有违公序良俗行为。</Text>
        <Text style={styles.text}>9.不得诱导未成年人进行超出其识别范围的消费。</Text>
        <Text style={styles.text}>(二)互动参与用户</Text>
        <Text style={styles.text}>1.不得侵犯他人权益，如泄露他人信息、不当使用他人权利、骚扰他人等:</Text>
        <Text style={styles.text}>2.不得在直播间发布微信号及其他联系方式。</Text>
        <Text style={styles.text}>3.不得扰乱平台秩序。</Text>
        <Text style={styles.text}>4.不得在平台互动或直播中提及或暗示其他平台。</Text>
      </View>

       <View style={styles.section}>
        <Text style={styles.title}>【违规处理】</Text>
        <Text style={styles.text}>(一)主播：违反本规则，云闪播直播平台可采取警告并下线直播、删除直播内容、冻结直播权限、清退账户等措施。</Text>
        <Text style={styles.text}>(二)互动参与用户：违反本规则，云闪播直播平台可采取删除违规信息、暂停云闪播直播评论功能、关闭云闪播直播评论功能等措施。具体违规内容及对应违规处理措施详见违规管理办法一览表。</Text>
      </View>
      
       <View style={styles.section}>
        <Text style={styles.title}>【清退】</Text>
        <Text style={styles.text}>主播如出现以下任一情形，将被云闪播直播平台清退: </Text>
        <Text style={styles.text}>(一)不再符合本规则第二条准入条件；</Text>
        <Text style={styles.text}>(二)存在违规管理办法一览表中被清退情形；</Text>
        <Text style={styles.text}>(三)违反国家法律规定或存在违背社会公德行为或其他损害平台利益的情况。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>【清退再入驻】</Text>
        <Text style={styles.text}>(一)因第六条第(一) 项被清退的，可重新申请入驻</Text>
        <Text style={styles.text}>(二)因第六条第(二) 项被清退的，依据违规管理办法一览表[未见此表。]的规定执行:</Text>
        <Text style={styles.text}>(三)因第六条第(三) 项被清退的，不允许再入驻。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>【生效时间】</Text>
        <Text style={styles.text}>本规则于2020年5月15日生效。</Text>
        <Text style={styles.text}></Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: pxToDp(20),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(50),
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

export default withPage(ServiceAgreement)