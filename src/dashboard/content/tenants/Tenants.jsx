import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Loading from 'common/components/loading';
import Pagination from 'common/components/pagination';
import FontIcon from 'common/components/font-icon';

class DashboardContent extends Component {
  constructor() {
    super();
    this.state = {};
    this.page = 0;
    this.limit = 10;
    this.handlePageClick = this.handlePageClick.bind(this);
    this.openInfoModal = this.openInfoModal.bind(this);
  }

  componentDidMount() {
    this.getTenants();
  }

  getTenants() {
    let {isFetching, getTenants} = this.props;
    let maxRecords = this.limit;
    let startRow = (this.page * maxRecords);
    if (!isFetching) {
      let params = {
        maxRecords,
        startRow
      };
      getTenants(params);
    }
  }

  handlePageClick(data){
    window.scrollTo(0, 0);
    this.page = data.selected;
    this.getTenants();
  }

  openInfoModal(id, type) {
    this.props.setSelectedBookingId(id);
    this.props.toggleModalType(type);
    this.props.toggleModalVisibility(true);
  }

  render() {
    let {tenants, isFetching, error, count} = this.props;
    let pageCount = (count) ? (Math.ceil(count/this.limit)) : 0;
    return (
      <div>
        <h4>
          <div className="clearfix">
            <div className="pull-left">
              <span>Tenants</span>
            </div>
          </div>
        </h4>
        <div className="db-list-com tz-db-table">
          {(() => {
            if (isFetching) {
              return (
                <Loading loading/>
              );
            } else {
              return (
                <div>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Unit Number</th>
                        <th>Check-In Date</th>
                        <th>Check-Out Date</th>
                        <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {tenants.map((tenant, index) => {
                        return (
                          <tr key={index}>
                            <td>{tenant.first_name}</td>
                            <td>{tenant.last_name}</td>
                            <td>{tenant.unit_building_name}</td>
                            <td>{moment(tenant.checkin_date).format('MM/DD/YYYY')}</td>
                            <td>{moment(tenant.checkout_date).format('MM/DD/YYYY')}</td>
                            <td>
                              <a 
                                className="btn-block" 
                                onClick={() => this.openInfoModal(tenant.unit_booking_id, 'tenant-info')}
                                href="javascript:;"><FontIcon name='user' /> Tenant Info</a>
                            </td>
                          </tr>
                        );
                      })}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center">
                    <Pagination
                      handlePageClick={this.handlePageClick}
                      pageRangeDisplayed={2}
                      marginPagesDisplayed={1}
                      pageCount={pageCount}
                      forcePage={this.page} />
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

DashboardContent.propTypes = {
  getTenants: PropTypes.func,
  tenants: PropTypes.array,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  count: PropTypes.number,
  setSelectedBookingId: PropTypes.func,
  toggleModalType: PropTypes.func,
  toggleModalVisibility: PropTypes.func
};

export default DashboardContent;
