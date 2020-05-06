import shopActionTypes from '../constants/Shop';

interface InitStateTypes {
  shopGoods: Array<any>, // 商品列表
  returnAddresses: Array<any>, // 寄回地址
  showcaseGoods: Array<any>, // 橱窗商品列表
  warehouseGoods: Array<any>, // 预组货列表
  platformBrands: Array<any>, // 平台分类+品牌列表
  platformGoods: {[key: string]: any}, // 平台货源列表
  personalGoods: {[key: string]: any}, // 个人货源列表
}

const INITIAL_STATE: InitStateTypes = {
  returnAddresses: [],
  shopGoods: [],
  showcaseGoods: [],
  warehouseGoods: [],
  platformBrands: [],
  platformGoods: {},
  personalGoods: {}
}

export default function live(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case shopActionTypes.UPDATE_RETURN_ADDRESS:
      return {...state, returnAddresses: {...state.returnAddresses, ...action.payload.returnAddresses}};
    case shopActionTypes.UPDATE_SHOP_GOODS:
      return {...state, returnAddresses: {...state.returnAddresses, ...action.payload.returnAddresses}};
    case shopActionTypes.UPDATE_SHOWCASE_GOODS:
      return {...state, showcaseGoods: action.payload.showcaseGoods};
    case shopActionTypes.UPDATE_WAREHOUSE_GOODS:
      return {...state, warehouseGoods: action.payload.warehouseGoods};
    case shopActionTypes.UPDATE_PLATFORM_BRNDS:
      return {...state, platformBrands: action.payload.platformBrands};
    case shopActionTypes.UPDATE_PERSONAL_GOODS:
      return {...state, platformGoods: action.payload.platformGoods};
    case shopActionTypes.UPDATE_PLATFORM_GOODS:
      return {...state, personalGoods: action.payload.personalGoods};
    default:
      return state;
  }
}