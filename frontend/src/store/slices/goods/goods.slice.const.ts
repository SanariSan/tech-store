import type { TGoodsInitState } from './goods.slice.type';

const GOODS_INIT_STATE: TGoodsInitState = {
  entities: [],
  categories: [],
  subCategories: {},
  perPage: 20,
  loadingStatus: 'idle',
  error: undefined,
};

export { GOODS_INIT_STATE };
