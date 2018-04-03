import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {Route} from 'react-router';
import {Link} from 'react-router-dom';
import AddUnit from './add-unit';
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
  }

  componentDidMount() {
    this.getOwnerUnits();
  }

  getOwnerUnits() {
    let {isFetching, getOwnerUnits} = this.props;
    let maxRecords = this.limit;
    let startRow = (this.page * maxRecords);
    if (!isFetching) {
      let params = {
        maxRecords,
        startRow
      };
      getOwnerUnits(params);
    }
  }

  handlePageClick(data) {
    window.scrollTo(0, 0);
    this.page = data.selected;
    this.getOwnerUnits();
  }

  render() {
    let {units, isFetching, error, count} = this.props;
    let pageCount = (count) ? (Math.ceil(count / this.limit)) : 0;
    return (
      <div>
        <h4>
          <div className="clearfix">
            <div className="pull-left">
              <span>Units</span>
            </div>
            <div className="pull-right">
              <Link to={`/dashboard/units/add`} className="btn btn-primary"><FontIcon name="plus"/> New Unit</Link>
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
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                      <th>ID</th>
                      <th>Unit Name</th>
                      {/*<th>Owner Name</th>*/}
                      <th>Listing Site</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {units.map((unit, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {(unit.active_status === 1) ?
                              <div className="text-success ">
                                <b>{unit.unit_id}</b>
                              </div>
                              :
                              <div className="text-danger">
                                <b>{unit.unit_id}</b>
                              </div>
                            }
                          </td>
                          <td>
                            <Link target="_blank" to={`/listings/${unit.unit_id}`}>
                              {unit.unit_building_name}
                            </Link>
                          </td>
                          {/*<td>{`${unit.first_name} ${unit.last_name}`}</td>*/}
                          <td>{`${unit.listing_site}`}</td>
                          <td>
                            {(unit.active_status === 1) ?
                              <div className="text-success">
                                <FontIcon name="check"/> Active
                              </div>
                              :
                              <div className="text-danger">
                                <FontIcon name="remove"/> In-Active
                              </div>
                            }
                          </td>
                          <td>
                            <Link className="btn-block" to={`/dashboard/units/${unit.unit_id}`}>
                              <FontIcon name="edit"/> Edit
                            </Link>
                            <Link className="btn-block" to={`/dashboard/units/${unit.unit_id}/images`}>
                              <FontIcon name="photo"/> Images
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                  <Pagination
                    handlePageClick={this.handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    forcePage={this.page}/>
                </div>
              );
            }
          })()}
        </div>
        <Route path="/dashboard/units/add" component={AddUnit}/>
      </div>
    );
  }
}

DashboardContent.propTypes = {
  getOwnerUnits: PropTypes.func,
  units: PropTypes.array,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  count: PropTypes.number
};

export default DashboardContent;
