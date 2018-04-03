import {connect} from 'react-redux';

import WizardSecondStep from './WizardSecondStep.jsx';
import {setWizardCurrentStep, setWizardStepsData} from "../wizard.action";

const mapStateToProps = state => ({
  stepsData: state.advertisement.adWizard.stepsData,
  uploadedImage: state.advertisement.adWizard.uploadedImage,
});

const mapDispatchToProps = dispatch => ({
  setWizardCurrentStep: (step) => dispatch(setWizardCurrentStep(step)),
  setWizardStepsData: (data) => dispatch(setWizardStepsData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardSecondStep);
