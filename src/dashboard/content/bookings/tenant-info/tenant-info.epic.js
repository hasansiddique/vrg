import {isEmpty, get, merge} from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

import {postUsingAjax} from '../../../../common/api';
import transformKeys from '../../../../common/transformKeys';
import storage from '../../../../common/storage';
import {
  INITIATE_GET_TENANT_INFO,
  SUBMIT_TENANT_BOOKING_REPLY,
  getTenantInfoCompleted,
  getTenantInfoFailed,
  toggleTenantSubmittingReply
} from './tenant-info.action';

export const getTenantInfo = (action$, state) => {
  return action$
    .ofType(INITIATE_GET_TENANT_INFO)
    .switchMap(action =>
      postUsingAjax(`/api/details_tenant`, merge(action.payload, {deviceToken: get(storage.get('user'), 'devicetoken')}))
        .map(res => {
          if (res.status === 200) {
            let bookingInfo = transformKeys.toCamelCase(res.response.DATA);
            return getTenantInfoCompleted(bookingInfo);
          }
          state.dispatch(getTenantInfoFailed('Something went wrong while fetching tenant info.'));
          return Observable.empty();
        })
        .catch(error => {
          state.dispatch(getTenantInfoFailed('Something went wrong while fetching tenant info.'));
          return Observable.empty();
        })
    );
};

export const submitTenantReplay = (action$, state) => {
  return action$
    .ofType(SUBMIT_TENANT_BOOKING_REPLY)
    .switchMap(action =>
      postUsingAjax(`/api/actions_tenant`, merge(action.payload, {deviceToken: get(storage.get('user'), 'devicetoken')}))
        .map(res => {
          let buttonStatus = getButtonPrvStatus(state, true);
          return toggleTenantSubmittingReply(false, 'success', buttonStatus);
        })
        .catch(error => {
          let buttonStatus = getButtonPrvStatus(state, false);
          return toggleTenantSubmittingReply(false, 'error', buttonStatus);
        })
    );
};

function getButtonPrvStatus(state, isChanged) {
  let reducers = state.getState();
  let buttonStatus = get(reducers, `advertiserDashboard.bookings.tenantInfo.details.unitOwnerConfirmation`);
  let abc = (buttonStatus === 2) ? 1 : (buttonStatus === 1) ? 2 : 0;
  return isChanged ? abc : buttonStatus;
}
