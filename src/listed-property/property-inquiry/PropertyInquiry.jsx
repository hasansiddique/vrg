import {isEmpty, get} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Button from '../../common/components/button';

class PropertyInquiry extends Component {
  constructor() {
    super();

    this.state = {
      name: false,
      email: false,
      phone: false,
      inquiry: false,
      sending: false,
      sent: null
    };

    this.submitInquiry = this.submitInquiry.bind(this);
    this.checkFormValidity = this.checkFormValidity.bind(this);
    this.checkInputValidity = this.checkInputValidity.bind(this);
  }

  componentWillMount() {
    const {listingId} = this.props;
    this.props.initiateGetPropertyInquiry({'unit_id': listingId});
  }

  checkInputValidity(key, value) {
    if (!get(value, 'value')) {
      this.setState({[key]: true});
      return true;
    } else {
      this.setState({[key]: false});
      return false;
    }
  }

  checkFormValidity() {
    const {name, email, phone, inquiry} = this.refs;
    let error = {
      name: false,
      email: false,
      phone: false,
      inquiry: false,
    };

    error.name = this.checkInputValidity('name', name);
    error.email = this.checkInputValidity('email', email);
    // error.phone = this.checkInputValidity('phone', phone);
    error.inquiry = this.checkInputValidity('inquiry', inquiry);

    return error;
  }

  submitInquiry(event) {
    let {sendMessage, inquiryInfo, listingId} = this.props;
    event.preventDefault();

    let error = this.checkFormValidity();

    if (!(error.name && error.email && error.phone && error.inquiry)) {
      let formData = {
        unit_id: listingId || 0,
        name: get(this, 'refs.name.value'),
        email: get(this, 'refs.email.value'),
        phone: get(this, 'refs.phone.value'),
        message: get(this, 'refs.inquiry.value'),
        ownerKey: inquiryInfo.encryptedUserId
      };

      this.setState({
        sending: true
      });
      sendMessage(formData).then(() => {
        this.setState({
          sending: false,
          sent: true
        });
      }).catch(() => {
        this.setState({
          sending: false,
          sent: false
        });
      });
    }
  }

  render() {
    const {inquiryInfo, listingId} = this.props;
    const {name, email, phone, inquiry, sending, sent} = this.state;

    return (
      <div id="property-inquiry">
        {!isEmpty(inquiryInfo) && (
          <div className="pglist-p3 pglist-bg pglist-p-com">
            <div className="pg-list-user-pro">
              {inquiryInfo.logoFileName ?
                <img src={`https://s3.amazonaws.com/vrguest-assets/pmlogos/${inquiryInfo.logoFileName}`}
                     height={80}
                     alt="User Image"/>
                :
                <img src="/images/user-icon.png"
                     height={60} width={60}
                     alt="User Image"/>
              }
            </div>
            <div className="list-pg-inn-sp">
              <div className="list-pg-upro">
                <div className="questions">Got Questions? Call Us Now</div>
                <div className="phone">{inquiryInfo.workPhone}</div>

                <h4>{inquiryInfo.managerName}</h4>
                <div className="row hom-cre-acc-right">
                  <div>
                    {(() => {
                      if (sent === false) {
                        return (
                          <div className="alert alert-danger">
                            Failed, Please try again
                          </div>
                        );
                      } else if (sent === true) {
                        return (
                          <div className="alert alert-success">
                            Message Sent
                          </div>
                        );
                      }
                    })()}
                  </div>
                  <form>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="name"
                          ref="name"
                          type="text"
                          placeholder="Name"
                          className={"validate " + (name && "invalid")} required/>
                        {name && <div className="error">* Name is Required.</div>}
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="email"
                          ref="email"
                          type="email"
                          placeholder="Email Address"
                          className={"validate " + (email && "invalid")}
                          required/>
                        {email && <div className="error">* Email is Required.</div>}
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="phone"
                          ref="phone"
                          type="number"
                          placeholder="Phone Number (Optional)"
                          className={"validate " + (phone && "invalid")}
                          required/>
                        {phone && <div className="error">* Phone is Required.</div>}
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="inquiry"
                          ref="inquiry"
                          id="inquiry"
                          placeholder="Your Question"
                          rows="10" required/>
                        {inquiry && <div className="error">* Inquiry is Required.</div>}
                      </div>
                    </div>
                  </form>
                </div>

                <Button text={(sending) ? 'Sending...' : 'Send'}
                        style={{backgroundColor: '#FF6430', border: 'none', width: '100%'}}
                        onClick={this.submitInquiry}/>

                <Link to={`/all-properties/${listingId}/${inquiryInfo.encryptedUserId}`}>
                  <Button text="Show All My Properties"
                          style={{backgroundColor: '#0074E1', border: 'none', width: '100%', marginTop: `15px`}}/>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

PropertyInquiry.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  inquiryInfo: PropTypes.object.isRequired,
  listingId: PropTypes.number.isRequired,
  initiateGetPropertyInquiry: PropTypes.func.isRequired,
};

export default PropertyInquiry;
