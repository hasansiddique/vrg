import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PageWrapper from 'common/layout/page-wrapper';
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
        <section className="">
          <div className="container">
            <div className="static-page">
              <div className="heading">
                <h1>List Your Property</h1>
              </div>
              <div className="static-body">
                <div className="alert alert-info">
                  <div className="text-center">
                    <h2 className="sub-heading" style={{ lineHeight: '1.7em', fontWeight: 'normal' }}>
                      FREE LISTINGS for your vacation rental properties!
                      <br />
                      We mean FREE, FREE!! No charge from us.
                      <br />
                      <strong> We don't even take your credit card.</strong>
                    </h2>
                  </div> 
                </div>

                <div className="text-center">
                  <Link to="/register" className="list-property-btn">
                    List Your Property<small>No Credit Card Required!</small>
                  </Link>
                </div>


                <h2 className="plan-heading text-center text-success"> All listings include these essential features:</h2>
                <br />
                <div className="row">
                  <div className="col-lg-4 list-features">
                    <ul>
                      <li><i className="fa fa-check" aria-hidden="true" /> Website Link</li>
                      <li><i className="fa fa-check" aria-hidden="true" /> Your Phone number </li>
                      <li><i className="fa fa-check" aria-hidden="true" /> Your Logo </li>
                      <li><i className="fa fa-check" aria-hidden="true" /> Your Email </li>
                      <li><i className="fa fa-check" aria-hidden="true" /> Your Name/Brand  </li>
                      <li><i className="fa fa-check" aria-hidden="true" />  iCal connection for auto calendar sync </li>
                    </ul>
                  </div>

                  <div className="col-lg-4  list-features">
                    <ul>
                      <li><i className="fa fa-check" aria-hidden="true" /> No Fees </li>
                      <li><i className="fa fa-check" aria-hidden="true" />  No Commission </li>
                      <li><i className="fa fa-check" aria-hidden="true" /> No cost from VRguest </li>
                      <li><i className="fa fa-check" aria-hidden="true" /> Direct Bookings  </li>
                      <li><i className="fa fa-check" aria-hidden="true" /> Book-on-line Option   </li>
                      <li><i className="fa fa-check" aria-hidden="true" /> Email notification of bookings   </li>
                    </ul>
                  </div>

                  <div className="col-lg-4  list-features" styles="margin-bottom: 20px;">
                    <ul>
                      <li><i className="fa fa-check" aria-hidden="true" /> Full Page Description </li>
                      <li><i className="fa fa-check" aria-hidden="true" /> 24 pictures  </li>
                      <li><i className="fa fa-check" aria-hidden="true" /> Average nightly rate </li>
                      <li><i className="fa fa-check" aria-hidden="true" />  On demand rates </li>
                      <li><i className="fa fa-check" aria-hidden="true" />  Your terms - cancellations  </li>
                      <li><i className="fa fa-check" aria-hidden="true" /> Your terms – deposits, payments and cancellations   </li>
                    </ul>
                  </div>
                </div>

                <div className="row text-contents" styles="margin: 10px; text-align: justify; line-height: 1.5;">

                  <span>
                    Here is how the conversation goes. We say, “Free!”
                    <br /><br />


                    You say, “Yea right, heard that before.  I list, then you charge me how much for a booking? They all try to get you by saying free to list.  BUT what will bookings will cost me? 10-20% like AirBnb? or $349 or 10%-15% like HomeAway?”
                    <br /><br />


                    We say, “It is really free. We charge you nothing.”
                    <br /><br />


                    VR guest was created by Vacation Rental Managers for Vacation Rental Managers and Owners.  We get it. We have been in the vacation rental business for 15 years.  We have seen the changes.  We have seen our business go up and down at the direction of HomeAway and AirBnb.  So we decided to do something about it.  We decided to be the next disruptor!  Our top priority is to connect guests with awesome vacation rentals.  We decided to help every Vacation Rental Manager and every owner just like us.  And then we decided to not even charge your customer a booking fee.
                    <br /><br />


                    Whaaaaat?
                    <br /> <br />

                    Yes, it is true. Sign up. See for yourself. Then tell your friends.
                    <br />
                    <br />
                    <br />
                    <div className="text-center">
                      <Link to="/register" className="list-property-btn">
                        List Your Property<small>No Credit Card Required!</small>
                      </Link>
                    </div>
                    <br />
                    <br />
                    <br />
                  </span>

                </div>  

                <div className="alert vp-section">

                  <p className="top"> 
                    “If it was not for property managers, there would not be any booking sites. How do the booking sites know what is good for your business when they have never managed a vacation rental? The only person that should be in control of your business is YOU.” 
                  </p>                           
                  <div className="author">
                    – Tom Holevas, VP Product Development.
                  </div>
                </div>

                <div className="row text-contents" styles="margin: 65px 10px 10px 10px; text-align: justify; line-height: 1.5;">
                  <span>
                    <br />
                    If you are linked to a 3rd party distributor or using software, contact us to find out how we can hook up.  We will still charge you nothing, but your partner may charge you a little something…..we can’t help that. But we would still love to help you get more bookings.
                    <br />
                    <br />

                    Call 727-777-5000 and ask for a Listings Specialist.
                    <br />
                    <br />
                    <span styles="font-size: 20px;">Try our <Link to="/faq-owner"><u> Frequently Asked Questions – Vacation Rental Managers and Owners </u></Link></span>
                    <br />
                    <br />
                    Call us at 727-777-5000. You can always send us an email too...
                  </span>
                </div>
              </div>
            </div>
          </div>    
        </section>
      </PageWrapper>
    );
  }
}

export default AboutPage;
