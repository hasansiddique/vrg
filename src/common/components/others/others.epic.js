import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {postUsingAjax} from '../../api/index';
import transformKeys from '../../transformKeys/index';
import {
  INITIATE_GET_HOME_OTHERS_REQUEST,
  getHomeOthersCompleted,
  getHomeOthersFailed,
  getHomeOthersError
} from './others.action';

export const getAllHomeOthers = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_HOME_OTHERS_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/advertisement`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let restaurants = transformKeys.toCamelCase(res.response);
            return getHomeOthersCompleted(restaurants);
          } else {
            return getHomeOthersFailed();
          }
        })
        .catch(error => {
          state.dispatch(getHomeOthersError('Something went wrong while fetching restaurants.'));
          return Observable.empty();
        })
    );
};

export const restaurantEpics = combineEpics(
  getAllHomeOthers
);
