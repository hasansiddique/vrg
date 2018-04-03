import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import Yup from 'yup';
import Button from 'common/components/button';
import ReCaptcha from 'react-recaptcha';

class DenialForm extends Component {
  constructor(props){    
    super(props);
    this.captchaVerified = this.captchaVerified.bind(this);
  }

  captchaVerified(res){
    let { setFieldValue, validateForm } = this.props;
    setFieldValue('human', 1);
    validateForm();
  }

  render(){
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      validateForm,
      isValid,
      isMobile
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="signature">Please type your full name as Signature to confirm this booking</label>
                <input 
                  type="text"
                  id="signature"
                  name="signature"
                  placeholder="Please type your full name as Signature to confirm this booking"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.signature && touched.signature ? 'form-control error' : 'form-control'}
                />
                {errors.signature && <span className="error validation-error">{errors.signature}</span>}
              </div>
              <h3>Will You please help us know the reason of this denial ?</h3>
              <div className="form-group">
                <label htmlFor="comments">Comments</label>
                <textarea 
                  type="text"
                  id="comments"
                  name="comments"
                  placeholder="Comments"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.comments && touched.comments ? 'form-control error' : 'form-control'}
                />
                {errors.comments && <span className="error validation-error">{errors.comments}</span>}
              </div>
            </div>
            <div className="col-sm-6 input-field">
              <ReCaptcha
                sitekey="6LeKG0MUAAAAAEjm6x_Y1ecZJUMXrpSfGwNVhYFA"
                verifyCallback={this.captchaVerified}
                size={(isMobile) ? 'compact' : 'normal'}
              />
              {errors.human && <span className="error validation-error">{errors.human}</span>}
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className="pull-right">
            <div className="input-field s4">
              <button onClick={handleSubmit} className='btn btn-danger btn-lg'>
                {(isSubmitting ? 'Canceling...' : 'Cancel Booking')}
              </button>
            </div>
          </div>
        </div>
        <div className="alert alert-warning margin-top-md">
          <strong>WARNING:</strong> If you deny this booking, your calendar accuracy rate will go down lowering them to the end of our search
        </div>
      </form>
    );
  }
}

DenialForm.propTypes = {
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

const EnhancedDenialForm = withFormik({
  mapPropsToValues: () => ({  }),
  validationSchema: Yup.object().shape({
    signature: Yup.string()
              .min(3)
              .max(30)
              .required('Signature is required'),
    comments: Yup.string()
              .max(500),
    human: Yup.number()
                 .min(1, 'Please Solve Captcha')
                 .max(1, 'Please Solve Captcha')
                 .required('Please Solve Captcha')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    props.handleSubmit(values, setSubmitting);
  },
  displayName: 'DenialForm'
})(DenialForm);

export default EnhancedDenialForm;