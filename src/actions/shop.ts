/**
 * 主播店铺
 */
import shopActionType from '../constants/Shop';
import {Dispatch} from 'redux';
import {sleep} from '../utils/tools';
import * as api from '../service/api';
import Toast from 'react-native-tiny-toast';
import calcStrLength from '../utils/calcStrLength';
import {safeStringify} from '../utils/saftyFn';

/* ----------- 店铺相关 ----------- */
/**
 * 获取店铺商品
 */
export const getShopGoods = (shopGoods: any) => {
  return async function(dispatch: Dispatch<any>, getState: any) {
    // 请求更新

    // 若成功去更新store
    dispatch(updateShopGoods(shopGoods));
  }
}

/**
 * 上架、下架
 */
export const soldOutShopGood = (shopGoods: any) => {
  return {type: shopActionType.UPDATE_SHOP_GOODS, payload: {shopGoods}};
}

/**
 * 添加商品
 */
export const putAwayShopGood = (shopGoods: any) => {
  return {type: shopActionType.UPDATE_SHOP_GOODS, payload: {shopGoods}};
}

/**
 * 更新店铺商品
 */
export const updateShopGoods = (retrunAddress: any) => {
  return {type: shopActionType.UPDATE_SHOP_GOODS, payload: {retrunAddress}};
}

/* ----------- 寄回地址相关 ----------- */
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
 * 更新店铺寄回地址
 */
export const updateReturnAddress = (retrunAddress: any) => {
  return {type: shopActionType.UPDATE_RETURN_ADDRESS, payload: {retrunAddress}}
}

/* ----------- 橱窗商品相关 ----------- */
/**
 * 获取橱窗商品
 */
export const getShowcaseGoods = () => {
  return async function(dispatch: Dispatch<any>, getState: any) {
    // 请求更新
    // mock
    await sleep(3000);
    const showcaseGoods = [1,2,3,4,5,6,7];
    console.log(showcaseGoods, 'showcaseGoods')

    // 若成功去更新store
    dispatch(updateShowcaseGoods(showcaseGoods));

    return Promise.resolve(showcaseGoods);
  }
}

/**
 * 更新橱窗商品
 */
export const updateShowcaseGoods = (showcaseGoods: any) => {
  return {type: shopActionType.UPDATE_SHOWCASE_GOODS, payload: {showcaseGoods}};
}

/* ----------- 货源数据相关 ----------- */
/**
 * 获取平台分类品牌
 */
export const getPlatformBrands = () => {
  Toast.showLoading('');
  return async function(dispatch: Dispatch<any>, getState: any) {
    const anchorId = getState()?.anchorData?.anchorInfo?.anchorId; // id
    return api.apiGetCatBrandAll({anchorId})
      .then((r: any) => {
        const platformBrands = r || [];
        dispatch(updatePlatformBrand(platformBrands));
        Toast.hide('');
      })
      .catch(err => {
        console.log(`getPlatformBrands error: ${err}`)
      })
  }
}

/**
 * 更新平台品牌
 */
export const updatePlatformBrand = (platformBrands: any) => {
  return {type: shopActionType.UPDATE_PLATFORM_BRNDS, payload: {platformBrands}};
}

/**
 * 添加类型
 */
export enum AddGoodsTargetType {
  warehouseGoods = 1, // 1.预组货添加商品
  showcaseGoods,  // 2.橱窗添加商品
}

interface GetPlatformBrandsGoodsPrarms {
  addType: AddGoodsTargetType, 
  brandId: number, // 品牌id
  pageNo: number,
  pageSize: number,
}

export const getPlatformBrandsGoods = (params: GetPlatformBrandsGoodsPrarms) => {
  return async function(dispatch: Dispatch<any>, getState: any) {
    // 请求
    const anchorId = getState()?.anchorData?.anchorInfo?.anchorId; // id

    return api.apiGetBrandGoodsList({
      ...params,
      anchorId
    })
      .then((r: any) => {
        const {records} = r || {}

        return Promise.resolve(records || []);
      })
      .catch(err => {
        console.log(`apiGetBrandGoodsList error: ${err}`)
        return Promise.resolve([]);
      })
  }
}

/**
 * 更新品牌商品
 */
export const updatePlatformGoods = (platformGoods: any) => {
  return {type: shopActionType.UPDATE_PLATFORM_GOODS, payload: {platformGoods}};
}

/**
 * 更新个人店铺商品
 */
export const updatePersonalGoods = (personalGoods: any) => {
  return {type: shopActionType.UPDATE_PERSONAL_GOODS, payload: {personalGoods}};
}

/* ----------- 预组货相关 ----------- */

/**
 * 添加预组货仓库商品
 */
interface AddGoods2WareHouseParams {
  goodsIdList: Array<string>
}
export const addGoods2WareHouse = (params: AddGoods2WareHouseParams) => {
  return async function(dispatch: Dispatch<any>, getState: any) {
    const anchorId = getState()?.anchorData?.anchorInfo?.anchorId; // id

    api.apiAddGroupGoods({
      goodsIdList: safeStringify(params.goodsIdList),
      anchorId
    })

  }
}

/**
 * 更新预组货仓库商品
 */
export const updateWarehouseGoods = (warehouseGoods: any) => {
  return {type: shopActionType.UPDATE_WAREHOUSE_GOODS, payload: {warehouseGoods}};
}
