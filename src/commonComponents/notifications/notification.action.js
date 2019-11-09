import { createRoutine } from 'redux-saga-routines';

import { put } from 'redux-saga/effects';

export const showNotification = createRoutine('SHOWNOTIFICATION');
export const errorNotification = createRoutine('ERRORNOTIFICATION');

export function* sagaOnShowNotification({ payload }) {
  try {
    yield put(showNotification.success(payload));
  } catch (e) {
    console.error('error', e);
    yield put(showNotification.failure(e));
    console.log(e);
  }
}
