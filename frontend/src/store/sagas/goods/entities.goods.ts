import { call, cancelled, delay, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import type {
  TGoodsEntitiesIncomingFailureFields,
  TGoodsEntitiesIncomingSuccessFields,
} from '../../../services/api';
import { getEntities } from '../../../services/api';
import { getEntitiesAsync, pushEntities, setGoodsLoadStatus } from '../../slices';

function* entitiesWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setGoodsLoadStatus({ status: 'loading' }));
    yield delay(1000);

    const fetchStatus = (yield safe(
      call(getEntities, { abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TGoodsEntitiesIncomingSuccessFields;
      failure?: TGoodsEntitiesIncomingFailureFields;
    }>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setGoodsLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    console.dir(fetchStatus.response);

    if (fetchStatus.response.success !== undefined) {
      yield put(setGoodsLoadStatus({ status: 'success' }));
      yield put(pushEntities({ entities: fetchStatus.response.success.data.entities }));
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

function* entitiesWatcher() {
  yield takeLatest(getEntitiesAsync, entitiesWorker);
}

export { entitiesWatcher };
