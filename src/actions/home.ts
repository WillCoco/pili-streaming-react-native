import { SEARCH_KEY } from '../constants/Home'

export const setSearchKey = (searchKey: string) => {
  return {
    type: SEARCH_KEY,
    payload: searchKey
  }
}