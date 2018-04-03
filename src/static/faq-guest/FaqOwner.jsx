import React, {PureComponent} from 'react';
import PageWrapper from '../../common/layout/page-wrapper';
import moment from 'moment';

class FaqOwner extends PureComponent {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      endDate: null,
      focusedInput: null,
    };
  }

  render() {
    let underLineStyles = {
      textDecoration: 'underline'
    };
    return (
      <PageWrapper>
        <section className="container">
          <div className="static-page">
            <div className="heading">
              <h1>Frequently Asked Questions</h1>
            </div>
            <div className="static-body">
              <h3 className="sub-heading">Guests</h3>
              <div className="faq">
                <h4 className="faquestion">Why book with VRguest?</h4>
                <div className="faqanswer">
                  VRguest brings you the right property at the right price. We have the lowest prices in the industry. 
                  The right vacation rental property can be the difference between and OK trip and the BEST VACATION EVER!
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Does VRguest charge me traveler fees?</h4>
                <div className="faqanswer">
                  No. VRguest is the largest booking sites that does not charge any traveler fees. 
                  We feel strongly that a guest should not be charged for a booking which increases the amount 
                  of the booking. We would not want that extra charge, so how can we charge you?
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What does the rental cost?</h4>
                <div className="faqanswer">
                  The rental costs only what the owner or Vacation Rental Manager charges. You will never see a charge from VRguest.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">How does a booking work on VRguest?</h4>
                <div className="faqanswer">
                  Once the property is booked, the booking is directly with the Vacation Rental Manager or Owner. 
                  They will contact you with details and for payment, check-in information, etc. 
                  Questions should be directed to the Vacation Rental Manager or Owner contact information is on each listing.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">I have questions about the property and it's availability. Who do I ask?</h4>
                <div className="faqanswer">
                  The best person to ask is the Vacation Rental Manager or Owner. They know. The contact info is on 
                  each listing. Calling is the fastest way to get your answer,
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Can I contact the Vacation Rental Manager or Owner directly?</h4>
                <div className="faqanswer">
                  We encourage it. They know the most about the area and the property and can best answer your questions. 
                  You can even book directly thru them or their website.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Are prices negotiable?</h4>
                <div className="faqanswer">
                  That is completely up to the Vacation Rental Manager or Owner. During off season and last minute many 
                  places are willing to discount. Call the Manager directly to negotiate. During high season the sooner 
                  you book the better. Check out our Guesteals for the best prices.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">How does VRguest work for the Guest?</h4>
                <div className="faqanswer">
                  Simple.
                  <ol>
                    <li>Find a place you like.</li>
                    <li>If you have questions talk to the Manager/Owner by phone or email or visit their website</li>
                    <li>Book the perfect place direct the Manager, or on VRguest at no-cost.</li>
                    <li>Get contacted by the Manager</li>
                    <li>Have an amazing vacation.</li>
                  </ol>
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What is the cancellation Policy?</h4>
                <div className="faqanswer">
                  Each property varies on its terms for deposits, when payments are due, cancellation policies and 
                  check-in procedures. So check the listing for details and ask the Manager/Owner directly.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Can I rent a room in a house?</h4>
                <div className="faqanswer">
                  No, sorry. We do not offer shared accommodations. We only offer completely private accommodations.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">How do I check in?</h4>
                <div className="faqanswer">
                  Check-in details will be provided by the Vacation Rental Manager or Owner after the booking.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What if the owner does not call me?</h4>
                <div className="faqanswer">
                  Call us 727-288-2020 and ask for support. It can take Vacation Rental Manager or Owner up to 48 hours to respond.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What f there is a problem while I am in the property? Who do I call?</h4>
                <div className="faqanswer">
                  Since your booking is with the Vacation Rental Manager or Owner directly, you will need to contact them. 
                  Their email and phone number information is on the listing.
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    );
  }
}

export default FaqOwner;
