import { all, call, spawn } from 'redux-saga/effects';
import { goodsRootWatcher } from './goods';
import { userAuthRootWatcher } from './user';
import { loadingRootWatcher } from './loading';

function* rootWatcher() {
  const sagas = [userAuthRootWatcher, goodsRootWatcher, loadingRootWatcher];

  yield all(
    sagas.map((saga) =>
      spawn(function* detachedGenerator() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {
            console.log(error);
          }
        }
      }),
    ),
  );
}

export { rootWatcher };
