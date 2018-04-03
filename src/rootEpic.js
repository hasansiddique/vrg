import {combineEpics} from 'redux-observable';

//epics
import {homeEpics} from './home/home.epic';
import {searchEpics} from './search/search.epic';
import {destinationEpics} from './destination/destination.epic';
import {listedPropertyEpics} from './listed-property/lisited-property.epic';
import {authenticationEpics} from './common/authentication/authentication.epic';
import {wizardEpics} from './advertisement/wizard/wizard.epic';
import {advertiserDashboardEpics} from './dashboard/dashboard.epic';
import {allListingsEpics} from './common/components/all-listings/all-listings.epic';

const epics = combineEpics(
  homeEpics,
  listedPropertyEpics,
  searchEpics,
  authenticationEpics,
  wizardEpics,
  advertiserDashboardEpics,
  destinationEpics,
  allListingsEpics
);

export default epics;
