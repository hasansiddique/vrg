import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {postUsingAjax} from '../../api';
import transformKeys from '../../transformKeys';
import {
  INITIATE_GET_HOME_TODO_REQUEST,
  getHomeTodoCompleted,
  getHomeTodoFailed,
  getHomeTodoError
} from './todo.action';

export const getAllHomeTodos = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_HOME_TODO_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/advertisement`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let todos = transformKeys.toCamelCase(res.response);
            return getHomeTodoCompleted(todos);
          } else {
            return getHomeTodoFailed();
          }
        })
        .catch(error => {
          state.dispatch(getHomeTodoError('Something went wrong while fetching todos.'));
          return Observable.empty();
        })
    );
};

export const todoEpics = combineEpics(
  getAllHomeTodos
);
