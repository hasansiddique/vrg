import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

import config from '../../../config';

class Footer extends PureComponent {
  constructor() {
    super();
  }

  render() {
    let {showFooter} = this.props;

    let containerClasses = 'footer-container';
    !showFooter ? containerClasses += ' hide' : '';

    return (
      <div className={containerClasses}>
        <section className="copy">
          <footer id="colophon" className="site-footer clearfix">
            <div id="quaternary" className="sidebar-container " role="complementary">
              <div className="sidebar-inner">
                <div className="widget-area clearfix">
                  <div id="azh_widget-2" className="widget widget_azh_widget">
                    <div data-section="section">
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-4 col-md-3 foot-logo center"><img
                            src={`/images/footer-logo.png`} style={{marginTop: '20px'}} height="100"
                            width="125"
                            alt="logo"/>
                          </div>
                          <div className="col-sm-4 col-md-3">
                            <h4>Company</h4>
                            <ul>
                              <li><Link to={`/about`}>About Us</Link></li>
                              <li><Link to={`/investment-oppertunity`}>Investment Opportunity</Link></li>
                              <li><Link to="/list-your-property">List Your Property</Link></li>
                              <li><Link to={`/testimonials`}>Testimonials</Link></li>
                              <li><a href="https://travelstars.vrguest.com/sign-up/" target="_blank">Make me a Travel
                                Star</a></li>
                              <li><Link to={`/advertisement`}>Advertise your Restaurant, activity, shop or
                                transportation</Link></li>
                            </ul>
                          </div>
                          <div className="col-sm-4 col-md-3">
                            <h4>How It Works</h4>
                            <ul>
                              <li><Link to="/traveler">Be a Guester</Link></li>
                              <li><Link to="/faq-owner">FAQ - Property Manager / Owner</Link></li>
                            </ul>
                          </div>
                          <div className="col-sm-4 col-md-3">
                            <h4>Traveler Must</h4>
                            <ul>
                              <li><Link to="/area-info">Area Info</Link></li>
                              <li><a href="https://blog.vrguest.com" target="_blank">Blog</a></li>
                              <li><Link to="/faq-guest">FAQ - Guests</Link></li>
                              <li><Link to="/contact-us">Contact Us</Link></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-section="section" className="foot-sec2">
                      <div className="container">
                        <div className="row">
                          {/*<div className="col-sm-3">
                            <h4>Payment Options</h4>
                            <p className="hasimg"><img src="images/payment.png" alt="payment"/></p>
                          </div>
                          <div className="col-sm-4">
                            <h4>Address</h4>
                            <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A. Landmark : Next To
                              Airport</p>
                            <p><span className="strong">Phone: </span> <span
                              className="highlighted">+01 1245 2541</span>
                            </p>
                          </div>*/}
                          <div className="col-sm-5 foot-social">
                            <h4>Join Us On</h4>
                            <ul>
                              <li><a href="#!"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                              <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                              <li><a href="#!"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
                              <li><a href="#!"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          <div className="container">
            <p>© 2017 VR Guest. &nbsp;&nbsp;All rights reserved. &nbsp;&nbsp;<a href="#">Privacy Policy</a></p>
          </div>
        </section>
      </div>
    );
  }
}

export default Footer;
