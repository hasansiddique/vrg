import {isEmpty} from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';

import {postUsingAjax, postUsingAjaxPublic} from '../../../common/api/index';
import transformKeys from '../../../common/transformKeys/index';
import {
  INITIATE_GET_AVAILABILITY_INFO_REQUEST,
  INITIATE_GET_CALCULATION_INFO_REQUEST,
  getAvailabilityInfoCompleted,
  getAvailabilityInfoError,
  getAvailabilityInfoFailed,
  getCalculationInfoCompleted,
  getCalculationInfoFailed,
  getCalculationInfoError
} from './availability-calendar.action';

const getAvailabilityInfo = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_AVAILABILITY_INFO_REQUEST)
    .switchMap(action =>
      postUsingAjaxPublic(`/api/unit_availability`, action.payload)
        .map(res => {
          if (res.status === 200) {
            if(res.response.STATUS == false){
              return getAvailabilityInfoError(res.response.ERRMSGS[0]);
            }else{
              let availabilityInfo = transformKeys.toCamelCase(res.response.DATA);
              return getAvailabilityInfoCompleted(availabilityInfo);
            }
          } else {
            return getAvailabilityInfoFailed();
          }
        })
        .catch(error => {
          state.dispatch(getAvailabilityInfoFailed());
          state.dispatch(getAvailabilityInfoError('Something went wrong while fetching availability details.'));
          return Observable.empty();
        })
    );
};

const getCalculationInfo = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_CALCULATION_INFO_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/unit/calculate-rate`, {
        'unit_id': action.listingId,
        'checkin_date': action.startDate,
        'checkout_date': action.endDate,
        'guests': action.guests,
        'deal_id': action.dealId
      })
        .map(res => {
          if (res.status === 200) {
            if (res.response.STATUS == 'failed') {
              let errorMessage = res.response.ERRMSG || {msg: 'Failed to calculate'};
              return getCalculationInfoError(errorMessage);
            } else if(res.response.STATUS == false){
              let errorMessage = (res.response.ERRMSGS.length) ? {msg: res.response.ERRMSGS[0]} : {msg: 'Failed to calculate'};
              return getCalculationInfoError(errorMessage);
            } else {
              let calculationInfo = transformKeys.toCamelCase(res.response.DATA);
              return getCalculationInfoCompleted(calculationInfo);
            }
          } else {
            return getCalculationInfoFailed();
          }
        })
        .catch(error => {
          state.dispatch(getCalculationInfoFailed());
          state.dispatch(getCalculationInfoError(error));
          return Observable.empty();
        })
    );
};

export const bookingEpics = combineEpics(
  getAvailabilityInfo,
  getCalculationInfo
);
