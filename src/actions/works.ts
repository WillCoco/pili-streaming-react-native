import { GOODS_LIST, ADDED_GOODS_LIST } from '../constants/Works'

export const setWorkGoodsList = (list: any) => {
  return { type: GOODS_LIST, payload: list }
}

export const setAddedGoodsList = (list: any) => {
  return { type: ADDED_GOODS_LIST, payload: list }
}