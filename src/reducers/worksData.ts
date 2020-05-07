import {
  GOODS_LIST,
  ADDED_GOODS_LIST
} from '../constants/Works'

const INITIAL_STATE = {
  goodsList: [],
  addedGoodsList: []
}

export default function worksData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case GOODS_LIST:
      return { ...state, goodsList: action.payload }
    case ADDED_GOODS_LIST:
      return { ...state, addedGoodsList: action.payload }
    default:
      return state
  }
}