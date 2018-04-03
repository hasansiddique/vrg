import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {DateRangePicker} from 'react-dates';
import queryString from 'query-string';
import Select from 'react-select';

// custom imports
import SearchDestination from './destinations';

class HomeSearch extends Component {

  constructor() {
    super();

    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      guests: 0,
      inputRequired: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onDatesChanged = this.onDatesChanged.bind(this);
    this.onFocusChanged = this.onFocusChanged.bind(this);
  }

  componentWillMount() {
    // this.props.fetchLocationsList();
  }

  onDatesChanged(date) {
    // const {checkInDate, checkOutDate} = this.props;
    let startDate = date.startDate;
    let endDate = date.endDate;
    this.setState({startDate, endDate});
    // startDate && checkInDate !== startDate && this.props.updateCheckInDate(startDate);
    // endDate && checkOutDate !== endDate && this.props.updateCheckOutDate(endDate);
  }

  onFocusChanged(focusedInput) {
    this.setState({focusedInput});
  }

  onSubmit(e) {
    e.preventDefault();
    const {searchedLocation} = this.props;
    let { startDate, endDate } = this.state;
    if(!searchedLocation){
      this.setState({ inputRequired: true });
      return false;
    }
    let payload = {
      query: searchedLocation.label.toLowerCase(),
      checkInDate: (startDate && startDate.format) ? startDate.format('YYYY-MM-DD') : '',
      checkOutDate: (endDate && endDate.format) ? endDate.format('YYYY-MM-DD') : '',
      guests: this.state.guests,
    };
    this.props.history.push({
      pathname: '/search',
      search: queryString.stringify(payload)
    });
  }

  render() {
    let options = [
      { value: 1, label: '1 Guest' },
      { value: 2, label: '2 Guests' },
      { value: 3, label: '3 Guests' },
      { value: 4, label: '4 Guests' },
      { value: 5, label: '5 Guests' },
      { value: 6, label: '6 Guests' },
      { value: 7, label: '7 Guests' },
      { value: 8, label: '8 Guests' },
      { value: 9, label: '9 Guests' },
      { value: 11, label: '11 Guests' },
      { value: 12, label: '12 Guests' },
      { value: 13, label: '13 Guests' },
      { value: 14, label: '14 Guests' },
      { value: 15, label: '15 Guests' },
      { value: 16, label: '16 Guests' },
    ];
    let { isMobile } = this.props;
    let { inputRequired } = this.state;
    return (
      <div className="container">
        <div className="">
          <div className="">
            <div className="title text-center">
              <h1>Destination Marketplace for a perfect vacation rental</h1>
            </div>
            <div id="home-search-form" className="search-form">
              <form className="tourz-search-form clearfix" onSubmit={this.onSubmit}>
                <div className="search-container">
                  <div className="row">
                    <div className="col-sm-6 col-xs-12 col-sm-offset-0 col-small-padding search-input">
                      <div id="search-destination" className={(inputRequired) ? 'search-box-input input-required' : 'search-box-input'}>
                        <SearchDestination noResultsText={'No properties available.'}/>
                      </div>
                    </div>
                    <div
                      className="col-sm-3 col-xs-12 col-sm-offset-0 col-small-padding search-input block-date-picker">
                      <DateRangePicker
                        numberOfMonths={(isMobile) ? 1 : 2}
                        daySize={(isMobile) ? 36 : 38}
                        showDefaultInputIcon={(isMobile) ? false : true}
                        hideKeyboardShortcutsPanel
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onDatesChange={this.onDatesChanged}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={this.onFocusChanged}
                      />
                    </div>
                    <div
                      className="col-sm-2 col-xs-12 col-sm-offset-0 col-small-padding search-input">

                      <div className="guests-input" style={{marginTop: 0}}>
                        <Select
                          clearable={false}
                          menuStyle={{ height: 'auto', overflow: 'none' }}
                          className="guests"
                          matchProp={'value'}
                          multi={false}
                          onChange={(val) => this.setState({ guests: val })}
                          options={options}
                          placeholder={'Guests'}
                          simpleValue
                          value={this.state.guests}
                          />
                      </div>
                    </div>
                    <div className="col-sm-1 col-xs-12 col-sm-offset-0 col-small-padding search-input">
                      <div className="input-field" style={{ marginTop: 0 }} onClick={this.onSubmit}>
                        <i className="waves-effect waves-light tourz-sear-btn waves-input-wrapper text-center">
                          {/*<input type="submit" value="search" className="waves-button-input"/>*/}
                          &nbsp;
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomeSearch.propTypes = {
  fetchLocationsList: PropTypes.func.isRequired,
  updateCheckInDate: PropTypes.func.isRequired,
  updateCheckOutDate: PropTypes.func.isRequired,
  initiateSearchForLocations: PropTypes.func.isRequired,
  checkInDate: PropTypes.object,
  checkOutDate: PropTypes.object,
  history: PropTypes.object.isRequired,
  searchedLocation: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired
};

export default HomeSearch;
