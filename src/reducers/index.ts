import { combineReducers } from 'redux'

import publicData from './publicData'
import homeData from './homeData'

export default combineReducers({
  publicData,
  homeData
})