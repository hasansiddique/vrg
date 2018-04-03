import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';

import DashboardContent from './content';
import Loading from 'common/components/loading';


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let {currentUser} = this.props;
    return (
      <div id="dashboard">
        <div className="tz" style={{paddingTop: '85px'}}>
          {(() => {
            if (!currentUser || !currentUser.user) {
              return (
                <Loading loading/>
              );
            } else {
              return (
                <Fragment>
                  <DashboardContent/>
                </Fragment>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {};

export default Dashboard;
