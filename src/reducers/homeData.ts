import {
  SEARCH_KEY,
  SWIPER_LIST,
  ACTIVITY_LIST,
  SELECTED_GOODS_INFO,
  RECOMMEND_GOODS_LIST,
  SECKILL_LIST
} from '../constants/Home'

const INITIAL_STATE = {
  searchKey: '',
  swiperList: [],
  activityList: [],
  selectedGoodsInfo: {},
  recommendGoodsList: [],
  seckillList: []
}

export default function homeData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SEARCH_KEY:
      return { ...state, searchKey: action.payload }
    case SWIPER_LIST:
      return { ...state, swiperList: action.payload }
    case ACTIVITY_LIST:
      return { ...state, activityList: action.payload }
    case SELECTED_GOODS_INFO:
      return { ...state, selectedGoodsInfo: action.payload }
    case RECOMMEND_GOODS_LIST:
      return { ...state, recommendGoodsList: action.payload}
    case SECKILL_LIST:
      return { ...state, seckillList: action.payload }
    default:
      return state
  }
}