import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { showNotification } from '../../commonComponents/notifications/notification.action';

const initialState = {
  type: '',
  message: '',
  status: false,
};

const data = handleActions(
  {
    [showNotification.SUCCESS](state, payload) {
      return {
        type: payload.payload.type,
        message: payload.payload.message,
        status: !state.status,
      };
    },
    [showNotification.FAILURE](state, payload) {
      return {
        type: 'error',
        message: `Something went wrong - ${payload.payload.message}`,
        status: !state.status,
      };
    },
  },
  initialState
);

export default combineReducers({
  data,
});
