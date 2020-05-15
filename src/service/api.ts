
import { get, post, upload, liveUpload, File, uploadWorkMedia } from './fetch'

// const HOST_PHP = __DEV__ ? 'https://php.quanpinrtmp.com' : ''
// const HOST_JAVA = __DEV__ ? 'https://java.quanpinrtmp.com' : ''

const HOST_PHP = __DEV__ ? 'http://129.211.138.215' : ''
const HOST_JAVA = __DEV__ ? 'http://129.211.138.215:7000' : ''
const SHANDE_HOST_JAVA = __DEV__ ? 'http://129.211.104.84:7001' : ''

// http://129.211.138.215/

// 文件上传路径 ==================================================================
export const UPLOAD_URL = `${HOST_JAVA}/find/uploadFile`

/**
 * PHP 接口 ==================================================================
 */
// 获取首页数据
export const apiGetIndexData = () => get(`${HOST_PHP}/mobile/index/index`)
// 首页圈重点商品列表
export const apiGetIndexGoodsList = (data: { pageNo: number; pageSize: number }) => get(`${HOST_PHP}/mobile/index/ajaxGetMore`, data)
// 产业带
export const apiGetBeltList = (data: any) => get(`${HOST_PHP}/mobile/index/getBeltGoods`, data)
// 商品分类标签
export const apiGetClassifyList = () => get(`${HOST_PHP}/mobile/goods/categorylist`)
// 分类商品
export const apiGetClassifyGoodsList = (data: any) => get(`${HOST_PHP}/mobile/goods/ajaxGetMore`, data)
// 品牌店铺列表
export const apiBrandList = (data: any) => get(`${HOST_PHP}/mobile/brand/index`, data)
// 关注/取消关注 品牌店铺
export const apiAttentionBrand = (data: any) => get(`${HOST_PHP}/mobile/brand/attention`, data)
// 品牌店铺详情
export const apiBrandInfo = (data: any) => get(`${HOST_PHP}/mobile/brand/brandCategory`, data)
// 品牌店铺商品列表
export const apiBrandGoodsList = (data: any) => get(`${HOST_PHP}/mobile/brand/brandCategoryGoods`,  data)
// 特卖专区
export const apiSaleList = (data: any) => get(`${HOST_PHP}/mobile/goods/saleList`, data)
// 抢购
export const apiSnapList = (data: any) => get(`${HOST_PHP}/mobile/goods/snapupList`, data)
// 秒杀
export const apiSeckillList = (data: any) => get(`${HOST_PHP}/mobile/index/seckillList`, data)
// 商品详情
export const apiGoodInfo = (data: any) => get(`${HOST_PHP}/mobile/goods/goodsInfo`, data)
// 精选好物标签
export const apiSelectGoodsTags = () => get(`${HOST_PHP}/mobile/index/jxhtCategory`)
// 精选好物列表
export const apiSelectGoodsList = (data: any) => get(`${HOST_PHP}/mobile/index/ajaxGetJxhw`, data)
// 好物详情
export const apiSelectGoodsInfo = (data: any) => get(`${HOST_PHP}/mobile/index/jxhwInfoOne`, data)
// 喜欢 || 取消喜欢 好物
export const apiGoodsIsLike = (data: any) => get(`${HOST_PHP}/mobile/goods/goodsLike`, data) 
// 添加地址
export const apiAddAddr = (data: any) => post(`${HOST_PHP}/mobile/user_address/add_address`, data)
// 地址列表
export const apiAddrList = () => get(`${HOST_PHP}/mobile/user_address/index`)
// 删除地址
export const apiDelAddr = (data: any) => get(`${HOST_PHP}/mobile/user_address/delete_address`, data)
// 修改地址
export const apiEditAddr = (data: any) => post(`${HOST_PHP}/mobile/user_address/edit_address`, data)
// 加入购物车
export const apiAddCart = (data: any) => get(`${HOST_PHP}/mobile/cart/addCart`, data)
// 购物车列表
export const apiCartList = () => get(`${HOST_PHP}/mobile/cart/index`)
// 从购物车删除
export const apiDelCartItem = (data: any) => get(`${HOST_PHP}/mobile/cart/delCart/`, data)
// 购物车发生改变
export const apiChangeCart = (data: any) => post(`${HOST_PHP}/mobile/cart/changeUserCart`, data)
// 获取添加商品列表
export const apiAddGoods = () => get(`${HOST_PHP}/mobile/goods/addGoods`)
// 添加商品的搜索页面
export const apiSearchAddGoods = (data: any) => get(`${HOST_PHP}/mobile/goods/addGoods`, data)
// 首页搜索
export const apiSearch = (data: any) => get(`${HOST_PHP}/mobile/Goods/getGoodsList`, data)
// 我的收藏
export const apiGetEnshrine = (data: any) => get(`${HOST_PHP}/mobile/goods/getEnshrine`, data)
// 我关注的店铺
export const apiGetAttention = (data: any) => get(`${HOST_PHP}/mobile/brand/getAttention`, data)
// 会员详情
export const apiGetUserLevelInfo = () => get(`${HOST_PHP}/mobile/mine/userLevel`)

/**
 * JAVA 接口 ==================================================================
 */
// 获取 token
export const apiGetToken = (data: any) => post(`${HOST_JAVA}/miniApp/login`, data)
// 发送验证码
export const apiSendVerCode = (data: any) => get(`${HOST_JAVA}/user/sendAppMessage`, data)
// 检测用户是否绑定过邀请码
export const apiCheckIsInvite = () => get(`${HOST_JAVA}/miniApp/isInvite`)
// 更新用户信息
export const apiUpdateUserInfo = (data: any) => post(`${HOST_JAVA}/miniApp/updateUserInfo`, data)
// 注册 & 登录
export const apiLogin = (data: any) => post(`${HOST_JAVA}/user/appRegisterOrLogin`, data)
// 我的页面
export const apiGetUserData = () => get(`${HOST_JAVA}/user/getUserInfo`)
// 发现模块 => 新视界获取作品
export const apiGetWorks = (data: any) => post(`${HOST_JAVA}/find/getWorks`, data)
// 获取发现详情
export const apiGetWorksDetailInfo = (data: any) => post(`${HOST_JAVA}/find/getWorksDetailInfo`, data)
// 查询优惠金额 （预生成订单）
export const apiGetSellerDiscount = (data: any) => post(`${HOST_JAVA}/order/getSellerDiscount`, data) 
// 发布作品
export const apiPublishWorks = (data: any) => post(`${HOST_JAVA}/find/publishWorks`, data)
// 关注/取消关注作品
export const apiFollowWorks = (data: any) => post(`${HOST_JAVA}/find/followWorks`, data)
// 发布作品评论
export const apiPublishWorksComment = (data: any) => post(`${HOST_JAVA}/find/publishWorksComment`, data)
// 发布作品评论回复
export const apiPublishWorksReply = (data: any) => post(`${HOST_JAVA}/find/publishWorksReply`, data)
// 获取作品评论更多回复
export const apiGetMoreReply = (data: any) => post(`${HOST_JAVA}/find/getMoreReply`, data)
// 获取作品更多评论
export const  apiGetMoreComment = (data: any) => post(`${HOST_JAVA}/find/getMoreComment`, data)
// 发现模块搜索
export const apiSearchWork = (data: any) => post(`${HOST_JAVA}/find/searchWorks`, data)
// 创建订单
export const apiCreateOrder = (data: any) => post(`${HOST_JAVA}/order/create`, data, false)
// 获取订单列表
export const apiGetOrderList = (data: any) => get(`${HOST_JAVA}/order/getOrderList`, data)
// 获取订单数量
export const apiGetOrderCount = () => get(`${HOST_JAVA}/order/getOrderCountStatistics`)
// 取消订单
export const apiCancelOrder = (data: any) => get(`${HOST_JAVA}/order/cancelOrder`, data)
 // 确认收货
export const apiConfirmReceiveGoods = (data: any) => get(`${HOST_JAVA}/order/confirmReceiveGoods`, data)
// 订单发起支付
export const apiPayOrder = (data: any) => get(`${HOST_JAVA}/order/payOrder`, data, false)
// 提醒发货
export const apiReminderDeliverGoods = (data: any) => get(`${HOST_JAVA}/order/reminderDeliverGoods`, data)
// 延长收货
export const apiExtendReceiveGoods = (data: any) => get(`${HOST_JAVA}/order/extendReceiveGoods`, data)
// 获取订单详情
export const apiGetOrderDetail = (data: any) => get(`${HOST_JAVA}/order/getOrderDetail`, data)
// 获取充值信息
export const apiGetRechargeInfo = (data: any) => get(`${HOST_JAVA}/miniApp/getRechargeInfo`, data)
// 查询邮费
export const apiGetCalCarriage = (data: any) => post(`${HOST_JAVA}/order/calCarriage`, data)
// 查询未使用的优惠券
export const apiGetCouponList = () => get(`${HOST_JAVA}/coupons/unusedList`)
// 获取可领取优惠券列表
export const apiGetUnclaimedCoupons = (data: any) => get(`${HOST_JAVA}/coupons/couponsList`, data)
// 领取优惠券
export const apiGetCoupon = (data: any) => get(`${HOST_JAVA}/coupons/getCoupins`, data)
// 获取我喜欢的内容
export const apiGetUserFavorite = (data: any) => post(`${HOST_JAVA}/user/getUserFavorite`, data)
// 发现详情 点赞
export const apiGiveLaud = (data: any) => post(`${HOST_JAVA}/find/giveLaud`, data)
// 我的作品
export const apiGetUserWorks = (data: any) => post(`${HOST_JAVA}/user/getUserWorksInfo`, data)
// 管理我的作品
export const apiWorksManage = (data: any) => post(`${HOST_JAVA}/user/userWorksManage`, data)
// 查询商品的优惠相关信息
export const apiGetOrderDiscountDetail = (data: any) => post(`${HOST_JAVA}/order/getOrderDiscountDetail`, data)
// 提交售后申请
export const apiCreateReturnOrder = (data: any) => post(`${HOST_JAVA}/order/createReturnGoods`, data)
// 售后订单详情
export const apiReturnOrderDetail = (data: any) => get(`${HOST_JAVA}/order/getAfterSalesDetail`, data)
// 售后订单列表
export const apiGetReturnOrderList = (data: any) => get(`${HOST_JAVA}/order/getAfterSalesList`, data)
// 取消售后申请
export const apiCancelReturnOrder = (data: any) => get(`${HOST_JAVA}/order/cancelAfterSalesApply`, data)
// 卖家售后发货
export const apiBuyerDeliverGoods = (data: any) => post(`${HOST_JAVA}/order/buyerDeliverGoods`, data)
// 获取售后发货支持的快递列表
export const apiGetShippingList = () => get(`${HOST_JAVA}/order/getShippingList`)
// 解密
export const apiDecryptData = (data: any) => post(`${HOST_JAVA}/miniApp/decryptData`, data)
// 注册
export const apiRegister = (data: any) => post(`${HOST_JAVA}/user/register`, data)
// 退出
export const apiLogout = (data: any) => get(`${HOST_JAVA}/user/logout`, data)
// 查看物流
export const apiQueryExpress = (data: any) => get(`${HOST_JAVA}/order/queryExpress`, data)
// 分享生成图片
export const apiCreatePoster = (data: any) => get(`${HOST_JAVA}/userLive/userGoodsShare`, data)
// 发布作品 上传文件
export const apiWorkUpload = (data: any) => uploadWorkMedia(`${HOST_JAVA}/find/uploadFile`, data)

// 杉德支付
export const apiSandCreateOrder = (data: any) => post(`${SHANDE_HOST_JAVA}/sandpay/createOrder`, data, false)


/*
 * 主播相关接口 ==========================================================================================
 */
// 成为主播
export const apiAddAnchorUser = (data: any) => get(`${HOST_JAVA}/anchor/addAnchorUser`, data, false)
// 主播添加商品到主播店铺
export const apiAddAnchorGoods = (data: any) => post(`${HOST_JAVA}/anchor/addAnchorGoods`, data)
// 主播添加商品到主播预组货
export const apiAddGroupGoods = (data: any) => post(`${HOST_JAVA}/anchor/addGroupGoods`, data)
// 开播后确认是否存在直播封面
export const apiAffirmCover = (data: any) => post(`${HOST_JAVA}/anchor/affirmCover`, data)
// 直播重新组货
export const apiAnewAddLiveGoods = (data: any) => post(`${HOST_JAVA}/anchor/anewAddLiveGoods`, data)
// 新增或修改寄回地址
export const apiAuReturnedAddress = (data: any) => post(`${HOST_JAVA}/anchor/auReturnedAddress`, data)
// 主播删除预组货商品
export const apiDelGroupGoods = (data: any) => post(`${HOST_JAVA}/anchor/delGroupGoods`, data)
// 删除主播直播回放
export const apiDelLivePlayback = (data: any) => post(`${HOST_JAVA}/anchor/delLivePlayback`, data)
// 删除寄回地址
export const apiDelReturnedAddress = (data: any) => post(`${HOST_JAVA}/anchor/delReturnedAddress`, data)
// 我的预告列表
export const apiGetAdvanceList = (data: any) => post(`${HOST_JAVA}/anchor/getAdvanceList`, data)
// 主播预组货(店铺)添加商品品牌商品列表
export const apiGetBrandGoodsList = (data: any) => post(`${HOST_JAVA}/anchor/getBrandGoodsList`, data)
// 主播添加预组货分类品牌数据
export const apiGetCatBrandAll = (data: any) => get(`${HOST_JAVA}/anchor/getCatBrandAll`, data, false)
// 主播预组货(店铺)商品列表
export const apiGetGroupGoods = (data: any) => post(`${HOST_JAVA}/anchor/getGroupGoods`, data)
// 主播直播数据列表
export const apiGetLiveDataList = (data: any) => post(`${HOST_JAVA}/anchor/getLiveDataList`, data)
// 我的直播列表
export const apiGetLiveList = (data: any) => post(`${HOST_JAVA}/anchor/getLiveList`, data)
// 分页查询寄回地址列表
export const apiGetReturnAddressList = (data: any) => post(`${HOST_JAVA}/anchor/getReturnAddressList`, data)
// 主播消息通知列表
export const apiGetUserChatList = (data: any) => post(`${HOST_JAVA}/anchor/getUserChatList`, data)
// 主播我的主页信息
export const apiAnchorHomePage = (data: any) => get(`${HOST_JAVA}/anchor/HomePage`, data)
// 直播上传文件
export const apiLiveUploadFile = (file: File) => liveUpload(`${HOST_JAVA}/anchor/liveUploadFile`, file)
// 直播发布预告
export const apiReleaseNotice= (data: any) => post(`${HOST_JAVA}/anchor/releaseNotice`, data)
// 直播间商品管理数据列表
export const apiSelLiveGoods= (data: any) => post(`${HOST_JAVA}/anchor/selLiveGoods`, data)
// 准时开播页面展示数据
export const apiSelStartLive= (data: any) => post(`${HOST_JAVA}/anchor/selStartLive`, data)
// 选择商品开始直播
export const apiStartLive= (data: any) => post(`${HOST_JAVA}/anchor/startLive`, data)
// 结束直播
export const apiCloseLive= (data: any) => post(`${HOST_JAVA}/anchor/closeLive`, data)



/**
 * 用户直播相关接口 (观看端) ==============================================================
 */
// 添加订单的直播间id
export const apiAddOrderLiveId = (data: any) => get(`${HOST_JAVA}/userLive/addOrderLiveId`, data)
// 主播页详情
export const apiAnchorParticular = (data: any) => get(`${HOST_JAVA}/userLive/anchorParticular`, data)
// 关注/取关主播
export const apiAttentionAnchor = (data: any) => post(`${HOST_JAVA}/userLive/attentionAnchor`, data)
// 点击进入直播间
export const apiEnterLive = (data: any) => get(`${HOST_JAVA}/userLive/enterLive`, data)
// 获取精选/关注直播列表
export const apiGetLiveStreamList = (data: any) => post(`${HOST_JAVA}/userLive/getLiveStreamList`, data)
// 直播间点亮红心
export const apiLiveLike = (data: any) => get(`${HOST_JAVA}/userLive/liveLike`, data)
// 我的关注列表
export const apiMyAttentionList = (data: any) => get(`${HOST_JAVA}/userLive/myAttentionList`, data)
// 搜索直播列表
export const apiSearchLiveStreamList = (data: any) => get(`${HOST_JAVA}/userLive/searchLiveStreamList`, data)
// 直播间的购物袋
export const apiShoppingBag = (data: any) => get(`${HOST_JAVA}/userLive/shoppingBag`, data)
// 用户直播列表轮播图
export const apiUserLiveBanner = () => post(`${HOST_JAVA}/userLive/userLiveBanner`)
// 上传用户头像本地base64
export const apiUploadFile = (data: any) => post(`${HOST_JAVA}/user/uploadFile`, data)
