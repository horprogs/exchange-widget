// @flow

import type { RecordOf } from 'immutable';

import {
  NOTIFICATION__SHOW,
  NOTIFICATION__HIDE,
} from '../actionTypes/notification';
import { NotificationRecord } from '../utils/records';

type Action = {
  type: string,
  payload: {
    type: string,
    message: string,
  },
};

type Notification = {
  type: ?string,
  message: ?string,
};

export default function notification(
  state: RecordOf<Notification> = new NotificationRecord(),
  { type: actionType, payload }: Action,
) {
  switch (actionType) {
    case NOTIFICATION__SHOW: {
      const { type, message } = payload;

      return state.set('type', type).set('message', message);
    }

    case NOTIFICATION__HIDE: {
      return state.set('type', null).set('message', null);
    }

    default:
      return state;
  }
}
