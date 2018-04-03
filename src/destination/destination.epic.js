import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {postUsingAjax} from 'common/api/index';
import transformKeys from 'common/transformKeys';
import {
  INITIATE_GET_DESTINATION,
  INITIATE_GET_DESTINATION_PROPERTIES,
  getDestinationCompleted,
  getDestinationFailed,
  getDestinationError,
  getDestinationPropertiesCompleted,
  getDestinationPropertiesFailed,
  getDestinationPropertiesError
} from './destination.action';

export const getDestination = (action$, state) => {
  return action$
    .ofType(INITIATE_GET_DESTINATION)
    .switchMap((action) => {
      let params = {};
      if (action.path) {
        params.URL_NAME = action.path;
        if (!action.search_type) {
          params.search_type = 2;
        } else {
          params.search_type = action.search_type;
        }
      }
      return postUsingAjax(`/api/drilldown`, params)
        .map(res => {
          if (res.status === 200) {
            let response = transformKeys.toCamelCase(res.response);
            return getDestinationCompleted(response.data.drilldown, response.data.destdrill);
          } else {
            state.dispatch(getDestinationFailed());
            return Observable.empty();
          }
        })
        .catch(error => {
          state.dispatch(getDestinationError('Something went wrong while fetching todos.'));
          return Observable.empty();
        });
    });
};

export const getDestinationProperties = (action$, state) => {
  return action$
    .ofType(INITIATE_GET_DESTINATION_PROPERTIES)
    .switchMap((action) => {
      let params = action.params;
      return postUsingAjax(`/api/featured_properties`, params)
        .map(res => {
          if (res.status === 200) {
            let response = transformKeys.toCamelCase(res.response);
            return getDestinationPropertiesCompleted(response.data);
          } else {
            state.dispatch(getDestinationPropertiesFailed());
            return Observable.empty();
          }
        })
        .catch(error => {
          state.dispatch(getDestinationPropertiesError('Something went wrong while fetching todos.'));
          return Observable.empty();
        });
    });
};

export const destinationEpics = combineEpics(
  getDestination,
  getDestinationProperties
);
