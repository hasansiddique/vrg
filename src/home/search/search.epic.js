import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {getUsingAjax, postUsingAjax} from '../../common/api/index';
import transformKeys from '../../common/transformKeys';
import {
  FETCH_LOCATIONS_LIST,
  INITIATE_SEARCH_FOR_LOCATIONS,
  updateLocationsList
} from './search.action';
import {transformLocations} from './search.utils';

const searchForLocations = (action$, state) => {
  return action$
    .ofType(INITIATE_SEARCH_FOR_LOCATIONS)
    .switchMap(action =>
      postUsingAjax(`/mock/search/${action.payload.city}`)
        .map(res => {
          if (res.status === 200) {
            let data = transformKeys.toCamelCase(res.response);
            return data;
          } else {
            return [];
          }
        })
        .catch(error => {
          return Observable.empty();
        })
    );
};

const fetchLocationsList = (action$, state) => {
  return action$
    .ofType(FETCH_LOCATIONS_LIST)
    .switchMap(action =>
      getUsingAjax(`/aws/geodata/json/th_destinations.json`)
        .map(res => {
          if (res.status === 200) {
            let locations = transformKeys.toCamelCase(res.response.results);
            return updateLocationsList(transformLocations(locations));
          } else {
            return updateLocationsList([]);
          }
        })
        .catch(error => {
           return Observable.empty();
        })
    );
};

export const searchEpics = combineEpics(
  searchForLocations,
  fetchLocationsList
);
