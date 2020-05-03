import assetActionTypes from '../constants/Asset';

interface InitStateTypes {
  bankCards: Array<any>, // 银行卡列表
  // 其他可提现资金字段
}

const INITIAL_STATE: InitStateTypes = {
  bankCards: [],
}

export default function live(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case assetActionTypes.UPDATE_BANK_CARD:
      return {...state, bankCards: action.payload.bankCards};
    default:
      return state;
  }
}