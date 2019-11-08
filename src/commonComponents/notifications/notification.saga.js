import { takeLatest, all } from 'redux-saga/effects';

import { showNotification, sagaOnShowNotification } from './notification.action';

export function* notificationReduxWatcher() {
  yield all([takeLatest(showNotification.TRIGGER, sagaOnShowNotification)]);
}
