import shopActionTypes from '../constants/Shop';

interface InitStateTypes {
  returnAddresses: Array<any>, // 寄回地址
}

const INITIAL_STATE: InitStateTypes = {
  returnAddresses: [],
}

export default function live(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case shopActionTypes.UPDATE_RETURN_ADDRESS:
      return {...state, returnAddresses: {...state.returnAddresses, ...action.payload.returnAddresses}};
    default:
      return state;
  }
}