import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {postUsingAjax} from '../../api/index';
import transformKeys from '../../transformKeys/index';
import {
  INITIATE_GET_HOME_PROPERTIES_REQUEST,
  getHomePropertiesCompleted,
  getHomePropertiesFailed,
  getHomePropertiesError
} from './properties.action';

export const getAllHomeProperties = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_HOME_PROPERTIES_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/featured_properties`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let todos = transformKeys.toCamelCase(res.response);
            return getHomePropertiesCompleted(todos);
          } else {
            return getHomePropertiesFailed();
          }
        })
        .catch(error => {
          getHomePropertiesError('Something went wrong while fetching properties.');
          return Observable.empty();
        })
    );
};

export const propertiesEpics = combineEpics(
  getAllHomeProperties
);
