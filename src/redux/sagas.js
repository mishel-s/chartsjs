import { all, fork } from 'redux-saga/effects';

import { notificationReduxWatcher } from '../commonComponents/notifications/notification.saga';

export default function* rootSaga() {
  yield all([fork(notificationReduxWatcher)]);
}
