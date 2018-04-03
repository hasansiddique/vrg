import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs/Observable';

import {getUsingAjax, postUsingAjax} from '../common/api/index';
import transformKeys from '../common/transformKeys';
import {
  INITIATE_GET_SEARCH_LISTINGS,
  getSearchListingsCompleted,
  getSearchListingsFailed,
  getSearchListingsError,
} from './search.action';

export const getSearchListings = (action$, state) => {
  return action$
    .ofType(INITIATE_GET_SEARCH_LISTINGS)
    .switchMap(action => {
      return postUsingAjax(`/api/search_properties`, action.params)
        .map(res => {
          if (res.status === 200) {
            let listings = transformKeys.toCamelCase(res.response.DATA);
            return getSearchListingsCompleted(listings, res.response.TOTALROWS, action.append);
          } else {
            return getSearchListingsFailed();
          }
        })
        .catch(error => {
          state.dispatch(getSearchListingsError('Something went wrong while fetching listings.'));
          return Observable.empty();
        });
    }).catch((err, observable) => {
      // return Observable.of(getSearchListingsErrorAction('Something went wrong while fetching listings.'));
      state.dispatch(getSearchListingsError('Something went wrong while fetching listings.'));
      return observable;
    });
};

export const searchEpics = combineEpics(
  getSearchListings
);
