import {
  ADDRESS_LIST,
  CHOOSED_ADDRESS
} from '../constants/Address'

const INITIAL_STATE = {
  addressList: [],
  choosedAddress: {}
}

export default function homeData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case ADDRESS_LIST:
      return { ...state, addressList: action.payload }
    case CHOOSED_ADDRESS:
      return { ...state, choosedAddress: action.payload }
    default:
      return state
  }
}