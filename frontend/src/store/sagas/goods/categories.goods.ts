import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import {
  GoodsCategoriesIncomingFailureDTO,
  GoodsCategoriesIncomingSuccessDTO,
  getCategories,
} from '../../../services/api';
import type {
  IGoodsCategoriesIncomingSuccessDTO,
  IGoodsCategoriesIncomingFailureDTO,
} from '../../../services/api';
import { getCategoriesAsync, setCategories, setGoodsLoadStatus } from '../../slices';

function* categoriesWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setGoodsLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(getCategories, { abortSignal: abortController.signal }),
    )) as TSafeReturn<IGoodsCategoriesIncomingSuccessDTO | IGoodsCategoriesIncomingFailureDTO>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setGoodsLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    console.dir(fetchStatus.response.getFields());

    if (fetchStatus.response instanceof GoodsCategoriesIncomingSuccessDTO) {
      const { categories, subCategories } = fetchStatus.response.getFields().data;
      yield put(setGoodsLoadStatus({ status: 'success' }));
      yield put(setCategories({ categories, subCategories }));
      return;
    }

    if (fetchStatus.response instanceof GoodsCategoriesIncomingFailureDTO) {
      yield put(setGoodsLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* categoriesWatcher() {
  yield takeLatest(getCategoriesAsync, categoriesWorker);
}

export { categoriesWatcher };
