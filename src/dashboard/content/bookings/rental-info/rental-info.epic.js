import {isEmpty, get, merge} from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

import {postUsingAjax} from '../../../../common/api';
import transformKeys from '../../../../common/transformKeys';
import storage from '../../../../common/storage';
import {
  INITIATE_GET_RENTAL_INFO,
  getRentalInfoCompleted,
  getRentalInfoFailed,
} from './rental-info.action';

export const getRentalInfo = (action$, state) => {
  return action$
    .ofType(INITIATE_GET_RENTAL_INFO)
    .switchMap(action =>
      postUsingAjax(`/api/rental_info`, merge(action.payload, {deviceToken: get(storage.get('user'), 'devicetoken')}))
        .map(res => {
          if (res.status === 200) {
            let bookingInfo = transformKeys.toCamelCase(res.response.DATA);
            return getRentalInfoCompleted(bookingInfo);
          }
          state.dispatch(getRentalInfoFailed('Something went wrong while fetching rental info.'));
          return Observable.empty();
        })
        .catch(error => {
          state.dispatch(getRentalInfoFailed('Something went wrong while fetching rental info.'));
          return Observable.empty();
        })
    );
};
