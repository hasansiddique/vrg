import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Loading from '../../common/components/loading/Loading.jsx';

export default class InsideDrilldown extends React.Component {

  static get propTypes(){
    return {
      title: PropTypes.string.isRequired,
      drilldown: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { drilldown, title } = this.props;
    let data = drilldown.data || [];
    let { isFetching } = drilldown;
    if(isFetching){
      return (
        <Loading />
      );
    }else if(isFetching === false && data.length === 0){
      return null;
    }
    return (
      <div className="inside-drilldown container-fluid">
        <div className="row">
          <div className="col-sm-10 col-md-offset-1">
            <div className="com-title"><h2><span>{title}</span></h2></div>
            <ul className="row">
              {data.map((value, index) => {
                return (
                  <li key={index} className="col-sm-3">
                    <NavLink
                      to={`/destination/${value.url.toLowerCase().replace(/\s/ig, '-')}`}>
                      {value.name} <span className="count">{value.count}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
