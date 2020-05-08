import assetActionTypes from '../constants/Asset';

interface InitStateTypes {
  bankCards: Array<any>, // 银行卡列表
  curBankCard: any, // 当前选中的银行卡
  // 其他可提现资金字段
}

const INITIAL_STATE: InitStateTypes = {
  bankCards: [],
  curBankCard: {},
}

export default function live(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case assetActionTypes.UPDATE_BANK_CARD:
      return {...state, bankCards: action.payload.bankCards};
    case assetActionTypes.UPDATE_CUR_BANK_CARD:
      return {...state, curBankCard: action.payload.curBankCard};
    default:
      return state;
  }
}