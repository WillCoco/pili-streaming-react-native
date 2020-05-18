/**
 * 资金
 */
import assetActionType from '../constants/Asset';
import {Dispatch} from 'redux';
import {sleep} from '../utils/tools';

/* ----------- 银行卡 ----------- */
/**
 * 获取银行卡列表
 */
export const getBankCards = () => {
  return async function(dispatch: Dispatch<any>, getState: any) {
    // 请求更新
    await sleep(1000);
    const bankCards = [{
      name: '中国银行',
      icon: '',
      cardNum: '2134325'
    }]

    // 若成功去更新store
    dispatch(updateBankCards(bankCards));
  }
}

/**
 * 新增银行卡列表
 */
export const addBankCard = (info: any) => {
  return async function(dispatch: Dispatch<any>, getState: any) {
    // 请求更新
    await sleep(1000);

    const bankCards = [1,2,3,4]

    // 若成功去更新store
    dispatch(updateBankCards(bankCards));

    return Promise.resolve(bankCards)
  }
}

/**
 * 更新当前银行卡
 */
export const updateCurBankCards = (curBankCard: Array<any>) => {
  return {type: assetActionType.UPDATE_CUR_BANK_CARD, payload: {curBankCard}};
}

/**
 * 更新银行卡
 */
export const updateBankCards = (bankCards: Array<any>) => {
  return {type: assetActionType.UPDATE_BANK_CARD, payload: {bankCards}};
}
