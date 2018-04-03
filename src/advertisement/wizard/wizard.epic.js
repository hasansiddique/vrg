import {get} from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';
import storage from '../../common/storage';

import {getUsingAjax, postUsingAjax, postFormData} from '../../common/api';
import transformKeys from '../../common/transformKeys/index';
import {
  INITIATE_GET_COUPON_LIST,
  INITIATE_VALIDATE_WIZARD_COUPON,
  INITIATE_FORM_SUBMISSION,
  formSubmissionCompleted,
  formSubmissionFailed,
  wizardCouponValidated,
  getAdCategoryListCompleted,
  getAdCategoryListFailed,
} from './wizard.action';

const getPPCCategories = (action$, state) => {
  return action$
    .ofType(INITIATE_GET_COUPON_LIST)
    .switchMap(action =>
      getUsingAjax(`/api/ppc_categories`)
        .map(res => {
          if (res.status === 200) {
            let adList = transformKeys.toCamelCase(res.response.DATA);
            return getAdCategoryListCompleted(adList[0]);
          }
          state.dispatch(getAdCategoryListFailed());
          return Observable.empty();
        })
        .catch(error => {
          state.dispatch(getAdCategoryListFailed());
          return Observable.empty();
        })
    );
};

const validateWizardCoupon = (action$, state) => {
  return action$
    .ofType(INITIATE_VALIDATE_WIZARD_COUPON)
    .switchMap(action =>
      postUsingAjax(`/api/validate_coupon`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let couponStatus = transformKeys.toCamelCase(res.response.STATUS);
            return wizardCouponValidated(couponStatus);
          }
          return wizardCouponValidated(false);
        })
        .catch(error => {
          return wizardCouponValidated(false);
        })
    );
};

const submitWizardForm = (action$, state) => {
  return action$
    .ofType(INITIATE_FORM_SUBMISSION)
    .switchMap(action =>
      postFormData(get(storage.get('user'), 'devicetoken') ? '/api/create_advertisement' : '/api/advertiser_signup', action.payload)
        .map(res => {
          if (res.status === 200) {
            let couponStatus = transformKeys.toCamelCase(res.response.STATUS);
            return formSubmissionCompleted(couponStatus);
          }
          state.dispatch(formSubmissionFailed());
          return Observable.empty();
        })
        .catch((error) => {
          state.dispatch(formSubmissionFailed(error));
          return Observable.empty();
        })
    );
};

export const wizardEpics = combineEpics(
  getPPCCategories,
  validateWizardCoupon,
  submitWizardForm
);
