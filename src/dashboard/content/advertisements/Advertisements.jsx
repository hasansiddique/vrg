import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Route} from 'react-router';
import Loading from 'common/components/loading';
import Pagination from 'common/components/pagination';
import FontIcon from 'common/components/font-icon';
import EditAd from './edit-ad';
import config from '../../../config';
import { getImageSet } from 'common/utilities';

class DashboardContent extends Component {
  constructor() {
    super();
    this.state = {};
    this.page = 0;
    this.limit = 10;

    this.openWizard = this.openWizard.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    let {fetchLocationsList} = this.props;
    this.getOwnerAdvertisements();
    if (!this.props.locationsList.length) {
      // fetchLocationsList();
    }
  }

  getOwnerAdvertisements() {
    let {isFetching, getOwnerAdvertisements} = this.props;
    let maxRecords = this.limit;
    let startRow = (this.page * maxRecords);
    let {type} = this.state;
    if (!isFetching) {
      let params = {
        maxRecords,
        startRow
      };
      getOwnerAdvertisements(params);
    }
  }

  handlePageClick(data) {
    window.scrollTo(0, 0);
    this.page = data.selected;
    this.getOwnerAdvertisements();
  }

  openWizard() {
    this.props.toggleModalVisibility(true);
    this.props.toggleModalType('ad-wizard');
  }

  getAdType(adTypeId){
    let adType = 'properties';
    switch(adTypeId){
      case 2:
        adType = 'properties';
        break;
      case 3:
        adType = 'resturants';
        break;
      case 4:
        adType = 'activities';
        break;
      case 5:
        adType = 'shopping';
        break;
      case 6:
        adType = 'transportation';
        break;
      case 7:
        adType = 'others';
        break;
      default:
        adType = 'properties';
    }
    return adType;
  }

  render() {
    let {advertisements, isFetching, count, locationsList} = this.props;
    let pageCount = (count) ? (Math.ceil(count / this.limit)) : 0;

    return (
      <div>
        <Route path="/dashboard/advertisement/edit/:id" component={EditAd}/>
        <h4>
          <div className="clearfix">
            <div className="pull-left">
              <span>Advertisements</span>
            </div>
            <div className="pull-right">
              <a className="btn btn-primary" onClick={this.openWizard}><FontIcon name="plus"/> Advertisement</a>
            </div>
          </div>
        </h4>
        <div className="db-list-com tz-db-table">
          {isFetching ?
            <Loading loading/>
            :
            <div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Picture</th>
                    <th>Description</th>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Cost</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {advertisements.map((advertisement, index) => {
                    let basePhotosUrl = config.s3Bucket;
                    let imageUrl = basePhotosUrl + 'advertisement/' + advertisement.imagesrc;
                    if(advertisement.ad_category_id == 2){
                      imageUrl = basePhotosUrl + 'pmlogos/' + advertisement.imagesrc;                      
                      if(advertisement.issingleunit == 1){
                        let set = getImageSet(advertisement.featuredunit);
                        imageUrl = `${basePhotosUrl}properties/units/large/${set}/${advertisement.featuredunit}/${advertisement.imagesrc}`;
                      }
                    }
                    let adType = this.getAdType(advertisement.ad_category_id);
                    let previewUrl = `/advertisements/${adType}`;
                    if(advertisement.global_destination_id){
                      previewUrl += '?gid=' + advertisement.global_destination_id;
                    }
                    return (
                      <tr key={index}>
                        <td>{advertisement.id}</td>
                        <td>
                          <a href={advertisement.website_url} target="_blank">
                            <img style={{width: '80px', display: 'block'}} src={imageUrl} alt="Picture"/>
                          </a>
                        </td>
                        <td>
                          <div>
                            <Link to={previewUrl} target="_blank">View Advertisement</Link>
                          </div>
                          Caption: {advertisement.caption}
                        </td>
                        <td>{moment(advertisement.date_from).format('MM/DD/YYYY')}</td>
                        <td>{moment(advertisement.date_to).format('MM/DD/YYYY')}</td>
                        <td>${advertisement.cost}</td>
                        <td>{advertisement.status}</td>
                        <td>
                          <div className="btn-group">
                            <Link className="btn-block"
                                  to={`/dashboard/advertisement/edit/${advertisement.id}`}><FontIcon name="edit"/> Edit</Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
              <Pagination
                handlePageClick={this.handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                forcePage={this.page}/>
            </div>
          }
        </div>
      </div>
    );
  }
}

DashboardContent.propTypes = {
  toggleModalType: PropTypes.func,
  toggleModalVisibility: PropTypes.func,
  getOwnerAdvertisements: PropTypes.func,
  advertisements: PropTypes.array,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  count: PropTypes.number,
  fetchLocationsList: PropTypes.func,
  locationsList: PropTypes.array
};

export default DashboardContent;
