import { put, takeEvery } from 'redux-saga/effects';
import { setErrorMessage, setGoodsLoadStatus, setSuccessMessage } from '../../slices';
import type { TLoadingStatus } from '../../slices/slices.type';

function* statusMessageWorker(action: {
  payload: { status: TLoadingStatus; message?: string };
  type: string;
}) {
  if (action.payload.status === 'failure') {
    yield put(
      setErrorMessage({
        title: 'Error',
        description: action.payload.message,
      }),
    );
  }

  if (action.payload.status === 'success') {
    yield put(
      setSuccessMessage({
        title: 'Success',
        description: action.payload.message,
      }),
    );
  }
}

function* loadingStatusWatcher() {
  yield takeEvery(setGoodsLoadStatus, statusMessageWorker);
}

export { loadingStatusWatcher };
