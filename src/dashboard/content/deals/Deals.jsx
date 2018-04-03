import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import {Route} from 'react-router';
import {Link} from 'react-router-dom';
import Loading from 'common/components/loading';
import Pagination from 'common/components/pagination';
import AddEditDeal from './add-edit-deal';
import FontIcon from 'common/components/font-icon';

class DashboardContent extends Component {
  constructor() {
    super();
    this.state = {
      refreshingId: null,
      deletingId: null
    };
    this.page = 0;
    this.limit = 10;
    this.handlePageClick = this.handlePageClick.bind(this);
    this.refreshDeal = this.refreshDeal.bind(this);
    this.deleteOwnerDeal = this.deleteOwnerDeal.bind(this);
  }

  componentDidMount() {
    this.getOwnerDeals();
  }

  getOwnerDeals(type) {
    let {isFetching, getOwnerDeals} = this.props;
    let reset = false;
    if(typeof type == 'string' && type != this.props.type){
      reset = true;
      this.page = 0;  
    }
    type = type || this.props.type;
    let pageSize = (this.limit);
    let pageNumber = this.page + 1;
    if (!isFetching) {
      let params = {
        pageSize,
        pageNumber,
        type,
        reset
      };
      getOwnerDeals(params);
    }
  }

  handlePageClick(data){
    window.scrollTo(0, 0);
    this.page = data.selected;
    this.getOwnerDeals();
  }

  refreshDeal(deal, index){
    let { refreshOwnerDeal, updateOwnerDeals, deals } = this.props;
    this.setState({
      refreshingId: deal.id
    });
    refreshOwnerDeal(deal).then((deal) => {
      if(deal){
        deals[index] = deal;
      }
      updateOwnerDeals({
        deals: [...deals]
      });
      this.setState({
        refreshingId: null
      });
    }).catch((err) => {
      this.setState({
        refreshingId: null
      });
    });
  }

  deleteOwnerDeal(deal, index){
    let confirmDelete = confirm('Are You Sure');
    if(confirmDelete === false){
      return false;
    }
    let { deleteOwnerDeal, updateOwnerDeals, deals } = this.props;
    this.setState({
      deletingId: deal.id
    });
    deleteOwnerDeal(deal).then((res) => {
      this.setState({
        deletingId: null
      });
      deals.splice(index, 1);
      updateOwnerDeals({
        deals: [...deals]
      });
    }).catch((err) => {
      alert('Unable to delete');
      this.setState({
        deletingId: null
      });
    });
  }

  render() {
    let {deals, isFetching, error, count, type} = this.props;
    let { refreshingId, deletingId } = this.state;
    let pageCount = (count) ? (Math.ceil(count/this.limit)) : 0;
    return (
      <div>
        <h4>
          <div className="clearfix">
            <div className="pull-left">
              <span>Deals</span>
            </div>
            <div className="pull-right simple-actions">
              <div className="clearfix">
                <a 
                  href="javascript:;"
                  onClick={() => { type != 'active' && this.getOwnerDeals('active'); }}
                  className={`btn ${(type == 'active') ? 'btn-success active' : 'btn-default'}`}
                  >Active
                </a>
                <a 
                  href="javascript:;" 
                  onClick={() => { type != 'sold' && this.getOwnerDeals('sold'); }}
                  className={`btn ${(type == 'sold') ? 'btn-warning active' : 'btn-default'}`}
                  >
                  Sold
                </a>
                <Link to={`/dashboard/deals/add`} className="btn btn-primary"><FontIcon name="plus" /> New Deal</Link>
              </div>
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
                        <th style={{ width: '20%' }}>Unit Name</th>
                        <th>Category</th>
                        <th>CheckIn</th>
                        <th>CheckOut</th>
                        <th>List</th>
                        <th>Special</th>
                        <th>Sold</th>
                        <th>Discount</th>
                        <th style={{ width: '20%' }}>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {deals.map((deal, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <Link to={`/listings/${deal.unit_id}`}>{deal.unit_id}-{deal.unit_building_name}</Link>
                              <br />
                              Expiry: {moment(deal.expiry).format('MM/DD/YYYY')}
                              {(() => {
                                if(moment(deal.expiry) < moment()){
                                  return (
                                    <div className="text-danger"><b>Expired</b></div>
                                  );
                                }
                              })()}
                            </td>
                            <td>{deal.category_name}</td>
                            <td>{moment(deal.checkindate).format('MM/DD/YYYY')}</td>
                            <td>{moment(deal.checkoutdate).format('MM/DD/YYYY')}</td>
                            <td>${deal.list_price}</td>
                            <td>${deal.special_price}</td>
                            <td>{(deal.sold == 0) ? 'No' : 'Yes'}</td>
                            <td>{Math.round(100 - (( parseInt(deal.special_price) / parseInt(deal.list_price) ))*100)}%</td>
                            <td>
                              <div className="">
                                <a 
                                  href="javascript:;" 
                                  onClick={() => this.refreshDeal(deal, index)}
                                  className="btn-block">
                                  <FontIcon name="refresh" /> {(refreshingId == deal.id) ? 'Refreshing...' : 'Renew for 7 Days'}
                                </a>
                                <Link className="btn-block" to={`/dashboard/deals/edit/${deal.id}`}><FontIcon name="edit" /> Edit</Link>
                                <a 
                                  className="btn-block text-danger" 
                                  onClick={() => this.deleteOwnerDeal(deal, index)}
                                  href="javascript:;">
                                  <FontIcon name="trash" /> {(deletingId == deal.id) ? 'Deleting...' : 'Delete'}
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-cneter">
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
        <Route path="/dashboard/deals/add" component={AddEditDeal} />
        <Route path="/dashboard/deals/edit/:id" component={AddEditDeal} />
      </div>
    );
  }
}

DashboardContent.propTypes = {
  getOwnerDeals: PropTypes.func,
  deals: PropTypes.array,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  count: PropTypes.number,
  type: PropTypes.string,
  refreshOwnerDeal: PropTypes.func,
  deleteOwnerDeal: PropTypes.func,
  updateOwnerDeals: PropTypes.func
};

export default DashboardContent;
