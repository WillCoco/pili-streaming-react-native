import shopActionType from '../constants/Shop';
import {Dispatch} from 'redux';


/**
 * 获取寄回地址
 */
export const getReturnAddress = (retrunAddress: any) => {
  return async function(dispatch: Dispatch<any>, getState: any) {
    // 请求更新

    // 若成功去更新store
    dispatch(updateReturnAddress(retrunAddress))
  }
}

/**
 * 编辑店铺寄回地址(增加或修改)
 */
export const editReturnAddress = (retrunAddress: any) => {
  return async function(dispatch: Dispatch<any>, getState: any) {
    // 请求更新

    // 若成功去更新store
    dispatch(updateReturnAddress(retrunAddress))
  }
}

/**
 * 删除店铺寄回地址
 */
export const removeReturnAddress = (retrunAddress: any) => {
  return async function(dispatch: Dispatch<any>, getState: any) {
    // 请求删除

    // 若成功去更新store
    dispatch(updateReturnAddress(retrunAddress))
  }
}

/**
 * 更新店铺寄回地址
 */
export const updateReturnAddress = (retrunAddress: any) => {
  return {type: shopActionType.UPDATE_RETURN_ADDRESS, payload: {retrunAddress}}
}
