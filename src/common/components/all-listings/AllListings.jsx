import {get, isEmpty} from 'lodash';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {BeatLoader} from 'react-spinners';

import {currency} from '../../../config';

import Pagination from '../../../common/components/pagination';
import PropertyInquiry from '../../../listed-property/property-inquiry';
import {getImageSet} from "../../utilities";

export default class AllListings extends PureComponent {
  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
    this.getPropertiesList = this.getPropertiesList.bind(this);
  }

  componentWillMount() {
    const {properties} = this.props;
    isEmpty(get(properties, 'data')) && this.getPropertiesList(10, 1);
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected);
    this.getPropertiesList(10, offset);
  }

  getPropertiesList(maxRecords, startRow) {
    const {match} = this.props;
    const ownerId = match.params.ownerId;
    this.props.initiateGetAllProperties({
      "PageNumber": startRow || 0,
      "ownerKey": ownerId,
      "PageSize": maxRecords || 10,
    });
  }

  render() {
    const {match, properties, isFetching, error} = this.props;
    const listingId = match.params.unitId;

    return (
      <div id="listing">
        <section className="list-pg-bg" style={{paddingTop: `85px`, paddingBottom: '50px'}}>
          <div className="container">
            <div className="list-pg-lt list-page-com-p">
              {isFetching ?
                <div className="spinner-wrapper">
                  <BeatLoader
                    color={'#0074E1'}
                    loading={isFetching}
                  />
                  <span>Loading...</span>
                </div>
                :
                !isEmpty(error) ?
                  <div className="container">
                    <div className="text-danger" style={{padding: `25px`, fontSize: `26px`, textAlign: 'center'}}>
                      {error} <a href="javascript:void(0)" onClick={this.getPropertiesList}> Retry</a>
                    </div>
                  </div>
                  :
                  properties && properties.data && properties.data.length && properties.data.map((item) => {
                    return (
                      <div key={item} className="home-list-pop list-spac list-spac-1 list-room-mar-o">
                        <div className="col-md-3">
                          <img
                            style={{border: `2px solid #9E9E9E`}}
                            src={`https://s3.amazonaws.com/vrguest-assets/properties/units/small/${getImageSet(item.unitId)}/${item.unitId}/${item.imageName}`}
                            alt=""/>
                        </div>
                        <div className="col-md-9 home-list-pop-desc inn-list-pop-desc list-room-deta">
                          <h3 style={{width: "88%"}}>{item.title}</h3>
                          {/*<div className="list-rat-ch list-room-rati pg-re-rat" style={{padding: 0}}>
                            <span style={{padding: `1px 5px`}}>{item.rating}</span>
                            <i className={"fa " + (item.rating >= 1 ? "fa-star" : "fa-star-o")}
                               aria-hidden="true">&nbsp;</i>
                            <i className={"fa " + (item.rating >= 2 ? "fa-star" : "fa-star-o")}
                               aria-hidden="true">&nbsp;</i>
                            <i className={"fa " + (item.rating >= 3 ? "fa-star" : "fa-star-o")}
                               aria-hidden="true">&nbsp;</i>
                            <i className={"fa " + (item.rating >= 4 ? "fa-star" : "fa-star-o")}
                               aria-hidden="true">&nbsp;</i>
                            <i className={"fa " + (item.rating >= 5 ? "fa-star" : "fa-star-o")}
                               aria-hidden="true">&nbsp;</i>
                          </div>*/}
                          <div className="list-room-type list-rom-ami">
                            <ul>
                              <li><b>Baths: </b>{get(item, 'baths') || 0}</li>
                              <li><b>Beds: </b>{get(item, 'rooms') || 0}</li>
                              <li><b>Sleeps: </b>{get(item, 'maxGuests') || 1}</li>
                              {(item.dishwasher && item.dishwasher.length) ?
                                <li><b>Dish Washer: </b>{get(item, 'dishwasher')}</li>
                                : ''}
                              {(item.laundry && item.laundry.length) ?
                                <li><b>Laundry: </b>{get(item, 'laundry')}</li>
                                : ''}
                              {(item.pets && item.pets.length) ?
                                <li><b>Pets: </b>{get(item, 'pets')}</li>
                                : ''}
                              {(item.pool && item.pool.length) ?
                                <li><b>Pool: </b>{get(item, 'pool')}</li>
                                : ''}
                            </ul>
                          </div>
                          <span className="home-list-pop-rat list-rom-pric" style={{fontSize: `18px`}}>
                            {`${currency}${item.avgNightlyRate.toFixed(0)}`}
                          </span>
                          <div className="list-enqu-btn">
                            <ul>
                              <li style={{textAlign: 'right'}}>
                                <Link to={`/listings/${item.unitId}`} target="_blank">
                                  Book Online
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}

              {(properties.totalCount && properties.totalCount > 10) && (
                <Pagination
                  styles={{marginBottom: `15px`}}
                  pageCount={properties.totalCount / 10}
                  handlePageClick={this.handlePageClick}/>
              )}

            </div>
            {isEmpty(error) && <div className="list-pg-rt">
              <PropertyInquiry listingId={listingId}/>
            </div>}
          </div>
        </section>
      </div>
    );
  }
}

AllListings.propTypes = {
  match: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  properties: PropTypes.object.isRequired,
  encryptedUserId: PropTypes.string.isRequired,
  initiateGetAllProperties: PropTypes.func.isRequired,
};
