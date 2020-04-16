import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'

const middleware = [thunkMiddleware, logger]

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(...middleware))
  return store
}