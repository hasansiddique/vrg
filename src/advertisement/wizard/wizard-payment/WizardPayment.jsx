import {get, merge, zipObject} from "lodash";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-select';

import {required, checkFormErrors} from '../../../common/validator';
import {cardExpMonthOptions, cardExpYearOptions, cardTypeOptions} from './select-options';

class WizardPayment extends Component {
  constructor() {
    super();
    this.state = {
      selectedCardType: 'Visa',
      selectedCardExpMonth: 1,
      selectedCardExpYear: 2018,
    };

    this.isValidated = this.isValidated.bind(this);
    this.getStepsData = this.getStepsData.bind(this);
    this.selectedCardType = this.selectedCardType.bind(this);
    this.moveToPreviousStep = this.moveToPreviousStep.bind(this);
    this.selectedCardExpYear = this.selectedCardExpYear.bind(this);
    this.selectedCardExpMonth = this.selectedCardExpMonth.bind(this);
  }

  selectedCardType(value) {
    this.setState({selectedCardType: value});
  }

  selectedCardExpMonth(value) {
    this.setState({selectedCardExpMonth: value});
  }

  selectedCardExpYear(value) {
    this.setState({selectedCardExpYear: value});
  }

  moveToPreviousStep() {
    this.props.toggleIsPaymentShown(false);
  }

  isValidated() {
    const {stepsData} = this.props;
    const {selectedCardType, selectedCardExpMonth, selectedCardExpYear} = this.state;
    let form = this.form;
    form.validateAll();
    const formItems = form.state.byId;

    if (checkFormErrors(formItems)) {
      let stepData = this.getStepsData(form.getValues());
      merge(stepData, {'cctype': selectedCardType, 'mm': selectedCardExpMonth, 'yy': selectedCardExpYear});
      this.props.setWizardStepsData(merge(stepsData, stepData));
      this.props.jumpToStep(4);
    }
  }

  getStepsData(formValues) {
    let keys = ["ccname", "ccnumber", "cvn"];
    return zipObject(keys, formValues.undefined);
  }

  render() {
    const {stepsData} = this.props;

    return (
      <div id="wizard-payment" className="step">
        <h2><span>Payment information</span></h2>

        <div className="hom-cre-acc-left hom-cre-acc-right">
          <div>
            <Form ref={c => this.form = c} onSubmit={this.isValidated}>
              <div className="row">
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'ccname')}
                    id="pyCardName"
                    type="text"
                    validations={[required]}
                    className="validate"
                    placeholder="Name on card"/>
                </div>
                <div className="input-field col s6">
                  <Select
                    name="card-type"
                    validations={[required]}
                    clearable={false}
                    multi={false}
                    onChange={this.selectedCardType}
                    options={cardTypeOptions}
                    placeholder={'Card Type'}
                    value={get(stepsData, 'cctype') || this.state.selectedCardType}
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <Select
                    name="card-exp-month"
                    validations={[required]}
                    clearable={false}
                    multi={false}
                    onChange={this.selectedCardExpMonth}
                    options={cardExpMonthOptions}
                    placeholder={'Card Expiration Month'}
                    value={get(stepsData, 'mm') || this.state.selectedCardExpMonth}
                  />
                </div>
                <div className="input-field col s6">
                  <Select
                    name="card-exp-year"
                    validations={[required]}
                    clearable={false}
                    multi={false}
                    onChange={this.selectedCardExpYear}
                    options={cardExpYearOptions}
                    placeholder={'Card Expiration Year'}
                    value={get(stepsData, 'yy') || this.state.selectedCardExpYear}
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'ccnumber')}
                    id="adFName"
                    validations={[required]}
                    type="number"
                    className="validate"
                    placeholder="Credit Card Number"/>
                </div>
                <div className="input-field col s6">
                  <Input
                    value={get(stepsData, 'cvn')}
                    id="adLName"
                    validations={[required]}
                    type="number"
                    className="validate"
                    placeholder="CVV Number"/>
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

WizardPayment.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
  setWizardStepsData: PropTypes.func.isRequired,
  toggleIsPaymentShown: PropTypes.func.isRequired,
  stepsData: PropTypes.object.isRequired,
};

export default WizardPayment;
