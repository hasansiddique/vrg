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
        <section className="static-page">
          <div className="container">
            <div className="heading">
              <h1>Frequently Asked Questions</h1>
            </div>
            <div className="static-body">
              <h2 className="sub-heading">
                Vacation Rental Manager or Owner
              </h2>
              <div className="faq">
                <h4 className="faquestion"> What does a listing cost an Owner or Vacation Rental Manager? </h4>
                <div className="faqanswer">
                  Nothing, Zero. Nada. We are a free site. The only time your listing would cost anything is if your
                  distribution partner charges us something. If it is free for us it is free for you.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What does a booking cost the Owner or Vacation Rental Manager? </h4>
                <div className="faqanswer">
                  Same Answer. Nothing, Zero. Nada. We are a free site. The only time your listing would cost anything is
                  if your distribution partner charges us something. If it is free for us it is free for you.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Do you charge a commission? </h4>
                <div className="faqanswer">
                  Same Answer. Nothing, Zero. Nada. We are a free site. The only time your listing would cost anything is
                  if your distribution partner charges us something. If it is free for us it is free for you. By the way
                  we do not charge the guest either.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">How does VRguest work for Vacation Rental Managers and Owners? </h4>
                <div className="faqanswer">
                  Simple.
                  <ol>
                    <li>List your property - phone number, email, web link, rates, description, pictures, etc.</li>
                    <li>Get inquiries and communicate directly with your guests by phone or email.</li>
                    <li>Book the guest in the perfect place direct with you, or on VRguest at no-cost.</li>
                    <li>Take payments and pay taxes</li>
                    <li>Manage check-ins, check-outs and cleanings.</li>
                  </ol>
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Does VRguest charge my guest any traveler fees? </h4>
                <div className="faqanswer">
                  VRguest is the largest booking sites that does not charge any traveler fees. We feel strongly that a
                  guest should not be charged for a booking which increases the amount of the booking.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What contact info can I put in my listing? </h4>
                <div className="faqanswer">
                  We encourage you to put your phone number, email, website link. The more ways a guest can contact you
                  the better.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Can I list a room I my house?</h4>
                <div className="faqanswer">
                  No, sorry. We do not offer shared accommodations. We only offer completely private accommodations.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What are The 5 Simple Rules to be on VRguest? </h4>
                <div className="faqanswer">
                  We want to make the experience and the Industry the best it can be. SO we have some simple Rules to be
                  on our website. Not following these rules will be cause for immediate removal from our site.
                  <ol>
                    <li>All properties must be clean, in good repair and safe for your guests. We do not offer substandard
                      accommodations.
                    </li>
                    <li>All properties must meet their local zoning requirements.</li>
                    <li>You must pay your taxes.</li>
                    <li>You must approve all bookings. If it is booked on line then the custer found the calendar open and
                      the rental available and a price for the rental. You have made an offer on the open market and
                      someone accpeted. We expect you approve the booking. Three denied bookings and you unfortunately we
                      will have to remove you from the site.
                    </li>
                    <li>You must honor all bookings approved.</li>
                  </ol>
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Why I can't log into my account after I sign up on VR Guest? </h4>
                <div className="faqanswer">
                  It may take up to 48 hours for your account to become active to add properties. If you are in a hurry,
                  after all the data has been loaded, contact sales support staff at 727-777-5000 or <a
                  href="https://www.vrguest.com/contact.cfm#ContactForm" target="_blank"><span
                  style={underLineStyles}><strong>Contact Support</strong></span></a> and inform support that your
                  properties are completed and ready to activate and we will get it done while we are on the phone.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Who do I contact if I have problems with signing up on VRguest.com? </h4>
                <div className="faqanswer">
                  Any issues at all in regards to your account, listings, or general questions please contact our sales
                  support staff at 727-777-5000 or <a href="https://www.vrguest.com/contact.cfm#ContactForm"
                                                      rel="noopener noreferrer"
                                                      target="_blank"><span style={underLineStyles}><strong>Contact Support</strong></span></a>.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Why can't find my listings after I completed all the information? </h4>
                <div className="faqanswer">
                  Immediately after you enter all your property information, the listing is not active on VRguest.com yet.
                  It may take up to 48 hours to complete on our end. If you are in a hurry, after all the data has been
                  loaded, contact sales support staff at 727-777-5000 or <a
                  href="https://www.vrguest.com/contact.cfm#ContactForm" rel="noopener noreferrer" target="_blank"><span
                  style={underLineStyles}><strong>Contact Support</strong></span></a> and inform support that your
                  properties are completed and ready to activate and we will get it done while we are on the phone.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Do I have to manually update my calendars? </h4>
                <div className="faqanswer">
                  No. We are able to link your calendars from all of the major listing sites to our via ICal.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What if I don't use any other booking site that uses ICal? </h4>
                <div className="faqanswer">
                  If you don't use any other booking sites that use ICal, you will have to update calendars manually in
                  your owners dashboard under the tab blockings.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">How do I link my calendar? </h4>
                <div className="faqanswer">
                  When you are in your dashboard from the other booking site you advertise on, you have to go into your
                  calendars. Once in the calendar, export the calendar. Once the calendar gets exported, a link will
                  appear that end in .ics. Next you will have to copy the link and paste into an email. Send the email
                  to <a href="https://www.vrguest.com/contact.cfm#ContactForm" rel="noopener noreferrer"
                        target="_blank"><span
                  style={underLineStyles}><strong>Contact Support</strong></span></a> and support will insert the link in
                  to the listing. If there is more than one listing, please put the corresponding property next to the
                  link.
                  I don't have time to manually load all of my properties? VRguest is directly connected to many software
                  systems. This gives you the opportunity to automatically load all information to your properties that
                  includes: pictures, descriptions, calendars, and rates.

                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">How do I get my website link to appear on my subscription listing? </h4>
                <div className="faqanswer">
                  Just add it at signup.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What software is VRguest partnered with? </h4>
                <div className="faqanswer">
                  The best way to find out if VRguest is compatible to your software, contact our sales staff at
                  <a href="https://www.vrguest.com/contact.cfm#ContactForm" rel="noopener noreferrer"
                     target="_blank"><span style={underLineStyles}><strong>Contact Sales</strong></span></a>
                  or 727-777-5000. We are continuously connecting with other software to make listing your properties on
                  VRguest.com easier.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Am I able to brand my company? </h4>
                <div className="faqanswer">
                  Absolutely! We want you to get your brand known and for you to talk to your guests. You will be able to
                  include a logo and phone number to you or company and even a link to your website.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What size picture should I load? </h4>
                <div className="faqanswer">
                  Maximum resolution for a picture 740x555 and size 300kb to 3mb. Square minimum size is
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">How do I get paid for my bookings? </h4>
                <div className="faqanswer">
                  That is up to you. VRguest does not collect any payments. The benefit to partnering with VRguest is that
                  you are able to control your cash flow. It is your responsibility to get in touch with the guest and
                  collect deposits and payments.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Can I speak with my guest directly? </h4>
                <div className="faqanswer">
                  Absolutely! Any inquiry or booking that comes from VRguest will include the contact information of the
                  guest. The guest is your customer. Why would we keep his information from you?
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">What if a guest cancels their booking? </h4>
                <div className="faqanswer">
                  If a guest cancels a reservation, the guest is following your cancellation terms. We do not dictate your
                  terms. If a guest contacts VRguest for cancellation of a reservation, VRguest will notify the manager
                  prior to any cancellations and inform the guest that they have to contact the manager directly.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">How many bookings will I get? </h4>
                <div className="faqanswer">
                  VRguest is new and we are building our customer contacts and base. Our strategy is all about getting
                  people to the website. Our goal is to give you bookings before other sites to save you money. But I mean
                  it's free, right?
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">Does VRguest help with SEO? </h4>
                <div className="faqanswer">
                  Yes. Your listings have a link to your website. Each time a customer clicks on your link, you get credit
                  for the click to your site.
                </div>
              </div>
              <div className="faq">
                <h4 className="faquestion">How do I deactivate a listing? </h4>
                <div className="faqanswer">
                  At any time you need to deactivate a listing, please contact our support staff at 727-777-5000 or at <a
                  href="https://www.vrguest.com/contact.cfm#ContactForm" rel="noopener noreferrer" target="_blank"><span
                  style={underLineStyles}><strong>Contact Support</strong></span></a>.
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
