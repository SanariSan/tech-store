import { call, cancelled, delay, put, select, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import type {
  TGoodsEntitiesIncomingFailureFields,
  TGoodsEntitiesIncomingSuccessFields,
  TGoodsEntitiesOutgoingFields,
} from '../../../services/api';
import { GoodsEntitiesOutgoingDTO, validateDTO, getEntities } from '../../../services/api';
import {
  fetchMoreEntitiesAsync,
  increaseOffset,
  pushEntities,
  setGoodsLoadStatus,
} from '../../slices';
import { goodsSelector } from '../../selectors';
import type { TRootState } from '../../redux.store.type';

function* entitiesWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setGoodsLoadStatus({ status: 'loading' }));
    yield delay(500);

    const { selectedCategory, selectedSubCategory, offset, offsetPerPage } = (yield select(
      goodsSelector,
    )) as TRootState['goods'];

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: GoodsEntitiesOutgoingDTO,
        value: {
          category: selectedCategory,
          subCategory: selectedSubCategory,
          offset,
          qty: offsetPerPage,
        },
      }),
    )) as TSafeReturn<TGoodsEntitiesOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(setGoodsLoadStatus({ status: 'failure', error: String(validateStatus.error) }));
      return;
    }

    const fetchStatus = (yield safe(
      call(getEntities, { params: validateStatus.response, abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TGoodsEntitiesIncomingSuccessFields;
      failure?: TGoodsEntitiesIncomingFailureFields;
    }>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setGoodsLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(pushEntities({ entities: fetchStatus.response.success.data.entities }));
      yield put(increaseOffset());
      yield put(setGoodsLoadStatus({ status: 'success' }));
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
      console.log('cancelled');
      abortController.abort();
    }
  }
}

function* entitiesWatcher() {
  yield takeLatest(fetchMoreEntitiesAsync, entitiesWorker);
}

export { entitiesWatcher };
