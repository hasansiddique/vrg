import {groupBy, toArray, isEmpty} from 'lodash';
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';
import FontIcon from 'common/components/font-icon';
import Loading from 'common/components/loading';

class BedsAndBaths extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { listingId, getUnitBedrooms, getUnitBathrooms } = this.props;
    getUnitBedrooms(listingId);
    getUnitBathrooms(listingId);
  }

  render() {
    const {
      bedrooms, 
      isFetchingBedrooms,
      bathrooms, 
      isFetchingBathrooms,
      summaryInfo, 
      isFetching
    } = this.props;
    return (
      <div className="property-beds-and-baths">
        <Tabs defaultActiveKey={1} id="bedsAndBaths">
          <Tab eventKey={1} title="Layout Summary">
            <div className="list-pg-inn-sp">
              {isFetching ?
                <Loading loading />
                :
                !isEmpty(summaryInfo.layoutlist) ? (
                    <div className="list-pg-oth-info">
                      <ul>
                        {summaryInfo.layoutlist && summaryInfo.layoutlist.map((item, index) => {
                          return (
                            <li key={index} dangerouslySetInnerHTML={{__html: item}} />
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
          </Tab>
          <Tab eventKey={2} title="Bedrooms">
            {(isFetchingBedrooms) ? (<Loading loading />) : (
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <tbody>
                    <tr>
                      <td colSpan={7}>Total {bedrooms.length} bedrooms having following features</td>
                    </tr>
                    <tr>
                      <td className="text-center">King</td>
                      <td className="text-center">Queen</td>
                      <td className="text-center">Double</td>
                      <td className="text-center">Twin Single</td>
                      <td className="text-center">Child Bed</td>
                      <td className="text-center">Crib</td>
                      <td className="text-center">Sleep Sofa</td>
                    </tr>
                    {bedrooms.map((bedroom, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">{(bedroom.king == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bedroom.king} <FontIcon name="check" /></span>)}</td>
                          <td className="text-center">{(bedroom.queen == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bedroom.queen} <FontIcon name="check" /></span>)}</td>
                          <td className="text-center">{(bedroom.double == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bedroom.double} <FontIcon name="check" /></span>)}</td>
                          <td className="text-center">{(bedroom.twin_single == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bedroom.twin_single} <FontIcon name="check" /></span>)}</td>
                          <td className="text-center">{(bedroom.child_bed == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bedroom.child_bed} <FontIcon name="check" /></span>)}</td>
                          <td className="text-center">{(bedroom.crib == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bedroom.crib} <FontIcon name="check" /></span>)}</td>
                          <td className="text-center">{(bedroom.sleep_sofa == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bedroom.sleep_sofa} <FontIcon name="check" /></span>)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Tab>
          <Tab eventKey={3} title="Bathrooms">
            {(isFetchingBathrooms) ? (<Loading loading />) : (
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <tbody>
                    {bathrooms.map((bathroom, index) => {
                      return (
                        <Fragment key={index}>
                          <tr>
                            <td colSpan={8}><strong>{index + 1}. {bathroom.title}</strong></td>
                          </tr>
                          <tr>
                            <td className="text-center">Type</td>
                            <td className="text-center">Toilet</td>
                            <td className="text-center">Combo Tub Shower</td>
                            <td className="text-center">Tub</td>
                            <td className="text-center">Shower</td>
                            <td className="text-center">Jetted Tub</td>
                            <td className="text-center">Bidet</td>
                            <td className="text-center">Outdoor Shower</td>
                          </tr>
                          <tr key={index}>
                            <td className="text-center">{bathroom.type_of_bath.replace('_', ' ')}</td>
                            <td className="text-center">{(bathroom.toilet == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bathroom.toilet} <FontIcon name="check" /></span>)}</td>
                            <td className="text-center">{(bathroom.combo_tub_shower == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bathroom.combo_tub_shower} <FontIcon name="check" /></span>)}</td>
                            <td className="text-center">{(bathroom.tub == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bathroom.tub} <FontIcon name="check" /></span>)}</td>
                            <td className="text-center">{(bathroom.shower == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bathroom.shower} <FontIcon name="check" /></span>)}</td>
                            <td className="text-center">{(bathroom.jetted_tub == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bathroom.jetted_tub} <FontIcon name="check" /></span>)}</td>
                            <td className="text-center">{(bathroom.bidet == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bathroom.bidet} <FontIcon name="check" /></span>)}</td>
                            <td className="text-center">{(bathroom.outdoor_shower == '0') ? (<span className="text-danger"><FontIcon name="remove" /></span>) : (<span className="text-success">{bathroom.outdoor_shower} <FontIcon name="check" /></span>)}</td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

BedsAndBaths.propTypes = {
  getUnitBedrooms: PropTypes.func.isRequired,
  getUnitBathrooms: PropTypes.func.isRequired,
  listingId: PropTypes.number.isRequired,
  bedrooms: PropTypes.array.isRequired,
  bathrooms: PropTypes.array.isRequired,
  isFetchingBedrooms: PropTypes.bool.isRequired,
  isFetchingBathrooms: PropTypes.bool.isRequired,
  summaryInfo: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default BedsAndBaths;
