import {connect} from 'react-redux';

import AdWizard from './AdWizard.jsx';

const mapStateToProps = state => ({
  wizardCurrentStep: state.advertisement.adWizard.wizardCurrentStep,
  submitting: state.advertisement.adWizard.submitting,
});

export default connect(mapStateToProps)(AdWizard);
