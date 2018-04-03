import React, {PureComponent} from 'react';
import PageWrapper from '../../common/layout/page-wrapper';
import moment from 'moment';
import TestForm from './TestForm.jsx';

class Testimonials extends PureComponent {
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
        <section className="container">
          <div className="static-page">
            <div className="">
              <div className="heading">
                <h1>Customer Testimonials</h1>
              </div>
              <div className="static-body">
                <div className="well alert-info">
                  <h3>Thank you so much</h3>
                  <blockquote>
                  Everyone I spoke to on the phone were amazing! Very wonderful customer service. I checked many places and one of the reasons I chose Florida Beach Rentals was the service I received by phone.<br /><small>Trisha from Sellersburg, IN</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3> Amazing Apartment at Clearwater Beach</h3>
                  <blockquote>
                  We stayed in Harborview Grande 507 in April 2013 and would just like to say that we had such a fantastic time there and it made our stay in Clearwater Beach special. Our party consisted of three adults, two adult children and twins of 9 and the condo accommodated us all perfectly. Lots of space for us to spread out. The facilities at the condo were excellent and the décor was fabulous, really clean and fresh and obviously quality furnishings which were greatly appreciated, we traveled down to Clearwater Beach from a villa in Clermont which was beautiful and the condo was equally so. The balcony was very spacious and we all fitted on there with plenty of room and enjoyed our breakfast looking out at the amazing view, it was so nice. I would just like to say that the staff at Florida Beach Rentals were very friendly and very helpful, us being British we like our cup of tea and when we asked if there was a kettle available staff provided us with a new one straight away which was much appreciated! Also upon our arrival Jan at the office was so helpful and friendly and gave us lots of information about the local area which was a great help and made us feel very welcome. The only thing I would say that on a couple of occasions there was a lot of noise/very loud music coming from Shepards Resort Hotel opposite the condo, you couldn’t hear it inside the condo but on the Sunday 21st April when we arrived there was some sort of event and the music was excessively loud until the early ours of the morning, obviously if this had continued every day then there would have been an issue with it, I would say that it is a shame this resort hotel is actually allowed to host this type of music event in what is mostly a residential area of Clearwater Beach, that said however our vacation was amazing and we would use this condo again as the location is exceptional and the standard very high in all areas. The Allanson family <br /><small>Carole from Little Sutton, GB</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Everything we were looking for, and more.</h3>
                  <blockquote>
                  We have had many vacations with different services from all inclusive to condo rentals, but this one was one of the best! From the first contact with Florida Beach Rentals to check-in and picking up the keys was courteous, simple and quick. The staff we dealt with we're top-notch. Then we saw the actual property and were blown away! It was spacious, contemporary, comfortable and bright. It had all the amenities of home, plus a beautiful view of the beach and Gulf. The wrap around balcony gave interesting perspectives with the beach by day and Gulf Blvd. by night. Lots of local restaurants, shopping and supermarkets within walking distance, as well as John's Pass with all its interesting activities. But with everything available at the condo and condo building, we enjoyed cooking and Bbqing at "home" and eating at our table with our private view! The added feature of included digital cable, free WiFi and free North American long distance was a bonus for us, allowing us to check on family back home in Canada on a regular basis. The condo pool was quite nice - lots of lounge chairs, directly off the beach and included clean bathrooms. Another appreciated amenity was the building and property security. Keys were needed for entry to the building, swimming pool and hot tub. Covered parking for owners/renters and extra parking for guests is also a good feature. We loved it so much, we have already booked this unit for next year!!<br /><small>Bill and Kathy from Newfoundland, Canada</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>We will continue to book with FBR</h3>
                  <blockquote>
                  Beginning with the phone calls to Florida, the kind folks at Florida Beach Rentals were determined to help us find the perfect place for the right price, with a very specific and limited time frame. We stayed in Clearwater Beach, at Bay Harbor #305. The condo had a lot of space and all the amenities of home. As soon as we walked inside, we were taken by the grand view of the sparkling blue bay, right outside our balcony, which continued onto the other side into the master suite. The master suite was lovely and tastefully decorated, with tons of closet space, a jaccuzzi bath and a roomy walk in shower. The living room was warm and very comfortable for working, or just watching a movie with friends. Our stay was perfect and very relaxing in every way. The folks at FBR were speedy to hook up high speed (lightning fast) internet which was greatly needed as this was a working vacation. We made a phone call and it was done the next morning. We will continue to book with FBR and are recommending it to all our friends. Thanks so much for a fantastic stay.<br /><small>Alma from Benicia, California</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>I would definitely rent again through Florida Beach Rentals.</h3>
                  <blockquote>
                  I thought that Janis at Florida Beach Rentals was very professional. When I would call with a question, she took care of it right away. I loved the location of the condo, easy access to so many places whether you walk or drive. We didn't find a restaurant that we didn't like, whether it was just for a quick bite or for a nice dinner.<br /><small>Dawn from Matteson, Illinois</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Understanding and Kindness</h3>
                  <blockquote>
                  I thank you again for your understanding and kindness. You have been wonderful and the owners of 802 are fortunate to have someone like you managing their unit. You are probably quite a blessing to them.
                  <br /><small>Family staying in Harborview Grande 802</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Helpful and Professional</h3>
                  <blockquote>
                  Every person I dealt with at Florida Beach Rentals was helpful and professional. They went out of their way to help us. We are locals and booked with them when our heat went out during a sustained Florida freeze. Our first unit, though beautiful, did not have sufficient heat. They moved us immediately and didn't give us any run-around. I will refer them to anyone who needs to book here! Thank you!!!<br /><small>Marie from Bellaire, Florida</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Very high standard</h3>
                  <blockquote>
                  This was the second time we stayed at 601. We found the staff, condo, and facility to be excellent. We love the area around Clearwater, it makes such a pleasant change from the UK. The staff at Florida Beach Rentals could not do enough to help us during both our stays. The condo is kept to a very high standard, and the residents are all very friendly. I shall not hesitate to use Florida Beach Rentals on our next vacation to Florida.<br /><small>David from Yeovil, Great Britain</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Very nice and helpful!</h3>
                  <blockquote>
                  I am not just saying "Excellent" to move through this quicker. It really was an excellent unit. The views are amazing. You can enjoy the ocean view and amazing sunsets, or the bay. On Saturday, housekeeping stopped by to check on us and to see if we needed anything. They were very nice and helpful! The staff at your agency could not have been nicer. They got back to me immediately and put the key outside since we had a late check in. It could not have been any easier! We will be back again next year, but we will have to stay longer! We enjoyed the unit that much and working with your staff. Thanks again for everything.<br /><small>Gretchen from Phoenixville, Pennsylvania</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Thanks!</h3>
                  <blockquote>
                  We love the Clearwater area, and the service provided by Florida Beach Rentals.   A special thank you for retrieving a necklace left at the condo. We will be back next year.<br /><small>Michael from Indiana</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Personal Assistance</h3>
                  <blockquote>
                  Mitchell was wonderful with his help and personal assistance He had a wonderful quality service attitude. He deserves to be the employee of the month.<br /><small>Gray from LaSalle Canada</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>We know that we will definitely be back again.</h3>
                  <blockquote>
                  Thank you for a very memorable stay. We loved everything about this area.<br /><small>The Dowans from Ontario Canada.</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>AAA</h3>
                  <blockquote>
                  We have rented for the last 4 years. This is the best vacation home we have ever been in.<br /><small>James from Indiana</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>You can't go wrong dealing with this group.</h3>
                  <blockquote>
                  The Florida Beach Rentals crew are an excellent group to handle your rental needs. They are very friendly and willing to make you feel comfortable in your unit.<br /><small>Bob from Michigan</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Service was great!</h3>
                  <blockquote>
                  We had a wonderful stay at Harborview Grande. Beautiful condo with breathtaking views of the water. The furnishings were fabulous. The unit was clean and modern. We would definitely return. The service provided by Florida Beach Rentals was great!<br /><small>Bridget from Vestal, New York</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Wonderful</h3>
                  <blockquote>
                  Everything was wonderful!!!!<br /><small>Jill from Florida</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Excellent</h3>
                  <blockquote>
                  Excellent service from Claudia and Paul.<br /><small>Fred from Ontario, Canada</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Fantastic</h3>
                  <blockquote>
                  Thank you so much, this was the best vacation we ever had. Everything was fantastic, hope we can make it next year.<br /><small>Tom from Massachusetts</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Best Vacation Ever!!!</h3>
                  <blockquote>
                  This was by far the best vacation ever!!! We have been all over and this was the best. I could not believe how clean and beautiful this was. The staff was very helpful and had great ideas for places to visit and restaurants. All in all it was awesome.<br /><small>Melissa from New York</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Great Service</h3>
                  <blockquote>
                  We only had one minor problem, no sheets for inflatable mattress, and this gave us the opportunity to see what great service is provided for guests. They were delivered to our door expediently!  We'd love do business with FBR again!<br /><small>Rudy from Colorado</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Very helpful and friendly</h3>
                  <blockquote>
                  The staff at Florida Beach Rentals was amazing, very helpful and friendly. They helped us rent with only one day advance notice. Everything was wonderful, thanks!! We'll be returning customers.
                  <br /><small>Paula from Missouri</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Very professional</h3>
                  <blockquote>
                  Everyone involved in the rental was very helpful, very professional.<br /><small>Thomas from New Jersey</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Good work!</h3>
                  <blockquote>
                  We appreciate you, Tina and your entire team.<br /><small>Mike Mulder</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Best year ever</h3>
                  <blockquote>
                  I use Florida Beach Rentals. I have been with them for a few years now. Claudia over there is awesome and very professional. I had my best year ever last year. I book a lot with my website and they book more than I do. Lisa is the owner. Her and all of the staff have always been professional and take care of all problems to make the tenants happy. I would really recommend them. I have had other management companies that I had problems with in the past. <br /><small>Robert Kranc</small>
                  </blockquote>
                </div>
                <div className="well alert-info">
                  <h3>Top-notch</h3>
                  <blockquote>
                  Just want to say that Suzanna and I have so much appreciation and respect for you, Paul, John, Claudia and the rest of your staff, that we can't say enough good things about your organization.  You've developed such a wonderful business with a staff of top-notch individuals that we are proud to have you managing our property in CB and have developed a tremendous trust with FBR that can't be matched.<br /><small>John Martin</small>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>    
        </section>
      </PageWrapper>
    );
  }
}

export default Testimonials;
