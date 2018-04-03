import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';

import {postUsingAjax} from '../../common/api/index';
import transformKeys from '../../common/transformKeys/index';
import {
  INITIATE_GET_UNIT_BREADCRUMB_REQUEST,
  getUnitBreadcrumbCompleted,
  getUnitBreadcrumbFailed,
  getUnitBreadcrumbError
} from './breadcrumb.action';

const getUnitBreadcrumb = (action$, state) => {

  return action$
    .ofType(INITIATE_GET_UNIT_BREADCRUMB_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api//breadcrumb`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let breadcrumb = transformKeys.toCamelCase(res.response.DATA);
            return getUnitBreadcrumbCompleted(breadcrumb);
          } else {
            return getUnitBreadcrumbFailed();
          }
        })
        .catch(error => {
          state.dispatch(getUnitBreadcrumbFailed());
          state.dispatch(getUnitBreadcrumbError('Something went wrong while fetching summary details.'));
          return Observable.empty();
        })
    );
};

export const propertyBreadcrumbEpics = combineEpics(
  getUnitBreadcrumb
);
