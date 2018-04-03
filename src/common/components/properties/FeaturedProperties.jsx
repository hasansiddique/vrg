import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BeatLoader} from 'react-spinners';
import { Link } from 'react-router-dom';
import Pagination from 'common/components/pagination';

import config from '../../../config';
import {isEmpty} from "lodash";
import Property from './partials/Property.jsx';

class FeaturedProperties extends Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.limit =  this.props.maxRecords || 12;
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData(page = null){
    let {gId, recordCategory} = this.props;
    if(page){
      this.page = page.selected;
    }
    let promise = this.props.initiateGetProperties({
      "GID": gId,
      "adCategoryID": recordCategory,
      "maxRecords": this.limit,
      "startRow": (((this.page) * this.limit) + 1)
    });
  }

  render() {
    const {properties, isFetching, adcount, countAdClick, gId, fullPage} = this.props;
    let pageCount = Math.ceil(adcount/this.limit);
    let showAllUrl = '/advertisements/properties';
    if(gId){
      showAllUrl += '?gid=' + gId;
    }
    return (
      <div className={(fullPage) ? 'container' : ''}>
        <section className="featured-properties"
                 style={(isEmpty(properties) && !isFetching) ? {display: `none`} : {}}>
          <div className="container-fluid">
            <div className="">
              <div className="">
                <div className="com-title">
                  <h2><span>Featured Properties</span></h2>
                  <p>Explore some of the best things to do from around the world from our partners and friends.</p>
                </div>
                <div className="">
                  <div className="">
                    {isFetching ?
                      <div className="spinner-wrapper">
                        <BeatLoader
                          color={'#0074E1'}
                          loading={isFetching}
                        />
                        <span>Loading...</span>
                      </div>
                      :
                      <div className="dir-hli">
                        <ul className={"row"}>
                          {properties.map((property, index) => {
                            let className = "col-md-2" + (index%5 === 0 ? " col-md-offset-1 " : " ") + "col-sm-6 " + (index%5 === 0 ? 'col-xs-12' : 'col-xs-6') + " col-medium-padding";
                            if(fullPage){
                              className = "col-md-3 col-sm-6 col-medium-padding";
                            }
                            return (
                              <li
                                key={index}
                                className={className}>
                                <Property 
                                  property={property} 
                                  baseUrl={config.s3Bucket}
                                  countAdClick={countAdClick} />
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    }
                    {(!isEmpty(properties) && !isFetching && adcount > 10 && !fullPage) && (
                      <div className="right col-md-offset-right-1">
                        <Link to={showAllUrl}><span className="show-all">Show All . . .</span></Link>
                      </div>
                    )}
                    {(() => {
                      if(fullPage){
                        return (
                          <div>
                            <Pagination
                              handlePageClick={this.getData}
                              pageRangeDisplayed={2}
                              marginPagesDisplayed={1}
                              pageCount={pageCount}
                              forcePage={this.page} />
                          </div>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

FeaturedProperties.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  initiateGetProperties: PropTypes.func.isRequired,
  adcount: PropTypes.number.isRequired,
  gId: PropTypes.number.isRequired,
  maxRecords: PropTypes.number.isRequired,
  properties: PropTypes.array,
  fullPage: PropTypes.bool
};

FeaturedProperties.defaultProps = {
  fullPage: true
};

export default FeaturedProperties;
