import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Input from 'react-validation/build/input';
import Select from 'react-select';
import {BeatLoader} from 'react-spinners';

import {checkLimit, lt} from "common/validator";

class UpdateBasic extends Component {
  constructor() {
    super();
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

  getMinStayOptions() {
    let options = [];
    for (let i = 1; i < 100; i++) {
      options.push({value: i, label: `${i} day${i > 1 ? 's' : ''}`});
    }
    return options;
  }

  render() {
    const {minStay, selectedTab, isUpdating, selectedDatesRate} = this.props;

    return (
      <div>
        <div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className=""><span>Nightly Price</span></label>
                <Input
                  id="avNightlyRate"
                  ref="avNightlyRate"
                  type="number"
                  className="validate nightlyPrice"
                  value={selectedDatesRate ? selectedDatesRate : 0}
                  maxLength={5}
                  min={1}
                  max={9999}
                  validations={selectedTab === 1 ? [checkLimit, lt] : []}
                  checkerror={selectedTab === 1 ? this.props.setFormIsValid : ''}
                  placeholder="Enter new Nightly Rate to update"/>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className=""><span>Minimum Stay</span></label>
                <Select
                  name="avMinStay"
                  className="select-availability"
                  clearable={false}
                  multi={false}
                  onChange={this.props.handleMinStay}
                  options={this.getMinStayOptions()}
                  value={minStay}
                  placeholder={'Enter new Minimum Stay to update'}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="submit-button">
          <button
            disabled={isUpdating}
            className="btn btn-danger btn-md"
            onClick={this.props.clearDates}
            style={{marginRight: `15px`}}>
            Cancel
          </button>
          <button
            type={'submit'}
            className="btn btn-success btn-md"
            disabled={isUpdating}
            onClick={this.props.submitForm}>
            {isUpdating ? <BeatLoader size={8} color={'#fff'} loading={isUpdating}/> : 'Update'}
          </button>
        </div>
      </div>
    );
  }
}

UpdateBasic.propTypes = {
  minStay: PropTypes.number,
  selectedDatesRate: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  clearDates: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  selectedTab: PropTypes.number.isRequired,
  handleMinStay: PropTypes.func.isRequired,
  setFormIsValid: PropTypes.func.isRequired,
};

export default UpdateBasic;
