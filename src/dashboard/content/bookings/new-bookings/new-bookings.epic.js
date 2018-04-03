import {isEmpty, get, merge} from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

import {postUsingAjax} from '../../../../common/api';
import transformKeys from '../../../../common/transformKeys';
import storage from '../../../../common/storage';
import {
  INITIATE_GET_NEW_BOOKINGS,
  getNewBookingsCompleted,
  getNewBookingsFailed
} from './new-bookings.action';

export const getNewBookings = (action$, state) => {
  return action$
    .ofType(INITIATE_GET_NEW_BOOKINGS)
    .switchMap(action =>
      postUsingAjax(`/api/new_bookings`, merge(action.payload, {deviceToken: get(storage.get('user'), 'devicetoken')}))
        .map(res => {
          if (res.status === 200) {
            let bookingInfo = transformKeys.toCamelCase(res.response.DATA);
            let totalCount = !isEmpty(bookingInfo) ? res.response.TOTALCOUNT : 0;
            return getNewBookingsCompleted({data: bookingInfo, totalCount: totalCount});
          }
          state.dispatch(getNewBookingsFailed('Something went wrong while fetching new bookings.'));
          return Observable.empty();
        })
        .catch(error => {
          state.dispatch(getNewBookingsFailed('Something went wrong while fetching new bookings.'));
          return Observable.empty();
        })
    );
};
