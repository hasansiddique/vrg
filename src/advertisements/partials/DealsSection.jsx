import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import queryString from 'query-string';
import DealRow from './DealRow.jsx';


export default class DealsSection extends React.Component {

  static get propTypes(){
    return {
      section: PropTypes.object,
      full: PropTypes.bool.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { section, full } = this.props;
    let deals = section.deals || [];
    let continent = section.continent;
    let continentUrlName = continent.toLowerCase().replace(/\s/ig, '-');
    let queryParams = queryString.parse(location.search);
    let sort = queryParams.sort;
    return (
      <div className="deals-section">
        <div className="heading">
          <h2>{continent}</h2>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th><Link className={`${((sort == '2' || sort == '2D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '2') ? '2D' : '2')}`}>Unit</Link></th>
                <th><Link className={`${((sort == '3' || sort == '3D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '3') ? '3D' : '3')}`}>CHECK-IN</Link></th>
                <th><Link className={`${((sort == '12' || sort == '12D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '12') ? '12D' : '12')}`}>Nights</Link></th>
                <th><Link className={`${((sort == '4' || sort == '4D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '4') ? '4D' : '4')}`}>Country</Link></th>
                <th><Link className={`${((sort == '5' || sort == '5D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '5') ? '5D' : '5')}`}>State</Link></th>
                <th><Link className={`${((sort == '6' || sort == '6D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '6') ? '6D' : '6')}`}>City</Link></th>
                <th><Link className={`${((sort == '7' || sort == '7D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '7') ? '7D' : '7')}`}>Original</Link></th>
                <th><Link className={`${((sort == '8' || sort == '8D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '8') ? '8D' : '8')}`}>Special</Link></th>
                <th><Link className={`${((sort == '9' || sort == '9D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '9') ? '9D' : '9')}`}>You Save</Link></th>
                <th><Link className={`${((sort == '10' || sort == '10D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '10') ? '10D' : '10')}`}>Sleeps</Link></th>
                <th><Link className={`${((sort == '11' || sort == '11D') ? 'active' : '')}`} to={`/vacation-rental-deals/${continentUrlName}?sort=${((sort == '11') ? '11D' : '11')}`}>Features</Link></th>
                <th>Guests</th>
                <th style={{ width: '10%' }}>Booking</th>
              </tr>
            </thead>
            <thead>
              {deals.map((deal, index) => {
                return (
                  <DealRow key={index} deal={deal} />
                );
              })}
            </thead>
          </table>
        </div>
        {(() => {
          if(!full){
            return(
              <div className="text-right">
                <Link to={`/vacation-rental-deals/${continent.toLowerCase().replace(/\s/ig, '-')}`}>View Complete List of Deals in {continent}</Link>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}
