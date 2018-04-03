import React from 'react';
import PropTypes from 'prop-types';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import Form from 'react-validation/build/form';
import Button from 'react-validation/build/button';
import Loading from 'common/components/loading';
import { required, gt, lt, email } from 'common/validator';
import FontIcon from 'common/components/font-icon';
import MyInput from 'common/forms/horizontal/input';

export default class CalendarSync extends React.Component {

  static get propTypes(){
    return {
      getOwnerUnitCalendarSync: PropTypes.func,
      match: PropTypes.object,
      calendarSync: PropTypes.object,
      isFetching: PropTypes.bool,
      error: PropTypes.string,
      updateOwnerUnitCalendarSync: PropTypes.func,
      updateOwnerUnitCalendarSyncStore: PropTypes.func,
      updating: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.form = null;
  }

  componentDidMount(){
    let { getOwnerUnitCalendarSync, match } = this.props;
    let { id } = match.params;
    getOwnerUnitCalendarSync(id);
  }

  componentWillUnmount(){
    let { updateOwnerUnitCalendarSyncStore } = this.props;
    updateOwnerUnitCalendarSyncStore({
      calendarSync: null,
      isFetching: false,
      error: '',
      updating: false
    });
  }

  onSubmit(e){
    e.preventDefault();
    let { updateOwnerUnitCalendarSync, updating, calendarSync, updateOwnerUnitCalendarSyncStore } = this.props;
    if(updating === false){
      let values = this.form.getValues();
      let newValues = Object.assign({}, calendarSync, values);
      updateOwnerUnitCalendarSyncStore({
        calendarSync: newValues
      });
      let promise = updateOwnerUnitCalendarSync(values);
      promise.then((res) => {
        if(res.status == false){
          this.setState({
            errors: res.errmsgs
          });
        }else{
          this.setState({
            errors: []
          });
        }
      }).catch((err) => {
        updateOwnerUnitCalendarSyncStore({
          calendarSync: calendarSync
        });
      });
    }

  }

  render() {
    let { calendarSync, isFetching, error, updating, match } = this.props;
    let { errors } = this.state;
    let unit_id = match.params.id;
    return (
      <div>
        {(() => {
          if(!calendarSync || isFetching){
            return (
              <Loading loading />
            );
          }else{
            return (
              <div>
                {errors.length ? (
                  <div className="alert alert-danger">
                    {errors.map((err) => {
                      return (
                        <div>{err}</div>
                      );
                    })}
                  </div>
                ) : null}
                <Form
                  ref={(ref) => this.form = ref}
                  className="form-horizontal"
                  onSubmit={this.onSubmit}>
                  <Input name="unit_id" type="hidden" value={unit_id} />
                  <MyInput 
                    name="ha_ics_url"
                    title="HomeAway or VRBO ICS URL"
                    value={calendarSync.ha_ics_url.toString()}
                    maxLength={255}
                    validations={[lt]}
                    isChanged
                  />
                  <MyInput 
                    name="kigo_ics_url"
                    title="KIGO ICS URL"
                    value={calendarSync.kigo_ics_url.toString()}
                    maxLength={255}
                    validations={[lt]}
                    isChanged
                  />
                  <MyInput 
                    name="airbnb_ics_url"
                    title="AirBnB ICS URL"
                    value={calendarSync.airbnb_ics_url.toString()}
                    maxLength={255}
                    validations={[lt]}
                    isChanged
                  />
                  <MyInput 
                    name="skyrun_ics_url"
                    title="Skyrun ICS URL"
                    value={calendarSync.skyrun_ics_url.toString()}
                    maxLength={255}
                    validations={[lt]}
                    isChanged
                  />
                  <div className="form-group">
                    <label className="col-sm-3">Show Address on MAP?</label>
                    <div className="col-sm-9">
                      <Select
                        name="show_address"
                        className="form-control"
                        value={calendarSync.show_address}
                        validations={[required]}>
                          <option value={0}>No</option>
                          <option value={1}>Yes</option>
                      </Select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-12 text-right">
                      <Button className="btn btn-primary">
                        <FontIcon name="save" /> {(updating) ? 'Updating...' : 'Update'}
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}
