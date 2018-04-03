import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import Yup from 'yup';
import Button from 'common/components/button';

class ContactForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    let { setTouched, handleSubmit, isValid } = this.props;
    e.preventDefault();
    setTouched({
      email: true,
      message: true
    });
    if(isValid){
      handleSubmit(e);
    }
  }
  render(){
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset
    } = this.props;
    return (
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="">
              <div className="form-group">
                <input 
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? 'form-control error' : 'form-control'}
                />
                {errors.email && touched.email && <span className="error validation-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <textarea 
                  id="message"
                  name="message"
                  placeholder="Please type your message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={5}
                  className={errors.message && touched.message ? 'form-control error' : 'form-control'}
                />
                {errors.message && touched.message && <span className="error validation-error">{errors.message}</span>}
              </div>
            </div>
          </div>
          <div className="clearfix">
            <div className="pull-right">
              <div className="input-field s4">
                <Button onClick={this.handleSubmit} text={(isSubmitting ? 'Sending...' : 'Send')} />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  dirty: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func
};

const EnhancedContactForm = withFormik({
  mapPropsToValues: () => ({  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
    message: Yup.string()
                 .required('Message is required'),
    type: Yup.string()
  }),
  handleSubmit: (values, passedProps) => {
    let { setSubmitting, props, resetForm } = passedProps;
    props.handleSubmit(values, setSubmitting, resetForm);
  },
  displayName: 'ContactForm'
})(ContactForm);

export default EnhancedContactForm;