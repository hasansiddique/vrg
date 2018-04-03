import {connect} from 'react-redux';

import WizardFourthStep from './WizardFourthStep.jsx';
import {setWizardCurrentStep, setWizardStepsData, initiateValidateWizardCoupon} from "../wizard.action";

const mapStateToProps = state => ({
  stepsData: state.advertisement.adWizard.stepsData,
  coupon: state.advertisement.adWizard.coupon,
});

const mapDispatchToProps = dispatch => ({
  setWizardCurrentStep: (step) => dispatch(setWizardCurrentStep(step)),
  setWizardStepsData: (data) => dispatch(setWizardStepsData(data)),
  initiateValidateWizardCoupon: (payload) => dispatch(initiateValidateWizardCoupon(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardFourthStep);
