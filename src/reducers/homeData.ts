import { SEARCH_KEY } from '../constants/Home'

const INITIAL_STATE = {
  searchKey: ''
}

export default function homeData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SEARCH_KEY:
      return {
        ...state,
        searchKey: action.payload
      }
    default:
      return state
  }
}