import { STATUS_BAR_HEIGHT } from '../constants/Public'

const INITIAL_STATE = {
  statusBarHeight: 0
}

export default function publicData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case STATUS_BAR_HEIGHT:
      return {
        ...state,
        statusBarHeight: action.payload
      }
    default:
      return state
  }
}