import {get, isEmpty} from 'lodash';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ModalBody} from 'react-bootstrap';

import Login from './login';
import Register from './register';
import ForgotPassword from './forgot-password';

class Authentication extends PureComponent {
  constructor() {
    super();

    this.state = {
      selectedView: 'login',
      redirected: false,
    };

    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    const {selectedAuthModal} = this.props;
    this.setState({selectedView: selectedAuthModal});
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isCreating && !isEmpty(nextProps.registerPayload)) {
      nextProps.initiateLoginInfo({
        'userName': get(nextProps, 'registerPayload.user_id'),
        'password': get(nextProps, 'registerPayload.PASSWORD1')
      });
      nextProps.resetRegisterPayload();
    }

    /*if (nextProps.isAuthenticated && !this.state.redirected) {
      this.setState({redirected: true});
      //nextProps.history.go('/dashboard');
    }*/
  }

  toggleSelectedView(view) {
    this.setState({selectedView: view});
  }

  closeModal() {
    this.props.closeModal();
  }

  render() {
    const {selectedView} = this.state;

    return (
      <ModalBody id="register" bsClass="signin-modal-body">
        <div className="log-in-pop">
          {selectedView === 'register' && (
            <Register
              toggleSelectedView={this.toggleSelectedView.bind(this)}
              closeModal={this.closeModal}/>
          )}

          {selectedView === 'login' && (
            <Login
              toggleSelectedView={this.toggleSelectedView.bind(this)}
              closeModal={this.closeModal}/>
          )}

          {selectedView === 'password-forget' && (
            <ForgotPassword
              toggleSelectedView={this.toggleSelectedView.bind(this)}
              closeModal={this.closeModal}/>
          )}
        </div>
      </ModalBody>
    );
  }
}

Authentication.propTypes = {
  closeModal: PropTypes.func.isRequired,
  resetRegisterPayload: PropTypes.func.isRequired,
  initiateLoginInfo: PropTypes.func.isRequired,
  selectedView: PropTypes.string,
  selectedAuthModal: PropTypes.string,
  registerPayload: PropTypes.object,
  isCreating: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default Authentication;
