import assetActionTypes from '../constants/Asset';

interface InitStateTypes {
  bankCards: Array<any>, // 银行卡列表
  curBankCard: any, // 当前选中的银行卡
  anchorAssetsInfo: any // 主播资金信息
}

const INITIAL_STATE: InitStateTypes = {
  bankCards: [],
  curBankCard: {},
  anchorAssetsInfo: {},
}

export default function live(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case assetActionTypes.UPDATE_BANK_CARD:
      return {...state, bankCards: action.payload.bankCards};
    case assetActionTypes.UPDATE_CUR_BANK_CARD:
      return {...state, curBankCard: action.payload.curBankCard};
    case assetActionTypes.SET_ANCHOR_ASSETS_INFO:
      return {...state, anchorAssetsInfo: action.payload.anchorAssetsInfo};
    default:
      return state;
  }
}