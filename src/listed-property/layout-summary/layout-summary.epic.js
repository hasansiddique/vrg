import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';

import {postUsingAjax} from '../../common/api/index';
import transformKeys from '../../common/transformKeys/index';
import {
  INITIATE_GET_UNIT_SUMMARY_REQUEST,
  getUnitSummaryCompleted,
  getUnitSummaryFailed,
  getUnitSummaryError
} from './layout-summary.action';

const getUnitSummary = (action$, state) => {
  return action$
    .ofType(INITIATE_GET_UNIT_SUMMARY_REQUEST)
    .switchMap(action =>
      postUsingAjax(`/api/layout_summary`, action.payload)
        .map(res => {
          if (res.status === 200) {
            let summaryInfo = transformKeys.toCamelCase(res.response.DATA);
            return getUnitSummaryCompleted(summaryInfo);
          } else {
            return getUnitSummaryFailed();
          }
        })
        .catch(error => {
          state.dispatch(getUnitSummaryFailed());
          state.dispatch(getUnitSummaryError('Something went wrong while fetching summary details.'));
          return Observable.empty();
        })
    );
};

export const propertySummaryEpics = combineEpics(
  getUnitSummary
);
