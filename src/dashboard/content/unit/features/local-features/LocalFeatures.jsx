import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import Loading from '../../../../../common/components/loading';
import Section from './partials/Section.jsx';
import FontIcon from 'common/components/font-icon';

export default class LocalFeatures extends React.Component {
  static get propTypes(){
    return {
      match: PropTypes.object,
      getOwnerUnitLocalFeatures: PropTypes.func,
      isFetching: PropTypes.bool,
      features: PropTypes.object,
      error: PropTypes.string,
      updateOwnerUnitLocalFeatures: PropTypes.func,
      isUpdating: PropTypes.bool,
      updateOwnerUnitLocalFeaturesStore: PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.form = null;
    this.type = 'amenities';
  }

  componentDidMount(){
    let { getOwnerUnitLocalFeatures, match } = this.props;
    let unitId = match.params.id;
    getOwnerUnitLocalFeatures(unitId);
  }

  componentWillUnmount(){
    let { updateOwnerUnitLocalFeaturesStore } = this.props;
    updateOwnerUnitLocalFeaturesStore({
      features: null
    });
  }

  onSubmit(e){
    e.preventDefault();
    let { updateOwnerUnitLocalFeatures, isUpdating, features, updateOwnerUnitLocalFeaturesStore } = this.props;
    let type = this.type;
    let values = Object.assign({}, features[type]);
    features[type] = values;
    let data = this.buildPostData(type);
    if(!isUpdating){
      updateOwnerUnitLocalFeatures(data);
    }
  }
  buildPostData(type = 'amenities'){
    let { features, match } = this.props;
    let unitId = match.params.id;
    let ourFeatures = features[type];
    let categoryId = ourFeatures.id;
    let ids = [];
    ourFeatures.features.forEach((feature, index) => {
      if((feature.active == 1)){
        ids.push(feature.id);
      }
    });
    let data = {
      unit_id: unitId,
      category_id: categoryId,
      features_listing_vrg: ids.join(',')
    };
    return data;
  }
  onChange(data, type = 'amenities'){
    let { features, updateOwnerUnitLocalFeaturesStore } = this.props;
    let newFeatures = Object.assign({}, features);
    newFeatures[type] = data;
    updateOwnerUnitLocalFeaturesStore({
      features: newFeatures
    });
  }

  getType(type){
    type = type || 'amenities';
    return type.replace(/-/ig, '_');
  }

  render() {
    let { features, isFetching, isUpdating, error, match } = this.props;
    let unitId = match.params.id;
    let baseRoutePath = match.path;
    // console.log(features);
    return (
      <div className="local-features">
        {(() => {
          if(!features){
            return (
              <Loading loading />
            );
          }else{
            return (
              <div>
                <form
                  onSubmit={this.onSubmit}
                  >
                  <Route
                    path={`${baseRoutePath}/:type?`}
                    exact
                    component={(routeProps) => {
                      this.type = this.getType(routeProps.match.params.type);
                      return (
                        <Section
                          unitId={unitId}
                          type={this.type}
                          features={features}
                          onChange={this.onChange}
                        />
                      );
                    }} />
                    <div className="text-right">
                      <button className="btn btn-primary"><FontIcon name="save" /> {(isUpdating) ? 'Updating...' : 'Update'}</button>
                    </div>
                </form>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}
