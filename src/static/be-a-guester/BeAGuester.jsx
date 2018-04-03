import React, {PureComponent} from 'react';
import PageWrapper from '../../common/layout/page-wrapper';
import moment from 'moment';

class BeAGuester extends PureComponent {
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
        <div className="container">
          <div className="be-a-guester static-page">
            <div className="heading">  
              <h1>Traveler</h1>
            </div>
            <div className="static-body">   
              <div className="">
                <h2 className="sub-heading">Information for VRguest Renters</h2>
                <h4>Make Your Vacation Easy</h4>
                <p>Vacation is all about doing the things you love so let Vacation Rental Guest help you find the perfect place while you concentrate on the fun.</p>
                <h4>The Perfect Vacation Rental</h4>
                <p className="clearfix">
                  <img className="pull-right" title="Florida beach vacation" src="/images/guester.jpg" alt="Florida beach vacation" width="154" height="122" />
                  Our website and knowledgeable staff are here to help you find the perfect vacation rental. 
                  To find the right fit for your individual stay, just enter the details of your vacation, 
                  such as where you want to stay, how many in your party, and the type of unit that interests you. 
                  After you enter your preferences, click "Find my PERFECT Vacation Rental."
                </p>
                <p>
                  ONLY available properties will appear with photographs. Properties are displayed in order by price 
                  with our preferred properties listed first.&nbsp; Preferred properties are rentals are handled with 
                  care by Vacation Rental Guest, including quarterly maintenance, starter kits of soap, dish detergent, 
                  bathroom paper, and laundry detergent. Browse through the descriptions and photos to select from the 
                  great vacation locations. Google maps are right there on the page to show you the exact locations
                </p>
                <p>
                  Once you find the perfect rental, you can book immediately online. Each property varies on its 
                  deposits, when payments are due, cancellation policies and check-in procedures.&nbsp; So check 
                  the listing for details.
                </p>
                <p>
                  Watch your email (and check your spam folder) for the first email that acknowledges your booking. 
                  A confirmation email will arrive after the booking has final approval.
                </p>
                <h4>Questions about the Property</h4>
                <p>
                  If you have a question about the property and do not see the information on the listing just email or call the owner/property manager to make sure you have all the details you need.
                </p>
                <h4>Benefits of Renting from VRguest</h4>
                <p>
                  No added fees.&nbsp; We hate fees so VRguest does not charge you any extra fees other than what is 
                  required from the property.&nbsp; Other sites add on fees - some you see and some you do not see.
                </p>
                <h4>Rental Details</h4>
                <p>
                  Rentals are subject to approval by unit owners, but don’t worry, VRguest will help you by gathering 
                  all the necessary information. You will need to provide the number in your party, names and ages of 
                  those who will be visiting, and a credit card number for the deposit. Deposits can be nonrefundable 
                  so be certain of your choice.&nbsp; You will be contacted by the property manager either by email 
                  or phone to complete the reservation.
                </p>
              </div>
            </div>     
          </div>
        </div>
      </PageWrapper>
    );
  }
}

export default BeAGuester;
