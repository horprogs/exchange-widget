import { Record } from 'immutable';
import { DISABLED } from './constants';

export const BalanceRecord = new Record({
  id: null,
  amount: 0,
});

export const PocketRecord = new Record({
  currency: null,
  operationType: null,
  fieldValue: 0,
});

export const RateRecord = new Record({
  value: 1,
  isFetching: false,
});

export const NotificationRecord = new Record({
  type: null,
  message: null,
});

export const StatusesRecord = new Record({
  exchangeBtn: DISABLED,
});
