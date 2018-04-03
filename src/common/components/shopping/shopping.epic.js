import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {postUsingAjax} from '../../api/index';
import transformKeys from '../../transformKeys/index';
import {
  INITIATE_GET_HOME_SHOPPING_REQUEST,
  getHomeShoppingCompleted,
  getHomeShoppingFailed,
  getHomeShoppingError
} from './shopping.action';

export const getAllHomeShopping = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_HOME_SHOPPING_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/advertisement`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let shopping = transformKeys.toCamelCase(res.response);
            return getHomeShoppingCompleted(shopping);
          } else {
            return getHomeShoppingFailed();
          }
        })
        .catch(error => {
          state.dispatch(getHomeShoppingError('Something went wrong while fetching todos.'));
          return Observable.empty();
        })
    );
};

export const shoppingEpics = combineEpics(
  getAllHomeShopping
);
