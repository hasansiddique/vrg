import {connect} from 'react-redux';

import WizardFifthStep from './WizardFifthStep.jsx';
import {setWizardCurrentStep, setWizardStepsData} from "../wizard.action";

const mapStateToProps = state => ({
  searchedLocation: state.home.search.searchedLocation,
  stepsData: state.advertisement.adWizard.stepsData,
  destinationGID: state.destination.id,
});

const mapDispatchToProps = dispatch => ({
  setWizardCurrentStep: (step) => dispatch(setWizardCurrentStep(step)),
  setWizardStepsData: (data) => dispatch(setWizardStepsData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardFifthStep);
