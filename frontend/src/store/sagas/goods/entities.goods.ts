import { call, cancelled, delay, put, select, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import type {
  TGoodsEntitiesIncomingFailureFields,
  TGoodsEntitiesIncomingSuccessFields,
  TGoodsEntitiesOutgoingFields,
} from '../../../services/api';
import { GoodsEntitiesOutgoingDTO, getEntities, validateDTO } from '../../../services/api';
import type { TRootState } from '../../redux.store.type';
import { goodsSelector } from '../../selectors';
import {
  fetchMoreEntitiesAsync,
  increaseOffset,
  pushEntities,
  setGoodsLoadStatus,
  setHasMoreEntities,
  setTotalQty,
} from '../../slices';

function* entitiesWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setGoodsLoadStatus({ status: 'loading' }));
    // todo: remove in prod (?), showcase delay
    yield delay(500);

    const { selectedCategory, selectedModifier, offset, offsetPerPage } = (yield select(
      goodsSelector,
    )) as TRootState['goods'];

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: GoodsEntitiesOutgoingDTO,
        value: {
          category: selectedCategory?.title,
          modifier: selectedModifier?.title,
          offset,
          qty: offsetPerPage,
        },
      }),
    )) as TSafeReturn<TGoodsEntitiesOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(
        setGoodsLoadStatus({ status: 'failure', message: String(validateStatus.error.message) }),
      );
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
      yield put(
        setGoodsLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(pushEntities({ entities: fetchStatus.response.success.data.entities }));
      yield put(setTotalQty({ amount: fetchStatus.response.success.data.totalQty }));
      yield put(setHasMoreEntities({ hasMore: fetchStatus.response.success.data.hasMore }));

      if (fetchStatus.response.success.data.hasMore) {
        yield put(increaseOffset());
      }

      yield put(setGoodsLoadStatus({ status: 'success' }));
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setGoodsLoadStatus({
          status: 'failure',
          message: String(fetchStatus.response.failure.detail),
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

function* entitiesWatcher() {
  yield takeLatest(fetchMoreEntitiesAsync, entitiesWorker);
}

export { entitiesWatcher };
