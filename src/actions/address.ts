import { ADDRESS_LIST, CHOOSED_ADDRESS } from '../constants/Address'

interface ChoosedAddr {
  address: string
  address_id: number
  city: string
  consignee: string
  district: string
  is_default: number
  mobile: string
  province: string
}

export const setAddressList = (addressList: Array<any>) => {
  return { type: ADDRESS_LIST, payload: addressList }
}

export const setChoosedAddr = (choosedAddr: ChoosedAddr) => {
  return { type: CHOOSED_ADDRESS, payload: choosedAddr }
}