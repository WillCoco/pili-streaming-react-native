import {
  CART_ACTION_TYPE
} from '../constants/Cart'

const INITIAL_STATE = {
  cartActionType: '管理'
}

export default function homeData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CART_ACTION_TYPE:
      return { ...state, cartActionType: action.payload }
    default:
      return state
  }
}