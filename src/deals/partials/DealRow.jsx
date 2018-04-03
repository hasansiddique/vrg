import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import storage from 'common/storage';
import moment from 'moment';


class DealRow extends React.Component {

  static get propTypes(){
    return {
      deal: PropTypes.object
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      guestsList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    };
    this.bookDeal = this.bookDeal.bind(this);
    this.onGuestsChange = this.onGuestsChange.bind(this);
  }

  onGuestsChange(e){
    this.setState({
      guests: e.target.value
    });
  }

  bookDeal(e){
    e.preventDefault();
    let { guests } = this.state;
    let { deal, history } = this.props;
    let startDate = moment(deal['check-in']);
    let endDate = moment(deal['check-out']);
    console.log(startDate, endDate);
    if (startDate && endDate) {
      storage.set('order', {
        unit_id: deal.property,
        checkInDate: startDate.format('MM/DD/YYYY'),
        checkOutDate: endDate.format('MM/DD/YYYY'),
        adults: guests,
        children: 0,
        guests: guests,
        deal_id: deal.id
      });
      history.push({
        pathname: '/booking'
      });
    }
  }

  render() {
    let { deal } = this.props;
    let { guests, guestsList } = this.state;
    return (
      <tr>
        <td><Link to={`/listings/${deal.property}`}>{deal.property}</Link></td>
        <td>{deal['check-in']}</td>
        <td>{deal.nights}</td>
        <td>{deal.country}</td>
        <td>{deal.state}</td>
        <td>{deal.city}</td>
        <td><span style={{ textDecoration: 'line-through' }}>{deal.original}</span></td>
        <td><span className="special">{deal.special}</span></td>
        <td>{Math.ceil(deal.save)}%</td>
        <td>{deal.sleeps}</td>
        <td>{deal.features}</td>
        <td>
          <select style={{ height: '29px', padding: '2px 12px' }} className="form-control" onChange={this.onGuestsChange}>
            {guestsList.map((val, index) => {
              return (
                <option key={index} value={val}>{val}</option>
              );
            })}
          </select>
        </td>
        <td>
          <Link 
            onClick={this.bookDeal}
            className="btn btn-success btn-sm" 
            to={`/listings/${deal.property}`}>
            Book Now
          </Link>
        </td>
      </tr>
    );
  }
}

export default withRouter(DealRow);
