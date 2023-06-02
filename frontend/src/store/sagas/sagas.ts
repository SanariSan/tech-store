import { all, call, spawn } from 'redux-saga/effects';
import { goodsRootWatcher } from './goods';
import { loadingRootWatcher } from './loading';
import { userAuthRootWatcher } from './user';

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
