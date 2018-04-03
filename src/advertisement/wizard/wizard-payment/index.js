import {connect} from 'react-redux';

import WizardPayment from './WizardPayment.jsx';
import {setWizardCurrentStep, setWizardStepsData} from "../wizard.action";

const mapStateToProps = state => ({
  stepsData: state.advertisement.adWizard.stepsData,
});

const mapDispatchToProps = dispatch => ({
  setWizardCurrentStep: (step) => dispatch(setWizardCurrentStep(step)),
  setWizardStepsData: (data) => dispatch(setWizardStepsData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardPayment);
