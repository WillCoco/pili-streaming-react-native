import {
  SEARCH_KEY,
  SWIPER_LIST,
  ACTIVITY_LIST,
  SELECTED_GOODS_INFO,
  SECKILL_LIST
} from '../constants/Home'

export const setSearchKey = (searchKey: string) => {
  return { type: SEARCH_KEY, payload: searchKey }
}

export const setSwiperList = (swiperList: Array<any>) => {
  return { type: SWIPER_LIST, payload: swiperList }
}

export const setActivityList = (activityList: Array<any>) => {
  return { type: ACTIVITY_LIST, payload: activityList }
}

export const setSelectedGoodsInfo = (selectedGoodsInfo: any) => {
  return { type: SELECTED_GOODS_INFO, payload: selectedGoodsInfo } 
}

export const setSeckillList = (seckillList: Array<any>) => {
  return { type: SECKILL_LIST, payload: seckillList }
}