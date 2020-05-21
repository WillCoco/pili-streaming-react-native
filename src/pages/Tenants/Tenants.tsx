import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/Theme'
import pxToDp from '../../utils/px2dp'
import withPage from '../../components/HOCs/withPage'

function Tenants(props: any) {
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: '云闪播用户协议',
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
        <Text style={styles.text}>欢迎您与云闪播平台经营者（详见定义条款）共同签署本《云闪播用户协议》（下称“本协议”）并使用云闪播平台服务！</Text>
        <Text style={styles.text}>各服务条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}><Text style={styles.boldText}>【审慎阅读】</Text>您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。如您对协议有任何疑问，可向云闪播平台客服咨询。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}><Text style={styles.boldText}>【签约动作】</Text>当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与云闪播达成一致，成为云闪播平台“用户”。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>定义</Text>
        <Text style={styles.text}><Text style={styles.boldText}>云闪播平台：</Text>指包括由宁波名世网络科技有限公司运营的云闪播（域名为【yunshanbo.cn】）等网站及手机APP客户端。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>云闪播平台经营者：</Text>宁波名世网络科技有限公司，以下简称甲方。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>您：</Text>指浏览并拟签署本协议的自然人或商事主体，以下简称乙方。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>云闪播服务：</Text>云闪播基于互联网，以甲方手机APP客户端形态（包括未来科技发展出现的新的服务形态）向乙方提供的各项服务。</Text>
        <Text style={styles.text}><Text style={styles.boldText}>云闪播平台规则：</Text>包括所在所有甲方已经发布及后续发布的全部规则、解读、公告等内容以及各平台在论坛、帮助中心内发布的各类规则、实施细则、产品流程说明、公告等。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>附则：甲方交易规则</Text>
        <Text style={styles.title}>一、 注册</Text>
        <Text style={styles.text}>1.1乙方应当严格遵循甲方系统设置的注册流程完成注册。</Text>
        <Text style={styles.text}>1.2乙方在选择其云闪播平台用户名时应遵守国家法律法规,不得包含违法、 涉嫌侵犯他人权利、 有违公序良俗或干扰云闪播运营秩序等相关信息。 乙方的用户名、店铺名中不得包含官方、旗舰、专卖等易导致消费者误解的词语。</Text>
        <Text style={styles.text}>1.3乙方用户名注册后可自行修改。</Text>
        <Text style={styles.text}>1.4甲方有权回收同时符台以下条件的不活跃账户</Text>
        <Text style={styles.text}>1.连续六个月未登录云闪播平台;2.不存在未到期的有效业务</Text>
     
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>二丶注册前置要求</Text>
        <Text style={styles.text}>2.1用户资格</Text>
        <Text style={styles.text}>乙方确认, 在乙方开始注册程序使用甲方服务前, 乙方应当具备中华人民共和国法律规定的与乙方行为相适应的民事行为能力。 若乙方不具备前述与乙方行为相适应的民事行为能力,乙方及乙方的监护人应依照法律规定承担因此而导致的一切后果。此外,乙方还需确保乙方不是任何国家、 国际组织或者地域实施的贸易限制、制裁或其他法律、规则限制的对象,否则乙方可能无法正常注册及使用甲方服务。</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>2.2账户说明</Text>
        <Text style={styles.text}>【账户获得】当乙方按照注册页面提示填写信息、 阅读并同意本协议且完成全部注册程序后, 乙方可获得甲方账户并成为甲方用户。</Text>
        <Text style={styles.text}>甲方只允许每位手机用户使用一个甲方账户。 如有证据证明或甲方根据甲方规则判断乙方存在不当注册或不当使用多个甲方账户的情形, 甲方可采取冻结或关闭账户、 取消订单、 拒绝提供服务等措施, 如给甲方及相关方造成损失的, 乙方还应承担赔偿责任。</Text>
        <Text style={styles.text}>【账户使用】 乙方有权使用乙方设置或确认的用户名、 手机号码(以下简称“账户名称")及乙方设置的密码(账户名称及密码合称“账户”)登录云闪播平台。</Text>
        <Text style={styles.text}>由于乙方的云闪播平台账户关联乙方的个人信息及甲方商业信息，乙方的云闪播平台账户仅限乙方本人使用。未经甲方同意,乙方直接或间接授权第三方使用乙方云闪播平台账户或获取乙方账户项下信息的行为无效。如甲方根据甲方规则中约定的违约认定程序及标准判断乙方云闪播账户的使用可能危及乙方的账户安全及/或甲方信息安全的,甲方可拒绝提供相应服务或终止本协议。</Text>
        <Text style={styles.text}>【实名认证】作为云闪播平台服务提供商,为使乙方更好地使用甲方的备项服务,保障乙方的账户安全,甲方可要求乙方按甲方公司要求及我国法律规定完成实名认证。</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>2.3注册信息管理</Text>
        <Text style={styles.text}>2.3.1【信息真实】在使用甲方服务时,乙方应当按甲方页面的提示准确完整地提供乙方的信息(包括乙方的姓名及电子邮件地址、联系电话、联系地址等),以便甲方或其他用户与乙方联系。乙方了解并同意,乙方有义务保持乙方提供信息的真实性及有效性。</Text>
        <Text style={styles.text}>【用户名的台法性】乙方设置的云闪播平台用户名不得违反国家法律法规及甲方规则关于用户名的管理规定,否则甲方可回收乙方的云闪播平台用户名。云闪播平台用户名的回收不影晌乙方以邮箱、手机号码登录云闪播平台并使用甲方服务。</Text>
        <Text style={styles.text}>2.3.2乙方应当及时更新乙方提供的信息，在法律有明确规定要求甲方作为平台服务提供者必须对部分用户的信息进行核实的情况下,甲方将依法不时地对乙方的信息进行检查，如甲方根据乙方最后一次提供的信息与乙方联系未果、乙方未按甲方的要求及时提供信息丶乙方提供的信息存在明显不实或行政司法机关核实乙方提供的信息无效的,乙方将承担因此对乙方自身、他人及甲方造成的全部损失与不利后果。甲方可向乙方发出询问或要求整改的通知,并要求乙方进行重新认证,直至中止丶终止对乙方提供部分或全部甲方服务,甲方对此不承担责任。</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>2.4账户安全</Text>
        <Text style={styles.text}>2.4 1【账户安全保菅义务】乙方的账户为乙方自行设置并由乙方保管,甲方任何时候均不会主动要求乙方提供乙方的账户密码。 因此, 建议乙方务必保管好乙方的账户, 并确保乙方在每个上网时段结束时退出登录并以正确步骤离开甲方。账户因乙方主动泄露或因乙方遭受他人攻击丶 诈骗等行为导致的损失及后果, 甲方并不承担责任, 乙方应通过司法、 行政等救济途径向侵权行为人追偿。</Text>
        <Text style={styles.text}>2.4 2【账户行为责任自负】 除甲方存在过错外, 乙方应对乙方账户下的所有行为结果(包括但不限于在线签署各类协议、 发布信息、 购买商品及服务及披露信息等)负责。</Text>
        <Text style={styles.text}>2.4 3【禁止行为】 云闪播所售商品不得在非云闪播平台以云闪播名义或低于云闪播价格出售商品，服务。 针对违反规定的店主, 云闪播有权关闭其店铺，如因此造成甲方损失的，云闪播有权冻结店铺收益，要求店主赔偿。</Text>
        <Text style={styles.text}>2.4 4【日常维护须知】 如发现任何可未经授权使用乙方账户登录甲方或其他可能导致乙方账户遭窃、 遗失的情况, 建议乙方立即通知甲方。 乙方理解甲方对乙方的任何请求采取行动均需要合理时间, 且甲方应乙方请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大, 除甲方存在法定过错外, 甲方不承担责任。</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>2.5 店铺创建及经营</Text>
        <Text style={styles.text}>甲方用户须符台以下条件, 方可按照甲方系统设置的流程创建店铺</Text>
        <Text style={styles.text}>(一)通过甲方负责人身份认证丶提供甲方负责人本人真实有效的信息及甲方营业执照;[需商事主体。]</Text>
        <Text style={styles.text}>(二)符合甲方对开店负责人的年龄要求;</Text>
        <Text style={styles.text}>(三)经甲方排查认定, 该账户实际控制人的其他甲方账户未被甲方处以特定严重违规行为处罚或发生过严重危及交易安全的情形。</Text>
        <Text style={styles.text}>(四)商品销售需行政审批、备案的，店铺主体已取得相应资质。</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>2.6已创建的店铺若连续5周出售中的商品数量均为零, 甲方有权将该店铺注销。</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>2.7乙方应当按照甲方系统设置的流程和要求发布商品。</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>2.8商品如实描述及对其所售商品质量承担保证责任是店主的基本义务。 “商品如实描述”是指乙方在商品描述页面、 店铺页面等所有甲方提供的渠道等应当对商品的基本属性、 成色丶 材质、质量、规格、重量、保质期、瑕疵等必须说明的信息进行真实、 完整的描述。</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>2.9乙方应保证其出售的商品在合理期限内可以正常使用, 包括商品不存在危及人身财产安全的不合理危险、 具备商品应当具备的使用性能、 符合商品或其包装上注明采用的标准等，符合法律法规规定与平台规则要求。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>三、 交易内容</Text>
        <Text style={styles.text}>3.1乙方在甲方平台成功注册店铺后, 乙方可使用甲方平台发布商品信息, 与愿意购买乙方商品的其他用户进行交流, 自行与其他用户达成交易, 相关销售收入由乙方所有。</Text>
        <Text style={styles.text}>3.2乙方自行选择甲方甄选的商品上架, 并向甲方指定的供应公司采购(含云闪播平台内的关联供应链公司及云闪播平台的非关联供应链公司)。[模式需要了解。]</Text>
        <Text style={styles.text}>3.3乙方销售商品及服务出现争议、 纠纷、 国家机关机构调查时, 乙方作为实际商品销售者应及时进行处理。</Text>
        <Text style={styles.text}>3.4甲方向乙方收取服务费, 并向乙方提供技术服务, 服务费收费标准为最终店主税前销售额的2%, 该标准会视市场情况和经营状况以及具体产品情况不定期进行调整，调整后如乙方点击确认公告或继续使用甲方提供的服务，视为同意调整。</Text>
        <Text style={styles.text}>3.5乙方与最终消费者达成销售后, 甲乙双方委托银行或有资质的第三方电子支付机构作为整个交易模式中各方都信任的清算中心, 协助各方清分各方应得的收入。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>四 、评价</Text>
        <Text style={styles.text}>4.1买卖双方有权基于真实的交易在交易成功后进行相互评价。</Text>
        <Text style={styles.text}>4.2为了确保评价体系的公正性、 害观性和真实性, 甲方将基于有限的技术手段, 对违规交易评价、 恶意评价、 不当评价、 异常评价等破环云闪播信用评价体系、 侵犯消费者知情权的行为予以坚决打击, 包括但不限于屏蔽评论内容、 删除评价、 评价不计分、 限制评价等市场管理措施。
异常评价等破环云闪播信用评价体系、 侵犯消费者知情权的行为予以坚决打击, 包括但不限于屏蔽评论内容、 删除评价、 评价 不计分、 限制评价等市场管理措施。</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>五、 交易争议处理</Text>
        <Text style={styles.text}>5.1【交易争议处理途径】 乙方在交易过程中与其他用户</Text>
        <Text style={styles.text}>发生争议的, 乙方或其他用户中任何一方均有权选择以下途径解决:</Text>
        <Text style={styles.text}>(1)与争议相对方自主协商;</Text>
        <Text style={styles.text}>(2)使用云闪播平台提供的争议调处服务;</Text>
        <Text style={styles.text}>(3)请求消费者协会或者其他依法成立的调解组织调解;</Text>
        <Text style={styles.text}>(4)向有关行政部门投诉;</Text>
        <Text style={styles.text}>(5)根据与争议相对方达成的仲裁协议(如有) 提请仲裁机构仲裁;</Text>
        <Text style={styles.text}>(6)向人民法院提起诉讼。</Text>
        <Text style={styles.text}>5.2 【平台调处服务】 如双方根据云闪播平台规则使用平台争议调处服务, 则表示双方认可并愿意履行云闪播的可服作为独立的第三方根据其所了解到的争议事实并依据云闪播平台规则所作出的调处决定(包括调整相关订单的交易状态、判定将争议款项的全部或部分支付给交易一方或双方等)。在云闪播调处决定作出前, 双方(任意一 方)可选择上述(三)丶(四)丶 (五) 丶 (六) 途径(下称“其他争议处理途径”)解决争议以中止云闪播的争议调处服务。 如双方或任意一方对调处决定不满意, 双方或任意一方仍有权采取其他争议处理途径解决争议, 但通过其他争议处理途径未取得终局决定前,双方仍应先履行调处决定。</Text>
        <Text style={styles.text}>5.3 【调处决定】 双方理解并同意, 在争议调处服务中，云闪播的客服并非专业人士, 仅能以普通人的认知对双方提交的凭证进行判断。因此，除存在的故意或重大过失外，调处方对争议调处决定免责。</Text>
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

export default withPage(Tenants)