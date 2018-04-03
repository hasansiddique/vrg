import {merge, get} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import storage from "../../../common/storage";
import {getSvg} from "../../../common/svg-icons";
import Button from '../../../common/components/button';

class WizardSixthStep extends Component {
  constructor() {
    super();
    this.state = {};

    this.isValidated = this.isValidated.bind(this);
    this.moveToPreviousStep = this.moveToPreviousStep.bind(this);
  }

  componentWillMount() {
    this.props.setWizardCurrentStep(4);
  }

  moveToPreviousStep() {
    this.props.jumpToStep(3);
  }

  isValidated() {
    const {stepsData, uploadedImage} = this.props;
    merge(stepsData, {
      ad_category_id: get(stepsData, 'ad_category_id.value'),
      picture: get(uploadedImage, 'raw'),
    });
    let formData = new FormData();
    for (let key in stepsData) {
      formData.append(key, stepsData[key]);
    }
    this.props.initiateFormSubmission(formData);
  }

  render() {
    const {submitting} = this.props;

    return (
      <div id="step-six" className="step">

        <div className="final-text">
          {getSvg('tickRound', 40, 40, '#41AD49')} Congratulations! your form is Ready to Post.
        </div>

        <div className="footer-buttons">
          <button
            className="btn btn-next btn-primary btn-lg btn-previous"
            onClick={this.moveToPreviousStep}>
            Previous
          </button>

          <Button
            showSpinner={submitting}
            style={{
              border: `1px solid #4caf50`,
              borderRadius: `6px`,
              backgroundColor: `#4caf50`,
              height: `50px`,
              padding: `10px 16px`,
              fontSize: `18px`,
              lineHeight: `1.3333333`,
              fontWeight: `normal`,
              boxShadow: `inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075)`,
              textShadow: `0 -1px 0 rgba(0, 0, 0, .2)`,
            }}
            onClick={this.isValidated}
            text={'Post Ad'}
          />
        </div>
      </div>
    );
  }
}

WizardSixthStep.propTypes = {
  setWizardCurrentStep: PropTypes.func.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  initiateFormSubmission: PropTypes.func.isRequired,
  uploadedImage: PropTypes.object.isRequired,
  stepsData: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default WizardSixthStep;
