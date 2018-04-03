import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Yup from 'yup';
import {continents, rooms, baths, rentalTypes} from 'common/utilities';
import FontIcon from 'common/components/font-icon';
import MySelect from 'common/forms/formik/select';
import NumberInput from 'common/forms/formik/number';


class GeneralForm extends React.Component {

  constructor(props) {
    super(props);
    let { values } = this.props;
    this.state = {
      continents: continents,
      unitTypes: [],
      countries: [],
      states: [],
      cities: []
    };
    this.onContinentChange = this.onContinentChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  componentDidMount(){
    let { values } = this.props;
    if(values.continent){
      this.getCountries(values.continent);
    }
    if(values.country){
      this.getStates(values.country);
    }
    if(values.state_name){
      this.getCities(values.country, values.state_name);
    }
    this.getUnitTypes();
  }

  onContinentChange(name, value){
    let { handleChange, setFieldValue } = this.props;
    setFieldValue(name, value);
    this.getCountries(value);
    setFieldValue('country', '');
    setFieldValue('state_name', '');
    setFieldValue('city', '');
  }

  onCountryChange(name, value){
    let { values, setFieldValue } = this.props;
    this.getStates(value);
    setFieldValue(name, value);
    setFieldValue('state_name', '');
    setFieldValue('city', '');
  }

  onStateChange(name, value){
    let { values, setFieldValue } = this.props;
    setFieldValue(name, value);
    this.getCities(values.country, value);
    setFieldValue('city', '');
  }

  getUnitTypes(){
    let { getUnitTypes } = this.props;
    getUnitTypes().then((data) => {
      this.setState({
        unitTypes: data
      });
    });
  }

  getCountries(continent) {
    if(!continent){
      return false;
    }
    let { getCountries } = this.props;
    this.setState({
      states: [],
      cities: []
    });
    getCountries(continent).then((data) => {
      if(data){
        this.setState({
          countries: data
        });
      }
    });
  }

  getStates(country) {
    if(!country){
      return false;
    }
    let { getStates } = this.props;
    this.setState({
      cities: []
    });
    getStates(country).then((data) => {
      if(data){
        this.setState({
          states: data
        });
      }
    });
  }

  getCities(country, state) {
    if(!country || !state){
      return false;
    }
    let { getCities } = this.props;
    getCities(country, state).then((data) => {
      if(data){
        this.setState({
          cities: data
        });
      }
    });
  }

  getCitiesList(){
    let { cities } = this.state;
    return cities.map((city, index) => {
      return (
        <option key={index} value={city.value}>{city.label}</option>
      );
    });
  }

  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      setFieldTouched,
      setFieldValue
    } = this.props;
    let { countries, states, cities, unitTypes, continents } = this.state;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="street_address">Street Address</label>
          <div className="col-sm-9">
            <input 
              type="text"
              id="street_address"
              name="street_address"
              placeholder="Street Address"
              value={values.street_address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.street_address && touched.street_address ? 'form-control error' : 'form-control'}
            />
            {errors.street_address && touched.street_address && <span className="error validation-error">{errors.street_address}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="address2">Address (cont.)</label>
          <div className="col-sm-9">
            <input 
              type="text"
              id="address2"
              name="address2"
              placeholder="Street Address"
              value={values.address2}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.address2 && touched.address2 ? 'form-control error' : 'form-control'}
            />
            {errors.address2 && touched.address2 && <span className="error validation-error">{errors.address2}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="continent">Continent</label>
          <div className="col-sm-3">
            <MySelect
              onBlur={setFieldTouched}
              onChange={this.onContinentChange}
              options={continents}
              value={values.continent}
              name="continent"
            />
            {errors.continent && touched.continent && <span className="error validation-error">{errors.continent}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="country">Country</label>
          <div className="col-sm-3">
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
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="state_name">State</label>
          <div className="col-sm-3">
            <MySelect
              onBlur={setFieldTouched}
              onChange={this.onStateChange}
              options={states}
              value={values.state_name}
              name="state_name"
            />
            {errors.state_name && touched.state_name && <span className="error validation-error">{errors.state_name}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="city">City</label>
          <div className="col-sm-3">
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
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="zip">Zip Code</label>
          <div className="col-sm-3">
            <input 
              type="text"
              id="zip"
              name="zip"
              placeholder="Street Address"
              value={values.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.zip && touched.zip ? 'form-control error' : 'form-control'}
            />
            {errors.zip && touched.zip && <span className="error validation-error">{errors.zip}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="unit_building_name">Name</label>
          <div className="col-sm-9">
            <input 
              type="text"
              id="unit_building_name"
              name="unit_building_name"
              placeholder="Street Address"
              value={values.unit_building_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.unit_building_name && touched.unit_building_name ? 'form-control error' : 'form-control'}
            />
            {errors.unit_building_name && touched.unit_building_name && <span className="error validation-error">{errors.unit_building_name}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="unit_number">Unit No. / Name</label>
          <div className="col-sm-9">
            <input 
              type="text"
              id="unit_number"
              name="unit_number"
              placeholder="Street Address"
              value={values.unit_number}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.unit_number && touched.unit_number ? 'form-control error' : 'form-control'}
            />
            {errors.unit_number && touched.unit_number && <span className="error validation-error">{errors.unit_number}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="sqft_area">Total SQFT Area</label>
          <div className="col-sm-3">
            <NumberInput 
              name="sqft_area"
              placeholder="SQFT Area"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.sqft_area}
              className={errors.sqft_area && touched.sqft_area ? 'form-control error' : 'form-control'}
            />
            {errors.sqft_area && touched.sqft_area && <span className="error validation-error">{errors.sqft_area}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="room">Rooms</label>
          <div className="col-sm-3">
            <select
              name="room"
              className="form-control"
              onBlur={handleBlur}
              onChange={this.onContinentChange}
              value={values.rooms}
              >
              <option>None</option>
              {rooms.map((room, index) => {
                return (
                  <option key={index} value={room.value}>{room.label}</option>
                );
              })}
            </select>
            {errors.rooms && touched.rooms && <span className="error validation-error">{errors.rooms}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="bath">Baths</label>
          <div className="col-sm-3">
            <select
              name="bath"
              className="form-control"
              onBlur={handleBlur}
              onChange={this.onContinentChange}
              value={values.baths}
              >
              <option>None</option>
              {baths.map((bath, index) => {
                return (
                  <option key={index} value={bath.value}>{bath.label}</option>
                );
              })}
            </select>
            {errors.baths && touched.baths && <span className="error validation-error">{errors.baths}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="type_of_unit">Type of UNIT</label>
          <div className="col-sm-3">
            <select
              name="type_of_unit"
              className="form-control"
              onBlur={handleBlur}
              onChange={this.onContinentChange}
              value={values.type_of_unit}
              >
              <option value="">None</option>
              {unitTypes.map((unitType, index) => {
                return (
                  <option key={index} value={unitType.id}>{unitType.unit_type}</option>
                );
              })}
            </select>
            {errors.type_of_unit && touched.type_of_unit && <span className="error validation-error">{errors.type_of_unit}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="rental_type">Rental Type</label>
          <div className="col-sm-3">
            <select
              name="rental_type"
              className="form-control"
              onBlur={handleBlur}
              onChange={this.onContinentChange}
              value={values.rental_type}
              >
              <option>None</option>
              {rentalTypes.map((unitType, index) => {
                return (
                  <option key={index} value={unitType.value}>{unitType.label}</option>
                );
              })}
            </select>
            {errors.rental_type && touched.rental_type && <span className="error validation-error">{errors.rental_type}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="minbooking">Minimum Booking</label>
          <div className="col-sm-3">
            <NumberInput 
              name="minbooking"
              placeholder="Minimum Booking"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.minbooking}
              className={errors.minbooking && touched.minbooking ? 'form-control error' : 'form-control'}
            />
            {errors.minbooking && touched.minbooking && <span className="error validation-error">{errors.minbooking}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="max_guests">Max Guests</label>
          <div className="col-sm-3">
            <select
              name="max_guests"
              className="form-control"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.max_guests}
              >
              <option>None</option>
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((val, index) => {
                return (
                  <option key={index} value={val}>{val}</option>
                );
              })}
            </select>
            {errors.max_guests && touched.max_guests && <span className="error validation-error">{errors.max_guests}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="headline">Headline Special (150 MAX)</label>
          <div className="col-sm-9">
            <input 
              type="text"
              id="headline"
              name="headline"
              placeholder="Street Address"
              value={values.headline}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.headline && touched.headline ? 'form-control error' : 'form-control'}
            />
            {errors.headline && touched.headline && <span className="error validation-error">{errors.headline}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="vacation_rental_description">Description</label>
          <div className="col-sm-9">
            <textarea
              rows={5} 
              type="text"
              id="vacation_rental_description"
              name="vacation_rental_description"
              placeholder="Description"
              value={values.vacation_rental_description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.vacation_rental_description && touched.vacation_rental_description ? 'form-control error' : 'form-control'}
            />
            {errors.vacation_rental_description && touched.vacation_rental_description && <span className="error validation-error">{errors.vacation_rental_description}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="vacation_rental_amenities">Vacation Rental Amenities</label>
          <div className="col-sm-9">
            <textarea
              rows={5} 
              type="text"
              id="vacation_rental_amenities"
              name="vacation_rental_amenities"
              placeholder="Vacation Rental Amenities"
              value={values.vacation_rental_amenities}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.vacation_rental_amenities && touched.vacation_rental_amenities ? 'form-control error' : 'form-control'}
            />
            {errors.vacation_rental_amenities && touched.vacation_rental_amenities && <span className="error validation-error">{errors.vacation_rental_amenities}</span>}
          </div>
        </div>
        <div className="form-group">
          <label
            className="col-sm-3"
            htmlFor="activities_and_attractions">Activities And Attractions</label>
          <div className="col-sm-9">
            <textarea
              rows={5} 
              type="text"
              id="activities_and_attractions"
              name="activities_and_attractions"
              placeholder="Activities And Attractions"
              value={values.activities_and_attractions}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.activities_and_attractions && touched.activities_and_attractions ? 'form-control error' : 'form-control'}
            />
            {errors.activities_and_attractions && touched.activities_and_attractions && <span className="error validation-error">{errors.activities_and_attractions}</span>}
          </div>
        </div>

        <div className="clearfix">
          <div className="pull-right">
            <button onClick={handleSubmit} className="btn btn-primary" disabled={isSubmitting}>
              <FontIcon name="save" /> {(isSubmitting ? 'Updating...' : 'Update')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

GeneralForm.propTypes = {
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

const EnhancedGeneralForm = withFormik({
  mapPropsToValues: (props) => props.values,
  validationSchema: Yup.object().shape({
    street_address: Yup.string()
              .max(255, 'Street Address must not exceed 255 characters')
              .required('Street Address is required'),
    address2: Yup.string()
              .max(255, 'Address must not exceed 255 characters'),
    continent: Yup.string()
              .required('Continent is required'),
    country: Yup.string()
              .required('Country is required'),
    state_name: Yup.string()
              .required('State is required'),
    city: Yup.string()
              .required('City is required'),
    zip: Yup.string()
                 .max(20, 'Zip can not be more than 20 characters'),
    unit_building_name: Yup.string()
                 .max(255, 'Name can not be more than 20 characters'),
    unit_number: Yup.string()
                 .max(255, 'Unit No. / Name is required'),
    sqft_area: Yup.number()
                 .max(999999, 'Total SQFT Area can not be more than 999999')
                 .required('Total SQFT Area is required'),
    rooms: Yup.string()
                 .required('Rooms are required'),
    baths: Yup.string()
                 .required('Baths are required'),
    type_of_unit: Yup.string()
                 .required('Type of UNIT is required'),
    rental_type: Yup.string()
                 .required('Rental Type is required'),
    minbooking: Yup.number()
                 .max(999, 'Minimum Booking can not be more than 999')
                 .required('Minimum Booking is required'),
    max_guests: Yup.string()
                 .required('Max Guests is required'),
    headline: Yup.string()
                 .max(150, 'Headline can not be more than 150 characters')
                 .required('Headline is required'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    props.handleSubmit(values, setSubmitting);
  },
  displayName: 'GeneralForm'
})(GeneralForm);


export default EnhancedGeneralForm;
