import {merge, zipObject, get} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import {email, required, gt, lt, password, checkFormErrors} from '../../../common/validator';

class WizardThirdStep extends Component {
  constructor() {
    super();

    this.isValidated = this.isValidated.bind(this);
    this.getStepsData = this.getStepsData.bind(this);
    this.moveToPreviousStep = this.moveToPreviousStep.bind(this);
  }

  componentWillMount() {
    this.props.setWizardCurrentStep(2);
  }

  moveToPreviousStep() {
    this.props.jumpToStep(1);
  }

  isValidated() {
    const {stepsData} = this.props;
    let form = this.form;
    form.validateAll();
    const formItems = form.state.byId;

    if (checkFormErrors(formItems)) {
      let stepData = this.getStepsData(form.getValues());
      this.props.setWizardStepsData(merge(stepsData, stepData));
      this.props.jumpToStep(3);
    }
  }

  getStepsData(formValues) {
    let keys = ["email", "user_id", "user_passwd", "user_passwd2", "first_name", "last_name", "company", "street", "city_state_zip", "country"];
    return zipObject(keys, formValues.undefined);
  }

  render() {
    const {stepsData} = this.props;

    return (
      <div id="step-three" className="step">
        <h2><span>Contact information</span></h2>

        <div className="hom-cre-acc-left hom-cre-acc-right">
          <div>
            <Form ref={c => this.form = c} onSubmit={this.isValidated}>
              <div className="row">
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'email')}
                    id="adEmail"
                    type="email"
                    validations={[required, email]}
                    className="validate"
                    placeholder="Your Email"/>
                </div>
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'user_id')}
                    id="adUserId"
                    type="text"
                    validations={[required, gt]}
                    minLength={6}
                    className="validate"
                    placeholder="Your User Id"/>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'user_passwd')}
                    id="adPass"
                    type="password"
                    validations={[required, lt]}
                    minLength={8}
                    className="validate"
                    placeholder="Your password(min 8 character)"/>
                </div>
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'user_passwd2')}
                    id="adPassC"
                    validations={[required, lt, password]}
                    minLength={8}
                    type="password"
                    className="validate"
                    placeholder="Confirm your password"/>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'first_name')}
                    id="adFName"
                    validations={[required, lt]}
                    minLength={6}
                    type="text"
                    className="validate"
                    placeholder="First Name"/>
                </div>
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'last_name')}
                    id="adLName"
                    validations={[required, lt]}
                    minLength={6}
                    type="text"
                    className="validate"
                    placeholder="Last Name"/>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'company')}
                    id="adCompany"
                    validations={[required]}
                    type="text"
                    className="validate"
                    placeholder="Your Company"/>
                </div>
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'street')}
                    id="adAddress"
                    validations={[required]}
                    type="text"
                    className="validate"
                    placeholder="Street Address"/>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'city_state_zip')}
                    id="adZip"
                    validations={[required]}
                    type="text"
                    className="validate"
                    placeholder="State/City Zip Code"/>
                </div>
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'country')}
                    id="adCountry"
                    validations={[required]}
                    type="text"
                    className="validate"
                    placeholder="Your Country"/>
                </div>
              </div>
            </Form>
          </div>
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
            Next
          </button>
        </div>

      </div>
    );
  }
}

WizardThirdStep.propTypes = {
  setWizardCurrentStep: PropTypes.func.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  setWizardStepsData: PropTypes.func.isRequired,
  stepsData: PropTypes.object.isRequired,
};

export default WizardThirdStep;
