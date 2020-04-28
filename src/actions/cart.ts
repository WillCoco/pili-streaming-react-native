import { CART_ACTION_TYPE, CART_LIST } from '../constants/Cart'

export const toggleCartAction = (type: string) => {
  return { type: CART_ACTION_TYPE, payload: type }
}

export const setCartList = (list: Array<any>) => {
  return { type: CART_LIST, payload: list }
}