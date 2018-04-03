import {merge, get, isEmpty} from "lodash";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Popover, Alert} from 'react-bootstrap';
import {BeatLoader} from 'react-spinners';

import WizardPayment from '../wizard-payment';
import {getSvg} from '../../../common/svg-icons';

class WizardFourthStep extends Component {
  constructor() {
    super();
    this.state = {
      selectedBudget: 0,
      isPaymentShown: false,
      errorShow: false,
    };

    this.isValidated = this.isValidated.bind(this);
    this.validateCoupon = this.validateCoupon.bind(this);
    this.moveToPreviousStep = this.moveToPreviousStep.bind(this);
    this.toggleIsPaymentShown = this.toggleIsPaymentShown.bind(this);
  }

  componentWillMount() {
    this.props.setWizardCurrentStep(3);
  }

  moveToPreviousStep() {
    this.props.jumpToStep(2);
  }

  onBudgetSelect(selected) {
    this.setState({selectedBudget: selected, errorShow: false});
  }

  validateCoupon() {
    let couponCode = get(this, 'refs.couponCode.value');
    !isEmpty(couponCode) && this.props.initiateValidateWizardCoupon({"CouponCode": couponCode});
  }

  toggleIsPaymentShown(status) {
    this.setState({isPaymentShown: status});
  }

  isValidated() {
    const {stepsData, coupon} = this.props;
    const {selectedBudget} = this.state;
    let selectedPropsBudget = get(stepsData, 'ad_plan_id');
    let couponCode = get(this, 'refs.couponCode.value') || '';

    if ((selectedBudget || selectedPropsBudget) > 0) {
      let stepData = {'ad_plan_id': (selectedBudget || selectedPropsBudget), 'coupon_code': couponCode};
      if (!isEmpty(couponCode)) {
        if (get(coupon, 'validated')) {
          this.props.setWizardStepsData(merge(stepsData, stepData));
          this.props.jumpToStep(4);
        }
      } else {
        this.props.setWizardStepsData(merge(stepsData, stepData));
        this.toggleIsPaymentShown(true);
        this.setState({errorShow: false});
      }
    } else {
      this.setState({errorShow: true});
    }
  }

  render() {
    const {selectedBudget, isPaymentShown, errorShow} = this.state;
    const {stepsData, coupon} = this.props;
    let selectedPropsBudget = get(stepsData, 'ad_plan_id');
    let couponCode = get(this, 'refs.couponCode.value') || '';

    return (
      <div>
        {isPaymentShown ?
          <WizardPayment
            jumpToStep={this.props.jumpToStep}
            isPaymentShown={isPaymentShown}
            toggleIsPaymentShown={this.toggleIsPaymentShown}
          />
          :
          <div id="step-four" className="step">
            <h2><span>Choose your Service</span></h2>

            {errorShow && (
              <Alert bsStyle="danger">
                Please select your budget to proceed.
              </Alert>
            )}

            <div className="chec-out-pay">
              <h5>Select Budget</h5>
              <div className="row item">
                <input ref="pay1" name="group1" type="radio" id="pay1"
                       defaultChecked={(selectedBudget || selectedPropsBudget) === 1}/>
                <label htmlFor="pay1" className={((selectedBudget || selectedPropsBudget) === 1) ? "checked" : ""}
                       onClick={() => this.onBudgetSelect(1)}>
                  $5 Budget - $1 per click
                </label>
              </div>
              <div className="row item">
                <input ref="pay2" name="group1" type="radio" id="pay2"
                       defaultChecked={(selectedBudget || selectedPropsBudget) === 2}/>
                <label htmlFor="pay2" className={((selectedBudget || selectedPropsBudget) === 2) ? "checked" : ""}
                       onClick={() => this.onBudgetSelect(2)}>
                  $10 Budget - $.83 per click
                </label>
              </div>
              <div className="row item">
                <input ref="pay3" name="group1" type="radio" id="pay3"
                       defaultChecked={(selectedBudget || selectedPropsBudget) === 3}/>
                <label htmlFor="pay3" className={((selectedBudget || selectedPropsBudget) === 3) ? "checked" : ""}
                       onClick={() => this.onBudgetSelect(3)}>
                  $25 Budget - $.63 per click
                </label>
              </div>
              <div className="row item">
                <input ref="pay4" name="group1" type="radio" id="pay4"
                       defaultChecked={(selectedBudget || selectedPropsBudget) === 4}/>
                <label htmlFor="pay4" className={((selectedBudget || selectedPropsBudget) === 4) ? "checked" : ""}
                       onClick={() => this.onBudgetSelect(4)}>
                  $50 Budget - $.50 per click
                </label>
              </div>

              <h5 className="select-all">Select All</h5>
              <div className="row item">
                <input ref="pay5" name="group1" type="radio" id="pay5"
                       defaultChecked={(selectedBudget || selectedPropsBudget) === 5}/>
                <label htmlFor="pay5" className={((selectedBudget || selectedPropsBudget) === 5) ? "checked" : ""}
                       onClick={() => this.onBudgetSelect(5)}>
                  $499 per year
                  <br/>
                  3 cities, unlimited clicks
                  with 1,200 clicks guaranteed
                </label>
              </div>

              <h5 className="select-all">
                Add Promo Code
                <OverlayTrigger
                  trigger={["hover", "focus"]}
                  placement="top"
                  overlay={<Popover id="promo-coupon">With Free Promo code one city free for 2018.</Popover>}>
                  <span className="info-icon">{getSvg('info', 18, 18, '#636363')}</span>
                </OverlayTrigger>
              </h5>
              <div className="row item-promo">

                <div className="hom-cre-acc-left hom-cre-acc-right">
                  <form>
                    <div className="row">
                      <div className="input-field col s12">
                        <span style={{color: '#14A76C'}}>Try promo code "Free4year"</span>
                        <input
                          ref="couponCode"
                          defaultValue={get(stepsData, 'coupon_code')}
                          type="text"
                          onChange={this.validateCoupon}
                          className={"validate" + ((isEmpty(couponCode) && get(coupon, 'validated')) ? "valid" : "")}
                          placeholder={`Try promo code "Free4year"`}/>
                        {coupon.validating ?
                          <div className="calculation-spinner">
                            <BeatLoader
                              size={5}
                              color={'#0074E1'}
                              loading={coupon.validating}
                            />
                          </div>
                          :
                          <div className="error">
                            {(!isEmpty(couponCode) && !get(coupon, 'validated')) && `* Coupon code is not valid.`}
                          </div>
                        }
                      </div>
                    </div>
                  </form>
                </div>
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
        }
      </div>
    );
  }
}

WizardFourthStep.propTypes = {
  setWizardCurrentStep: PropTypes.func.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  setWizardStepsData: PropTypes.func.isRequired,
  initiateValidateWizardCoupon: PropTypes.func.isRequired,
  stepsData: PropTypes.object.isRequired,
  coupon: PropTypes.object.isRequired,
};

export default WizardFourthStep;
