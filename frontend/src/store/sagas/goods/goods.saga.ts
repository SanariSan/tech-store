import { all, call } from 'redux-saga/effects';
import { categoriesWatcher } from './categories.goods';
import { entitiesWatcher } from './entities.goods';

function* goodsRootWatcher() {
  yield all([call(categoriesWatcher), call(entitiesWatcher)]);
}

export { goodsRootWatcher };
