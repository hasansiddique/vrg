import {isEmpty, get, values, keys} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ModalHeader} from 'react-bootstrap';

import Loader from '../../../../common/components/loading';
import TenantBookingRejected from './TenantBookingRejected.jsx';
import TenantBookingApproved from './TenantBookingApproved.jsx';

class BookingTenantInfo extends Component {
  constructor() {
    super();
    this.state = {
      isFormValid: false,
    };

    this.getConfirmationStatus = this.getConfirmationStatus.bind(this);
    this.handleConfirmedClick = this.handleConfirmedClick.bind(this);
    this.handleRejectedClick = this.handleRejectedClick.bind(this);
    this.setFormIsValid = this.setFormIsValid.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    const {bookingId} = this.props;
    bookingId && this.props.initiateGetTenantInfo({'bookingID': bookingId});
  }

  getConfirmationStatus(key) {
    const {tenantInfo} = this.props;
    return (!isEmpty(tenantInfo) && get(tenantInfo, [key])) && (get(tenantInfo, [key]) === 1) ? 1 : (get(tenantInfo, [key]) === 2) ? 2 : 0;
  }

  handleRejectedClick() {
    this.props.toggleTenantStatusClicked('rejected');
  }

  handleConfirmedClick() {
    this.props.toggleTenantStatusClicked('confirmed');
  }

  setFormIsValid(status) {
    this.setState({isFormValid: status});
  }

  closeModal() {
    this.props.toggleModalType('');
    this.props.toggleModalVisibility(false);
  }

  render() {
    const {isFetching, tenantInfo, tenantStatus, bookingId, submittingReply, replyStatus} = this.props;
    let ownerStatus = this.getConfirmationStatus('unitOwnerConfirmation');
    let staffStatus = this.getConfirmationStatus('mriStaffConfirmation');

    return (
      <div id="tenant-info">
        <div className="tz-db-table">
          <div className="invoice-1">
            <ModalHeader closeButton>
              <h2>Tenant Info</h2>
            </ModalHeader>
            {isFetching ?
              <Loader loading={isFetching} style={{textAlign: `center`, margin: `50px`}}/>
              :
              (tenantStatus && tenantStatus === 'confirmed' && isEmpty(replyStatus)) ?
                <div id="tenant-status">
                  <TenantBookingApproved
                    bookingId={bookingId}
                    submittingReply={submittingReply}
                    encryptedConfirm={tenantInfo.encryptedConfirm || ''}
                    submitTenantBookingReply={this.props.submitTenantBookingReply}
                    toggleTenantStatusClicked={this.props.toggleTenantStatusClicked}
                    toggleTenantSubmittingReplyStatus={this.props.toggleTenantSubmittingReplyStatus}
                    tenantInfo={tenantInfo}/>
                </div>
                :
                (tenantStatus && tenantStatus === 'rejected' && isEmpty(replyStatus)) ?
                  <div id="tenant-status">
                    <TenantBookingRejected
                      bookingId={bookingId}
                      submittingReply={submittingReply}
                      encryptedDeny={tenantInfo.encryptedDeny || ''}
                      submitTenantBookingReply={this.props.submitTenantBookingReply}
                      toggleTenantStatusClicked={this.props.toggleTenantStatusClicked}
                      toggleTenantSubmittingReplyStatus={this.props.toggleTenantSubmittingReplyStatus}
                      tenantInfo={tenantInfo}/>
                  </div>
                  :
                  <div>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <tbody>
                        <tr>
                          <td><strong>Unit Name :</strong></td>
                          <td colSpan={4}>
                            {`${get(tenantInfo, 'unitBuildingName')} - ${get(tenantInfo, 'unitId')} | Year Calendar`}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>First Name :</strong></td>
                          <td>
                            {get(tenantInfo, 'firstName') || 'N/A'}
                          </td>
                          <td><strong>Last Name :</strong></td>
                          <td>
                            {get(tenantInfo, 'lastName') || 'N/A'}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Street Address :</strong></td>
                          <td>
                            {`${get(tenantInfo, 'streetAddress')}, ${get(tenantInfo, 'address2')}`}
                          </td>
                          <td><strong>City :</strong></td>
                          <td>
                            {get(tenantInfo, 'city') || 'N/A'}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>State :</strong></td>
                          <td>
                            {get(tenantInfo, 'state') || 'N/A'}
                          </td>
                          <td><strong>Zip Code :</strong></td>
                          <td>
                            {get(tenantInfo, 'zip') || 'N/A'}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Country :</strong></td>
                          <td>
                            {get(tenantInfo, 'country') || 'N/A'}
                          </td>
                          <td><strong>Work Phone :</strong></td>
                          <td>
                            {get(tenantInfo, 'workPhone') || 'N/A'}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Home Phone :</strong></td>
                          <td>
                            {get(tenantInfo, 'homePhone') || 'N/A'}
                          </td>
                          <td><strong>Cell Phone :</strong></td>
                          <td>
                            {get(tenantInfo, 'cellPhone') || 'N/A'}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Email :</strong></td>
                          <td>
                            {get(tenantInfo, 'email') || 'N/A'}
                          </td>
                          <td><strong>Comments :</strong></td>
                          <td>
                            {get(tenantInfo, 'comments') || 'N/A'}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>VRG Confirmation :</strong></td>
                          <td>
                            {staffStatus === 1 ?
                              <span className="success">Approved</span>
                              :
                              (staffStatus === 2) ?
                                <span className="error">Denied</span>
                                :
                                (staffStatus === 0) ?
                                  <span className="info">Pending</span>
                                  :
                                  `Unknown`
                            }
                          </td>
                          <td><strong>Owner Confirmation :</strong></td>
                          <td>
                            {ownerStatus === 1 ?
                              <span className="success">Approved</span>
                              :
                              (ownerStatus === 2)
                                ?
                                <span className="error">Denied</span>
                                :
                                (staffStatus === 0) ?
                                  <span className="info">Pending</span>
                                  :
                                  `Unknown`
                            }
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="db-mak-pay-bot">
                      {ownerStatus === 0 ?
                        <span>
                          <button className="btn btn-success btn-lg" style={{marginRight: `15px`}}
                                  onClick={this.handleConfirmedClick}>
                            Confirm!
                          </button>
                          <button className="btn btn-danger btn-lg" style={{marginRight: `15px`}}
                                  onClick={this.handleRejectedClick}>
                            Deny!
                          </button>
                        </span>
                        :
                        ''
                      }
                      <button className="btn btn-default btn-lg" onClick={this.closeModal}>Close</button>
                    </div>
                  </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

BookingTenantInfo.propTypes = {
  toggleTenantSubmittingReplyStatus: PropTypes.func.isRequired,
  toggleTenantStatusClicked: PropTypes.func.isRequired,
  submitTenantBookingReply: PropTypes.func.isRequired,
  initiateGetTenantInfo: PropTypes.func.isRequired,
  toggleModalVisibility: PropTypes.func.isRequired,
  toggleModalType: PropTypes.func.isRequired,
  submittingReply: PropTypes.bool.isRequired,
  tenantStatus: PropTypes.string.isRequired,
  replyStatus: PropTypes.string.isRequired,
  tenantInfo: PropTypes.object.isRequired,
  bookingId: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default BookingTenantInfo;
