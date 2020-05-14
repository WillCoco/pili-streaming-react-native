import {
  GOODS_LIST,
  ADDED_GOODS_LIST,
  MEDIA_LIST
} from '../constants/Works'

const INITIAL_STATE = {
  goodsList: [],
  addedGoodsList: [],
  mediaList: [
    { uri: require('../assets/order-image/add.png') }
  ]
}

export default function worksData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case GOODS_LIST:
      return { ...state, goodsList: action.payload }
    case ADDED_GOODS_LIST:
      return { ...state, addedGoodsList: action.payload }
    case MEDIA_LIST:
      return { ...state, mediaList: action.payload }
    default:
      return state
  }
}