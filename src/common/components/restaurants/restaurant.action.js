import { postUsingAjax } from 'common/api';
import transformKeys from 'common/transformKeys';

export const INITIATE_GET_HOME_RESTAURANTS_REQUEST = 'INITIATE_GET_HOME_RESTAURANTS_REQUEST';
export const GET_HOME_RESTAURANTS_COMPLETED = 'GET_HOME_RESTAURANTS_COMPLETED';
export const GET_HOME_RESTAURANTS_FAILED = 'GET_HOME_RESTAURANTS_FAILED';
export const GET_HOME_RESTAURANTS_ERROR = 'GET_HOME_RESTAURANTS_ERROR';
export const SET_HOME_RESTAURANTS = 'SET_HOME_RESTAURANTS';

export const getResturants = (params) => {
  return (dispatch) => {
    let url = `/api/advertisement`;
    dispatch(setHomeRestaurants({
      isFetching: true,
      error: ''
    }));
    let observable = postUsingAjax(url, params).map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    });
    return observable.toPromise().then((res) => {
      return dispatch(setHomeRestaurants({
        isFetching: false,
        restaurantList: res.data,
        count: res.adcount
      }));
    }).catch((err) => {
      return dispatch(setHomeRestaurants({
        isFetching: false,
        error: 'Something went wrong, Please try again'
      }));
    });
  };
};

export const initiateGetHomeRestaurants = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_HOME_RESTAURANTS_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getHomeRestaurantsCompleted = (restaurants) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_RESTAURANTS_COMPLETED,
      restaurants: restaurants,
      isFetching: false
    });
  };
};

export const getHomeRestaurantsFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_HOME_RESTAURANTS_FAILED,
      isFetching: false
    });
  };
};

export const getHomeRestaurantsError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_RESTAURANTS_ERROR,
      error: error
    });
  };
};

export const setHomeRestaurants = (payload) => {
  return {
    type: SET_HOME_RESTAURANTS,
    payload: payload
  };
};
