import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import Loading from '../../../../../common/components/loading';
import Section from './partials/Section.jsx';
import FontIcon from 'common/components/font-icon';

export default class CommunityFeatures extends React.Component {
  static get propTypes(){
    return {
      match: PropTypes.object,
      getOwnerUnitCommunityFeatures: PropTypes.func,
      isFetching: PropTypes.bool,
      features: PropTypes.object,
      error: PropTypes.string,
      updateOwnerUnitCommunityFeatures: PropTypes.func,
      isUpdating: PropTypes.bool,
      updateOwnerUnitCommunityFeaturesStore: PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.form = null;
    this.type = 'attractions';
  }

  componentDidMount(){
    let { getOwnerUnitCommunityFeatures, match } = this.props;
    let unitId = match.params.id;
    getOwnerUnitCommunityFeatures(unitId);
  }

  componentWillUnmount(){
    let { updateOwnerUnitCommunityFeaturesStore } = this.props;
    updateOwnerUnitCommunityFeaturesStore({
      features: null
    });
  }

  onSubmit(e){
    e.preventDefault();
    let { updateOwnerUnitCommunityFeatures, isUpdating, features, updateOwnerUnitCommunityFeaturesStore } = this.props;
    let type = this.type;
    let values = Object.assign({}, features[type]);
    features[type] = values;
    let data = this.buildPostData(type);
    if(!isUpdating){
      updateOwnerUnitCommunityFeatures(data);
    }
  }
  buildPostData(type = 'attractions'){
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
  onChange(data, type = 'attractions'){
    let { features, updateOwnerUnitCommunityFeaturesStore } = this.props;
    let newFeatures = Object.assign({}, features);
    newFeatures[type] = data;
    updateOwnerUnitCommunityFeaturesStore({
      features: newFeatures
    });
  }

  getType(type){
    type = type || 'attractions';
    return type.replace(/-/ig, '_');
  }

  render() {
    let { features, isFetching, isUpdating, error, match } = this.props;
    let unitId = match.params.id;
    let baseRoutePath = match.path;
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
