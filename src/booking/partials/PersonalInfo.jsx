import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MyInput from 'common/forms/horizontal/input';
import Loading from 'common/components/loading';
import {required, email, cleanString} from 'common/validator';
import Button from 'react-validation/build/button';
import Form from 'react-validation/build/form';


export default class PersonalInfo extends React.Component {

  static get propTypes(){
    return {
      
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      states: [],
      countries: [],
      loadingStates: false,
      loadingCountries: false,
      selectedState: null,
      selectedCountry: null,
      howFindUs: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    this.getStates();
    this.getCountries();
  }

  isValidated(){
    return false;
  }

  getStates(){
    let { getStates } = this.props;
    if(this.state.loadingStates === false){
      this.setState({
        loadingStates: true
      });
      getStates().then((states) => {
        let newStates = states.map((state) => { return {value: state.name, label: state.name}; });
        this.setState({
          states: newStates,
          loadingStates: false
        });
      }).catch(() => {
        this.setState({
          loadingStates: false
        });
      });
    }
  }

  getCountries(){
    let { getCountries } = this.props;
    if(this.state.loadingCountries === false){
      this.setState({
        loadingCountries: true
      });
      getCountries().then((countries) => {
        let newCountries = countries.map((state) => { return {value: state.name, label: state.name}; });
        this.setState({
          countries: newCountries,
          loadingCountries: false
        });
      }).catch(() => {
        this.setState({
          loadingCountries: false
        });
      });
    }
  }

  onSubmit(e){
    let { updateValues } = this.props;
    e.preventDefault();
    let values = this.form.getValues();
    let { selectedCountry, selectedState, howFindUs } = this.state;
    console.log(selectedCountry, selectedState, howFindUs, this.customerState);
    values = Object.assign({}, values, {
      country: selectedCountry ? selectedCountry : this.customerCountry.value,
      state: selectedState ? selectedState : this.customerState.value,
      how_find_us: howFindUs ? howFindUs : this.howFindUs.value
    });
    updateValues(values, 2);
  }

  render() {
    let { states, selectedState, countries, selectedCountry, howFindUs } = this.state;
    let step = this.props.step;
    let orderValues = this.props.orderValues || {};
    if(orderValues.state && !selectedState){
      selectedState = orderValues.state;
    }
    if(orderValues.country && !selectedCountry){
      selectedCountry = orderValues.country;
    }
    return (
      <div className="step">
        <Form ref={(ref) => this.form = ref} onSubmit={this.onSubmit} className="form-horizontal">
          <h3 className="step-heading">Personal Information</h3>
          <div className={`step-content ${step == 1 ? '' : 'hidden'}`}>
            {(() => {
              if(!countries.length || !states.length){
                return (
                  <Loading loading />
                );
              }else {
                return (
                  <Fragment>
                    <MyInput
                      name="first_name"
                      value={orderValues.first_name}
                      title="First Name"
                      left={4}
                      center={5}
                      right={3}
                      description="* Required"
                      validations={[cleanString, required]}
                      isChanged
                      isUsed
                    />
                    <MyInput
                      name="last_name"
                      value={orderValues.last_name}
                      title="Last Name"
                      left={4}
                      center={5}
                      right={3}
                      description="* Required"
                      validations={[cleanString, required]}
                      isChanged
                      isUsed
                    />
                    <MyInput
                      name="street_address"
                      value={orderValues.street_address}
                      title="Street Address"
                      left={4}
                      center={5}
                      right={3}
                      description="* Required"
                      validations={[cleanString, required]}
                      isChanged
                      isUsed
                    />
                    <MyInput
                      name="address2"
                      value={orderValues.address2}
                      title="Address Cont."
                      left={4}
                      center={5}
                      right={3}
                      validations={[cleanString]}
                    />
                    <MyInput
                      name="city"
                      value={orderValues.city}
                      title="City"
                      left={4}
                      center={5}
                      right={3}
                      description="* Required"
                      validations={[cleanString, required]}
                      isChanged
                      isUsed
                    />
                    <div className="form-group">
                      <label
                        className="col-sm-4"
                        htmlFor="state">State</label>
                      <div className="col-sm-8">
                        <select
                          name="state"
                          className="form-control"
                          ref={(ref) => this.customerState = ref}
                          value={(selectedState) ? selectedState : 'Outside US'}
                          onChange={(e) => this.setState({ selectedState: e.target.value })}
                          >
                          <option value={'Outside US'}>Not Selected [Outside USA ]</option>
                          {states.map((state, index) => {
                            return (
                              <option key={index} value={state.label}>{state.label}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        className="col-sm-4"
                        htmlFor="country">Country</label>
                      <div className="col-sm-8">
                        <select
                          name="country"
                          className="form-control"
                          ref={(ref) => this.customerCountry = ref}
                          value={(selectedCountry) ? selectedCountry : countries[0].value}
                          onChange={(e) => this.setState({ selectedCountry: e.target.value })}
                          >
                          {countries.map((country, index) => {
                            return (
                              <option key={index} value={country.label}>{country.label}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <MyInput
                      name="zip"
                      value={orderValues.zip}
                      title="Zip"
                      left={4}
                      center={5}
                      right={3}
                      description="* Required"
                      validations={[cleanString, required]}
                      isChanged
                      isUsed
                    />
                    <MyInput
                      name="cell_phone"
                      value={orderValues.cell_phone}
                      title="Cell/Phone"
                      left={4}
                      center={5}
                      right={3}
                      description="* Required"
                      validations={[cleanString, required]}
                      isChanged
                      isUsed
                    />
                    <MyInput
                      name="fax"
                      value={orderValues.fax}
                      title="Fax"
                      left={4}
                      center={8}
                      validations={[cleanString, required]}
                      isChanged
                      isUsed
                    />
                    <MyInput
                      name="email"
                      value={orderValues.email}
                      title="Email"
                      left={4}
                      center={5}
                      right={3}
                      description="* Required"
                      validations={[email, required]}
                      isChanged
                      isUsed
                    />
                    <div className="form-group">
                      <label
                        className="col-sm-4"
                        htmlFor="how_find_us">How did you find us?</label>
                      <div className="col-sm-8">
                        <select
                          name="how_find_us"
                          id="how_find_us"
                          className="form-control"
                          value={howFindUs || 'Search engine'}
                          ref={(ref) => this.howFindUs = ref}
                          onChange={(e) => this.setState({ howFindUs: e.target.value })}
                          >
                          <option value="Search engine">Search engine</option>
                          <option value="Repeat customer">Repeat customer</option>
                          <option value="Email">Email</option>
                          <option value="Friends/Family">Friends/Family</option>
                          <option value="Post card mailer">Post card mailer</option>
                          <option value="Walk-in">Walk-in</option>
                          <option value="Other Website">Other Website</option>
                          <option value="Referral">Referral</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button className="btn btn-primary">Next</Button>
                    </div>
                  </Fragment>
                );
              }
            })()}
          </div>
        </Form>
      </div>
    );
  }
}
