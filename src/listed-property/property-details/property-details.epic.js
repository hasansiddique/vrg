import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';

import {postUsingAjax} from '../../common/api/index';
import transformKeys from '../../common/transformKeys/index';
import {
  INITIATE_GET_UNIT_DETAILS_REQUEST,
  getUnitDetailsCompleted,
  getUnitDetailsFailed,
  getUnitDetailsError
} from './property-details.action';

const getUnitDetails = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_UNIT_DETAILS_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/unit_description`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let detailsInfo = transformKeys.toCamelCase(res.response.DATA);
            return getUnitDetailsCompleted(detailsInfo);
          } else {
            return getUnitDetailsFailed();
          }
        })
        .catch(error => {
          state.dispatch(getUnitDetailsFailed());
          state.dispatch(getUnitDetailsError('Something went wrong while fetching property details.'));
          return Observable.empty();
        })
    );
};

export const propertyDetailsEpics = combineEpics(
  getUnitDetails
);
