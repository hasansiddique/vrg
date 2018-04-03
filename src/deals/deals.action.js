import {postUsingAjax} from 'common/api/index';
import transformKeys from 'common/transformKeys';

export const UPDATE_DEALS = 'UPDATE_DEALS';

export const getDeals = (params = {}) => {
  return (dispatch) => {
    let reset = params.reset || false;
    if(reset){
      dispatch(updateDeals({
        deals: []
      }));
    }
    dispatch(updateDeals({isFetching: true, error: ''}));
    let url = `/api/deals`;
    let promise = postUsingAjax(url, params).map((res) => {
      return transformKeys.toLowerCase(res.response);
    }).toPromise();
    return promise.then((res) => {
      return dispatch(updateDeals({deals: res.data, isFetching: false, error: ''}));
    }).catch((err) => {
      return dispatch(updateDeals({isFetching: false, error: 'Error fetching deals'}));
    });
  };
};

export const updateDeals = (payload) => {
  return {
    type: UPDATE_DEALS,
    payload: payload
  };
};