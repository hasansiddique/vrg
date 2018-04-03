import { postUsingAjax } from 'common/api';
import transformKeys from 'common/transformKeys';

export const INITIATE_GET_HOME_SHOPPING_REQUEST = 'INITIATE_GET_HOME_SHOPPING_REQUEST';
export const GET_HOME_SHOPPING_COMPLETED = 'GET_HOME_SHOPPING_COMPLETED';
export const GET_HOME_SHOPPING_FAILED = 'GET_HOME_SHOPPING_FAILED';
export const GET_HOME_SHOPPING_ERROR = 'GET_HOME_SHOPPING_ERROR';
export const SET_HOME_SHOPPING = 'SET_HOME_SHOPPING';

export const getShopping = (params) => {
  return (dispatch) => {
    let url = `/api/advertisement`;
    dispatch(setHomeShopping({
      isFetching: true,
      error: ''
    }));
    let observable = postUsingAjax(url, params).map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    });
    return observable.toPromise().then((res) => {
      return dispatch(setHomeShopping({
        isFetching: false,
        shoppingList: res.data,
        count: res.adcount
      }));
    }).catch((err) => {
      return dispatch(setHomeShopping({
        isFetching: false,
        error: 'Something went wrong, Please try again'
      }));
    });
  };
};


export const initiateGetHomeShopping = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_HOME_SHOPPING_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getHomeShoppingCompleted = (shopping) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_SHOPPING_COMPLETED,
      shopping: shopping,
      isFetching: false
    });
  };
};

export const getHomeShoppingFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_HOME_SHOPPING_FAILED,
      isFetching: false
    });
  };
};

export const getHomeShoppingError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_SHOPPING_ERROR,
      error: error
    });
  };
};

export const setHomeShopping = (payload) => {
  return {
    type: SET_HOME_SHOPPING,
    payload: payload
  };
};