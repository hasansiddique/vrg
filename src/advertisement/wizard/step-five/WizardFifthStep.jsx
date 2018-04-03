import {get, merge, isEmpty} from "lodash";
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SearchDestination from '../../../home/search/destinations';

class WizardFourthStep extends Component {
  constructor() {
    super();
    this.state = {
      renewal: 1,
      stepValidated: false
    };

    this.isValidated = this.isValidated.bind(this);
    this.onRenewalSelect = this.onRenewalSelect.bind(this);
    this.moveToPreviousStep = this.moveToPreviousStep.bind(this);
  }

  componentWillMount() {
    this.props.setWizardCurrentStep(2);
  }

  onRenewalSelect(value) {
    this.setState({renewal: value});
  }

  moveToPreviousStep() {
    this.props.jumpToStep(1);
  }

  isValidated() {
    const {renewal} = this.state;
    const {stepsData, searchedLocation, destinationGID} = this.props;
    let propsRenewal = get(stepsData, 'auto_renew');
    this.setState({stepValidated: true});

    if (!(isEmpty(searchedLocation.label) && isEmpty(destinationGID))) {
      let stepData = {'auto_renew': (propsRenewal || renewal), 'Global_Destination_ID': destinationGID};
      this.props.setWizardStepsData(merge(stepsData, stepData));
      this.props.jumpToStep(3);
      this.setState({stepValidated: false});
    }
  }

  render() {
    const {renewal, stepValidated} = this.state;
    const {stepsData, searchedLocation} = this.props;
    let propsRenewal = get(stepsData, 'auto_renew');
    let isCouponCode = !isEmpty(get(stepsData, 'coupon_code'));

    return (
      <div id="step-five" className="step">
        <h2><span>Choose your Ad City</span></h2>

        <div className="hom-cre-acc-left hom-cre-acc-right">
          <div className="error">{(stepValidated && isEmpty(searchedLocation)) && `* Ad city is required.`}</div>
          <SearchDestination
            getGIDonChange
            noResultsText={'Location is not available.'}
            placeholder={'Type location where you want to place your ad'}/>
        </div>

        {isCouponCode && (
          <div className="chec-out-pay">
            <h5>Auto Renew</h5>
            <div className="row item">
              <input ref="renew" name="renew" type="radio" id="renew"
                     defaultChecked={((propsRenewal || renewal) === 1) ? "checked" : ""}/>
              <label htmlFor="renew"
                     className={((propsRenewal || renewal) === 1) ? "checked" : ""}
                     onClick={() => this.onRenewalSelect(1)}>
                Yes, Auto Renew my ad and keep my position in CIty page.
              </label>
            </div>

            <div className="row item">
              <input ref="noRenew" name="renew" type="radio" id="noRenew"
                     defaultChecked={((propsRenewal || renewal) === 0) ? "checked" : ""}/>
              <label htmlFor="noRenew"
                     className={((propsRenewal || renewal) === 0) ? "checked" : ""}
                     onClick={() => this.onRenewalSelect(0)}>
                $5 Budget - $1 per click
              </label>
            </div>
          </div>
        )}

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

WizardFourthStep.propTypes = {
  setWizardCurrentStep: PropTypes.func.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  setWizardStepsData: PropTypes.func.isRequired,
  initiateGetDestination: PropTypes.func.isRequired,
  stepsData: PropTypes.object.isRequired,
  searchedLocation: PropTypes.string,
  destinationGID: PropTypes.number,
};

export default WizardFourthStep;
