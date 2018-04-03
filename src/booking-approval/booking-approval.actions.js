import {postUsingAjax} from 'common/api/index';
import transformKeys from 'common/transformKeys';

export const confirmDenyBooking = (params = {}) => {
  return (dispatch) => {
    let url = `/api/booking_action`;
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