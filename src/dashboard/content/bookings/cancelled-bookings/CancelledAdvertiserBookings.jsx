import {isEmpty, get} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from "moment/moment";

import Loader from '../../../../common/components/loading';
import Pagination from '../../../../common/components/pagination';
import FontIcon from '../../../../common/components/font-icon';

class CancelledAdvertiserBookings extends Component {
  constructor() {
    super();
    this.state = {};

    this.getBookingsList = this.getBookingsList.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const {cancelledBookings} = this.props;
    isEmpty(get(cancelledBookings, 'data')) && this.getBookingsList(10, 1);
  }

  getBookingsList(maxRecords, startRow) {
    this.props.initiateGetCancelledBookings({maxRecords, startRow});
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);
    this.getBookingsList(10, offset);
  }

  openInfoModal(id, type) {
    this.props.setSelectedBookingId(id);
    this.props.toggleModalType(type);
    this.props.toggleModalVisibility(true);
  }

  rentalInfo(id) {
    this.props.setSelectedBookingId(id);
  }

  render() {
    const {cancelledBookings, isFetching} = this.props;

    return (
      <div>
        {isFetching ?
          <div className="loader">
            <Loader loading={isFetching} style={{padding: `40px`}}/>
          </div>
          :
          <div className="db-list-com tz-db-table">
            <div className="ds-boar-title">
              <h2><span>Cancelled Bookings</span></h2>
              <p>Total {(cancelledBookings.totalCount > 0 ? cancelledBookings.totalCount : 0)} listings found.</p>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>Unit ID</th>
                  <th>Unit Name</th>
                  <th>Booked By</th>
                  <th>Booked On</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {!isEmpty(cancelledBookings.data) ?
                  cancelledBookings.data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div
                            className={(item.unitOwnerConfirmation === 1) ? "text-success" : (item.unitOwnerConfirmation === 1) ? "text-danger" : ""}>
                            <strong>{item.unitBookingId}</strong>
                          </div>
                        </td>
                        <td>{item.unitBuildingName}</td>
                        <td>{`${item.firstName} ${item.lastName}`}</td>
                        <td>{moment(item.bookingDateTime).format("MM/DD/YYYY")}</td>
                        <td>{moment(item.checkinDate).format("MM/DD/YYYY")}</td>
                        <td>{moment(item.checkoutDate).format("MM/DD/YYYY")}</td>
                        <td>
                          <a href="javascript:void(0)" className="btn-block"
                             onClick={() => this.openInfoModal(item.unitBookingId, 'rental-info')}>
                            <FontIcon size={'lg'} name={'info-circle'}/>
                            &nbsp;&nbsp;Rental Info
                          </a>
                          <a href="javascript:void(0)" className="btn-block"
                             onClick={() => this.openInfoModal(item.unitBookingId, 'tenant-info')}>
                            <FontIcon size={'lg'} name={'info-circle'}/>
                            &nbsp;&nbsp;Tenant Info
                          </a>
                        </td>
                      </tr>
                    );
                  })
                  :
                  <tr>
                    <td colSpan={7} className="error center">No cancelled bookings available.</td>
                  </tr>
                }
                </tbody>
              </table>
            </div>
          </div>
        }

        {(!isEmpty(cancelledBookings.data) && cancelledBookings.totalCount && cancelledBookings.totalCount > 10) && (
          <Pagination
            styles={{marginBottom: `15px`}}
            pageCount={cancelledBookings.totalCount / 10}
            handlePageClick={this.handlePageClick}/>
        )}
      </div>
    );
  }
}

CancelledAdvertiserBookings.propTypes = {
  initiateGetCancelledBookings: PropTypes.func.isRequired,
  setSelectedBookingId: PropTypes.func.isRequired,
  toggleModalType: PropTypes.func.isRequired,
  toggleModalVisibility: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  cancelledBookings: PropTypes.object.isRequired,
};

export default CancelledAdvertiserBookings;
