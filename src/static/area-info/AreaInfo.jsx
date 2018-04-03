import React, {PureComponent} from 'react';
import PageWrapper from '../../common/layout/page-wrapper';
import moment from 'moment';

class AreaInfo extends PureComponent {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      endDate: null,
      focusedInput: null,
    };
  }

  render() {
    return (
      <PageWrapper>
        <div className="container">
          <div className="static-page">
            <div className="heading">  
              <h1>Area Info</h1>
            </div>
            <div className="static-body">
              <p className="">
                <img src="/images/area-info.png" alt="area info" />
              </p>
              <p>
                We want to place you in a vacation rental at your perfect travel destination wherever it is around 
                the world. We try to provide you, the traveler, with all the necessary information of the unit and the surroundings on each property's page on our website.&nbsp; We also provide a way to contact each owner or property manager so you can have any questions answered directly from the property you plan to book.&nbsp; Happy vacationing!
              </p>
            </div>     
          </div>
        </div>
      </PageWrapper>
    );
  }
}

export default AreaInfo;
