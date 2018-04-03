import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from 'common/layout/page-wrapper';
import ContactForm from './ContactForm.jsx';

class ContactUs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, setSubmitting, resetForm){
    let { sendMessage } = this.props;
    sendMessage(values).then((res) => {
      alert('Message Sent Successfully')
      setSubmitting(false);
      // resetForm({ email: '', message: '' });
    }).catch(() => {
      alert('Something went wrong while sending message, Please try again');
      setSubmitting(false);
      // resetForm({ email: '', message: '' });
    });
  }

  render() {
    return (
      <PageWrapper>
        <section>
          <div className="container">
            <div className="static-page">
              <div className="heading">
                <h1>Contact Us</h1>
              </div>
              <div className="static-body">
                <div className="one-contact margin-bottom-lg">
                  <h3 className="sub-heading">Travelers</h3>
                  <p>
                    We are here to help. Many booking sites will not even give you a phone number to call.
                  </p>
                  <p>
                    It is hard to find the perfect vacation rental. There are many options and when you are not familiar 
                    with the area how do you know which one is the best value and best rental for your trip. We do. 
                    Our property managers and owners want to be called! Every listing has a phone number. 
                    Call it! They want to answer your questions and help you find the perfect vacation rental.
                  </p>  
                  <p>
                    Try or <Link to="/faq-guest">Frequently Asked Questions - Guests</Link>
                  </p>
                  <p>  
                    If we can help you, call us at 727-777-5000.
                  </p>
                  <p>
                    You can always send us an email to...
                  </p>
                  <div>
                    <ContactForm handleSubmit={this.handleSubmit} type="vrg" />
                  </div>
                </div>
                <div className="one-contact margin-bottom-lg">
                  <h3 className="sub-heading">Property Managers and Owners</h3>
                  <p>
                    We are here for you too! After 15 years in the business, we have seen it all. And we still run a 
                    highly successful local company called Florida Beach Rentals. &nbsp; 
                    <a href="https://www.florida-beachrentals.com/" target="_blank">www.Florida-BeachRentals.com</a>
                  </p>
                  <p>
                    You can ask us any question about bookings, renters, how to make more money. 
                    We can help and we want too. You have a friend in the business.
                    Try or <Link to="/faq-owner">Frequently Asked Questions - Property Managers and Owners</Link>
                  </p>  
                  <p>
                    Questions? Call us at 727-777-5000.
                  </p>
                  <p>  
                    You can always send us an email to...
                  </p>
                  <div>
                    <ContactForm handleSubmit={this.handleSubmit} type="propertymanager" />
                  </div>
                </div>
                <div className="one-contact margin-bottom-lg">
                  <h3 className="sub-heading">Travel Stars</h3>
                  <p>
                    We can help you and you can help us. We have a global platform for you to post on and reach more 
                    travelers to build your following. We also have a product you can sell while you are traveling 
                    and make money.
                  </p>
                  <p>
                    It is hard to find the perfect vacation rental. There are many options and when you are not familiar 
                    with the area how do you know which one is the best value and best rental for your trip. We do. 
                    Our property managers and owners want to be called! Every listing has a phone number. 
                    Call it! They want to answer your questions and help you find the perfect vacation rental.
                  </p>
                  <p>
                    If we can help you, call us at 727-777-5000.
                  </p>
                  <p>
                    You can always send us an email to...
                  </p>
                  <div>
                    <ContactForm handleSubmit={this.handleSubmit} type="travelstars" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    );
  }
}

export default ContactUs;
