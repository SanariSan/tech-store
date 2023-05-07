import type { TGoodsInitState } from './goods.slice.type';

const GOODS_INIT_STATE: TGoodsInitState = {
  entities: [],
  //
  categories: [],
  subCategories: {},
  //
  selectedCategory: undefined,
  selectedSubCategory: undefined,
  offset: 0,
  offsetPerPage: 20,
  loadingStatus: 'idle',
  error: undefined,
};

export { GOODS_INIT_STATE };
