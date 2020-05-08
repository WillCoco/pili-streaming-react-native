import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'

const persistConfig = {
  key: 'store',
  storage: AsyncStorage,
  blacklist: ['shop', 'im', 'asset', 'live']
}

const middleware = [thunkMiddleware, logger]
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, applyMiddleware(...middleware))
export let persistor = persistStore(store)

export default function configStore() {
  // const store = createStore(persistedReducer, applyMiddleware(...middleware))
  // let persistor = persistStore(store)
  return { store, persistor }
}
