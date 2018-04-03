import {postUsingAjax} from 'common/api/index';
import transformKeys from 'common/transformKeys';

export const UPDATE_DEALS = 'UPDATE_DEALS';

export const sendMessage = (params = {}) => {
  let url = `/api/contact_us`;
  return postUsingAjax(url, params).map((res) => {
    return transformKeys.toLowerCase(res.response);
  }).toPromise();
};