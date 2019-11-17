// @flow

import {
  NOTIFICATION__SHOW,
  NOTIFICATION__HIDE,
} from '../actionTypes/notification';

type Action = {
  type: string,
  payload: {
    type: string,
    message: string,
  },
};

type Notification = {
  value: number,
  isFetching: boolean,
};

export default function notification(
  state: Notification = {},
  { type: actionType, payload }: Action,
) {
  switch (actionType) {
    case NOTIFICATION__SHOW: {
      const { type, message } = payload;

      return { type, message };
    }

    case NOTIFICATION__HIDE: {
      return { type: null, message: null };
    }

    default:
      return state;
  }
}
