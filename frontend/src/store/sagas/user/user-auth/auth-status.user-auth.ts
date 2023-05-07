import { call, cancelled, delay, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import { checkUserAuthStatus } from '../../../../services/api';
import { checkUserAuthStatusAsync, setUserIsAuthenticated } from '../../../slices';
import type {
  TAccessCheckSessionIncomingFailureFields,
  TAccessCheckSessionIncomingSuccessFields,
} from '../../../../services/api';

function* checkUserAuthStatusWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield delay(1000);

    const fetchStatus = (yield safe(
      call(checkUserAuthStatus, { abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TAccessCheckSessionIncomingSuccessFields;
      failure?: TAccessCheckSessionIncomingFailureFields;
    }>;
    // as TSafeReturn<Awaited<ReturnType<typeof checkUserAuthStatus>>>;

    console.dir(fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(setUserIsAuthenticated({ status: false }));
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(
        setUserIsAuthenticated({ status: fetchStatus.response.success.data.isAuthenticated }),
      );
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
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

function* userAuthStatusWatcher() {
  yield takeLatest(checkUserAuthStatusAsync, checkUserAuthStatusWorker);
}

export { userAuthStatusWatcher };
