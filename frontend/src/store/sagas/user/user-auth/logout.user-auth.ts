import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import type {
  IAccessLogoutIncomingFailureDTO,
  IAccessLogoutIncomingSuccessDTO,
} from '../../../../services/api';
import {
  AccessLogoutIncomingFailureDTO,
  AccessLogoutIncomingSuccessDTO,
  logoutUser,
} from '../../../../services/api';
import { logoutUserAsync, setUserAuthLoadStatus, setUserIsAuthenticated } from '../../../slices';

function* logoutUserWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(logoutUser, { abortSignal: abortController.signal }),
    )) as TSafeReturn<IAccessLogoutIncomingSuccessDTO | IAccessLogoutIncomingFailureDTO>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    console.dir(fetchStatus.response.getFields());

    if (fetchStatus.response instanceof AccessLogoutIncomingSuccessDTO) {
      yield put(setUserAuthLoadStatus({ status: 'success' }));
      yield put(
        setUserIsAuthenticated({ status: fetchStatus.response.getFields().data.isAuthenticated }),
      );
      return;
    }

    if (fetchStatus.response instanceof AccessLogoutIncomingFailureDTO) {
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

function* userLogoutWatcher() {
  yield takeLatest(logoutUserAsync, logoutUserWorker);
}

export { userLogoutWatcher };
