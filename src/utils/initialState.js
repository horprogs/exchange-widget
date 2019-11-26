import { List, Map } from 'immutable';
import { BalanceRecord, NotificationRecord, PocketRecord, RateRecord, StatusesRecord } from './records';

export default Map({
  balance: List([
    new BalanceRecord({
      id: 'eur',
      amount: 3000,
    }),
    new BalanceRecord({
      id: 'usd',
      amount: 3000,
    }),
    new BalanceRecord({
      id: 'gbp',
      amount: 3000,
    }),
  ]),
  pockets: List([
    new PocketRecord({
      currency: 'eur',
      fieldValue: 0,
      isActive: true,
    }),
    new PocketRecord({
      currency: 'usd',
      fieldValue: 0,
      isActive: false,
    }),
  ]),
  rate: new RateRecord({
    value: 1,
    isFetching: true,
  }),
  notification: new NotificationRecord(),
  statuses: new StatusesRecord(),
});
