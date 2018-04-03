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
          <div className="container">
            <div className="static-page">
              <div className="heading">
                <h1>Investment Opportunity</h1>
              </div>
              <div className="static-body">
                <h3 className="sub-heading">THE PLAN</h3>
                <p className="investment-content">
                  VR Guest is growing fast and we are changing the Vacation Rental industry.  
                  In fact, we are <span className="text-danger">the next disrupter.</span>
                </p>
                <p className="investment-content">
                  After 15 successful years as Vacation Rental Managers in Clearwater Beach, FL, with Gross Income 
                  of over $8M, we had a chance to learn the industry and we saw first-hand the rapid increase of fees 
                  from 0% to 30% in 2 years.
                </p>  
                <p className="investment-content">  
                  We saw an immediate opportunity for a better solution.  So we created 
                  <span className="text-danger"> a Free Marketplace for Property  Owners/Manager and Guests </span>
                  to come together. While other global vacation rental websites are charging Property managers up 
                  to 15% per booking, we offer a totally free place to list your property – no fees, no commission. 
                  And at the same time while others are charging up to 15% to the renter we are totally free to the 
                  guest – no booking fees.  Changing the industry model and dynamics overnight. With an average booking 
                  price of $1,000 we save the owner $150 per booking and the guest $150 per booking.  With a $3,000 
                  booking the owner saves $450 and the guest saves $450.
                </p>
                <p className="investment-content">  
                  The market is responding quickly and we are already in 
                  <span className="text-danger">97 countries and 8,000 destinations.</span> 
                  We have over 1 Million properties in our funnel to bring on the website and we can not keep up. &nbsp; 
                  <a target="_blank" href="https://www.vrguest.com/contact-lisa.cfm" className="investment-link">
                    Contact us for Executive Summary.
                  </a>
                </p>
                <h3 className="sub-heading">
                  THE OFFER
                </h3>
                <p className="investment-content"> 
                  To meet our growth, we are looking for debt equity in the total amount of $2 M. 
                  The terms are 12% interest only payments monthly for 36 months at which point there will be a 
                  balloon payment. A Loan Agreement is attached.  It can be completed by Docusign. &nbsp;
                  <a target="_blank" href="https://www.vrguest.com/contact-lisa.cfm" className="investment-link">
                    Contact us for Docusign document.
                  </a> Then the document will be sent to us for counter signature. And wiring instructions will follow. 
                  Once the money has been received, interest begins accruing.
                </p>  
                <p className="investment-content"> 
                  We look forward to providing you a strong, solid investment. And as our motto says we are “Better Together”
                </p>
                <p className="investment-content"> 
                  Questions can be sent to &nbsp; 
                  <a target="_blank" href="https://www.vrguest.com/contact-lisa.cfm" className="investment-link">
                    Lisa[AT]vrguest.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    );
  }
}

export default AboutPage;
