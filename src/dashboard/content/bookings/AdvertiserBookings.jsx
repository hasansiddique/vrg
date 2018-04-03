import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';

import NewAdvertiserBookings from './new-bookings';
import ApprovedAdvertiserBookings from './approved-bookings';
import CompletedAdvertiserBookings from './completed-bookings';
import CancelledAdvertiserBookings from './cancelled-bookings';
import AllAdvertiserBookings from './all-bookings';

class AdvertiserBookings extends Component {
  constructor() {
    super();
    this.state = {
      key: 1,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({key});
  }

  render() {
    const {key} = this.state;

    return (
      <div id="dashboard-bookings">
        <h4><span>Bookings</span></h4>
        <div className="tz-2-main-com">
          <div className="my-tabs">
            <Tabs defaultActiveKey={1} id="bookings-tabs" onSelect={this.handleSelect}>
              <Tab eventKey={1} title="New" bsClass="tab">
                {key === 1 && <NewAdvertiserBookings/>}
              </Tab>
              <Tab eventKey={2} title="Approved">
                {key === 2 && <ApprovedAdvertiserBookings/>}
              </Tab>
              <Tab eventKey={3} title="Completed">
                {key === 3 && <CompletedAdvertiserBookings/>}
              </Tab>
              <Tab eventKey={4} title="Cancelled">
                {key === 4 && <CancelledAdvertiserBookings/>}
              </Tab>
              <Tab eventKey={5} title="All">
                {key === 5 && <AllAdvertiserBookings/>}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

AdvertiserBookings.propTypes = {};

export default AdvertiserBookings;
