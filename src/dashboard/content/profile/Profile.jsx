import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import Select from 'react-validation/build/select';
import Textarea from 'react-validation/build/textarea';
import Button from 'react-validation/build/button';
import Loading from 'common/components/loading';
import {required, email, confirmPassword, gt, lt} from 'common/validator';
import FontIcon from 'common/components/font-icon';
import MyInput from 'common/forms/horizontal/input';
import MyTextArea from 'common/forms/horizontal/textarea';
import config from '../../../config';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      states: [],
      logo: null,
      passwordTouched: false
    };
    this.form = null;
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogoSelected = this.onLogoSelected.bind(this);
  }

  componentDidMount() {
    let { getOwnerProfile } = this.props;
    getOwnerProfile();
    this.getCountries();
    this.getStates();
  }

  getStates(){
    let { getStates } = this.props;
    getStates().then((states) => {
      this.setState({
        states: states
      });
    }).catch((err) => {

    });
  }

  getCountries(){
    let { getCountries } = this.props;
    getCountries(null).then((countries) => {
      if(countries){
        this.setState({
          countries: countries
        });
      }
    }).catch((err) => {

    });
  }

  onLogoSelected(e){
    let files = e.target.files;
    if(files && files.length){
      let file = files[0];
      this.setState({
        logo: file
      });
    }
  }

  onSubmit(e){
    let { updateOwnerProfile } = this.props;
    e.preventDefault();
    let values = this.form.getValues();
    if(this.state.logo){
      values.logo = this.state.logo;
    }
    updateOwnerProfile(values);
  }

  render() {
    let {profile, isFetching, updating, error} = this.props;
    let { states, countries } = this.state;
    return (
      <div>
        <h4>
          <div className="clearfix">
            <div className="pull-left">
              <span>Profile</span>
            </div>
          </div>
        </h4>
        <div className="db-list-com">
          {(() => {
            if(!profile){
              return (
                <Loading loading />
              );
            }else{
              return (
                <Form
                  encType="multipart/form-data"
                  ref={(ref) => this.form = ref}
                  onSubmit={this.onSubmit}
                  className="form-horizontal"
                >
                  <div className="row">
                    <div className="col-sm-10">
                      <MyInput 
                        name="first_name"
                        title="First Name"
                        left={3}
                        center={3}
                        right={6}
                        value={profile.first_name.toString()}
                        maxLength={100}
                        validations={[lt, required]}
                        isChanged
                      />
                      <MyInput 
                        name="last_name"
                        title="Last Name"
                        left={3}
                        center={3}
                        right={6}
                        value={profile.last_name.toString()}
                        maxLength={100}
                        validations={[lt, required]}
                        isChanged
                      />
                      <MyInput 
                        name="manager_name"
                        title="Company"
                        left={3}
                        center={6}
                        right={3}
                        value={profile.manager_name.toString()}
                        maxLength={100}
                        validations={[lt]}
                        isChanged
                      />
                      <MyInput 
                        name="street_address"
                        title="Street Address"
                        left={3}
                        center={6}
                        right={3}
                        value={profile.street_address.toString()}
                        maxLength={255}
                        validations={[lt, required]}
                        isChanged
                      />
                      <MyInput 
                        name="address2"
                        title="Address 2"
                        left={3}
                        center={6}
                        right={3}
                        value={profile.address2.toString()}
                        maxLength={255}
                        validations={[lt]}
                        isChanged
                      />
                      <MyInput 
                        name="zip"
                        title="Zip"
                        type="text"
                        left={3}
                        center={3}
                        right={6}
                        value={profile.zip.toString()}
                        maxLength={20}
                        validations={[lt, required]}
                        isChanged
                      />
                      <MyInput 
                        name="city"
                        title="City"
                        left={3}
                        center={3}
                        right={6}
                        value={profile.city.toString()}
                        maxLength={50}
                        validations={[lt, required]}
                        isChanged
                      />
                      <div className="form-group">
                        <label
                          className="col-sm-3"
                          htmlFor="state">State</label>
                        <div className="col-sm-3">
                          <Select
                            name="state"
                            className="form-control"
                            value={profile.state}
                            validations={[required]}>
                            <option value="Outside US">Not Selected [Outside USA ]</option>
                            {states.map((state, index) => {
                              return (
                                <option key={index} value={state.iso}>{state.name}</option>
                              );
                            })}
                          </Select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          className="col-sm-3"
                          htmlFor="country">Country</label>
                        <div className="col-sm-3">
                          <Select
                            name="country"
                            className="form-control"
                            value={profile.country}
                            validations={[required]}>
                            {countries.map((country, index) => {
                              return (
                                <option key={index} value={country.iso}>{country.name}</option>
                              );
                            })}
                          </Select>
                        </div>
                      </div>
                      <MyInput 
                        name="work_phone"
                        title="Work Phone"
                        left={3}
                        center={3}
                        right={6}
                        value={profile.work_phone.toString()}
                        maxLength={15}
                        validations={[lt]}
                        isChanged
                      />
                      <MyInput 
                        name="home_phone"
                        title="Home Phone"
                        left={3}
                        center={3}
                        right={6}
                        value={profile.home_phone.toString()}
                        maxLength={15}
                        validations={[lt, required]}
                        isChanged
                      />
                      <MyInput 
                        name="cell_phone"
                        title="Cell Phone"
                        left={3}
                        center={3}
                        right={6}
                        value={profile.cell_phone.toString()}
                        maxLength={15}
                        validations={[lt, required]}
                        isChanged
                      />
                      <MyInput 
                        name="fax"
                        title="Fax"
                        left={3}
                        center={3}
                        right={6}
                        value={profile.fax.toString()}
                        maxLength={15}
                        validations={[lt]}
                        isChanged
                      />
                      <MyInput 
                        name="email"
                        title="Email"
                        left={3}
                        center={3}
                        right={6}
                        value={profile.email.toString()}
                        maxLength={100}
                        validations={[required, email, lt]}
                        isChanged
                      />
                      <MyTextArea 
                        name="comments"
                        title="Comments"
                        value={profile.comments.toString()}
                        validations={[]}
                        isChanged
                      />
                      <MyInput 
                        name="user_id"
                        title="User ID"
                        disabled
                        left={3}
                        center={3}
                        right={6}
                        value={profile.user_id.toString()}
                        maxLength={20}
                        validations={[lt, required]}
                        isChanged
                      />
                      <MyInput 
                        name="password1"
                        title="Password"
                        type="password"
                        left={3}
                        center={3}
                        right={6}
                        description="Password must be atleast 6 characters"
                        value=""
                        minLength={6}
                        maxLength={20}
                        onFocus={() => this.setState({ passwordTouched: true })}
                        validations={(this.state.passwordTouched) ? [gt, lt] : []}
                      />
                      <MyInput 
                        name="password2"
                        title="Confirm Password"
                        type="password"
                        value=""
                        left={3}
                        center={3}
                        right={6}
                        description="Confirm password must match password"
                        passwordkey="password1"
                        validations={[confirmPassword]}
                      />
                      <div className="form-group">
                        <label className="col-sm-3">Upload Logo</label>
                        <div className="col-sm-9">
                          <input
                            onChange={this.onLogoSelected}
                            id="logo"
                            name="logo"
                            type="file"
                            className="form-control"
                            />
                        </div>
                      </div>
                      <div className="text-right">
                        <Button className="btn btn-primary"><FontIcon name="edit" /> {(updating) ? ('Updating...') : ('Update')}</Button>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <img 
                        src={`${config.s3Bucket}pmlogos/${profile.logo_file_name}`} 
                        className="img-thumbnail" 
                        alt="Photo"/>
                    </div>
                  </div>
                </Form>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getOwnerProfile: PropTypes.func,
  profile: PropTypes.object,
  isFetching: PropTypes.bool,
  updating: PropTypes.bool,
  error: PropTypes.string,
  getStates: PropTypes.func,
  getCountries: PropTypes.func,
  updateOwnerProfile: PropTypes.func
};

export default Profile;
