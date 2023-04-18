import { call, cancelled, delay, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import type {
  IGoodsEntitiesIncomingFailureDTO,
  IGoodsEntitiesIncomingSuccessDTO,
} from '../../../services/api';
import {
  GoodsEntitiesIncomingFailureDTO,
  GoodsEntitiesIncomingSuccessDTO,
  getEntities,
} from '../../../services/api';
import { getEntitiesAsync, pushEntities, setGoodsLoadStatus } from '../../slices';

function* entitiesWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setGoodsLoadStatus({ status: 'loading' }));
    yield delay(1000);

    const fetchStatus = (yield safe(
      call(getEntities, { abortSignal: abortController.signal }),
    )) as TSafeReturn<IGoodsEntitiesIncomingSuccessDTO | IGoodsEntitiesIncomingFailureDTO>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setGoodsLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    console.dir(fetchStatus.response.getFields());

    if (fetchStatus.response instanceof GoodsEntitiesIncomingSuccessDTO) {
      yield put(setGoodsLoadStatus({ status: 'success' }));
      yield put(pushEntities({ entities: fetchStatus.response.getFields().data.entities }));
      return;
    }

    if (fetchStatus.response instanceof GoodsEntitiesIncomingFailureDTO) {
      yield put(setGoodsLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
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
