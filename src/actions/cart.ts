import { CART_ACTION_TYPE } from '../constants/Cart'

export const toggleCartAction = (type: string) => {
  return { type: CART_ACTION_TYPE, payload: type }
}