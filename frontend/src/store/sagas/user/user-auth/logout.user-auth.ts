import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import type {
  TAccessLogoutIncomingFailureFields,
  TAccessLogoutIncomingSuccessFields,
} from '../../../../services/api';
import { logoutUser } from '../../../../services/api';
import { logoutUserAsync, setUserAuthLoadStatus, setUserIsAuthenticated } from '../../../slices';

function* logoutUserWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(logoutUser, { abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TAccessLogoutIncomingSuccessFields;
      failure?: TAccessLogoutIncomingFailureFields;
    }>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure', error: String(fetchStatus.error) }));
      return;
    }

    console.dir(fetchStatus.response);

    if (fetchStatus.response.success !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'success' }));
      yield put(
        setUserIsAuthenticated({ status: fetchStatus.response.success.data.isAuthenticated }),
      );
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setUserAuthLoadStatus({
          status: 'failure',
          error: String(fetchStatus.response.failure.detail),
        }),
      );
      yield put(
        setUserIsAuthenticated({
          status: fetchStatus.response.failure.miscellaneous.isAuthenticated,
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
