import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import type {
  IAccessLoginIncomingFailureDTO,
  IAccessLoginIncomingSuccessDTO,
  IAccessLoginOutgoingDTO,
} from '../../../../services/api';
import {
  AccessLoginIncomingFailureDTO,
  AccessLoginIncomingSuccessDTO,
  loginUser,
} from '../../../../services/api';
import {
  loginUserAsync,
  setUserAuthLoadStatus,
  setUserInfo,
  setUserIsAuthenticated,
} from '../../../slices';

function* loginUserWorker(action: { type: string; payload: IAccessLoginOutgoingDTO }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(loginUser, { dto: action.payload, abortSignal: abortController.signal }),
    )) as TSafeReturn<IAccessLoginIncomingSuccessDTO | IAccessLoginIncomingFailureDTO>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    console.dir(fetchStatus.response.getFields());

    if (fetchStatus.response instanceof AccessLoginIncomingSuccessDTO) {
      yield put(setUserAuthLoadStatus({ status: 'success' }));
      yield put(
        setUserIsAuthenticated({ status: fetchStatus.response.getFields().data.isAuthenticated }),
      );
      yield put(setUserInfo(fetchStatus.response.getFields().data));
      return;
    }

    if (fetchStatus.response instanceof AccessLoginIncomingFailureDTO) {
      yield put(setUserAuthLoadStatus({ status: 'failure' }));
      yield put(
        setUserIsAuthenticated({
          status: fetchStatus.response.getFields().miscellaneous.isAuthenticated,
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

function* userLoginWatcher() {
  yield takeLatest(loginUserAsync, loginUserWorker);
}

export { userLoginWatcher };
