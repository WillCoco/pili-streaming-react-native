import { IS_LOGIN, TOKEN, SET_USER_INFO } from '../constants/User'

interface UserInfo {
  accountMoney: number
  anchorCount: number
  card: number
  collectionCount: number
  consumeMoney: number
  fansCount: number
  frozenMoney: number
  hasSettle: number
  inviteCode: string
  likeContent: number
  lookCount: number
  needMoney: number
  nextLevel: string
  nickName: string
  publishCount: number
  quanPinMoney: number
  saveMoney: number
  storeFollow: number
  totalProfit: number
  userAvatar: string
  userId: string
  userLevel: string
  willSettle: number
}

const INITIAL_STATE = {
  isLogin: false,
  token: '',
  userInfo: {
    accountMoney: 0,
    anchorCount: 0,
    bgc: '',
    card: 0,
    collectionCount: 0,
    consumeMoney: 0,
    fansCount: 0,
    frozenMoney: 0,
    hasSettle: 0,
    inviteCode: '',
    likeContent: 0,
    lookCount: 0,
    needMoney: 0,
    nextLevel: '',
    nickName: '',
    publishCount: 0,
    quanPinMoney: 0,
    saveMoney: 0,
    storeFollow: 0,
    totalProfit: 0,
    userAvatar: '',
    userId: '',
    userLevel: '',
    willSettle: 0,
  }
}

export default function publicData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case IS_LOGIN:
      return { ...state, isLogin: action.payload }
    case TOKEN:
      return { ...state, token: action.payload }
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload }
    default:
      return state
  }
}