import { combineReducers } from 'redux'

import publicData from './publicData'
import homeData from './homeData'
import im from './im'
import userData from './userData'

export default combineReducers({
  publicData,
  homeData,
  im,
  userData
})