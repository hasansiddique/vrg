import {size, get, values, keys} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {ModalHeader} from 'react-bootstrap';
import moment from 'moment';

import Loader from '../../../../common/components/loading';

class BookingRentalInfo extends Component {
  constructor() {
    super();
    this.state = {};

    this.printView = this.printView.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    const {bookingId} = this.props;
    bookingId && this.props.initiateGetRentalInfo({'bookingID': bookingId});
  }

  closeModal() {
    this.props.toggleModalType('');
    this.props.toggleModalVisibility(false);
  }

  printView() {
    let abc = this.printArea.innerHTML;
    this.printMe(abc);
    return true;
  }

  printMe(innerHTML) {
    let printWindow = window.open('', '', '');
    printWindow.document.write('<html><head><title></title>');
    // Make sure the relative URL to the stylesheet works:
    printWindow.document.write('<base href="' + location.origin + location.pathname + '">');
    // Add the stylesheet link and inline styles to the new document:
    let styles = `
      table, body{ font-size: 12px; },
      .tableee{ margin-bottom: 0; }
    `;
    printWindow.document.write('<style>' + styles + '</style>');
    printWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
    printWindow.document.write('</head><body ><div class="container">');
    printWindow.document.write(innerHTML);
    printWindow.document.write('</div></body></html>');
    printWindow.document.close();
    setTimeout(function () {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 0);
    return false;
  }

  render() {
    const {isFetching, rentalInfo} = this.props;
    let currentdate = moment().format('MM/DD/YYYY h:mm:ss A');

    return (
      <div id="rental-info">
        <div className="invoice-1 ">
          <div className="hidden-print">
            <ModalHeader closeButton>
              <h2>Rental Info</h2>
            </ModalHeader>
          </div>

          {isFetching ?
            <Loader loading={isFetching} style={{textAlign: `center`, margin: `50px`}}/>
            :
            <div id="printarea" ref={(ref) => this.printArea = ref}>
              <div className="invoice-1-add">
                <div className="invoice-1-add-left">
                  <Link title={'Open in New window'} target="_blank" className="link"
                        to={`/listings/${get(rentalInfo, 'rentalInfo.unitId')}`}>
                    <h3>
                      {get(rentalInfo, 'rentalInfo.unit') && get(rentalInfo, 'rentalInfo.unit')}
                    </h3>
                  </Link>
                  <h5>{get(rentalInfo, 'rentalInfo.unitBookingId') && `BOOKING: REQ - (${get(rentalInfo, 'rentalInfo.unitBookingId')})`}</h5>
                  <div className="table-responsive">
                    <table className="table tableee table-bordered table-striped">
                      <thead>
                      <tr>
                        <th width="50%"><strong>Rental Info</strong></th>
                        <th width="50%"><strong>Renter Info</strong></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td width="50%">
                          Reservation Date: &nbsp;
                          {get(rentalInfo, 'rentalInfo.reservationDate') && get(rentalInfo, 'rentalInfo.reservationDate')}
                          <br/>
                          Arrival Date:&nbsp;
                          {get(rentalInfo, 'rentalInfo.arrivalDate') && get(rentalInfo, 'rentalInfo.arrivalDate')}
                          <br/>
                          Departure Date:&nbsp;
                          {get(rentalInfo, 'rentalInfo.departureDate') && get(rentalInfo, 'rentalInfo.departureDate')}
                          <br/>
                          Stayed {get(rentalInfo, 'rentalInfo.nights') && get(rentalInfo, 'rentalInfo.nights')} Days
                        </td>
                        <td width="50%">
                          {get(rentalInfo, 'renterInfo.name') && get(rentalInfo, 'renterInfo.name')}
                          <br/>
                          {get(rentalInfo, 'renterInfo.address')}
                          <br/>
                          {get(rentalInfo, 'renterInfo.address2')}
                          <br/>
                          {get(rentalInfo, 'renterInfo.city')},&nbsp;
                          {get(rentalInfo, 'renterInfo.state')}&nbsp;
                          {get(rentalInfo, 'renterInfo.country')}&nbsp;
                          {get(rentalInfo, 'renterInfo.zip')}&nbsp;
                          <br/>
                          Phone Number: &nbsp;
                          {get(rentalInfo, 'renterInfo.phone') && get(rentalInfo, 'renterInfo.phone')}
                        </td>
                      </tr>
                      </tbody>
                    </table>

                    <table className="table table-bordered table-striped">
                      <thead>
                      <tr>
                        <th width="50%">
                          <strong>Guests ({get(rentalInfo, 'guests') && size(get(rentalInfo, 'guests'))})</strong>
                        </th>
                        <th width="50%"><strong>Agent info</strong></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td width="50%">
                          {get(rentalInfo, 'guests') && get(rentalInfo, 'guests').map((item, index) => {
                            let value = values(item);
                            let key = keys(item);
                            return (
                              <span key={index}>
                                {key[0]} ~ {value[0]} <br/>
                              </span>
                            );
                          })}
                        </td>
                        <td width="50%">Not available</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="invoice-1-tab">
                {get(rentalInfo, 'paymentInfo') && (
                  <div className="responsive-table">
                    <table className="table tableee table-bordered table-striped">
                      <thead>
                      <tr>
                        <td colSpan={3}><strong>RATE PLAN: Seasonal Nightly/Weekly Rate (VRG/FBR)</strong></td>
                      </tr>
                      <tr>
                        <th width="25%"><strong>Finance Info</strong></th>
                        <th width="10%"><strong>Amount</strong></th>
                        <th width="65%"><strong>Description</strong></th>
                      </tr>
                      </thead>
                      <tbody>
                      {get(rentalInfo, 'ratePlan').map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.financeInfo}</td>
                            <td className={(index + 1) === rentalInfo.ratePlan.length ? "invo-tot" : "invo-sub"}>
                              {item.amount}
                            </td>
                            <td>{item.description}
                              <br/>
                              {item.description2}</td>
                          </tr>
                        );
                      })}
                      </tbody>
                    </table>
                    <table className="table table-bordered table-striped">
                      <thead>
                      <tr>
                        <td colSpan={3}><strong>Payment Info</strong></td>
                      </tr>
                      </thead>
                      <tbody>
                      {get(rentalInfo, 'paymentInfo').map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.financeInfo}</td>
                            <td className="invo-sub">
                              {item.amount}
                            </td>
                            <td>{item.description}
                              <br/>
                              {item.description2}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td>Current Date/Time</td>
                        <td colSpan={2}>{currentdate}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="invoice-print hidden-print">
                <button className="btn btn-success btn-lg" onClick={this.printView} style={{marginRight: '15px'}}>
                  Print
                </button>

                <button onClick={this.closeModal} className="btn btn-danger btn-lg">
                  Close
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

BookingRentalInfo.propTypes = {
  toggleModalVisibility: PropTypes.func.isRequired,
  initiateGetRentalInfo: PropTypes.func.isRequired,
  toggleModalType: PropTypes.func.isRequired,
  rentalInfo: PropTypes.object.isRequired,
  bookingId: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default BookingRentalInfo;
