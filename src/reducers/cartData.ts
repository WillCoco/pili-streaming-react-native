import {
  CART_ACTION_TYPE,
  CART_LIST
} from '../constants/Cart'

const INITIAL_STATE = {
  cartActionType: '管理',
  cartList: []
}

export default function homeData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CART_ACTION_TYPE:
      return { ...state, cartActionType: action.payload }
    case CART_LIST:
      return { ...state, cartList: action.payload }
    default:
      return state
  }
}