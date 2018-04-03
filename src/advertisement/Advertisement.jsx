import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Advertisement extends Component {
  constructor() {
    super();
    this.state = {};

    this.openWizard = this.openWizard.bind(this);
  }

  openWizard() {
    this.props.toggleModalVisibility(true);
    this.props.toggleModalType('ad-wizard');
  }

  render() {
    return (
      <div id="advertisement">
        <section id="content" className="container content-container">
          <div className="row">
            <section id="head">
              <div id="header" className="header-slide">
                <div className="container header-container">

                  <div className="txtbox">
                    <h3>What can VRguest do for your restaurant, store or business?</h3>

                    <hr style={{
                      marginBottom: `15px`, marginTop: `30px`,
                      width: `98%`,
                      textAlign: `center`
                    }}/>
                    <p style={{
                      fontSize: `20px !important`,
                      clear: `both`,
                      lineHeight: 1.5,
                      color: `#ffffff`,
                      textAlign: `left`, marginBottom: `15px`
                    }}>
                      <br/>
                      The only way to reach the $164B vacation rental market before and during their stay.
                    </p>
                    <br/>
                    <br/>
                    <h4>We are “Better Together”</h4>
                  </div>
                </div>
              </div>

            </section>

            <section id="content">
              <div className="container bg">
                <h1 className="ads-heading">Digital Advertising 4.0</h1>
                <p style={{color: `#615F5F`}}>As a Vacation Rental Management Company in business for 15 years in
                  Clearwater
                  Beach, FL, we know the first questions at check-in are about the place they are staying. “What is the
                  wi-fi code?” “Where is parking?” “ The next questions are always <span
                    style={{color: `rgb(0,51,204)`}}>“Where should we eat?” “What is there to do?” “Where can I watch the big game?” or “Where can I shop?”</span>
                </p><p>You now have a way to connect to these travelers before during and after. We offer a <strong>4
                Touch-Point Advertising Program</strong> with each customer. So they are sure to find you. Our average
                booking has over 5 people, some groups are as large as 24. So reaching the planner reaches a larger
                group.
              </p>
                <ul className="advertisepoints">
                  <li><strong>Touch Point 1—Searching.</strong> It is beneficial for you to connect up with travelers
                    during their planning stage. So you are already on their “to do” list before they even leave their
                    house. We show your advertising on the Search page results.
                  </li>
                  <li><strong>Touch Point 2—Planning.</strong> Your ad is always on the destination page. So before
                    during or after they can find your business and tell their friends.
                  </li>
                  <li><strong>Touch Point 3—Email.</strong> When they book your city, we email them your special offers.
                  </li>
                  <li><strong>Touch Point 4—Phone/Mobile.</strong> Then once they are here, even if they forgot your
                    name, they can find your Special Offer on their phone at anytime.
                  </li>
                </ul>
                <br/>
                <p>According to HomeAway, Vacation home renters spend twice as much, travel more frequently and for
                  longer periods of time than the average leisure traveler. They are also more tech savvy and appreciate
                  quality.&nbsp;</p>
              </div>
            </section>

            <hr/>

            <section id="content" className="container ">
              <div className="container bg">

                <div className="pricing_heading" align="center">
                  <span className="priceheading3" style={{fontSize: `42px`}}>Flexible Pricing Options </span>

                  <br/>
                  <p className="price-text" style={{textAlign: `center`}}>
                    Choose the option that best fits your marketing budget and the number of guests you want to reach.
                  </p>
                </div>
                <br/>

                <div className="row">

                  <div className="col-lg-5">
                    <span className="pricing_heading priceheading3"> Budget Friendly - Pay as you go</span>
                    <p className="price-text">
                      The BEST OPTION to reach the vacationer without the upfront costs. Pay only as we deliver with a
                      max budget set.
                    </p>
                  </div>
                  <div className="col-lg-5">
                    &nbsp;
                  </div>
                  <div className="col-lg-5" style={{marginLeft: `140px`}}>
                    <span className="pricing_heading priceheading3"> Get It All - One and done for the year</span>
                    <p className="price-text">
                      The BEST VALUE with your ad seen in 3 city locations and unlimited reach and guaranteed clicks for
                      one low price for an entire year.
                    </p>
                  </div>
                </div>

                <br/>
                <div className="table-responsive">
                  <table className="table table-striped border-grey table-bordered tablewidth">

                    <tbody>
                    <tr>
                      <td scope="row" className="noborder" style={{textAlign: `left`}}>&nbsp;</td>
                      <td className="noborder">&nbsp;</td>
                      <td className="noborder">&nbsp;</td>

                      <td className="premiumcol" style={{color: `#718DCB`, border: `1px solid #96abd6`}}><strong>

                        <span style={{
                          display: `block`,
                          marginTop: `-5px`,
                          padding: `5px`,
                          fontWeight: `bold`,
                          fontSize: `18px`
                        }}> Most Popular! </span></strong></td>

                      <td className="noborder">&nbsp;</td>
                      <td className="premiumcol" style={{color: `#718DCB`, border: `1px solid #96abd6`}}><strong> <span
                        style={{
                          display: `block`,
                          marginTop: `-5px`,
                          padding: `5px`,
                          fontWight: `bold`,
                          fontSize: `18px`
                        }}> Best Value </span></strong></td>
                    </tr>

                    <tr>
                      <th scope="col" style={{textAlign: `left`}}>Plan Details</th>
                      <th scope="col" className="theading">$5</th>
                      <th scope="col" className="theading">$10</th>
                      <th scope="col" className="theading ">
                        <div className="premiumbtn">$25</div>
                      </th>
                      <th scope="col" className="theading">$50</th>
                      <th scope="col" className="theading" style={{textAlign: `center`}}>
                        <div className="premiumbtn">$499 per year</div>
                      </th>
                    </tr>


                    <tr>
                      <th scope="row" style={{textAlign: `left`}}>Your ad seen in</th>
                      <td className="tprice-contents">1 city of your choice</td>
                      <td className="tprice-contents">1 city of your choice</td>
                      <td className="tprice-contents">1 city of your choice</td>
                      <td className="tprice-contents">1 city of your choice</td>
                      <td className="tprice-contents"> 3 cities of your choice</td>
                    </tr>

                    <tr>
                      <th scope="row" style={{textAlign: `left`}}>Cost per Click</th>
                      <td className="tprice-contents">$1 per click</td>
                      <td className="tprice-contents">$.83 per click</td>
                      <td className="tprice-contents">$.63 per click</td>
                      <td className="tprice-contents">$.50 per click</td>
                      <td className="tprice-contents"> Unlimited Guaranteed 1,200 clicks</td>
                    </tr>

                    <tr>
                      <th scope="row" style={{textAlign: `left`}}>4 Touch-Point Advertising <i
                        className="fa fa-question-circle" aria-hidden="true"></i></th>
                      <td><i className="fa fa-thumbs-o-up  " aria-hidden="true"></i></td>
                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td className="premiumcol"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></td>

                      <td><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></td>
                      <td className="premiumcol"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" style={{textAlign: `left`}}>Unlimited edits to Ad <i
                        className="fa fa-question-circle"
                        aria-hidden="true"></i></th>
                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td className="premiumcol"><i className="fa fa-thumbs-o-up thumbs-green"
                                                    aria-hidden="true"></i>
                      </td>

                      <td><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></td>
                      <td className="premiumcol"><i className="fa fa-thumbs-o-up thumbs-green"
                                                    aria-hidden="true"></i>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" style={{textAlign: `left`}}>Mobile App</th>
                      <td><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></td>
                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td className="premiumcol"><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>

                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td className="premiumcol"><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" style={{textAlign: `left`}}>Logo or picture or coupon image</th>
                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td className="premiumcol"><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>

                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td className="premiumcol"><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" style={{textAlign: `left`}}>Direct Link to website or promotion <i
                        className="fa fa-question-circle" aria-hidden="true"></i></th>
                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td className="premiumcol"><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>

                      <td><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                      <td className="premiumcol"><i className="fa fa-thumbs-o-up " aria-hidden="true"></i></td>
                    </tr>


                    <tr style={{textAlign: `center`}}>
                      <td scope="row_" colSpan="6">
                        <div className="join-bar-price">
                              <span className="calltoact-price" align="center">
                               <a href="javascript:void(0)"
                                  onClick={this.openWizard}
                                  className=" btn btn-primary">
                                 <span style={{textAlign: `center`, color: `#fff`}}> Sign-up Now! </span>
                                 <br/>
                                 <span style={{textAlign: `center`, fontSize: `16px`, color: `#fff`}}> Double Click bonus for signing up today! </span>
                                </a>
                              </span>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <hr/>
            <br/>
            <section id="content" className="container">
              <div className="container bg">
                <h2 className="plan_heading">*All plans include these <strong>essential features</strong>:</h2>
                <br/>
                <div className="row">
                  <div className="col-lg-4 listplan">
                    <ul>
                      <li><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Unlimited Ad changes</li>
                      <li><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Visibility to vacationers before they
                        arrive
                      </li>
                      <li><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Global customer base</li>
                    </ul>
                  </div>
                  <div className="col-lg-4 listplan">
                    <ul>
                      <li><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Track impressions and clicks</li>
                      <li><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Mobile friendly gives the customer
                        full-time access to to your ad while on vacation
                      </li>

                    </ul>
                  </div>
                  <div className="col-lg-4 listplan">
                    <ul>
                      <li><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> More qualified leads than Facebook
                      </li>
                      <li><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Direct link to website or coupon</li>
                      <li><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Ad link on guest booking confirmation
                        email
                      </li>
                    </ul>
                  </div>
                </div>
                <br/>
                <br/>


                <section className="join-bar">
                  <div className="row">
                    <p className="txt">
                      <span className="plan-features-banner"> Start reaching<br/>Vacationers today!</span>
                    </p>
                    <p className="calltoact">
                      <a href="https://www.vrguest.com/register.cfm?TYPE=3" target="_blank"
                         className=" btn btn-primary">Sign-up
                        Now!</a>
                    </p>
                  </div>
                </section>
              </div>
            </section>

            <hr/>
            <br/>

            <section id="content" className="container ">
              <div className="container bg">
                <div className="faq-bx">
                  <div className="wrap">
                    <h1 className="sec-title"><span style={{fontSize: `40px`, fontWeight: `bolder`}}> Some Frequently Asked Questions:</span>
                    </h1>
                    <div className="row">
                      <div className="col-lg-6 bulletq">
                        <h4 className="title">How does it work?</h4>
                        <span className="box-text">Click this link <a href="https://www.vrguest.com/register.cfm?TYPE=3"
                                                                      target="_blank" style={{
                          fontWeight: `bold`,
                          textDecoration: `underline`
                        }}>
                          SIGN UP NOW
                        </a>
                          <span
                            className="faq-txt-blue">  It takes only 10 minutes to have your ad up and running.</span>  Next, log in, choose the level advertising based on how many people you want to reach. Add a promotion or special deal. Upload a picture that will show everyone how amazing your place is. Done.</span>
                      </div>

                      <div className="col-lg-6 bulletq">
                        <h4 className="title">Why is it better than Facebook?</h4>
                        <span className="box-text">Facebook advertising is great. We use it too. But when you are trying target a vacation audience, it is hit or miss. You have to know where they are traveling. We do. The ads are set up by location and our audience is global. <span
                          className="faq-txt-blue"> Our leads are more qualified </span> because they are looking for places to stay or have already booked. We suggest you augment your FB ads with ours.</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 bulletq">
                        <h4 className="title">How will I know it works?</h4>
                        <span className="box-text">After you sign in, your <span className="faq-txt-blue"> dashboard will show you how many impressions and clicks </span> your ad is getting. You can change your ad to optimize your clicks. You can also offer a unique deal and the number of those you sell can track how many customers come thru VRguest.</span>
                      </div>

                      <div className="col-lg-6 bulletq">
                        <h4 className="title">Can I change my ad?</h4>
                        <span className="box-text">Anytime. Just log-in and <span className="faq-txt-blue"> upload a new special or picture or logo anytime.</span> Maybe you are having a slow week and you want to drive more business by running a super special. In 5 minutes you are done. It is not like a print ad where 3 months later people are still seeing the same thing and you are stuck with it. You can put up monthly specials or happy hour deals. Or If you get really crazy you can change the ad daily.</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 bulletq">
                        <h4 className="title">What Is the GUARANTEE?</h4>
                        <span className="box-text">After you sign up for the $499 program, your dashboard will show you how many impressions and clicks you are getting. We guarantee  <span
                          className="faq-txt-blue">1,200 clicks.</span> If after 12 months, you do not see the guaranteed number of clicks, we will extend your ad until the clicks are received. If you get more clicks there is not extra charge.</span>
                      </div>

                      <div className="col-lg-6 bulletq">
                        <h4 className="title">Do they have to book to see my offer?</h4>
                        <span className="box-text">No, one of the great things about our advertising is <span
                          className="faq-txt-blue">you are seen by people who are in the planning and searching stage.</span> On average a customer goes to 9 website before they book. So even if they never book with us they now know where to find out more about the area and your business while they are here.</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 bulletq">
                        <h4 className="title">What if I want to upgrade?</h4>
                        <span className="box-text">Just call us at 727-777-5000 and let us know. We can apply the payment you made to the upgrade and start your year of advertising.</span>
                      </div>

                      <div className="col-lg-6 bulletq">
                        <h4 className="title">Why is it better than print?</h4>
                        <span className="box-text">Simply 1. You can track results 2. You can change your ad anytime. 3. You have 4 ways to reach each customer 4. We reach vacationers before they arrive in the search and planning stage and again while they are traveling.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}

Advertisement.propTypes = {
  toggleModalVisibility: PropTypes.func.isRequired,
  toggleModalType: PropTypes.func.isRequired,
};

export default Advertisement;
