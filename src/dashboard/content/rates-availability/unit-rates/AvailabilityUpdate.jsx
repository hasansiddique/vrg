import {isEmpty, get} from 'lodash';
import moment from "moment/moment";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {BeatLoader} from 'react-spinners';
import {Alert, Tabs, Tab} from 'react-bootstrap';

import UpdateBasic from './UpdateBasic.jsx';
import UpdateAdvanced from './UpdateAdvanced.jsx';

class AvailabilityUpdate extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      selectedtab,
      startDate,
      endDate,
      isUpdateSuccess,
      selectedAvailability,
      minStay,
      isUpdating,
      isUpdateError,
      listingId,
      selectedDatesRate,
    } = this.props;

    return (
      <div className="availability-container">
        {!isEmpty(isUpdateError) ?
          <div className="text-center">
            <img src="/images/failure.svg" alt="Failure" height={125} style={{border: 'none'}}/>
            <h3 style={{color: '#F44336', fontSize: '24px', borderBottom: 'none'}}>
              {isUpdateError || 'Something went wrong while updating. '}
              <a href="javascript:void(0)" onClick={this.props.resetErrorMessage}>
                {' Click to reset.'}
              </a>
            </h3>
          </div>
          :
          !isEmpty(isUpdateSuccess) ?
            <div className="text-center">
              <img src="/images/success.svg" alt="Success" height={125} style={{border: 'none'}}/>
              <h3 style={{color: '#2bb673', fontSize: '24px', borderBottom: 'none'}}>
                Rates and availability for selected dates updated successfully!
              </h3>
            </div>
            :
            !isEmpty(startDate) && !isEmpty(endDate) ?
              <div className="availability-section">
                <div className="row selected-date">
                  <div className="col-sm-3"><span>Selected Dates: </span></div>
                  <div className="col-sm-2">{moment(startDate).format("MM/DD/YYYY")}</div>
                  <div className="col-sm-1" style={{textAlign: 'center'}}>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </div>
                  <div className="col-sm-2">{moment(endDate).format("MM/DD/YYYY")}</div>
                  <div className="col-sm-4">
                    {startDate && <span className="right span-text" onClick={this.props.clearDates}> Clear Dates</span>}
                  </div>
                </div>

                <div className="chec-out-pay">
                  <div className="row">
                    <div className="col-sm-4" style={{marginTop: '13px', fontWeight: 'bold'}}>Availability</div>
                    <div className="col-sm-4 item">
                      <input ref="available1" name="group1" type="radio" id="available1"
                             defaultChecked={selectedAvailability === 1}/>
                      <label htmlFor="available1" className={(selectedAvailability === 1) ? "checked" : ""}
                             onClick={() => this.props.onAvailabilityChange(1)}>
                        Blocked
                      </label>
                    </div>

                    <div className="col-xs-4 item">
                      <input ref="available2" name="group1" type="radio" id="available2"
                             defaultChecked={selectedAvailability === 2}/>
                      <label htmlFor="available2" className={(selectedAvailability === 2) ? "checked" : ""}
                             onClick={() => this.props.onAvailabilityChange(2)}>
                        Available
                      </label>
                    </div>
                  </div>
                </div>

                {(selectedAvailability === 2) && (
                  <div className="my-tabs">
                    <Tabs defaultActiveKey={selectedtab} id="bookings-tabs" onSelect={this.props.handleTabSelect}>
                      <Tab eventKey={1} title="Basic" bsClass="tab" style={{padding: '15px'}}>
                        {selectedtab === 1 &&
                        <UpdateBasic
                          selectedTab={selectedtab}
                          clearDates={this.props.clearDates}
                          isUpdating={isUpdating}
                          minStay={minStay}
                          selectedDatesRate={selectedDatesRate}
                          handleMinStay={this.props.handleMinStay}
                          submitForm={this.props.submitForm}
                          setFormIsValid={this.props.setFormIsValid}/>
                        }
                      </Tab>
                      <Tab eventKey={2} title="Advanced" style={{padding: '15px', marginBottom: '85px'}}>
                        {selectedtab === 2 &&
                        <UpdateAdvanced
                          listingId={listingId}
                          startDate={startDate}
                          endDate={endDate}
                          selectedDatesRate={selectedDatesRate}
                          selectedTab={selectedtab}
                          isUpdating={isUpdating}
                          clearDates={this.props.clearDates}
                          setFormIsValid={this.props.setFormIsValid}
                          initiateUpdateAvailabilityDetails={this.props.initiateUpdateAvailabilityDetails}/>
                        }
                      </Tab>
                    </Tabs>
                  </div>
                )}

                {(selectedAvailability === 1) && (
                  <div className="submit-button">
                    <button className="btn btn-danger btn-md" onClick={this.props.clearDates}
                            style={{marginRight: `15px`}}>
                      Cancel
                    </button>
                    <button className="btn btn-success btn-md" disabled={isUpdating} onClick={this.props.submitForm}>
                      {isUpdating ? <BeatLoader size={8} color={'#fff'} loading={isUpdating}/> : 'Update'}
                    </button>
                  </div>
                )}

              </div>
              :
              <Alert bsStyle="info">
                Please select a range of dates from calendar to update availability. For
                single date update, double click on single day.
              </Alert>
        }
      </div>
    );
  }
}

AvailabilityUpdate.propTypes = {
  endDate: PropTypes.object,
  minStay: PropTypes.number,
  startDate: PropTypes.object,
  selectedDatesRate: PropTypes.number,
  submitForm: PropTypes.func.isRequired,
  clearDates: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  selectedAvailability: PropTypes.number,
  listingId: PropTypes.number.isRequired,
  selectedtab: PropTypes.number.isRequired,
  setFormIsValid: PropTypes.func.isRequired,
  handleTabSelect: PropTypes.func.isRequired,
  isUpdateError: PropTypes.string.isRequired,
  handleMinStay: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  isUpdateSuccess: PropTypes.string.isRequired,
  onAvailabilityChange: PropTypes.func.isRequired,
  initiateUpdateAvailabilityDetails: PropTypes.func.isRequired,
};

export default AvailabilityUpdate;
