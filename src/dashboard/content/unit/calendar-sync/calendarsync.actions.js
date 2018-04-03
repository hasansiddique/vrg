import { postUsingAjax } from 'common/api';
import transformKeys from 'common/transformKeys';

export const UPDATE_OWNER_UNIT_CALENDAR_SYNC = 'UPDATE_OWNER_UNIT_CALENDAR_SYNC';

export const getOwnerUnitCalendarSync = (unitId) => {
  let url = `/api/calendar_sync_get`;
  let params = {
    unit_id: unitId
  };
  let observable = postUsingAjax(url, params);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res.data.pop();
  });
};

export const updateOwnerUnitCalendarSync = (params, headers = {}) => {
  let url = `/api/calendar_sync_update`;
  let observable = postUsingAjax(url, params, headers);
  return observable.map((res) => {
    let response = transformKeys.toLowerCase(res.response);
    return response;
  }).toPromise().then((res) => {
    return res;
  });
};

export const updateOwnerUnitCalendarSyncStore = (payload) => {
  return {
    type: UPDATE_OWNER_UNIT_CALENDAR_SYNC,
    payload: payload
  };
};
