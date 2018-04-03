import {isEmpty} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DayPickerRangeController} from 'react-dates';
import {BeatLoader} from 'react-spinners';
import moment from "moment/moment";

import {findDateDetails} from "../listed-property.utils";
import config from "../../config";

let currency = config.currency;

class PropertyCalendar extends Component {
  constructor() {
    super();

    this.state = {
      endDate: null,
      startDate: null,
      focusedInput: 'startDate',
    };

    this.onFocusChanged = this.onFocusChanged.bind(this);
    this.renderCalendarDay = this.renderCalendarDay.bind(this);
    this.getAvailabilityInfo = this.getAvailabilityInfo.bind(this);
    this.isCalendarDayBlocked = this.isCalendarDayBlocked.bind(this);
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

  onFocusChanged() {
    this.setState({focusedInput: 'startDate'});
  }

  checkDateDetails(currentDate, listingInfo) {
    return listingInfo.rates.find(date => {
      return date.calDate === currentDate;
    });
  }

  isCalendarDayBlocked(day) {
    const {listingInfo} = this.props;
    let currentDate = moment(day);
    currentDate.add(24, 'hours');
    let notBlocked = currentDate.isAfter(moment());
    let currentDay = !isEmpty(listingInfo) && this.checkDateDetails(day.format('MM-DD-YYYY'), listingInfo);
    return (!notBlocked || currentDay && currentDay.isBlock >= 1);
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
      <div
        className={blockClass}>
        <div className="calendar-date">{moment(day).get('date')}</div>
        <div className="calendar-rate">{`${currency}${(currentDay && currentDay.rate) || 0}`}</div>
      </div>
    );
  }

  render() {
    const {isFetching, availabilityError, isMobile} = this.props;
    const {startDate, endDate, focusedInput} = this.state;

    return (
      <div className="pglist-p2 pglist-bg pglist-p-com" id="property-calendar">
        <div className="pglist-p-com-ti">
          <h3><span>Availability Calendar</span></h3>
        </div>
        <div className="list-pg-inn-sp property-rates-availability center">
          {isFetching ?
            <div className="calculation-spinner">
              <BeatLoader
                color={'#0074E1'}
                loading={isFetching}
              />
              Please wait...
            </div>
            :
            !isEmpty(availabilityError) ?
              <div className="text-danger">
                {availabilityError} <a onClick={this.getAvailabilityInfo}>Retry</a>
              </div>
              :
              <DayPickerRangeController
                hideKeyboardShortcutsPanel
                startDate={startDate}
                endDate={endDate}
                numberOfMonths={isMobile ? 1 : 2}
                focusedInput={focusedInput}
                onDatesChange={({startDate, endDate}) => this.setState({startDate, endDate})}
                onFocusChange={this.onFocusChanged}
                isDayBlocked={this.isCalendarDayBlocked}
                renderDay={this.renderCalendarDay}/>
          }
        </div>
      </div>
    );
  }
}

PropertyCalendar.propTypes = {
  initiateGetAvailabilityInfo: PropTypes.func.isRequired,
  listingInfo: PropTypes.object.isRequired,
  listingId: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  availabilityError: PropTypes.string,
  isMobile: PropTypes.bool,
};

export default PropertyCalendar;
