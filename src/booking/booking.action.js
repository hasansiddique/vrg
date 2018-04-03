import {postUsingAjax} from 'common/api/index';
import transformKeys from 'common/transformKeys';

export const UPDATE_BOOKING = 'UPDATE_BOOKING';

export const confirmBooking = (params = {}) => {
  return (dispatch) => {
    let url = `/api/book_online`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res;
    }).catch((err) => {
      return err;
    });
  };
};

export const getStates = (params = {}) => {
  return (dispatch) => {
    let url = `/api/states_get`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res.data;
    }).catch((err) => {
      return [];
    });
  };
};

export const getCountries = (params = {}) => {
  return (dispatch) => {
    let url = `/api/countries_get`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return res.data;
    }).catch((err) => {
      return [];
    });
  };
};

export const updateDeals = (payload) => {
  return {
    type: UPDATE_BOOKING,
    payload: payload
  };
};