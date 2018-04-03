import { postUsingAjax } from 'common/api';
import transformKeys from 'common/transformKeys';

export const INITIATE_GET_HOME_TODO_REQUEST = 'INITIATE_GET_HOME_TODO_REQUEST';
export const GET_HOME_TODO_COMPLETED = 'GET_HOME_TODO_COMPLETED';
export const GET_HOME_TODO_FAILED = 'GET_HOME_TODO_FAILED';
export const GET_HOME_TODO_ERROR = 'GET_HOME_TODO_ERROR';
export const SET_HOME_TODOS = 'SET_HOME_TODOS';

export const getTodos = (params) => {
  return (dispatch) => {
    let url = `/api/advertisement`;
    dispatch(setHomeTodos({
      isFetching: true,
      error: ''
    }));
    let observable = postUsingAjax(url, params).map((res) => {
      let response = transformKeys.toLowerCase(res.response);
      return response;
    });
    return observable.toPromise().then((res) => {
      return dispatch(setHomeTodos({
        isFetching: false,
        todoList: res.data,
        count: res.adcount
      }));
    }).catch((err) => {
      return dispatch(setHomeTodos({
        isFetching: false,
        error: 'Something went wrong, Please try again'
      }));
    });
  };
};

export const initiateGetHomeTodo = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_HOME_TODO_REQUEST,
      isFetching: true,
      payload: payload
    });
  };
};

export const getHomeTodoCompleted = (todo) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_TODO_COMPLETED,
      todo: todo,
      isFetching: false
    });
  };
};

export const getHomeTodoFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_HOME_TODO_FAILED,
      isFetching: false
    });
  };
};

export const getHomeTodoError = (error) => {
  return dispatch => {
    dispatch({
      type: GET_HOME_TODO_ERROR,
      error: error
    });
  };
};

export const setHomeTodos = (payload) => {
  return {
    type: SET_HOME_TODOS,
    payload: payload
  };
};