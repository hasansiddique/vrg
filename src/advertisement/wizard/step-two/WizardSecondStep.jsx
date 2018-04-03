import {merge, get} from "lodash";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import storage from '../../../common/storage';

class WizardSecondStep extends Component {
  constructor() {
    super();
    this.state = {};

    this.isValidated = this.isValidated.bind(this);
    this.moveToPreviousStep = this.moveToPreviousStep.bind(this);
  }

  componentWillMount() {
    this.props.setWizardCurrentStep(1);
  }

  isValidated() {
    /*let user = storage.get('user');
    const {stepsData} = this.props;

    if (user) {
      this.props.setWizardStepsData(merge(stepsData, {deviceToken: get(user, 'devicetoken')}));
      this.props.jumpToStep(3);
      return true;
    } else {*/
    this.props.jumpToStep(2);
    return true;
    // }
  }

  moveToPreviousStep() {
    this.props.jumpToStep(0);
  }

  render() {
    const {uploadedImage} = this.props;
    return (
      <div id="step-two" className="center step">
        <h2><span>Wow! It looks great!</span></h2>

        <div className="row">
          {uploadedImage && <img src={uploadedImage.dataUrl} alt="" height={`250px`}/>}
        </div>

        <div className="footer-buttons">
          <button
            className="btn btn-next btn-primary btn-lg btn-previous"
            onClick={this.moveToPreviousStep}>
            Previous
          </button>

          <button
            className="btn btn-next btn-success btn-lg"
            onClick={this.isValidated}>
            Hook with Vacationers!
          </button>
        </div>
      </div>
    );
  }
}

WizardSecondStep.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
  stepsData: PropTypes.object.isRequired,
  uploadedImage: PropTypes.object.isRequired,
  setWizardStepsData: PropTypes.func.isRequired,
  setWizardCurrentStep: PropTypes.func.isRequired,
};

export default WizardSecondStep;
