import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReCaptcha from 'react-recaptcha';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {Redirect, Link} from 'react-router-dom';
import {
  Modal,
  Alert
} from 'react-bootstrap';

const {
  Header,
  Body,
} = Modal;

import {required} from "../../validator";
import Button from '../../components/button';

class ForgotPassword extends PureComponent {
  constructor() {
    super();
    this.state = {
      isFormValid: false,
      captchaValidated: false,
      formSubmitted: false,
    };

    this.goBack = this.goBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyCaptcha = this.verifyCaptcha.bind(this);
    this.setFormIsValid = this.setFormIsValid.bind(this);
  }

  componentWillUnmount() {
    this.props.passwordUpdateStatus('');
  }

  setFormIsValid(status) {
    this.setState({isFormValid: status});
  }

  verifyCaptcha(response) {
    response && this.setState({captchaValidated: true});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {captchaValidated, isFormValid} = this.state;
    this.form.validateAll();

    this.setState({formSubmitted: true});
    if (captchaValidated && isFormValid) {
      let values = this.form.getValues();
      let payload = {
        user_name: values['undefined'],
      };
      this.props.initiateForgotPasswordRequest(payload);
    }
  }

  goBack() {
    let {history} = this.props;
    history.push({
      pathname: '/'
    });
  }

  render() {
    const {isUpdating, isAuthenticated, passUpdateMsg} = this.props;
    const {captchaValidated, formSubmitted} = this.state;

    if (isAuthenticated) {
      return (
        <Redirect to="/dashboard"/>
      );
    }

    return (
      <Modal show onHide={this.goBack}>
        <Header closeButton>Reset your Password for VRGuest account</Header>
        <Body>
        <div className="auth-container">
          {passUpdateMsg === 'SUCCESS' ?
            <Alert bsStyle="success">
              Password Rest email has been sent tou your email address. Please follow instructions in your email to
              proceed further.
            </Alert>
            :
            <Form ref={c => this.form = c}>
              {passUpdateMsg === 'FAILED' && (
                <Alert bsStyle="danger">
                  Something went wrong while resetting password.
                </Alert>
              )}

              <div className="input-field s12">
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  checkerror={this.setFormIsValid}
                  validations={[required]}
                />
              </div>

              <div style={{margin: `15px 0`}}>
                <ReCaptcha
                  sitekey="6LeKG0MUAAAAAEjm6x_Y1ecZJUMXrpSfGwNVhYFA"
                  verifyCallback={this.verifyCaptcha}
                />
                {formSubmitted && !captchaValidated && <div style={{color: '#ef5f56'}}>Captcha validation missing.</div>}
              </div>

              <div className="clearfix">
                <div className="pull-right">
                  <div className="input-field s4">
                    <Button
                      showSpinner={isUpdating}
                      onClick={this.handleSubmit}
                      text="Reset Password"
                    />
                  </div>
                </div>

                <div className="pull-left">
                  <div className="input-field s12">
                    <span>
                      New to VRGuest?
                      <Link to="/register"> Register</Link>
                    </span>
                  </div>
                  <div className="input-field s12">
                    <Link to="/login"> Login</Link>
                  </div>
                </div>
              </div>
            </Form>
          }
        </div>
        </Body>
      </Modal>
    );
  }
}

ForgotPassword.propTypes = {
  initiateForgotPasswordRequest: PropTypes.func.isRequired,
  passwordUpdateStatus: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  passUpdateMsg: PropTypes.string.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  history: PropTypes.object
};

export default ForgotPassword;
