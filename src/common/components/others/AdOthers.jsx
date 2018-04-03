import {isEmpty} from 'lodash';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {BeatLoader} from 'react-spinners';
import Pagination from 'common/components/pagination';

import config from '../../../config';
import Other from './partials/Other.jsx';

class AdOthers extends Component {
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
    let {gId, maxRecords, recordCategory} = this.props;
    if(page){
      this.page = page.selected;
    }
    let promise = this.props.getOthers({
      "GID": gId,
      "adCategoryID": recordCategory,
      "maxRecords": this.limit,
      "startRow": (((this.page) * this.limit) + 1)
    });
  }

  render() {
    const {others, isFetching, count, fullPage, countAdClick, gId} = this.props;
    let pageCount = Math.ceil(count/this.limit);
    let showAllUrl = '/advertisements/others';
    if(gId){
      showAllUrl += '?gid=' + gId;
    }
    return (
      <div className={(fullPage) ? 'container' : ''}>
        <section className="resturants"
                 style={(isEmpty(others) && !isFetching) ? {display: `none`} : {}}>
          <div className="container-fluid">
            <div className="row">
              <div className="com-title">
                <h2><span>Find Others</span></h2>
                <p>Explore some of the best others from around the world from our partners and friends.</p>
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
                <div className="dir-hli">
                  <ul>
                    {others.map((other, index) => {
                      let className = "col-md-2" + (index === 0 ? " col-md-offset-1 " : " ") + "col-sm-6 " + (index == 0 ? 'col-xs-12' : 'col-xs-6') + " col-medium-padding";
                      if(fullPage){
                        className = "col-md-3 col-sm-6 col-medium-padding";
                      }
                      return (
                        <li className={className}
                            key={index}>
                          <Other 
                            other={other} 
                            adImagesBaseUrl={config.adImagesBaseUrl}
                            countAdClick={countAdClick} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              }
              {(!isEmpty(others) && !isFetching && count > 5 && !fullPage) && (
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
        </section>
      </div>
    );
  }
}

AdOthers.propTypes = {
  others: PropTypes.array,
  isFetching: PropTypes.bool,
  count: PropTypes.number.isRequired,
  gId: PropTypes.number.isRequired,
  maxRecords: PropTypes.number.isRequired,
  recordCategory: PropTypes.number.isRequired,
  fullPage: PropTypes.bool
};

AdOthers.defaultProps = {
  fullPage: false
};

export default AdOthers;
