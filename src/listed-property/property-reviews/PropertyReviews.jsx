import {filter, isString} from 'lodash';
import moment from 'moment';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BeatLoader} from 'react-spinners';
import {ProgressBar} from 'react-bootstrap';

import Pagination from '../../common/components/pagination';

class PropertyReviews extends Component {
  constructor() {
    super();

    this.state = {
      offset: 0,
      allReviews: [],
      reviewShowing: [],
      reviewSummary: {},
      pageCount: 0,
      loaded: false
    };

    this.calculateReviews = this.calculateReviews.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    const {listingId} = this.props;
    this.props.initiateGetPropertyReviews({'unit_id': listingId});
  }

  componentWillUnmount() {
    this.props.getPropertyReviewsCompleted([]);
  }

  componentWillReceiveProps(nextProps) {
    let reviewsInfo = nextProps.reviewsInfo;
    if (reviewsInfo.review && reviewsInfo.review.length && reviewsInfo.review.length > 0 && !this.state.loaded) {
      this.setState({
        loaded: true,
        allReviews: reviewsInfo.review,
        reviewSummary: this.calculateReviews(reviewsInfo.review),
        reviewShowing: reviewsInfo.review.slice(0, 5),
        pageCount: reviewsInfo.review.length / 5,
      });
    }
  }

  handlePageClick(data) {
    const {allReviews} = this.state;
    let selected = data.selected;
    let offset = Math.ceil(selected * 5);

    this.setState({
      offset: offset,
      reviewShowing: allReviews.slice(offset, offset + 5)
    });
  }

  calculateReviews(items) {
    let reviews = {
      excellent: [],
      good: [],
      average: [],
      belowAverage: [],
      bad: []
    };

    items.forEach((item) => {
      item.rating === 5 ? reviews.excellent.push(item.rating) :
        item.rating === 4 ? reviews.good.push(item.rating) :
          item.rating === 3 ? reviews.average.push(item.rating) :
            item.rating === 2 ? reviews.belowAverage.push(item.rating) :
              item.rating === 1 ? reviews.bad.push(item.rating) : '';
    });

    reviews.excellent = Math.round((reviews.excellent.length / items.length) * 100);
    reviews.good = Math.round((reviews.good.length / items.length) * 100);
    reviews.average = Math.round((reviews.average.length / items.length) * 100);
    reviews.belowAverage = Math.round((reviews.belowAverage.length / items.length) * 100);
    reviews.bad = Math.round((reviews.bad.length / items.length) * 100);

    return reviews;
  }

  render() {
    const {reviewShowing, reviewSummary} = this.state;
    const {isFetching, reviewsInfo} = this.props;

    return (
      <div className="pglist-p3 pglist-bg pglist-p-com" id="property-reviews">
        <div className="pglist-p-com-ti">
          <h3><span>Customer Reviews</span></h3>
        </div>

        {isFetching ?
          <div className="spinner-wrapper">
            <BeatLoader
              color={'#0074E1'}
              loading={isFetching}
            />
            <span>Loading...</span>
          </div>
          :
          reviewsInfo.review && isString(reviewsInfo.review[0].description) ?
            <div className="text-danger" style={{padding: `25px`}}>
              {reviewsInfo.review[0].description}
            </div>
            :
            reviewsInfo.review && (
              <div className="list-pg-inn-sp">
                <div className="lp-ur-all">
                  <div className="lp-ur-all-left">
                    <div className="lp-ur-all-left-1">
                      <div className="lp-ur-all-left-11">Excellent ({reviewSummary.excellent}%)</div>
                      <div className="lp-ur-all-left-12 excellent">
                        <ProgressBar now={reviewSummary.excellent}/>
                      </div>
                    </div>
                    <div className="lp-ur-all-left-1">
                      <div className="lp-ur-all-left-11">Good ({reviewSummary.good}%)</div>
                      <div className="lp-ur-all-left-12 good">
                        <ProgressBar now={reviewSummary.good}/>
                      </div>
                    </div>
                    <div className="lp-ur-all-left-1">
                      <div className="lp-ur-all-left-11">Satisfactory ({reviewSummary.average}%)</div>
                      <div className="lp-ur-all-left-12 average">
                        <ProgressBar now={reviewSummary.average}/>
                      </div>
                    </div>
                    <div className="lp-ur-all-left-1">
                      <div className="lp-ur-all-left-11">Below Average ({reviewSummary.belowAverage}%)</div>
                      <div className="lp-ur-all-left-12 below-average">
                        <ProgressBar now={reviewSummary.belowAverage}/>
                      </div>
                    </div>
                    <div className="lp-ur-all-left-1">
                      <div className="lp-ur-all-left-11">Bad ({reviewSummary.bad}%)</div>
                      <div className="lp-ur-all-left-12 bad">
                        <ProgressBar now={reviewSummary.bad}/>
                      </div>
                    </div>
                  </div>
                  <div className="lp-ur-all-right">
                    <h5>Overall Ratings</h5>
                    <p>
                      <span>{reviewsInfo.overAllRating} <i className="fa fa-star" aria-hidden="true"></i></span>
                      based on {reviewsInfo.totalReviews} reviews
                    </p>
                  </div>
                </div>
                <div className="lp-ur-all-rat">
                  <h5>Reviews</h5>
                  {reviewShowing.length > 0 &&
                  <div>
                    <ul>
                      {reviewShowing.map((item, index) => {
                        return (
                          <div key={index} className="col-md-12">
                            <div className="cus-rev">
                              <div className="pg-revi-re">
                                <h6>{item.reviewerName || item.feedbackSignature || `Anonymous`}</h6>
                                {(item.reviewerCoutry || item.reviewerState || item.reviewerCity) && (
                                  <span>{`${item.reviewerCoutry}, ${item.reviewerState}, ${item.reviewerCity}`}</span>
                                )}
                                <div className="list-rat-ch list-room-rati pg-re-rat">
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
                                </div>
                              </div>

                              {item.title && (<p className="review-title">{item.title}</p>)}
                              {(item.review || item.feedbackMessage) && (<p>{item.review || item.feedbackMessage}</p>)}

                              <div className="cus-re-com">
                                <div className="share-btn">
                                  <ul>
                                    {item.propertyConditions && (
                                      <li className="pill-item">
                                        <a href="javascript:void(0)">
                                          Property Condition:&nbsp;
                                          {item.propertyConditions + (item.propertyConditions > 1 ? ' Stars' : ' Star')}
                                        </a>
                                      </li>
                                    )}

                                    {item.recommendToOthers && (
                                      <li className="pill-item">
                                        <a href="javascript:void(0)">
                                          Recommendation:&nbsp;
                                          {item.recommendToOthers ? 'Yes' : 'No'}
                                        </a>
                                      </li>
                                    )}

                                    {item.checkIn && (
                                      <li className="pill-item">
                                        <a href="javascript:void(0)">
                                          Checked In:&nbsp;
                                          {moment(item.checkIn).format("MM/DD/YYYY")}
                                        </a>
                                      </li>
                                    )}

                                    {item.checkOut && (
                                      <li className="pill-item">
                                        <a href="javascript:void(0)">
                                          Checked Out:&nbsp;
                                          {moment(item.checkOut).format("MM/DD/YYYY")}
                                        </a>
                                      </li>
                                    )}
                                    {item.source && (
                                      <li className="pill-item">
                                        <a href="javascript:void(0)">
                                          Source:&nbsp;
                                          {item.source}
                                        </a>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </ul>

                    {(reviewsInfo.review && reviewsInfo.review.length > 5) && (
                      <Pagination
                        pageCount={this.state.pageCount}
                        handlePageClick={this.handlePageClick}/>
                    )}
                  </div>
                  }
                </div>
              </div>
            )}
      </div>
    );
  }
}

PropertyReviews.propTypes = {
  getPropertyReviewsCompleted: PropTypes.func.isRequired,
  initiateGetPropertyReviews: PropTypes.func.isRequired,
  listingId: PropTypes.number.isRequired,
  reviewsInfo: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default PropertyReviews;
