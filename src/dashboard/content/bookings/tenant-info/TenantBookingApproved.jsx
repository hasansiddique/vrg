import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReCaptcha from 'react-recaptcha';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {BeatLoader} from 'react-spinners';

import {gt, required} from "common/validator";
import FontIcon from "../../../../common/components/font-icon";

class TenantBookingRejected extends Component {
  constructor() {
    super();
    this.state = {
      isFormValid: false,
      captchaValidated: false,
      formSubmitted: false,
    };

    this.goBack = this.goBack.bind(this);
    this.submitBooking = this.submitBooking.bind(this);
    this.setFormIsValid = this.setFormIsValid.bind(this);
    this.verifyCaptcha = this.verifyCaptcha.bind(this);
  }

  componentWillMount() {
    let key = Math.random().toString(36).substring(7);
    this.setState({randomCaptcha: key});
  }

  componentWillUnmount() {
    this.goBack();
  }

  goBack() {
    this.props.toggleTenantStatusClicked('');
    this.props.toggleTenantSubmittingReplyStatus('');
  }

  setFormIsValid(status) {
    this.setState({isFormValid: status});
  }

  submitBooking(event) {
    event.preventDefault();
    const {captchaValidated, isFormValid} = this.state;
    const {bookingId, encryptedConfirm} = this.props;
    this.form.validateAll();

    this.setState({formSubmitted: true});
    if (captchaValidated && isFormValid) {
      const values = this.form.getValues();
      let payload = {
        bookingID: bookingId,
        action: encryptedConfirm,
        signature: values['undefined'],
      };
      this.props.submitTenantBookingReply(payload);
    }
  }

  verifyCaptcha(response) {
    response && this.setState({captchaValidated: true});
  }

  render() {
    const {submittingReply} = this.props;
    const {captchaValidated, formSubmitted} = this.state;

    return (
      <Form ref={c => this.form = c}>
        <h3>Booking approval page for owner </h3>
        <p>Thank you for choosing to approve this booking.</p>
        <p>Please type your full name as a Signature to confirm this booking.</p>
        <table className="responsive-table bordered">
          <tbody>
          <tr>
            <td><strong>Signature :</strong></td>
            <td colSpan={2}>
              <Input
                id="signature"
                type="text"
                checkerror={this.setFormIsValid}
                validations={[required, gt]}
                minLength={6}/>
            </td>
          </tr>
          <tr>
            <td><strong>Security Code :</strong></td>
            <td colSpan={2}>
              <ReCaptcha
                sitekey="6LeKG0MUAAAAAEjm6x_Y1ecZJUMXrpSfGwNVhYFA"
                verifyCallback={this.verifyCaptcha}
              />
              {formSubmitted && !captchaValidated && <div className="error">Captcha validation missing.</div>}
            </td>
          </tr>
          </tbody>
        </table>
        <div className="db-mak-pay-bot">
          <button className="btn btn-default btn-lg" style={{marginRight: '15px'}} onClick={this.goBack}>
            <FontIcon size={'lg'} name={'arrow-left'}/> &nbsp;Back
          </button>

          {submittingReply ?
            <button className="btn btn-success btn-lg" disabled>
              <BeatLoader color={'#ffffff'} size={8} loading={submittingReply}/>
            </button>
            :
            <button className="btn btn-success btn-lg" onClick={this.submitBooking}>
              <FontIcon size={'lg'} name={'check'}/> &nbsp;Confirm This Booking
            </button>
          }
        </div>
      </Form>
    );
  }
}

TenantBookingRejected.propTypes = {
  toggleTenantSubmittingReplyStatus: PropTypes.func.isRequired,
  toggleTenantStatusClicked: PropTypes.func.isRequired,
  submitTenantBookingReply: PropTypes.func.isRequired,
  encryptedConfirm: PropTypes.string.isRequired,
  submittingReply: PropTypes.bool.isRequired,
  bookingId: PropTypes.number.isRequired,
};

export default TenantBookingRejected;
