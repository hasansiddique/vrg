import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import Form from 'react-validation/build/form';
import Select from 'react-validation/build/select';
import Button from 'react-validation/build/button';
import Loading from 'common/components/loading';
import {required, gt, lt, ltv, email, isNumeric} from 'common/validator';
import {continents, rooms, baths, rentalTypes} from '../../../../common/utilities';
import FontIcon from 'common/components/font-icon';
import MyInput from 'common/forms/horizontal/input';
import MyTextArea from 'common/forms/horizontal/textarea';
import GeneralForm from './GeneralForm.jsx';

class General extends Component {
  constructor() {
    super();
    this.state = {
      formIsValid: false,
      countries: [],
      unitTypes: [],
      updating: false
    };
    this.continents = continents;
    this.rooms = rooms;
    this.baths = baths;
    this.rentalTypes = rentalTypes;
    this.form = null;
    this.setFormIsValid = this.setFormIsValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.getOwnerUnitGeneral();
  }

  setFormIsValid(status) {

  }

  getOwnerUnitGeneral() {
    let {general, isFetching, error, getOwnerUnitGeneral, match} = this.props;
    if (!isFetching) {
      getOwnerUnitGeneral(match.params.id);
    }
  }

  onFormSubmit(values, updateState){
    let { updateOwnerUnitGeneral } = this.props;
    updateOwnerUnitGeneral(values).then((res) => {
      updateState(false);
    }).catch(() => {
      updateState(false);
    });
  }

  onSubmit(e) {
    let {updateOwnerUnitGeneral, updateOwnerUnitGeneralStore, general} = this.props;
    e.preventDefault();
    let values = this.form.getValues();
    values.unit_id = general.unit_id;
    values.vacation_rental_description = encodeURIComponent(values.vacation_rental_description);
    values.vacation_rental_amenities = encodeURIComponent(values.vacation_rental_amenities);
    values.activities_and_attractions = encodeURIComponent(values.activities_and_attractions);
    for(let key in general){
      if(values[key]){
        general[key] = values[key];
      }
    }
    updateOwnerUnitGeneralStore({
      general: general
    });
    this.setState({
      updating: true
    });
    updateOwnerUnitGeneral(values).then((res) => {
      this.setState({
        updating: false
      });
    }).catch(() => {
      this.setState({
        updating: false
      });
    });
  }

  render() {
    let {general, isFetching, error, getUnitTypes, getCountries, getStates, getCities} = this.props;
    let {countries, unitTypes, updating} = this.state;
    let continents = this.continents;
    let rooms = this.rooms;
    let baths = this.baths;
    let rentalTypes = this.rentalTypes;
    return (
      <div>
        <div className="">
          {(() => {
            if (!general || isFetching) {
              return (
                <Loading loading/>
              );
            } else {
              return (
                <div>
                  <GeneralForm 
                    values={general} 
                    getUnitTypes={getUnitTypes}
                    getCountries={getCountries}
                    getStates={getStates}
                    getCities={getCities}
                    handleSubmit={this.onFormSubmit}
                  />
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

General.propTypes = {
  getOwnerUnitGeneral: PropTypes.func,
  updateOwnerUnitGeneral: PropTypes.func,
  updateOwnerUnitGeneralStore: PropTypes.func,
  general: PropTypes.object,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  match: PropTypes.object,
  getCountries: PropTypes.func,
  getUnitTypes: PropTypes.func
};

export default General;
