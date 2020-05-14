/**
 * 数据适配器
 */
import formatSinglePrice from './formatGoodsPrice';

const EMPTY_OBJ = {};

/**
 * 获取
 * 品牌商品
 */
export const brandGoodAdapter = (good: any) => {
  if (!good) {
    return EMPTY_OBJ;
  }

  return {
    img: good.originalImg,
    title: good.goodsName,
    discountPrice: formatSinglePrice(good.shopPrice),
    pirce: formatSinglePrice(good.marketPrice),
    profit: formatSinglePrice(good.rebate),
    isAdded: good.isExist === 1
  }
}
