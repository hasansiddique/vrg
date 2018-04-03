import {groupBy, toArray} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BeatLoader} from 'react-spinners';
import {Table} from 'react-bootstrap';

class PropertyFeatures extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    const {listingId} = this.props;
    this.props.initiateGetUnitFeatures({'unit_id': listingId});
  }

  filterFeaturesByType(features) {
    return toArray(groupBy(features, 'featureCategoryName'));
  }

  render() {
    const {featuresInfo, isFetching} = this.props;
    let filteredFeatures = this.filterFeaturesByType(featuresInfo.features);

    return (
      <div id="property-features">
        <div className="pglist-p1 pglist-bg pglist-p-com">
          <div className="pglist-p-com-ti">
            <h3><span>Property Features</span></h3>
          </div>
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
              featuresInfo.features && (
                <Table striped>
                  <tbody>
                  {filteredFeatures.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td width="25%">
                          <strong>{value[0].featureCategoryName}</strong>
                        </td>
                        <td width="75%">
                          {toArray(value).map((v, i) => {
                            let includes = [2, 5, 8, 11, 14].includes(i);
                            return (
                              <div key={i} className={includes ? "row" : ""}>
                                <div className="col-sm-4 item">
                                  <div className="row">
                                    <div>
                                      <span className="fa fa-check check"></span>
                                      {v.featureName}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </Table>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

PropertyFeatures.propTypes = {
  initiateGetUnitFeatures: PropTypes.func.isRequired,
  listingId: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  featuresInfo: PropTypes.object.isRequired,
};

export default PropertyFeatures;
