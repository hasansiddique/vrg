import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import { Helmet } from 'react-helmet';

import PropertyGallery from './property-gallery';
import PropertyDetails from './property-details';
import PropertyFeatures from './property-features';
import PropertyCalendar from './property-calendar';
import RecentlyVisited from './recently-visited';
import PropertyLocation from './property-location';
import PropertyInquiry from './property-inquiry';
import PropertyReviews from './property-reviews';
import AvailabilityInfo from './availability-info';
import ListedBookingNavigation from './booking-nav';
import PropertyBedsAndBaths from './beds-and-baths';
import BreadCrumb from './breadcrumb';
import Loading from 'common/components/loading';
import ErrorPage from 'common/components/error';

class ListedProperty extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    let { match, isFetchingPD } = this.props;
    let listingId = match.params.listingId;
    if(!isFetchingPD){
      this.props.initiateGetUnitDetails({'unit_id': listingId});
    }
  }
  render() {
    const {match, detailsInfo, error} = this.props;
    let listingId = parseInt(match.params.listingId);
    return (
      <div id="listing">
        {(() => {
          if(error.msg){
            return (
              <div className="container">
                <div className="com-padd">
                  <ErrorPage msg={error.msg} />
                </div>
              </div>
            );
          }else if(!detailsInfo.unitId || !listingId){
            return (
              <Loading loading />
            );
          }else{
            return (
              <Fragment>
                <Helmet>
                  <title>{detailsInfo.headline}</title>
                </Helmet>
                <ListedBookingNavigation/>

                <section className="list-pg-bg">
                  <div className="container">
                    <div className="com-padd">

                      <h2><span>{detailsInfo.headline}</span></h2>
                      <BreadCrumb />
                      <div>
                        <div className="list-pg-lt list-page-com-p">
                          <PropertyGallery listingId={listingId}/>

                          <PropertyBedsAndBaths listingId={listingId} />

                          <PropertyDetails listingId={listingId}/>

                          <PropertyFeatures listingId={listingId}/>

                          <PropertyLocation listingId={listingId}/>

                          <PropertyCalendar listingId={listingId}/>

                          <RecentlyVisited listingId={listingId}/>

                          <PropertyReviews listingId={listingId}/>
                        </div>

                        <div className="list-pg-rt">
                          <AvailabilityInfo listingId={listingId}/>

                          <PropertyInquiry listingId={listingId}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Fragment>
            );
          }
        })()}
      </div>
    );
  }
}

ListedProperty.propTypes = {
  match: PropTypes.object.isRequired,
  detailsInfo: PropTypes.object.isRequired,
  error: PropTypes.object
};

export default ListedProperty;
