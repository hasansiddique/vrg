import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import RegisterForm from './RegisterForm.jsx';
import {
  Modal
} from 'react-bootstrap';

const {
  Header,
  Body
} = Modal;

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      captchaValidated: false,
      formSubmitted: false,
    };

    this.goBack = this.goBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyCaptcha = this.verifyCaptcha.bind(this);
  }

  closeModal() {
    this.props.closeModal();
  }

  verifyCaptcha(response) {
    response && this.setState({captchaValidated: true});
  }

  handleSubmit(values, setSubmitting) {
    let {registerOwner} = this.props;
    this.setState({formSubmitted: true});

    if (this.state.captchaValidated) {
      setSubmitting(true);
      let promise = registerOwner(values);
      promise.then(() => {
        setSubmitting(false);
      }).catch(() => {
        setSubmitting(false);
      });
    }
  }

  goBack() {
    let {history} = this.props;
    history.push({
      pathname: '/'
    });
  }

  render() {
    const {registerError, ownerCreated, getCountries, getStates, getCities} = this.props;

    return (
      <Modal show onHide={this.goBack} bsSize={'lg'}>
        <Header closeButton>
          <strong>Register</strong>
        </Header>
        <Body>
        {ownerCreated ?
          <div className="alert alert-success">
            Account Created Successfully. You can now <Link to="/login">Login</Link> to your account
          </div>
          :
          <div>
            <p>Don't have an account? Create your account. It's take less then a minutes</p>
            <div className="auth-container">
              {(registerError.length) ? (
                <div className="alert alert-danger">
                  {registerError.map((error, index) => {
                    return (
                      <div key={index}>
                        {error}
                      </div>
                    );
                  })}
                </div>
              ) : null}
              <RegisterForm
                getCountries={getCountries}
                getStates={getStates}
                getCities={getCities}
                verifyCaptcha={this.verifyCaptcha.bind(this)}
                formSubmitted={this.state.formSubmitted}
                captchaValidated={this.state.captchaValidated}
                handleSubmit={this.handleSubmit}
              />
            </div>
          </div>
        }
        </Body>
      </Modal>
    );
  }
}

Register.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  initiateUserCreation: PropTypes.func.isRequired,
  history: PropTypes.object,
  registerOwner: PropTypes.func,
  registerError: PropTypes.array,
  toggleSelectedView: PropTypes.func,
  closeModal: PropTypes.func,
  getStates: PropTypes.func,
  getCities: PropTypes.func,
  getCountries: PropTypes.func,
  ownerCreated: PropTypes.bool,
};

export default Register;
