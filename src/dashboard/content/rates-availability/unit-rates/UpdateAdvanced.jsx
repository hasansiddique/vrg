import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Input from 'react-validation/build/input';
import Select from 'react-select';
import {BeatLoader} from 'react-spinners';
import Form from 'react-validation/build/form';
import MinStayDropdown from './partials/MinStayDropdown.jsx';

import {checkLimit, checkFormErrors} from "../../../../common/validator";

class UpdateAdvanced extends Component {
  constructor() {
    super();
    this.handleMinStay = this.handleMinStay.bind(this);
    this.state = {
      avMinStayMon: 1,
      avMinStayTue: 1,
      avMinStayWed: 1,
      avMinStayThu: 1,
      avMinStayFri: 1,
      avMinStaySat: 1,
      avMinStaySun: 1,
      avChangeOverMon: 4,
      avChangeOverTue: 4,
      avChangeOverWed: 4,
      avChangeOverThu: 4,
      avChangeOverFri: 4,
      avChangeOverSat: 4,
      avChangeOverSun: 4,
      isCheckedMon: false,
      isCheckedTue: false,
      isCheckedWed: false,
      isCheckedThu: false,
      isCheckedFri: false,
      isCheckedSat: false,
      isCheckedSun: false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.getFormData = this.getFormData.bind(this);
    this.getDayFields = this.getDayFields.bind(this);
  }

  componentWillMount() {
    let inputQuantity = [];
    $(function () {
      $(".nightlyPrice").each(function (i) {
        inputQuantity[i] = this.defaultValue;
        $(this).data("idx", i);
      });
      $(".nightlyPrice").on("keyup", function (e) {
        let $field = $(this),
          val = this.value,
          $thisIndex = parseInt($field.data("idx"), 10);
        if (this.validity && this.validity.badInput || isNaN(val) || $field.is(":invalid")) {
          this.value = inputQuantity[$thisIndex];
          return;
        }
        if (val.length > Number($field.attr("maxlength"))) {
          val = val.slice(0, 5);
          $field.val(val);
        }
        inputQuantity[$thisIndex] = val;
      });
    });
  }

  getChangeOverOptions() {
    return [{value: 4, label: 'Both Check-In/Out'},
      {value: 1, label: 'Check In Only'},
      {value: 2, label: 'Check Out Only'},
      {value: 3, label: 'No Action'}];
  }

  handleChangeOver(event, day) {
    let changeOver = event[`avChangeOver${day}`].getFocusedOption().value;
    this.setState({[`avChangeOver${day}`]: changeOver});
  }

  handleMinStay(minStay, day) {
    this.setState({[`avMinStay${day}`]: minStay});
  }

  handleDayCheckedChange(event, day) {
    let isChecked = event[`isChecked${day}`].checked;
    this.setState({[`isChecked${day}`]: isChecked});
  }

  getFormData() {
    const {listingId, endDate, startDate} = this.props;
    const {
      avMinStayMon, avMinStayTue, avMinStayWed, avMinStayThu, avMinStayFri, avMinStaySat, avMinStaySun,
      isCheckedMon, isCheckedTue, isCheckedWed, isCheckedThu, isCheckedFri, isCheckedSat, isCheckedSun,
      avChangeOverMon, avChangeOverTue, avChangeOverWed, avChangeOverThu, avChangeOverFri, avChangeOverSat, avChangeOverSun
    } = this.state;
    let formValues = this.adForm.getValues();
    formValues = formValues && formValues['undefined'];
    let daysData = {};

    isCheckedMon ? daysData.mon = {
      change_over: avChangeOverMon ? avChangeOverMon : 4,
      rate: formValues[0] ? formValues[0] : 1,
      min_stay: avMinStayMon
    } : '';

    isCheckedTue ? daysData.tue = {
      change_over: avChangeOverTue ? avChangeOverTue : 4,
      rate: formValues[1] ? formValues[1] : 1,
      min_stay: avMinStayTue
    } : '';

    isCheckedWed ? daysData.wed = {
      change_over: avChangeOverWed ? avChangeOverWed : 4,
      rate: formValues[2] ? formValues[2] : 1,
      min_stay: avMinStayWed
    } : '';

    isCheckedThu ? daysData.thu = {
      change_over: avChangeOverThu ? avChangeOverThu : 4,
      rate: formValues[3] ? formValues[3] : 1,
      min_stay: avMinStayThu
    } : '';

    isCheckedFri ? daysData.fri = {
      change_over: avChangeOverFri ? avChangeOverFri : 4,
      rate: formValues[4] ? formValues[4] : 1,
      min_stay: avMinStayFri
    } : '';

    isCheckedSat ? daysData.sat = {
      change_over: avChangeOverSat ? avChangeOverSat : 4,
      rate: formValues[5] ? formValues[5] : 1,
      min_stay: avMinStaySat
    } : '';

    isCheckedSun ? daysData.sun = {
      change_over: avChangeOverSun ? avChangeOverSun : 4,
      rate: formValues[6] ? formValues[6] : 1,
      min_stay: avMinStaySun
    } : '';

    return {
      unit_id: listingId && listingId,
      end_date: endDate.format('MM-DD-YYYY'),
      start_date: startDate.format('MM-DD-YYYY'),
      daysData: daysData,
    };
  }

  getMinStayOptions() {
    let options = [];
    for (let i = 1; i < 100; i++) {
      options.push({value: i, label: `${i} day${i > 1 ? 's' : ''}`});
    }
    return options;
  }

  submitForm(event) {
    event.preventDefault();
    this.adForm && this.adForm.validateAll();
    const formItems = this.adForm.state.byId;
    const {isCheckedMon, isCheckedTue, isCheckedWed, isCheckedThu, isCheckedFri, isCheckedSat, isCheckedSun} = this.state;

    if (checkFormErrors(formItems) && (isCheckedMon || isCheckedTue || isCheckedWed || isCheckedThu || isCheckedFri || isCheckedSat || isCheckedSun)) {
      this.props.initiateUpdateAvailabilityDetails(this.getFormData());
    }
  }

  getDayFields(day) {
    const {selectedDatesRate} = this.props;
    return {
      changeOver:
        <Select
          ref={c => this[`avChangeOver${day}`] = c}
          name={`avChangeOver${day}`}
          className="select-availability"
          clearable={false}
          multi={false}
          value={this.state[`avChangeOver${day}`]}
          onChange={() => this.handleChangeOver(this, day)}
          options={this.getChangeOverOptions()}
          placeholder={'Change Over'}
          disabled={!this.state[`isChecked${day}`]}
        />,

      nightlyPrice: <Input
        id={`avNightlyRate${day}`}
        ref={`avNightlyRate${day}`}
        type="number"
        validations={[checkLimit]}
        value={selectedDatesRate ? selectedDatesRate : 0}
        min={this.state[`isChecked${day}`] ? 1 : 0}
        max={9999}
        disabled={!this.state[`isChecked${day}`]}
        className="validate nightlyPrice"/>,

      minStay: (
        <MinStayDropdown
          day={day}
          setRef={c => this[`avMinStay${day}`] = c}
          name={`avMinStay${day}`}
          className="select-availability"
          value={this.state[`avMinStay${day}`]}
          handleMinStay={this.handleMinStay}
          options={this.getMinStayOptions()}
          placeholder={'Change Over'}
          disabled={!this.state[`isChecked${day}`]}
        />
      )
    };
  }

  render() {
    const {isUpdating} = this.props;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
      <div>
        <Form ref={c => this.adForm = c}>
          <table className="table table-bordered">
            <thead>
            <tr>
              <th style={{minWidth: '80px'}} className="text-nowrap"><b>Day</b></th>
              <th width="15%" className="text-nowrap"><b>Nightly Price</b></th>
              <th width="27%" className="text-nowrap"><b>Min. Stay</b></th>
              <th width="50%" className="text-nowrap"><b>Change Over</b></th>
            </tr>
            </thead>
            <tbody>
            {days.map((day) => {
              let fields = this.getDayFields(day);
              return (
                <tr key={day}>
                  <td className="day-check-td">
                    <input
                      type="checkbox" ref={c => this[`isChecked${day}`] = c}
                      onChange={() => this.handleDayCheckedChange(this, day)}/>
                    <b className="day-check">{day}</b>
                  </td>
                  <td
                    key={`${day}2`}
                    className={this.state[`isChecked${day}`] ? "" : "un-selectable"}>
                    {fields.nightlyPrice}
                  </td>
                  <td
                    key={`${day}3`}
                    className={this.state[`isChecked${day}`] ? "" : "un-selectable"}>
                    {fields.minStay}
                  </td>
                  <td
                    key={`${day}1`}
                    className={this.state[`isChecked${day}`] ? "" : "un-selectable"}>
                    {fields.changeOver}
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
          <div className="submit-button">
            <button className="btn btn-danger btn-md"
                    disabled={isUpdating}
                    onClick={this.props.clearDates}
                    style={{marginRight: `15px`}}>
              Cancel
            </button>
            <button className="btn btn-success btn-md" disabled={isUpdating} onClick={this.submitForm}>
              {isUpdating ? <BeatLoader size={8} color={'#fff'} loading={isUpdating}/> : 'Update'}
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

UpdateAdvanced.propTypes = {
  initiateUpdateAvailabilityDetails: PropTypes.func.isRequired,
  setFormIsValid: PropTypes.func.isRequired,
  listingId: PropTypes.number.isRequired,
  clearDates: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
};

export default UpdateAdvanced;
