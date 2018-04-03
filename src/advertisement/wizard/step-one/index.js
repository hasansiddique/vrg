import {connect} from 'react-redux';

import WizardFirstStep from './WizardFirstStep.jsx';
import {
  setWizardUploadedImage,
  setWizardStepsData,
  getAdCategoryList,
  setWizardCurrentStep
} from "./../wizard.action";

const mapStateToProps = state => ({
  adCategoryList: state.advertisement.adWizard.adCategoryList,
  stepsData: state.advertisement.adWizard.stepsData,
  uploadedImage: state.advertisement.adWizard.uploadedImage,
  fetchingList: state.advertisement.adWizard.fetchingList,
  currentUser: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  setWizardUploadedImage: (image) => dispatch(setWizardUploadedImage(image)),
  setWizardStepsData: (data) => dispatch(setWizardStepsData(data)),
  getAdCategoryList: () => dispatch(getAdCategoryList()),
  setWizardCurrentStep: (step) => dispatch(setWizardCurrentStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardFirstStep);
