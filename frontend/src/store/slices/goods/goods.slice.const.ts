import type { TGoodsInitState } from './goods.slice.type';

const GOODS_INIT_STATE: TGoodsInitState = {
  entities: [],
  likedEntities: [],
  categories: [],
  selectedSection: { title: 'Home', pathname: '/' },
  selectedCategory: undefined,
  selectedCategoryRoute: [],
  selectedModifier: undefined,
  offset: 0,
  offsetPerPage: 20,
  loadingStatus: 'idle',
  error: undefined,
};

export { GOODS_INIT_STATE };
