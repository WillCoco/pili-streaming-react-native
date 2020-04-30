import { combineReducers } from 'redux'

import publicData from './publicData'
import homeData from './homeData'
import userData from './userData'
import cartData from './cartData'
import addressData from './addressData'

import im from './im'
import live from './live'

export default combineReducers({
  publicData,
  homeData,
  userData,
  cartData,
  addressData,

  im,
  live,
})