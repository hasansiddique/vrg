import {combineReducers} from 'redux';

// reducers
import adWizard from './wizard/wizard.reducer';

const advertisement = combineReducers({
  adWizard,
});

export default advertisement;
