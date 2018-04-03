import {isEmpty, size} from 'lodash';
import moment from "moment/moment";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import Form from 'react-validation/build/form';
import {DayPickerRangeController} from 'react-dates';

import config from "../../../../config";
import Loader from '../../../../common/components/loading';
import {getDates, checkIfBookedDayExist, checkIfRateIsSame} from "../../../../listed-property/listed-property.utils";
import AvailabilityUpdate from './AvailabilityUpdate.jsx';
import Error from 'common/components/error';
import Button from '../../../../common/components/button';

let currency = config.currency;

class UnitRates extends Component {
  constructor() {
    super();

    this.state = {
      endDate: null,
      startDate: null,
      formIsValid: false,
      focusedInput: 'startDate',
      isUpdated: false,
      daySize: 0,
      selectedtab: 1,
      selectedAvailability: 1,
      minStay: 1,
      selectedDatesRate: 0,
    };

    this.submitForm = this.submitForm.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.getDatesData = this.getDatesData.bind(this);
    this.handleMinStay = this.handleMinStay.bind(this);
    this.setFormIsValid = this.setFormIsValid.bind(this);
    this.onFocusChanged = this.onFocusChanged.bind(this);
    this.onDatesChanged = this.onDatesChanged.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.checkDatesBooked = this.checkDatesBooked.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.checkDateDetails = this.checkDateDetails.bind(this);
    this.resetErrorMessage = this.resetErrorMessage.bind(this);
    this.renderCalendarDay = this.renderCalendarDay.bind(this);
    this.getAvailabilityInfo = this.getAvailabilityInfo.bind(this);
    this.onAvailabilityChange = this.onAvailabilityChange.bind(this);
    this.isCalendarDayBlocked = this.isCalendarDayBlocked.bind(this);
  }

  componentWillMount() {
    this.getAvailabilityInfo();
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isUpdated && !isEmpty(nextProps.isUpdateSuccess)) {
      this.clearDates();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = (this.calendarContainer) ? this.calendarContainer.offsetWidth : window.innerWidth;
    let daySize = (windowWidth / 7.8);

    this.setState({
      daySize: daySize
    });
  }

  setFormIsValid(status) {
    this.setState({formIsValid: status});
  }


  handleTabSelect(selectedtab) {
    this.setState({selectedtab});
  }

  getAvailabilityInfo() {
    const {listingId} = this.props;

    let startDate = moment();
    let endDate = moment();
    endDate.add(2, 'y');

    let payload = {
      'unit_id': listingId,
      'end_date': endDate.format('MM-DD-YYYY'),
      'start_date': startDate.format('MM-DD-YYYY')
    };

    this.props.initiateGetAvailabilityInfo(payload);
  }

  onFocusChanged(focusedInput) {
    this.setState({focusedInput});
  }

  handleMinStay(value) {
    this.setState({minStay: value.value});
  }

  checkDatesBooked(dates) {
    const {listingInfo} = this.props;
    if (dates && dates.startDate !== null && dates.endDate !== null) {
      return size(checkIfBookedDayExist(dates.startDate, dates.endDate, listingInfo));
    }
  }

  onDatesChanged(dates) {
    const {isUpdateSuccess, listingInfo} = this.props;
    const {focusedInput} = this.state;
    const bookedDays = this.checkDatesBooked(dates);

    if (dates.startDate !== null && dates.endDate !== null && focusedInput === 'endDate') {
      let rates = checkIfRateIsSame(dates.startDate, dates.endDate, listingInfo);
      this.setState({
        startDate: dates.startDate,
        endDate: dates.endDate,
        focusedInput: 'startDate',
        selectedDatesRate: rates.length === 1 ? rates[0] : listingInfo.autoNightlyRate,
      });
    } else {
      this.setState({startDate: dates.startDate, endDate: dates.endDate});
    }
    this.resetErrorMessage();
    (!isEmpty(isUpdateSuccess)) && this.props.toggleAvailabilityUpdatedStatus('');
    if (bookedDays > 0) {
      this.props.getAvailabilityDetailsFailed('Operation permitted!. Selected range contains dates that are booked. Please cancel booking before updating availability for theses dates. ');
    }
  }

  resetErrorMessage() {
    const {isUpdateError} = this.props;
    (!isEmpty(isUpdateError)) && this.props.getAvailabilityDetailsFailed('');
  }

  onAvailabilityChange(selectedAvailability) {
    this.setState({selectedAvailability});
  }

  isCalendarDayBlocked(day) {
    const {listingInfo} = this.props;
    let currentDate = moment(day);
    currentDate.add(24, 'hours');
    let notBlocked = currentDate.isAfter(moment());
    let currentDay = !isEmpty(listingInfo) && this.checkDateDetails(day.format('MM-DD-YYYY'), listingInfo);
    return (!notBlocked || currentDay && currentDay.isBlock > 1);
  }

  checkDateDetails(currentDate, listingInfo) {
    return listingInfo.rates.find(date => {
      return date.calDate === currentDate;
    });
  }

  renderCalendarDay(day) {
    const {listingInfo} = this.props;
    let currentDay = !isEmpty(listingInfo) && this.checkDateDetails(day.format('MM-DD-YYYY'), listingInfo);

    let className = "";
    let changeOverClass = "";
    if (currentDay && currentDay.isBlock > 1) {
      className = "booked";
    }
    else if (currentDay && currentDay.isBlock === 1) {
      className = "blocked";
    }
    else if (currentDay && currentDay.isBlock === 0) {
      if (currentDay.changeOver === 1) {
        className = "";
        changeOverClass = " co-check-in";
      } else if (currentDay.changeOver === 2) {
        className = "";
        changeOverClass = " co-check-out";
      } else if (currentDay.changeOver === 3) {
        className = "";
        changeOverClass = " co-no-action";
      } else if (currentDay.changeOver === 4) {
        className = "";
        changeOverClass = " co-both";
      }
    }

    return (
      <div className={className + changeOverClass}>
        <div className="change-over-text">&nbsp;</div>
        <div className="calendar-date">{moment(day).get('date')}</div>
        <div className="calendar-rate">{`${currency}${(currentDay && currentDay.rate) || 0}`}</div>
      </div>
    );
  }

  getDatesData() {
    const {startDate, endDate, minStay} = this.state;
    let selectedDates = getDates(startDate, endDate);
    let form = this.form;
    form.validateAll();
    let formValues = form.getValues();
    formValues = formValues['undefined'];

    let datesPayload = [];
    selectedDates && selectedDates.forEach((date) => {
      let availability = {
        cal_date: date,
        change_over: 4,
        min_stay: minStay,
        rate: formValues,
        weekly_rates: 0,
        monthly_rates: 0,
      };
      datesPayload.push(availability);
    });

    return datesPayload;
  }

  clearDates() {
    this.setState({
      startDate: null,
      endDate: null,
      focusedInput: 'startDate'
    });
  }

  submitForm(event) {
    event.preventDefault();
    const {listingId} = this.props;
    const {formIsValid} = this.state;
    this.form && this.form.validateAll();
    const {startDate, endDate, selectedAvailability} = this.state;

    if (selectedAvailability === 1) {
      this.props.initiateUpdateBlockingDetails({
        unit_id: listingId && listingId,
        end_date: endDate.format('MM-DD-YYYY'),
        start_date: startDate.format('MM-DD-YYYY'),
      });
    }
    else if (selectedAvailability === 2 && formIsValid) {
      this.props.initiateUpdateAvailabilityDetails({
        unit_id: listingId && listingId,
        availability: this.getDatesData(),
        end_date: endDate.format('MM-DD-YYYY'),
        start_date: startDate.format('MM-DD-YYYY'),
      });
    }
  }

  render() {
    const {isFetching, isUpdating, isUpdateSuccess, isUpdateError, listingId, availabilityError, isMobile} = this.props;
    const {
      startDate,
      endDate,
      focusedInput,
      selectedAvailability,
      daySize,
      selectedtab,
      minStay,
      selectedDatesRate,
    } = this.state;
    return (
      <div id="unit-rates">
        {availabilityError ?
          <Error msg={availabilityError}/>
          :
          <div className="pglist-p2 pglist-bg pglist-p-com">
            <div className="list-pg-inn-sp property-rates-availability">
              {isFetching ?
                <div className="calculation-spinner">
                  <Loader loading={isFetching}/>
                </div>
                :
                <div className="row">
                  <div className="col-lg-7" style={{overflow: 'hidden', paddingLeft: '5px', paddingRight: '5px'}}>
                    <div ref={(ref) => this.calendarContainer = ref}>
                      <DayPickerRangeController
                        hideKeyboardShortcutsPanel
                        startDate={startDate}
                        daySize={parseInt(daySize)}
                        endDate={endDate}
                        numberOfMonths={1}
                        minimumNights={0}
                        focusedInput={focusedInput}
                        onDatesChange={this.onDatesChanged}
                        onFocusChange={this.onFocusChanged}
                        isDayBlocked={this.isCalendarDayBlocked}
                        renderDay={this.renderCalendarDay}/>
                    </div>

                    <div className="row">
                      <div className="col-sm-3" style={{marginTop: '15px'}}>
                        <b style={{color: "#14A76C", textDecoration: 'underline', whiteSpace: 'nowrap'}}>Available:</b>
                        <ul className="legend" style={{whiteSpace: 'nowrap'}}>
                          <li><span className="check-in-legend">I</span> <p className="text">Check In Only</p></li>
                          <li><span className="check-out-legend">O</span> <p className="text">Check Out Only</p></li>
                          <li><span className="available-legend">C</span> <p className="text">Both</p></li>
                          <li><span className="no-action-legend">X</span> <p className="text">No Action</p></li>
                        </ul>
                      </div>
                      <div className="col-sm-3" style={{marginTop: '15px'}}>
                        <b style={{color: "#EF5F56", textDecoration: 'underline', whiteSpace: 'nowrap'}}>
                          Not Available
                        </b>
                        <ul className="legend row" style={{whiteSpace: 'nowrap'}}>
                          <li><span className="booked-legend">&nbsp;</span> <p className="text">Booked</p></li>
                          <li><span className="blocked-legend">&nbsp;</span> <p className="text">Blocked</p></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Modal show={startDate && endDate && isMobile} onHide={this.closeModal}>
                    <div id="unit-rates" style={{padding: '15px'}}>
                      <div className="pglist-bg">
                        <div className="property-rates-availability">
                          <Form ref={c => this.form = c}>
                            <AvailabilityUpdate
                              selectedtab={selectedtab}
                              isUpdating={isUpdating}
                              minStay={minStay}
                              listingId={listingId}
                              startDate={startDate}
                              endDate={endDate}
                              selectedAvailability={selectedAvailability}
                              isUpdateSuccess={isUpdateSuccess}
                              isUpdateError={isUpdateError}
                              selectedDatesRate={selectedDatesRate}
                              clearDates={this.clearDates}
                              submitForm={this.submitForm}
                              handleTabSelect={this.handleTabSelect}
                              setFormIsValid={this.setFormIsValid}
                              resetErrorMessage={this.resetErrorMessage}
                              handleMinStay={this.handleMinStay}
                              onAvailabilityChange={this.onAvailabilityChange}
                              initiateUpdateAvailabilityDetails={this.props.initiateUpdateAvailabilityDetails}
                            />
                          </Form>
                        </div>
                      </div>
                    </div>
                  </Modal>

                  <div className="col-lg-5">
                    {isMobile ?
                      <div className="bottom-menu">
                        {!isEmpty(isUpdateError) ?
                          <div className="text-danger row">
                            <div className="col-xs-2">
                              <img src="/images/failure.svg" alt="Failure" height={45}
                                   style={{border: 'none', padding: 0, marginBottom: 0}}/>
                            </div>
                            <div className="col-xs-10">
                              {isUpdateError || 'Something went wrong while updating. '}
                              <a href="javascript:void(0)" onClick={this.resetErrorMessage}>
                                {' Click to reset.'}
                              </a>
                            </div>
                          </div>
                          :
                          !isEmpty(isUpdateSuccess) ?
                            <div className="text-success row">
                              <div className="col-xs-2">
                                <img src="/images/success.svg" alt="Success" height={45}
                                     style={{border: 'none', padding: 0, marginBottom: 0}}/>
                              </div>
                              <div className="col-xs-10">
                                Rates and availability for selected dates updated successfully!
                              </div>
                            </div>
                            :
                            <div className="text-info row">
                              <div className="col-xs-12">
                                Please select a range of dates from calendar to update availability. For
                                single date update, double click on single day.
                              </div>
                            </div>
                        }
                      </div>
                      :
                      <Form ref={c => this.form = c}>
                        <AvailabilityUpdate
                          selectedtab={selectedtab}
                          isUpdating={isUpdating}
                          minStay={minStay}
                          listingId={listingId}
                          startDate={startDate}
                          endDate={endDate}
                          selectedAvailability={selectedAvailability}
                          isUpdateSuccess={isUpdateSuccess}
                          isUpdateError={isUpdateError}
                          selectedDatesRate={selectedDatesRate}
                          clearDates={this.clearDates}
                          submitForm={this.submitForm}
                          handleTabSelect={this.handleTabSelect}
                          setFormIsValid={this.setFormIsValid}
                          resetErrorMessage={this.resetErrorMessage}
                          handleMinStay={this.handleMinStay}
                          onAvailabilityChange={this.onAvailabilityChange}
                          initiateUpdateAvailabilityDetails={this.props.initiateUpdateAvailabilityDetails}
                        />
                      </Form>
                    }
                  </div>

                </div>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

UnitRates.propTypes = {
  initiateUpdateAvailabilityDetails: PropTypes.func.isRequired,
  toggleAvailabilityUpdatedStatus: PropTypes.func.isRequired,
  initiateUpdateBlockingDetails: PropTypes.func.isRequired,
  getAvailabilityDetailsFailed: PropTypes.func.isRequired,
  initiateGetAvailabilityInfo: PropTypes.func.isRequired,
  isUpdateSuccess: PropTypes.string.isRequired,
  isUpdateError: PropTypes.string.isRequired,
  listingInfo: PropTypes.object.isRequired,
  listingId: PropTypes.number.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  availabilityError: PropTypes.string,
};

export default UnitRates;
