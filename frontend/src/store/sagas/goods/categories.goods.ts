import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import type {
  TGoodsCategoriesIncomingFailureFields,
  TGoodsCategoriesIncomingSuccessFields,
} from '../../../services/api';
import { getCategories } from '../../../services/api';
import { getCategoriesAsync, setCategories, setGoodsLoadStatus } from '../../slices';

function* categoriesWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setGoodsLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(getCategories, { abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TGoodsCategoriesIncomingSuccessFields;
      failure?: TGoodsCategoriesIncomingFailureFields;
    }>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setGoodsLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      const { categories } = fetchStatus.response.success.data;
      yield put(setGoodsLoadStatus({ status: 'success' }));
      yield put(setCategories({ categories }));
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setGoodsLoadStatus({
          status: 'failure',
          error: String(fetchStatus.response.failure.detail),
        }),
      );
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
