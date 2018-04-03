import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {postUsingAjax} from '../../api/index';
import transformKeys from '../../transformKeys/index';
import {
  INITIATE_GET_HOME_TRANSPORTATION_REQUEST,
  getHomeTransportationCompleted,
  getHomeTransportationFailed,
  getHomeTransportationError
} from './transportation.action';

export const getAllHomeTransportation = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_HOME_TRANSPORTATION_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/advertisement`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let transportation = transformKeys.toCamelCase(res.response);
            return getHomeTransportationCompleted(transportation);
          } else {
            return getHomeTransportationFailed();
          }
        })
        .catch(error => {
          state.dispatch(getHomeTransportationError('Something went wrong while fetching todos.'));
          return Observable.empty();
        })
    );
};

export const transportationEpics = combineEpics(
  getAllHomeTransportation
);
