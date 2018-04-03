import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';

import {postUsingAjax} from '../../../common/api';
import transformKeys from '../../../common/transformKeys';
import {
  INITIATE_GET_ALL_LISTINGS_REQUEST,
  getAllPropertiesCompleted,
  getAllPropertiesFailed,
  getAllPropertiesError,
} from './all-listings.action';
import {isEmpty} from "lodash";

const getLisitngs = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_ALL_LISTINGS_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/owner_listings`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let bookingInfo = transformKeys.toCamelCase(res.response.DATA);
            let totalCount = !isEmpty(bookingInfo) ? res.response.TOTALCOUNT : 0;
            return getAllPropertiesCompleted({data: bookingInfo, totalCount: totalCount});
          } else {
            return getAllPropertiesFailed();
          }
        })
        .catch(error => {
          state.dispatch(getAllPropertiesFailed());
          state.dispatch(getAllPropertiesError('Something went wrong while fetching summary details.'));
          return Observable.empty();
        })
    );
};

export const allListingsEpics = combineEpics(
  getLisitngs
);
