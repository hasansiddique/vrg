import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReCaptcha from 'react-recaptcha';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {Redirect, Link} from 'react-router-dom';
import {
  Modal,
  Alert,
} from 'react-bootstrap';

const {
  Header,
  Body,
} = Modal;

import Button from '../../components/button';
import {required} from '../../validator';

class Login extends PureComponent {
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

  // componentWillUnmount() {
  //   this.props.loginInfoFailed('');
  // }

  handleSubmit(event) {
    event.preventDefault();
    const {captchaValidated, isFormValid} = this.state;
    this.form.validateAll();

    this.setState({formSubmitted: true});
    if (captchaValidated && isFormValid) {
      let values = this.form.getValues();
      values = values['undefined'];
      let payload = {
        username: values[0],
        password: values[1],
      };
      this.props.initiateLoginInfo(payload);
    }
  }

  setFormIsValid(status) {
    this.setState({isFormValid: status});
  }

  verifyCaptcha(response) {
    response && this.setState({captchaValidated: true});
  }

  goBack() {
    let {history} = this.props;
    history.push({
      pathname: '/'
    });
  }

  render() {
    const {isLogging, isAuthenticated, errorLogin} = this.props;
    const {captchaValidated, formSubmitted} = this.state;

    if (isAuthenticated) {
      return (
        <Redirect to="/dashboard"/>
      );
    }

    return (
      <Modal show onHide={this.goBack}>
        <Header closeButton>Login to your VRGuest account</Header>
        <Body>
        <div className="auth-container">
          {errorLogin && (
            <Alert bsStyle="danger">
              Please provide valid credentials for login.
            </Alert>
          )}
          <Form ref={c => this.form = c}>

            <div className="input-field s12">
              <Input
                id="username"
                type="text"
                placeholder="Username"
                checkerror={this.setFormIsValid}
                validations={[required]}
              />
            </div>

            <div className="input-field s12">
              <Input
                id="password"
                type="password"
                placeholder="Password"
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
                    showSpinner={isLogging}
                    onClick={this.handleSubmit}
                    text="Login"
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
                  <Link to="/forgot-password"> Forgot password</Link>
                </div>
              </div>
            </div>
          </Form>
        </div>
        </Body>
      </Modal>
    );
  }
}

Login.propTypes = {
  initiateLoginInfo: PropTypes.func.isRequired,
  loginInfoFailed: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorLogin: PropTypes.string.isRequired,
  isLogging: PropTypes.bool.isRequired,
  history: PropTypes.object
};

export default Login;
