import React from 'react';
import PropTypes from 'prop-types';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import Select from 'react-validation/build/select';
import Button from 'react-validation/build/button';
import Loading from '../../../../../common/components/loading';
import { mainFeaturesCheckboxes } from '../../../../../common/utilities';
import FontIcon from 'common/components/font-icon';
import { required } from 'common/validator';

export default class MainFeatures extends React.Component {
  static get propTypes(){
    return {
      match: PropTypes.object,
      getOwnerUnitMainFeatures: PropTypes.func,
      isFetching: PropTypes.bool,
      features: PropTypes.object,
      error: PropTypes.string,
      updateOwnerUnitMainFeatures: PropTypes.func,
      isUpdating: PropTypes.bool,
      updateOwnerUnitMainFeaturesStore: PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.form = null;
  }

  componentDidMount(){
    let { getOwnerUnitMainFeatures, match } = this.props;
    let unitId = match.params.id;
    getOwnerUnitMainFeatures(unitId);
  }

  componentWillUnmount(){
    let { updateOwnerUnitMainFeaturesStore } = this.props;
    updateOwnerUnitMainFeaturesStore({
      features: null
    });
  }

  onSubmit(e){
    e.preventDefault();
    let { updateOwnerUnitMainFeatures, isUpdating, features, updateOwnerUnitMainFeaturesStore } = this.props;
    let values = Object.assign({}, features, this.form.getValues());
    updateOwnerUnitMainFeaturesStore({
      features: values
    });
    if(!isUpdating){
      updateOwnerUnitMainFeatures(values);
    }
  }
  onChange(e){
    let { features, updateOwnerUnitMainFeaturesStore } = this.props;
    let values = this.form.getValues();
    features[e.target.name] = (e.target.checked ? 1 : 0);
    let newFeatures = Object.assign({}, features, values);
    updateOwnerUnitMainFeaturesStore({
      features: newFeatures
    });
  }

  render() {
    let { features, isFetching, isUpdating, error, match } = this.props;
    let unitId = match.params.id;
    return (
      <div className="main-features">
        {(() => {
          if(isFetching === true || !features){
            return (
              <Loading loading />
            );
          }else{
            return (
              <Form
                ref={(ref) => this.form = ref}
                className="form-horizontal"
                onSubmit={this.onSubmit}>
                <Input name="unit_id" value={unitId} type="hidden" />
                <div className="features-container" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group label-right">
                        <label
                          className="col-sm-5"
                          htmlFor="ac">AC</label>
                        <div className="col-sm-7">
                          <Select
                            name="ac"
                            className="form-control"
                            value={features.ac}
                            validations={[]}
                          >
                            <option value="0">None</option>
                            <option value="1">Central</option>
                            <option value="2">Wall Unit</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group label-right">
                        <label
                          className="col-sm-5"
                          htmlFor="pool">Pool</label>
                        <div className="col-sm-7">
                          <Select
                            name="pool"
                            className="form-control"
                            value={features.pool}
                            validations={[]}
                          >
                            <option value="0">None</option>
                            <option value="1">On Site</option>
                            <option value="2">Community</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group label-right">
                        <label
                          className="col-sm-5"
                          htmlFor="water_front">Water Front</label>
                        <div className="col-sm-7">
                          <Select
                            name="water_front"
                            className="form-control"
                            value={features.water_front}
                            validations={[]}
                          >
                            <option value="0">None</option>
                            <option value="1">Gulf</option>
                            <option value="2">Bay</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group label-right">
                        <label
                          className="col-sm-5"
                          htmlFor="laundry">Laundry</label>
                        <div className="col-sm-7">
                          <Select
                            name="laundry"
                            className="form-control"
                            value={features.laundry}
                            validations={[]}
                          >
                            <option value="0">None</option>
                            <option value="1">Coin-op</option>
                            <option value="2">In-room</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group label-right">
                        <label
                          className="col-sm-5"
                          htmlFor="cable">Cable</label>
                        <div className="col-sm-7">
                          <Select
                            name="cable"
                            className="form-control"
                            value={features.cable}
                            validations={[]}
                          >
                            <option value="0">None</option>
                            <option value="1">Basic</option>
                            <option value="2">HBO</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group label-right">
                        <label
                          className="col-sm-5"
                          htmlFor="parking">Parking</label>
                        <div className="col-sm-7">
                          <Select
                            name="parking"
                            className="form-control"
                            value={features.parking}
                            validations={[]}
                          >
                            <option value="0">Off Street</option>
                            <option value="1">On Street</option>
                            <option value="2">Covered</option>
                            <option value="3">Garaged</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group label-right">
                        <label
                          className="col-sm-5"
                          htmlFor="phone">Phone</label>
                        <div className="col-sm-7">
                          <Input
                            name="phone"
                            className="form-control"
                            value={features.phone}
                            validations={[required]}
                            isChanged
                            isUsed
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="features-container">
                  <div className="row">
                    {mainFeaturesCheckboxes.map((feature, index) => {
                      return (
                        <div className="col-sm-4" key={index}>
                          <div className="">
                            <div className="">
                              <div className="checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    name={feature.name}
                                    onChange={this.onChange}
                                    value="1"
                                    checked={features[feature.name] == "1"}
                                    /> {feature.label}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <Button className="btn btn-primary"><FontIcon name="save" /> {(isUpdating) ? 'Updating...' : 'Update'}</Button>
                </div>
              </Form>
            );
          }
        })()}
      </div>
    );
  }
}
