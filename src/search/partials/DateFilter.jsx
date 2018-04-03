import React from 'react';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import moment from 'moment';
import {
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap';
import { DayPickerRangeController } from 'react-dates';
const {
  Header,
  Body,
  Footer
} = Modal;

export default class DateFilter extends React.Component {

  static get propTypes(){
    return {
      updateFilter: PropTypes.func.isRequired,
      show: PropTypes.bool.isRequired,
      onClick: PropTypes.func,
      filters: PropTypes.object.isRequired,
      closeModal: PropTypes.func,
      checkInDate: PropTypes.object,
      checkOutDate: PropTypes.object,
      isMobile: PropTypes.bool
    };
  }
  static get defaultProps(){
    return {
      show: false,
      isMobile: false,
      onClick: () => {},
      closeModal: () => {}
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: 'startDate',
      filters: {}
    };
    this.updateFilter = this.updateFilter.bind(this);
    this.cancelChange = this.cancelChange.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.onFocusChanged = this.onFocusChanged.bind(this);
  }

  componentWillMount(){
    this.setFilters();
  }
  componentWillReceiveProps(){
    this.setFilters();
  }
  setFilters(){
    let { filters } = this.props;
    this.setState({
      filters: filters
    });
  }

  updateFilter(date){
    let { filters } = this.state;
    let newFilters = {};
    newFilters.DateCheckIn = date.startDate;
    newFilters.DateCheckOut = date.endDate;
    this.setState({
      filters: Object.assign({}, newFilters)
    });
  }

  applyFilters(){
    let { filters } = this.state;
    if(filters.DateCheckIn){
      filters.DateCheckIn = filters.DateCheckIn.format('MM/DD/Y');
    }
    if(filters.DateCheckOut){
      filters.DateCheckOut = filters.DateCheckOut.format('MM/DD/Y');
    }
    this.props.updateFilter(filters);
    this.props.closeModal();
  }

  clearFilter(){
    this.setState({
      filters: {}
    });
    this.props.updateFilter({});
    this.props.closeModal();
  }

  cancelChange(){
    this.setState({
      filters: {}
    });
    this.props.closeModal();
  }

  onFocusChanged(focusedInput) {
    if(!focusedInput){ focusedInput = 'startDate'; }
    this.setState({focusedInput});
  }

  render() {
    let { show, onClick, isMobile } = this.props;
    let { filters } = this.state;
    let propFilters = this.props.filters;
    let keys = Object.keys(propFilters);
    let active = false;
    if(keys.length > 0){
      active = true;
    }
    let DateCheckIn = filters.DateCheckIn || null;
    let DateCheckOut = filters.DateCheckOut || null;
    if(DateCheckIn){
      DateCheckIn = moment(DateCheckIn, 'MM/DD/Y');
    }
    if(DateCheckOut){
      DateCheckOut = moment(DateCheckOut, 'MM/DD/Y');
    }
    let yesterday = moment().add(-1, 'days');
    let calendarSettings = {
      isOutsideRange: (date) => { return date <= yesterday; },
      numberOfMonths: (isMobile) ? 1 : 2,
      daySize: (isMobile) ? 40 : 46,
      orientation: (isMobile) ? 'vertical' : 'horizontal',
      hideKeyboardShortcutsPanel: true,
      startDate: DateCheckIn,
      endDate: DateCheckOut,
      onDatesChange: this.updateFilter,
      focusedInput: this.state.focusedInput,
      onFocusChange: this.onFocusChanged
    };
    let modalSize = (isMobile) ? 'lg' : 'lg';
    return (
      <div className="">
        <a href="javascript:;" className={(active) ? 'active' : ''} onClick={onClick}>
          {(() => {
            let value = '';
            if(active){
              if(DateCheckIn){
                value += `${DateCheckIn.format('MMM DD')}`;
              }
              if(DateCheckOut){
                value += ` - ${DateCheckOut.format('MMM DD')}`;
              }
              return value;
            }else{
              return 'Dates';
            }
          })()}
        </a>
        <Modal show={show} onHide={this.cancelChange} bsSize={modalSize}>
          <Header closeButton>
            Dates
          </Header>
          <div style={{ padding: `${(isMobile) ? '10' : '40'}px 0` }}>
            <div className="filter-date block-date-picker">
              <DayPickerRangeController
                {...calendarSettings}
              />
            </div>
          </div>
          <Footer>
            <div className="filter-actions clearfix">
              {(() => {
                if(Object.keys(this.props.filters).length){
                  return (
                    <div className="pull-left">
                      <a href="javascript:;" onClick={this.clearFilter} className="clear">Clear</a>
                    </div>
                  );
                }else{
                  return (
                    <div className="pull-left">
                      <a href="javascript:;" onClick={this.cancelChange} className="cancel">Cancel</a>
                    </div>
                  );
                }
              })()}
              <div className="pull-right">
                <a href="javascript:;" onClick={this.applyFilters} className="apply">Apply</a>
              </div>
            </div>
          </Footer>
        </Modal>
      </div>
    );
  }
}
