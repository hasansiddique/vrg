import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import MultiStep from 'react-stepzilla';
import {ModalHeader} from 'react-bootstrap';

import WizardFirstStep from './step-one';
import WizardSecondStep from './step-two';
import WizardThirdStep from './step-three';
import WizardFourthStep from './step-four';
import WizardFifthStep from './step-five';
import WizardSixthStep from './step-six';

class AdWizard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {wizardCurrentStep, submitting} = this.props;
    const steps = [
      {name: 'Create Ad', component: <WizardFirstStep/>},
      {name: 'Ad Image', component: <WizardSecondStep/>},
      // {name: 'Contact Info', component: <WizardThirdStep/>},
      {name: 'Location', component: <WizardFifthStep/>},
      {name: 'Budget', component: <WizardFourthStep/>},
      {name: 'Complete!', component: <WizardSixthStep/>},
    ];

    return (
      <div className="step-progress" id="ad-wizard">
        <ModalHeader closeButton>&nbsp;</ModalHeader>
        {submitting === 'success' ?
          <div className="text-center">
            <img src="/images/success.svg" alt="Success" height={125} style={{border: 'none'}}/>
            <h3 style={{color: '#2bb673', fontSize: '24px', borderBottom: 'none'}}>
              Your advertisement has been posted successfully!
            </h3>
          </div>
          :
          <MultiStep
            startAtStep={wizardCurrentStep}
            showNavigation={false}
            stepsNavigation={false}
            nextTextOnFinalActionStep={"Post Ad"}
            steps={steps}/>
        }
      </div>
    );
  }
}

AdWizard.propTypes = {
  wizardCurrentStep: PropTypes.number.isRequired,
};

export default AdWizard;
