import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {getUsingAjax, postUsingAjax, postFormData} from 'common/api/index';
import transformKeys from 'common/transformKeys/index';
import {
  INITIATE_GET_HOME_TRAVEL_STARS_REQUEST,
  getHomeTravelStarsCompleted,
  getHomeTravelStarsFailed,
  getHomeTravelStarsError,
  travelStarErrorAction
} from './travel-stars.action';

export const getAllHomeTravelStars = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_HOME_TRAVEL_STARS_REQUEST)
    .switchMap((action) => {
        let url = `/travel-star`;
        let destinationType = 'related-post-by-json';
        if (action.params.destinationType == 'city') {
          destinationType = 'city-json';
        } else if (action.params.destinationType == 'state') {
          destinationType = 'state-json';
        } else if (action.params.destinationType == 'country') {
          destinationType = 'country-json';
        } else if (action.params.destinationType == 'continent') {
          destinationType = 'continent-json';
        } else if (action.params.destinationType == 'state_region') {
          destinationType = 'region-json';
        }
        url += `/${destinationType}/`;
        let params = {};
        if (action.params.destName) {
          params.destName = action.params.destName;
        }
        let formData = new FormData;
        for(let key in params){
          formData.append(key, params[key]);
        }
        return postFormData(url, formData)
          .map(res => {
            if (res.status === 200) {
              let todos = transformKeys.toCamelCase(res.response);
              return getHomeTravelStarsCompleted(todos);
            } else {
              return getHomeTravelStarsFailed();
            }
          })
          .catch(error => {
            state.dispatch(getHomeTravelStarsError('Something went wrong while fetching travel stars.'));
            return Observable.empty();
          });
      }
    ).catch((err, observer) => {
      state.dispatch(travelStarErrorAction('Something went wrong while fetching travel-stars'));
      return observer;
    });
};

export const travelStarEpics = combineEpics(
  getAllHomeTravelStars
);
