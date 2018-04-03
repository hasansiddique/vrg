import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {postUsingAjax} from '../../api/index';
import transformKeys from '../../transformKeys/index';
import {
  INITIATE_GET_HOME_RESTAURANTS_REQUEST,
  getHomeRestaurantsCompleted,
  getHomeRestaurantsFailed,
  getHomeRestaurantsError
} from './restaurant.action';

export const getAllHomeRestaurants = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_HOME_RESTAURANTS_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/advertisement`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let restaurants = transformKeys.toCamelCase(res.response);
            return getHomeRestaurantsCompleted(restaurants);
          } else {
            return getHomeRestaurantsFailed();
          }
        })
        .catch(error => {
          state.dispatch(getHomeRestaurantsError('Something went wrong while fetching restaurants.'));
          return Observable.empty();
        })
    );
};

export const restaurantEpics = combineEpics(
  getAllHomeRestaurants
);
