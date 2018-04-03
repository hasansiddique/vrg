import {connect} from 'react-redux';

import WizardSixthStep from './WizardSixthStep.jsx';
import {
  setWizardCurrentStep,
  initiateFormSubmission,
} from "./../wizard.action";

const mapStateToProps = state => ({
  stepsData: state.advertisement.adWizard.stepsData,
  submitting: state.advertisement.adWizard.submitting,
  uploadedImage: state.advertisement.adWizard.uploadedImage,
});

const mapDispatchToProps = dispatch => ({
  setWizardCurrentStep: (step) => dispatch(setWizardCurrentStep(step)),
  initiateFormSubmission: (payload) => dispatch(initiateFormSubmission(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardSixthStep);
