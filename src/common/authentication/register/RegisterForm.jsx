import React from 'react';
import PropTypes from 'prop-types';
import ReCaptcha from 'react-recaptcha';
import {Link} from 'react-router-dom';
import {withFormik} from 'formik';
import Yup from 'yup';
import MySelect from 'common/forms/formik/select';

import Button from 'common/components/button';
import {continents} from 'common/utilities';


class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      continents: continents,
      countries: [],
      states: [],
      cities: [],
      selectedContinent: '',
      selectedCountry: '',
      selectedState: '',
      selectedCity: '',
    };
    this.onContinentChange = this.onContinentChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
  }

  onContinentChange(name, value) {
    let {setFieldValue} = this.props;
    setFieldValue(name, value);
    this.getCountries(value);
    setFieldValue('country', '');
    setFieldValue('state', '');
    setFieldValue('city', '');
    this.setState({selectedContinent: value});
  }

  onCountryChange(name, value) {
    let {setFieldValue} = this.props;
    this.getStates(value);
    setFieldValue(name, value);
    setFieldValue('state', '');
    setFieldValue('city', '');
    this.setState({selectedCountry: value});
  }

  onStateChange(name, value) {
    let {setFieldValue} = this.props;
    setFieldValue(name, value);
    this.getCities(this.state.selectedCountry, value);
    setFieldValue('city', '');
    this.setState({selectedState: value});
  }

  onCityChange(name, value) {
    this.setState({selectedCity: value});
  }

  getCountries(continent) {
    let {getCountries} = this.props;
    this.setState({
      states: [],
      cities: []
    });
    getCountries(continent).then((data) => {
      if (data) {
        this.setState({
          countries: data
        });
      }
    });
  }

  getStates(country) {
    let {getStates} = this.props;
    this.setState({
      cities: []
    });
    getStates(country).then((data) => {
      if (data) {
        this.setState({
          states: data
        });
      }
    });
  }

  getCities(country, state) {
    let {getCities} = this.props;
    getCities(country, state).then((data) => {
      if (data) {
        this.setState({
          cities: data
        });
      }
    });
  }

  render() {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      captchaValidated,
      formSubmitted,
      verifyCaptcha,
      setFieldTouched,
      setFieldValue,
    } = this.props;

    const {countries, states, cities} = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="row">
            <div className="col-sm-6 input-field">
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
            <div className="col-sm-6 input-field">
              <input
                type="text"
                id="user_id"
                name="user_id"
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.user_id && touched.user_id ? 'form-control error' : 'form-control'}
              />
              {errors.user_id && touched.user_id && <span className="error validation-error">{errors.user_id}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 input-field">
              <input
                type="password"
                id="password1"
                name="password1"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password1 && touched.password1 ? 'form-control error' : 'form-control'}
              />
              {errors.password1 && touched.password1 &&
              <span className="error validation-error">{errors.password1}</span>}
            </div>
            <div className="col-sm-6 input-field">
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.confirm_password && touched.confirm_password ? 'form-control error' : 'form-control'}
              />
              {errors.confirm_password && touched.confirm_password &&
              <span className="error validation-error">{errors.confirm_password}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 input-field">
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.first_name && touched.first_name ? 'form-control error' : 'form-control'}
              />
              {errors.first_name && touched.first_name &&
              <span className="error validation-error">{errors.first_name}</span>}
            </div>
            <div className="col-sm-6 input-field">
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.last_name && touched.last_name ? 'form-control error' : 'form-control'}
              />
              {errors.last_name && touched.last_name &&
              <span className="error validation-error">{errors.last_name}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 input-field">
              <input
                type="text"
                id="cell_phone"
                name="cell_phone"
                placeholder="Cell Phone"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.cell_phone && touched.cell_phone ? 'form-control error' : 'form-control'}
              />
              {errors.cell_phone && touched.cell_phone &&
              <span className="error validation-error">{errors.cell_phone}</span>}
            </div>
            <div className="col-sm-6 input-field">
              <input
                type="text"
                id="work_phone"
                name="work_phone"
                placeholder="Work Phone"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.cell_phone && touched.cell_phone ? 'form-control error' : 'form-control'}
              />
              {errors.work_phone && touched.work_phone &&
              <span className="error validation-error">{errors.work_phone}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 input-field class-me">
              <MySelect
                onBlur={setFieldTouched}
                onChange={this.onContinentChange}
                options={continents}
                value={values.continent}
                name="continent"
              />
              {errors.continent && touched.continent &&
              <span className="error validation-error">{errors.continent}</span>}
            </div>
            <div className="col-sm-6 input-field class-me">
              <MySelect
                onBlur={setFieldTouched}
                onChange={this.onCountryChange}
                options={countries}
                value={values.country}
                name="country"
              />
              {errors.country && touched.country && <span className="error validation-error">{errors.country}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 input-field class-me">
              <MySelect
                onBlur={setFieldTouched}
                onChange={this.onStateChange}
                options={states}
                value={values.state}
                name="state"
              />
              {errors.state && touched.state &&
              <span className="error validation-error">{errors.state}</span>}
            </div>
            <div className="col-sm-6 input-field class-me">
              <MySelect
                onBlur={setFieldTouched}
                onChange={setFieldValue}
                options={cities}
                value={values.city}
                name="city"
              />
              {errors.city && touched.city && <span className="error validation-error">{errors.city}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 input-field">
              <input
                type="text"
                id="street_address"
                name="street_address"
                placeholder="Street Address"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.street_address && touched.street_address ? 'form-control error' : 'form-control'}
              />
              {errors.street_address && touched.street_address &&
              <span className="error validation-error">{errors.street_address}</span>}
            </div>
            <div className="col-sm-6 input-field">
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="Zip/Postal Code"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.zip && touched.zip ? 'form-control error' : 'form-control'}
              />
              {errors.zip && touched.zip && <span className="error validation-error">{errors.zip}</span>}
            </div>
          </div>
        </div>
        <div style={{margin: `15px 0`}}>
          <ReCaptcha
            sitekey="6LeKG0MUAAAAAEjm6x_Y1ecZJUMXrpSfGwNVhYFA"
            verifyCallback={verifyCaptcha}
          />
          {formSubmitted && !captchaValidated && <div style={{color: '#ef5f56'}}>Captcha validation missing.</div>}
        </div>
        <div className="clearfix">
          <div className="pull-left">
            <div className="input-field s12">
            <span>
              Already have a VRGuest account?
              <Link to="/login"> Login</Link>
            </span>
            </div>
          </div>
          <div className="pull-right">
            <div className="input-field s4">
              <Button onClick={handleSubmit} text={(isSubmitting ? 'Registering...' : 'Register')}/>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  dirty: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,
  verifyCaptcha: PropTypes.func,
  captchaValidated: PropTypes.bool,
  formSubmitted: PropTypes.bool,
  getStates: PropTypes.func,
  getCities: PropTypes.func,
  getCountries: PropTypes.func,
};

const EnhancedRegisterForm = withFormik({
  mapPropsToValues: () => ({}),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    user_id: Yup.string()
      .min(3, 'Username must be atleast 3 characters')
      .max(20, 'Username can not be more than 20 characters')
      .required('Username is required'),
    password1: Yup.string()
      .min(3, 'Password must be atleast 6 characters')
      .max(20, 'Password can not be more than 20 characters')
      .required('Password is required'),
    confirm_password: Yup.mixed()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password1')], 'Confirm password must match Password'),
    first_name: Yup.string()
      .min(3, 'First Name must be atleast 3 characters')
      .max(20, 'First Name can not be more than 20 characters')
      .required('First Name is required'),
    last_name: Yup.string()
      .min(3, 'Last Name must be atleast 3 characters')
      .max(20, 'Last Name can not be more than 20 characters')
      .required('Last Name is required'),
    street_address: Yup.string()
      .max(20, 'Street Address can not be more than 20 characters')
      .required('Street Address is required'),
    continent: Yup.string()
      .required('Continent is required'),
    country: Yup.string()
      .min(2, 'Country must be atleast 2 characters')
      .max(20, 'Country can not be more than 20 characters')
      .required('Country is required'),
    state: Yup.string()
      .max(20, 'State can not be more than 20 characters')
      .required('State is required'),
    city: Yup.string()
      .max(20, 'City can not be more than 20 characters')
      .required('City is required'),
    zip: Yup.string()
      .max(20, 'Zip/Postal Code can not be more than 20 characters')
      .required('Zip/Postal Code is required'),
    cell_phone: Yup.string()
      .max(20, 'Cell Phone can not be more than 20 characters')
      .required('Cell Phone is required'),
    work_phone: Yup.string()
      .max(20, 'Work Phone can not be more than 20 characters')
      .required('Work Phone is required'),
  }),
  handleSubmit: (values, {setSubmitting, props}) => {
    props.handleSubmit(values, setSubmitting);
  },
  displayName: 'RegisterForm'
})(RegisterForm);

export default EnhancedRegisterForm;
