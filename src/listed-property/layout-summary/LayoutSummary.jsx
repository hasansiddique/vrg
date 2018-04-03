import {isEmpty} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BeatLoader} from 'react-spinners';

class LayoutSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const {listingId, isFetching} = this.props;
    if(!isFetching){
      this.props.initiateGetUnitSummary({'unit_id': listingId});
    }
  }

  render() {
    const {summaryInfo, isFetching} = this.props;

    return (
      <div className="pglist-p3 pglist-bg pglist-p-com" id="layout-summary">
        <div className="pglist-p-com-ti"><h3><span>Layout Summary</span></h3></div>
        <div className="list-pg-inn-sp">
          {isFetching ?
            <div className="spinner-wrapper">
              <BeatLoader
                color={'#0074E1'}
                loading={isFetching}
              />
              <span>Loading...</span>
            </div>
            :
            !isEmpty(summaryInfo.layoutlist) ? (
                <div className="list-pg-oth-info">
                  <ul>
                    {summaryInfo.layoutlist && summaryInfo.layoutlist.map((item, index) => {
                      return (
                        <li key={index}>
                          <div dangerouslySetInnerHTML={{__html: item}}></div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )
              :
              <div className="text-danger">
                No layout summary found.
              </div>
          }
        </div>
      </div>
    );
  }
}

LayoutSummary.propTypes = {
  initiateGetUnitSummary: PropTypes.func.isRequired,
  listingId: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  summaryInfo: PropTypes.object.isRequired,
};

export default LayoutSummary;
