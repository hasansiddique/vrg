import {get, isEmpty, map, startCase} from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {BeatLoader} from 'react-spinners';
import {DateRangePicker} from 'react-dates';
import {Popover, OverlayTrigger, Alert} from 'react-bootstrap';

import storage from 'common/storage';
import config from '../../../config';
import {getSvg} from '../../../common/svg-icons/index';
import IncrementCounter from '../../../common/components/increment-counter/index';
import {checkIfBlockedDayExist, findDateDetails} from '../../listed-property.utils';

// currency
let currency = config.currency;

class AvailabilityCalendar extends Component {
  constructor() {
    super();

    this.state = {
      minStay: 1,
      endDate: null,
      startDate: null,
      datesAvailable: '',
      focusedInput: null,
      adultGuestsCount: 1,
      childGuestsCount: 0,
      blockDayExist: null,
      showGuestsOverlay: false,
      lastCheck: {
        startDate: null,
        endDate: null,
        guests: null
      }
    };

    this.focusInput = this.focusInput.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.calculateRate = this.calculateRate.bind(this);
    this.onDatesChanged = this.onDatesChanged.bind(this);
    this.onFocusChanged = this.onFocusChanged.bind(this);
    this.renderCalendarDay = this.renderCalendarDay.bind(this);
    this.renderCalendarInfo = this.renderCalendarInfo.bind(this);
    this.toggleGuestsOverlay = this.toggleGuestsOverlay.bind(this);
    this.getAvailabilityInfo = this.getAvailabilityInfo.bind(this);
    this.isCalendarDayBlocked = this.isCalendarDayBlocked.bind(this);
    this.bookNow = this.bookNow.bind(this);
    this.closeBookingModal = this.closeBookingModal.bind(this);
  }

  componentWillMount() {
    this.getAvailabilityInfo();
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

  focusInput() {
    const {listingCalculationError} = this.props;
    const {focusedInput, startDate, endDate, blockDayExist} = this.state;
    let isAvailable = (isEmpty(listingCalculationError) && focusedInput === null && startDate && endDate && !blockDayExist);
    !isAvailable ? this.setState({focusedInput: 'startDate'}) : '';
  }

  toggleGuestsOverlay() {
    const {showGuestsOverlay} = this.state;
    this.setState({showGuestsOverlay: !this.state.showGuestsOverlay});
    showGuestsOverlay && this.calculateRate();
  }

  toggleAdultGuestsCount(counter) {
    const {adultGuestsCount} = this.state;
    (adultGuestsCount > 0) ? this.setState({adultGuestsCount: counter}) : '';
  }

  toggleChildGuestsCount(counter) {
    const {childGuestsCount} = this.state;
    (childGuestsCount >= 0) ? this.setState({childGuestsCount: counter}) : '';
  }

  calculateRate() {
    const {listingId} = this.props;
    const {startDate, endDate, blockDayExist, childGuestsCount, adultGuestsCount, lastCheck} = this.state;
    let totalGuests = (childGuestsCount + adultGuestsCount);
    this.setState({focusedInput: null});
    let isAvailable = (startDate && endDate && !blockDayExist);

    if (isAvailable && (lastCheck.startDate !== startDate || lastCheck.endDate !== endDate || lastCheck.guests !== totalGuests)) {
      this.props.initiateListingCalculation(listingId, startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'), totalGuests);
      this.setState({lastCheck: {startDate: startDate, endDate: endDate, guests: totalGuests}});
    }
  }

  clearDates() {
    this.setState({
      startDate: null,
      endDate: null,
      blockDayExist: null,
      datesAvailable: '',
      minStay: null,
      focusedInput: null,
    });
    this.props.getCalculationInfoError({});
  }

  onDatesChanged(date) {
    const {listingInfo} = this.props;
    let startDate = date.startDate;
    let endDate = date.endDate;
    let startDateDetails = startDate && findDateDetails(startDate.format('MM-DD-YYYY'), listingInfo);
    let blockDateExist = checkIfBlockedDayExist(startDate, endDate, listingInfo);

    let yesterday = moment(blockDateExist, 'MM-DD-YYYY');
    yesterday.subtract(1, 'days');
    let currentDay = !isEmpty(listingInfo) && findDateDetails(blockDateExist, listingInfo);
    let Yesterday = !isEmpty(listingInfo) && findDateDetails(yesterday.format('MM-DD-YYYY'), listingInfo);

    let blockDayExist = (
      currentDay
      && (currentDay.isBlock >= 1)
      && (
        Yesterday
        && (Yesterday.isBlock === 0)
        && (currentDay.calDate !== endDate.format('MM-DD-YYYY'))
      )
    );

    this.setState({
      startDate,
      endDate,
      minStay: get(startDateDetails, 'minStay') || 1,
      blockDayExist: blockDayExist ? blockDateExist : blockDayExist,
      datesAvailable: (startDate && endDate && !blockDayExist) ? 'Selected dates are available.' : '',
    });
  }

  onFocusChanged(focusedInput) {
    this.setState({focusedInput});
  }

  isCalendarDayBlocked(day) {
    const {listingInfo} = this.props;
    let yesterday = moment(day);
    let currentDate = moment(day);
    currentDate.add(24, 'hours');
    yesterday.subtract(1, 'days');
    const today = moment(new Date()).format('MM-DD-YYYY');
    let notBlocked = currentDate.isAfter(moment());
    let Yesterday = !isEmpty(listingInfo) && findDateDetails(yesterday.format('MM-DD-YYYY'), listingInfo);
    let currentDay = !isEmpty(listingInfo) && findDateDetails(day.format('MM-DD-YYYY'), listingInfo);
    return (!notBlocked || (currentDay && currentDay.isBlock >= 1 && today === currentDay.calDate) || (currentDay && currentDay.isBlock >= 1 && (Yesterday && Yesterday.isBlock >= 1)));
  }

  calculateAverageRate() {
    const {listingInfo, calculationInfo} = this.props;
    const {startDate, endDate, focusedInput, blockDayExist} = this.state;
    let isAvailable = (focusedInput === null && startDate && endDate && !blockDayExist);

    if (isAvailable && get(calculationInfo, 'totalRentalWithTax')) {
      return (
        <span className="listing-price">
          {currency + get(calculationInfo, 'totalRentalWithTax')}
        </span>
      );
    } else if (listingInfo.rates) {
      let averageRate = 0;
      listingInfo.rates.forEach(date => {
        return averageRate += date.rate;
      });
      return (
        <span>
            <span className="listing-price">
            {/*currency + Math.round(averageRate / size(listingInfo.rates))*/}
              {currency + get(listingInfo, 'autoNightlyRate')}
          </span>
            <span className="per-night">avg/night</span>
          </span>
      );
    }
    return false;
  }

  renderCalendarDay(day) {
    const {listingInfo} = this.props;
    let tomorrow = moment(day);
    let yesterday = moment(day);
    tomorrow.add(1, 'days');
    yesterday.subtract(1, 'days');
    let currentDay = !isEmpty(listingInfo) && findDateDetails(day.format('MM-DD-YYYY'), listingInfo);
    let Tomorrow = !isEmpty(listingInfo) && findDateDetails(tomorrow.format('MM-DD-YYYY'), listingInfo);
    let Yesterday = !isEmpty(listingInfo) && findDateDetails(yesterday.format('MM-DD-YYYY'), listingInfo);
    let blockClass = "";

    if (currentDay) {
      if (currentDay.calDate === moment(new Date()).format('MM-DD-YYYY')) {
        if (currentDay.isBlock >= 1) {
          if (Tomorrow && Tomorrow.isBlock >= 1) {
            blockClass = "full-blocked";
          } else if (!Tomorrow || (Tomorrow && Tomorrow.isBlock < 1)) {
            blockClass = "check-in-blocked";
          }
        } else if (currentDay.isBlock < 1) {
          blockClass = "check-in-blocked";
        }
      } else if (currentDay.isBlock >= 1) {
        if (!Yesterday || (Yesterday && Yesterday.isBlock < 1)) {
          blockClass = "check-out-blocked";
        } else if (Yesterday && Yesterday.isBlock >= 1) {
          blockClass = "full-blocked";
        } else if ((Tomorrow && Tomorrow.isBlock < 1) || !Tomorrow || (currentDay.isBlock === 0 && Yesterday && Yesterday.isBlock >= 1)) {
          blockClass = "check-in-blocked";
        }
      } else if (currentDay.isBlock < 1) {
        if (Yesterday && Yesterday.isBlock >= 1) {
          blockClass = "check-in-blocked";
        }
      }
    } else if ((moment(day).format('MM-DD-YYYY') === moment(new Date()).format('MM-DD-YYYY')) || (!currentDay && Yesterday && Yesterday.isBlock >= 1)) {
      blockClass = "check-in-blocked";
    }

    return (
      <OverlayTrigger
        bsClass="custom-popover"
        trigger={["hover", "focus"]}
        placement="top"
        overlay={<Popover
          id="date-popover">{(currency + (get(currentDay, 'rate') || get(listingInfo, 'autoNightlyRate')))}</Popover>}>
        <div
          className={blockClass}>
          <div className="calendar-date">
            {moment(day).get('date')}
          </div>
        </div>
      </OverlayTrigger>
    );
  }

  renderCalendarInfo() {
    let {startDate, endDate, minStay, blockDayExist, datesAvailable} = this.state;
    let isAvailable = (startDate && endDate && !blockDayExist);

    return (
      <div id="calendar-info">
        <div className="row">
          <div className="col-sm-12 txt-danger listing-stay">
            {startDate && !endDate && `Minimum ${minStay} nights booking is accepted for ${startDate.format('MM-DD-YYYY')}.`}
          </div>
          <div className="col-sm-12 listing-stay-btn-row">
            {(startDate || endDate) && (
              <span className="listing-stay-btn" onClick={this.clearDates}>
              Clear Dates
            </span>
            )}
            <span className="listing-stay-btn" onClick={this.calculateRate}>
            {isAvailable ? `Calculate` : `Close`}
          </span>
          </div>

          {(blockDayExist) && (
            <div className="col-sm-12 date-exist error">
              {`Closest Departure date is ${blockDayExist}.`}
            </div>
          )}

          {datesAvailable && (
            <div className="col-sm-12 date-exist success">
              {datesAvailable}
            </div>
          )}
        </div>
      </div>
    );
  }

  closeBookingModal() {
    this.props.toggleModalVisibility(false);
    this.props.toggleModalType('availability-calendar');
  }

  bookNow() {
    let {listingId, history, listingCalculationError} = this.props;
    let {startDate, endDate, adultGuestsCount, childGuestsCount} = this.state;
    if (startDate && endDate && isEmpty(listingCalculationError)) {
      storage.set('order', {
        unit_id: listingId,
        checkInDate: startDate.format('MM/DD/YYYY'),
        checkOutDate: endDate.format('MM/DD/YYYY'),
        adults: adultGuestsCount,
        children: childGuestsCount,
        guests: adultGuestsCount + childGuestsCount
      });
      this.closeBookingModal();
      history.push({
        pathname: '/booking'
      });
    }
  }

  render() {
    const {
      isCalculating,
      isFetching,
      listingCalculationError,
      listingInfo,
      calculationInfo,
      availabilityError
    } = this.props;
    const {
      startDate,
      endDate,
      minStay,
      blockDayExist,
      focusedInput,
      showGuestsOverlay,
      childGuestsCount,
      adultGuestsCount
    } = this.state;
    let isAvailable = (focusedInput === null && startDate && endDate && !blockDayExist);
    let notAvailable = (focusedInput === null && startDate && endDate && blockDayExist);
    let isCalculatingAverage = this.calculateAverageRate();
    let totalGuests = (adultGuestsCount + childGuestsCount);
    let maxGuest = listingInfo.maxGuest || 2;
    let canBook = (startDate && endDate && isEmpty(listingCalculationError) && !isEmpty(calculationInfo));

    return (
      <div className="pglist-p-com pglist-bg right-menu">
        {(isCalculating || isFetching) ?
          <div className="calculation-spinner">
            <BeatLoader
              color={'#0074E1'}
              loading={isCalculating || isFetching}
            />
            Loading...
          </div>
          :
          !isEmpty(availabilityError) ?
            <div className="booking-error">
              <Alert bsStyle="danger">
                {availabilityError}
                <br/>
                <br/>
                <a href="javascript:void(0)" onClick={this.getAvailabilityInfo}>
                  <span className="fa fa-refresh">&nbsp;</span> Retry
                </a>
              </Alert>
            </div>
            :
            <div>
              <div className="listing-head row">
                <div className="col-sm-6">
                  {!isCalculatingAverage ?
                    <BeatLoader
                      color={'#0074E1'}
                      loading={!isCalculatingAverage}
                    />
                    :
                    isCalculatingAverage
                  }
                </div>
                <div className="col-sm-6">
                <span className="availability-text">
                  {(isAvailable && isEmpty(listingCalculationError)) && (
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="top"
                      overlay={<Popover id="available-popover">Dates are available.</Popover>}>
                      {getSvg('tickRound', 32, 32, '#41AD49')}
                    </OverlayTrigger>
                  )}

                  {(notAvailable || (isAvailable && !isEmpty(listingCalculationError))) && (
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="top"
                      overlay={<Popover id="not-available-popover">Dates are not available.</Popover>}>
                      {getSvg('crossRound', 32, 32, '#EF5F56')}
                    </OverlayTrigger>
                  )}
                </span>
                </div>
              </div>
              <div className="listing-cal-detail">
                <div className="listing-dates listing-item">
                  <DateRangePicker
                    disabled={!isEmpty(availabilityError)}
                    ref={'dates'}
                    numberOfMonths={1}
                    startDate={startDate}
                    endDate={endDate}
                    minimumNights={minStay}
                    focusedInput={focusedInput}
                    keepOpenOnDateSelect={focusedInput !== null}
                    startDatePlaceholderText={'Arrival'}
                    endDatePlaceholderText={'Departure'}
                    hideKeyboardShortcutsPanel
                    customArrowIcon={<div>&nbsp;</div>}
                    onClose={this.calculateRate}
                    renderDay={this.renderCalendarDay}
                    onDatesChange={this.onDatesChanged}
                    onFocusChange={this.onFocusChanged}
                    isDayBlocked={this.isCalendarDayBlocked}
                    renderCalendarInfo={this.renderCalendarInfo}
                  />
                </div>

                <div className="input-field s12">
                  <div id="guests" ref="guests"
                       className={"listing-guests-input " + (showGuestsOverlay ? "overlay-shown" : "")}
                       onClick={this.toggleGuestsOverlay}>
                    {totalGuests + (totalGuests === 1 ? ` guest` : ` guests`)}
                    {showGuestsOverlay ?
                      <i className="fa fa-angle-up listing-guests-icon">&nbsp;</i>
                      :
                      <i className="fa fa-angle-down listing-guests-icon">&nbsp;</i>
                    }
                  </div>

                  {showGuestsOverlay && (
                    <div className="guest-overlay">
                      <div className="row guests-row">
                        <div className="col-md-5 guests-text">
                          Adults
                        </div>
                        <div className="col-md-7">
                          <IncrementCounter
                            wrapperClassName="pull-right"
                            counter={adultGuestsCount}
                            minDisabledAt={1}
                            maxDisabledAt={maxGuest - childGuestsCount}
                            updateCounter={this.toggleAdultGuestsCount.bind(this)}/>
                        </div>
                      </div>

                      <div className="row guests-row">
                        <div className="col-md-5 guests-text guests-text-w-sub">
                          Children
                          <div className="sub-text">
                            Age 2 - 12
                          </div>
                        </div>
                        <div className="col-md-7">
                          <IncrementCounter
                            wrapperClassName="pull-right"
                            counter={childGuestsCount}
                            minDisabledAt={0}
                            maxDisabledAt={maxGuest - adultGuestsCount}
                            updateCounter={this.toggleChildGuestsCount.bind(this)}/>
                        </div>
                      </div>

                      <div className="row guests-row guests-row-done" onClick={this.toggleGuestsOverlay}>
                        Done
                      </div>
                    </div>
                  )}
                </div>

                {!isEmpty(listingCalculationError) && (
                  <div className="booking-error">
                    <Alert bsStyle="danger">
                      {listingCalculationError.msg || `Something went wrong while booking. Please contact owner for details.`}
                    </Alert>
                  </div>
                )}

                {(isAvailable && isEmpty(listingCalculationError) && get(calculationInfo, 'breakdown')) && (
                  <div className="listing-item">
                    <div className="list-pg-oth-info">
                      <ul>
                        {map(get(calculationInfo, 'breakdown[0]'), (value, key) => {
                          if (value) {
                            return (
                              <li key={key} className="listing-info-item">
                                {startCase(key)}
                                <span>
                                  {(() => {
                                    if (typeof value == 'number') {
                                      return currency + value;
                                    } else {
                                      return value;
                                    }
                                  })()}
                                </span>
                              </li>
                            );
                          }
                        })}
                        <li>
                          <b>
                            Total
                            <span className="listing-info-total">{currency + calculationInfo.totalRentalWithTax}</span>
                          </b>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="">
                  <a className={`book-now-button ${canBook ? '' : 'disabled'}`} href="javascript:void(0)"
                     onClick={this.bookNow}>
                    <i className="fa fa-usd" aria-hidden="true"/> Book Now
                  </a>
                </div>

              </div>
            </div>
        }
      </div>
    );
  }
}

AvailabilityCalendar.propTypes = {
  initiateGetAvailabilityInfo: PropTypes.func.isRequired,
  initiateListingCalculation: PropTypes.func.isRequired,
  getCalculationInfoError: PropTypes.func.isRequired,
  calculationInfo: PropTypes.object.isRequired,
  listingCalculationError: PropTypes.object,
  listingInfo: PropTypes.object.isRequired,
  isCalculating: PropTypes.bool.isRequired,
  listingId: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  availabilityError: PropTypes.string,
};

export default AvailabilityCalendar;
