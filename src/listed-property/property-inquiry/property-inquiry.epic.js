import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';

import {postUsingAjax} from '../../common/api/index';
import transformKeys from '../../common/transformKeys/index';
import {
  INITIATE_GET_PROPERTY_INQUIRY_REQUEST,
  getPropertyInquiryCompleted,
  getPropertyInquiryFailed,
  getPropertyInquiryError
} from './property-inquiry.action';

const getUnitInquiry = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_PROPERTY_INQUIRY_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/pm_info`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let inquiryInfo = transformKeys.toCamelCase(res.response.DATA);
            return getPropertyInquiryCompleted(inquiryInfo);
          } else {
            return getPropertyInquiryFailed();
          }
        })
        .catch(error => {
          state.dispatch(getPropertyInquiryFailed());
          state.dispatch(getPropertyInquiryError('Something went wrong while fetching summary details.'));
          return Observable.empty();
        })
    );
};

export const propertyInquiryEpics = combineEpics(
  getUnitInquiry
);
