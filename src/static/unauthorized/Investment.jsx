import React, {PureComponent} from 'react';
import PageWrapper from '../../common/layout/page-wrapper';
import moment from 'moment';

class AboutPage extends PureComponent {
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
        <section>
          <div className="container" style={{ marginBottom: '20px' }}>
            <div className="static-page">
              <div className="heading">
                <h1>Unauthorized</h1>
              </div>
              <div className="static-body">
                You don't have access to this page
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    );
  }
}

export default AboutPage;
