import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Loading from 'common/components/loading';
import NavMenu from '../../nav-menu';
import {Link} from 'react-router-dom';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    let {getUserProfileCounters} = this.props;
    getUserProfileCounters();
  }

  render() {
    let {counters, isFetching, error, currentUser} = this.props;
    let {total_current_bookings, total_listings, total_reviews} = counters;
    return [
      <div key={1} className="owner-nav clearfix">
        <div className="pull-left">
          <div className="welcome">
            <span>My Account</span> ({currentUser.user.fname} {currentUser.user.lname})
          </div>
        </div>
        <div className="pull-right">
          <Link to="/dashboard" className="btn btn-primary">My Account</Link>
        </div>
      </div>,
      <div key={2}>
        <div className="tz-2-main-com">
          {(() => {
            if (isFetching || !counters) {
              return (
                <Loading loading/>
              );
            } else {
              return (
                <div className="row">
                  <div className="col-sm-9">
                    <NavMenu/>
                  </div>
                  <div className="col-sm-3">
                    <div className="user-stats">
                      <div className="stat">
                        <div className="tz-2-main-2">
                          <img src="/images/my-bookings.png" alt=""/><span>Current Bookings</span>
                          {/*<p>All the Lorem Ipsum generators on the</p>*/}
                          <h2>{total_current_bookings}</h2></div>
                      </div>
                      <div className="stat">
                        <div className="tz-2-main-2"><img src="/images/my-listings.png"
                                                          alt=""/><span>Total Listings</span>
                          {/*<p>All the Lorem Ipsum generators on the</p>*/}
                          <h2>{total_listings}</h2></div>
                      </div>
                      <div className="stat">
                        <div className="tz-2-main-2"><img src="/images/my-reviews.png"
                                                          alt=""/><span>Total Reviews</span>
                          {/*<p>All the Lorem Ipsum generators on the</p>*/}
                          <h2>{total_reviews}</h2></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })()}
        </div>
        {/*
          <div className="db-list-com tz-db-table">
            <div className="ds-boar-title">
              <h2>Listings</h2>
              <p>All the Lorem Ipsum generators on the All the Lorem Ipsum generators on the</p>
            </div>
            <table className="responsive-table bordered">
              <thead>
              <tr>
                <th>Listing Name</th>
                <th>Date</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Taj Luxury Hotel &amp; Resorts</td>
                <td>12 May 2017</td>
                <td><span className="db-list-rat">4.2</span>
                </td>
                <td><span className="db-list-ststus">Active</span>
                </td>
                <td><a href="db-listing-edit.html" className="db-list-edit">Edit</a>
                </td>
              </tr>
              <tr>
                <td>Joney Health and Fitness</td>
                <td>12 May 2017</td>
                <td><span className="db-list-rat">3.4</span>
                </td>
                <td><span className="db-list-ststus-na">Non-Active</span>
                </td>
                <td><a href="db-listing-edit.html" className="db-list-edit">Edit</a>
                </td>
              </tr>
              <tr>
                <td>Effi Furniture Dealers</td>
                <td>12 May 2017</td>
                <td><span className="db-list-rat">5.0</span>
                </td>
                <td><span className="db-list-ststus-na">Non-Active</span>
                </td>
                <td><a href="db-listing-edit.html" className="db-list-edit">Edit</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="db-list-com tz-db-table">
            <div className="ds-boar-title">
              <h2>Payment &amp; analytics</h2>
              <p>All the Lorem Ipsum generators on the All the Lorem Ipsum generators on the</p>
            </div>
            <table className="responsive-table bordered">
              <thead>
              <tr>
                <th>Listing Name</th>
                <th>Views(week)</th>
                <th>Payment</th>
                <th>Listing Type</th>
                <th>Make Payment</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Taj Luxury Hotel &amp; Resorts</td>
                <td>142</td>
                <td><span className="db-list-rat">Done</span>
                </td>
                <td><span className="db-list-ststus">Premium</span>
                </td>
                <td><a href="db-payment.html" className="db-list-edit">Payment</a>
                </td>
              </tr>
              <tr>
                <td>Joney Health and Fitness</td>
                <td>53</td>
                <td><span className="db-list-rat">Done</span>
                </td>
                <td><span className="db-list-ststus-na">Free</span>
                </td>
                <td><a href="db-payment.html" className="db-list-edit">Payment</a>
                </td>
              </tr>
              <tr>
                <td>Effi Furniture Dealers</td>
                <td>76</td>
                <td><span className="db-list-ststus-na">No</span>
                </td>
                <td><span className="db-list-ststus-na">Free</span>
                </td>
                <td><a href="db-payment.html" className="db-list-edit">Payment</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="db-list-com tz-db-table">
            <div className="ds-boar-title">
              <h2>Messages</h2>
              <p>All the Lorem Ipsum generators on the All the Lorem Ipsum generators on the</p>
            </div>
            <div className="tz-mess">
              <ul>
                <li className="view-msg">
                  <h5><img src="/images/users/1.png" alt=""/>Listing Enquiry <span
                    className="tz-msg-un-read">unread</span></h5>
                  <p>Nulla egestas leo elit, eu sollicitudin diam suscipit non. Nunc imperdiet hendrerit mi, mollis
                    sagittis risus accumsan ac.</p>
                  <div className="hid-msg">
                    <a href="#">
                      <i className="fa fa-eye" title="view"></i>
                    </a>
                    <a href="#"><i className="fa fa-trash" title="delete"></i></a>
                  </div>
                </li>
                <li className="view-msg">
                  <h5><img src="/images/users/4.png" alt=""/>Request for meet <span
                    className="tz-msg-read">unread</span></h5>
                  <p>Duis nulla ligula, interdum porta nulla sed, efficitur tempus lacus. Quisque facilisis, sapien
                    tempor mollis sollicitudin, urna ligula vulputate nulla, rhoncus faucibus justo mauris eget
                    elit.Pellentesque eget pellentesque dolor.</p>
                  <div className="hid-msg"><a href="#"><i className="fa fa-eye" title="view"></i></a><a href="#"><i
                    className="fa fa-trash" title="delete"></i></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="db-list-com tz-db-table">
            <div className="ds-boar-title">
              <h2>Reviews</h2>
              <p>All the Lorem Ipsum generators on the All the Lorem Ipsum generators on the</p>
            </div>
            <div className="tz-mess">
              <ul>
                <li className="view-msg">
                  <h5><img src="/images/users/1.png" alt=""/>Jessica <span className="tz-revi-star">
                          <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                    className="fa fa-star"></i><i className="fa fa-star-half-o"></i></span></h5>
                  <p>Cras viverra ligula ut sem tincidunt, et volutpat dui facilisis. Nulla congue arcu vitae lectus
                    cursus finibus. Pellentesque consequat ante eu elit tincidunt pharetra.</p>
                  <div className="hid-msg"><a href="#!"><i className="fa fa-check"
                                                           title="approve this review"></i></a><a
                    href="#!"><i className="fa fa-edit" title="edit"></i></a><a href="#!"><i className="fa fa-trash"
                                                                                             title="delete"></i></a><a
                    href="#!"><i className="fa fa-reply edit-replay" title="replay"></i></a>
                    <form className="col s12 hide-box">
                      <div className="">
                        <div className="input-field col s12">
                          <textarea className="materialize-textarea"></textarea>
                          <label>Write your replay</label>
                        </div>
                        <div className="input-field col s12">
                          <i className="waves-effect waves-light btn-large waves-input-wrapper">
                            <input type="submit" value="Submit" className="waves-button-input"/></i></div>
                      </div>
                    </form>
                  </div>
                </li>
                <li className="view-msg">
                  <h5><img src="/images/users/1.png" alt=""/> Christopher <span className="tz-revi-star">
                          <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                    className="fa fa-star"></i><i className="fa fa-star-half-o"></i></span></h5>
                  <p>Duis nulla ligula, interdum porta nulla sed, efficitur tempus lacus. Quisque facilisis, sapien
                    tempor mollis sollicitudin, urna ligula vulputate nulla, rhoncus faucibus justo mauris eget
                    elit.Pellentesque eget pellentesque dolor.</p>
                  <div className="hid-msg"><a href="#!"><i className="fa fa-check"
                                                           title="approve this review"></i></a><a
                    href="#!"><i className="fa fa-edit" title="edit"></i></a><a href="#!"><i className="fa fa-trash"
                                                                                             title="delete"></i></a><a
                    href="#!"><i className="fa fa-reply edit-replay" title="replay"></i></a>
                    <form className="col s12 hide-box">
                      <div className="">
                        <div className="input-field col s12">
                          <textarea className="materialize-textarea"></textarea>
                          <label>Write your replay</label>
                        </div>
                        <div className="input-field col s12">
                          <i className="waves-effect waves-light btn-large waves-input-wrapper">
                            <input type="submit" value="Submit" className="waves-button-input"/></i></div>
                      </div>
                    </form>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        */}
      </div>
    ];
  }
}

UserProfile.propTypes = {};

export default UserProfile;
