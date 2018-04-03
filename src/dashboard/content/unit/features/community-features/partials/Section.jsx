import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Section extends Component {
  static get propTypes(){
    return {
      features: PropTypes.object,
      onChange: PropTypes.func,
      type: PropTypes.string
    };
  }
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e, index){
    let { onChange, features } = this.props;
    let type = this.getType();
    features[type].features[index].active = (e.target.checked ? 1 : 0);
    onChange(features[type], type);
  }
  getType(){
    let { type } = this.props;
    return type.replace(/-/ig, '_');
  }
  render(){
    let { features } = this.props;
    let type = this.getType();
    return (
      <div className="features-container">
        <div className="row">
          {features[type].features.map((feature, index) => {
            return (
              <div className="col-sm-4" key={index}>
                <div className="">
                  <div className="">
                    <div className="checkbox">
                      <label>
                        <input 
                          type="checkbox" 
                          name={feature.id}
                          onChange={(e) => this.onChange(e, index)} 
                          value="1" 
                          checked={feature.active == "1"} 
                          /> {feature.name}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}