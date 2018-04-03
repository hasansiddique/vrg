import React, {PureComponent} from 'react';
import PageWrapper from '../../common/layout/page-wrapper';
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
            <h1 style={{ marginTop: '60px', marginBottom: '30px' }} className="about-us text-center">About Us (It's really more about you)</h1>

            <div className="about-content well">
              We have a BIG  GOAL to change the status quo in the vacation rental industry.We have found a way to give both the property owner/manager and the traveler a no-cost alternative to AirBnb and Homeaway. 
              
              <div align="right" className="about-us-signature">
                    - Lisa Bettner, CEO VR Guest LLC.  
              </div>
            </div>

            <div align="center">
              <br />
              <br />
              <img src="http://s3.amazonaws.com/vrguest-assets/assets/Group pic Holloween.jpg" className="img-responsive" />
            </div>

            <div className="text-center">
              <h1 style={{ marginTop: '60px', marginBottom: '30px' }} className="about-us">Our Story</h1>
              <p className="our-story-text">The seeds for VR Guest were planted in 2002, when we left the corporate world 
              to become entrepreneurs.  After a successful decade plus as vacation rental managers, we saw 
              the market undergo fast changes that mainly benefited the big companies driving the new business models.  
              Understanding first hand that the Industry was quickly going out of control with skyrocketing fees 
              and reduced customers and bookings they decided to <span className="textblue"> create a better solution</span>. 
              Property owners loved the business model and within 12 months the VR Guest team had acquired 
              over 1,000,000 vacation properties worldwide. Not satisfied, we continued to improve our offering.  
              We are creating a Destination Marketplace and today we offer free listings – no commission, no subscription, 
              no credit card.  And we make all bookings free too. We have a passionate team that cares about making a 
              difference.</p>
            </div>
            <div className="text-center">
              <h1 style={{ marginTop: '60px', marginBottom: '30px' }} className="about-us our-mission-heading">Our Mission</h1>
              <p className="text-warning">To help everyone in the Vacation Rental Market be successful.</p>
            </div>
            <div className="text-center">
              <p> <strong> Our objective is HUGE.</strong></p>
              <p className="our-mission-text">
                To change the Vacation Rental industry and create a Destination Marketplace by setting the standard in 
                the industry with industry defining ideas, utilizing cutting edge technology resulting in greater 
                communication and increased travel at a lower cost. 
              </p>
            </div>
            <div className="text-center">
              <h1 style={{ marginTop: '60px', marginBottom: '30px' }} className="about-us">Our DNA</h1>
              <p>
                We work in the best interest of our guests, owners, property managers, staff and community.  
                We have the purpose of improving the lives we touch and the world we live in. 
                We want to leave this world better than when we got here.  We donate 10% of our 
                earnings to charity.  What a better way to help the world then go on vacation! We 
                are “Better Together.”
              </p>
            </div>
            <h1 style={{ marginTop: '60px', marginBottom: '30px' }} className="about-us text-center">Executive Team</h1>
            <div className="team-member well well-sm" style={{ marginBottom: '100px' }}>
              <div className="teamimg text-center">
                <img src="http://s3.amazonaws.com/vrguest-assets/assets/team/Lisa_new.png" />
                <div className="person-name text-left">Lisa Bettner</div>
              </div>
              
              <div className="team-contents" style={{ position: 'relative', 'zIndex': 100 }}>
                <h5>CEO</h5>
                <p>Lisa oversees the strategic direction and management of VR Guest. She is dedicated to creating a smooth business experience for clients.  Lisa’s goal is to make each vacation and each vacation rental property a success story. VR Guest is the positioned to revolutionize Vacation Rental industry as the next disruptor! </p>
                <p>Her passion is creating businesses and helping people.  After getting her MBA, she went to work for an $8 Billion dollar hi-tech company.  She left the Fortune 500 to be Co-Founder of a hi-tech start-up with $60 million in funding.  There she ran Sales and Marketing, IT and Operations. In 2003, she turned her attention to the evolving Vacation Rental Industry creating a successful VRM Florida Beach Rentals who now employees over 21 full-time staff and 20 contractors. Lisa enjoys expanding her horizons and has been all over the US, Canada, Mexico, Europe and China.  </p>
              </div>
                <div className="signature text-right" style={{ position: 'relative' }}><img src="http://s3.amazonaws.com/vrguest-assets/assets/team/lisa_signature.png" style={{ position: 'absolute', 'bottom': '-100px', right: '10px' }} /></div>  
            </div>
            <div className="team-member well well-sm" style={{ marginBottom: '100px' }}>
              <div className="teamimg text-center"><img src="http://s3.amazonaws.com/vrguest-assets/assets/team/Paul_new.png" />
                <div className="person-name text-left">Paul VonFeldt</div>
              </div>
              <div className="team-contents" style={{ position: 'relative', 'zIndex': 100 }}>
                <h5>COO</h5>
                <p>He has been instrumental in the growth of Florida Beach Rentals and leverage those skills into growing VR Guest. Always an entrepreneur, he started his first business at the age of 17 hiring away a 40-year old salesperson from his competition and closing multiple contracts.   </p>
                <p>He enjoys a challenge and has been creating businesses his entire life. Paul moved to Clearwater Beach, FL, became a Real Estate Broker and found himself renting out vacation homes. He immediately adopted the internet and created a website and back-end software for a better way of renting and managing properties. Paul loves to travel and lives for trying new foods and adventures wherever he goes. </p>
              </div>
              <div className="signature text-right" style={{ position: 'relative' }}><img src="http://s3.amazonaws.com/vrguest-assets/assets/team/paul_signature.png" style={{ position: 'absolute', 'bottom': '-100px', right: '10px' }} /></div>
            </div>

            <div className="team-member well well-sm" style={{ marginBottom: '100px' }}>   
              <div className="teamimg text-center"><img src="http://s3.amazonaws.com/vrguest-assets/assets/team/Tom_new.png" />
                <div className="person-name text-left">Tom Holevas</div>
              </div>
              <div className="team-contents" style={{ position: 'relative', 'zIndex': 100 }}>
                <h5>Vice President of Product Development</h5>
                <p>Tom is responsible for directing, training, and motivating the sales team that attained 1,000,000 vacation rental properties in 68 countries in just over a year’s time for VR Guest. Tom is a doer.  </p>
                <p>At VR Guest his achievements are quickly growing. He is well-known in the vacation rental industry among many of its opinion leaders and top companies. He is a member of the Onsite Property Management Association, a Board Member and Co-Chairman of the Tampa Chapter of the Florida Vacation Rental Managers Association, a board member of the Vacation Rental Alliance of Tampa Bay, and a member of SKAL, a global travel industry networking association. He is a board member of the Florida Vacation Rental Managers Association (VRMA) as well as a membership committee head and Chairman of the Tampa Bay Chapter. He is on the governmental affairs committee of the National VRMA of which he is currently also a member.  </p>
                <p>He currently resides in Clearwater, Florida with his wife and four children. His goal is to make VR Guest the largest vacation rental booking site on the planet while helping those at all levels of the industry to succeed.</p>
              </div>
              <div className="signature text-right" style={{ position: 'relative' }}><img src="http://s3.amazonaws.com/vrguest-assets/assets/team/Tom_signature.png" style={{ position: 'absolute', 'bottom': '-100px', right: '10px' }} /></div> 
            </div>
            <div className="team-member well well-sm" style={{ marginBottom: '100px' }}>   
              <div className="teamimg text-center"><img src="http://s3.amazonaws.com/vrguest-assets/assets/team/Imran_new.png" />
                <div className="person-name text-left">Imran Khan</div>
              </div>
              <div className="team-contents" style={{ position: 'relative', 'zIndex': 100 }}>
              <h5>Vice President of Web Development</h5>
                <p>
                  He has done his MS Computer Science in 1999 from Preston University Islamabad, Pakistan and started to work 
                  for a local software company where he built desktop applications for departments, universities, and colleges 
                  for their automated systems. 
                  In 2000 he started his own Software House and jumped into internet development and built Web Applications until 2015 for clients 
                  across Pakistan, USA, UK, Canada, Australia, and Germany. He has enjoyed a good reputation as Software Engineer.
                </p>
                <p>
                  In 2003 He has built a web application for Florida Beach Rentals for their Web Adverting and Property Management 
                  and maintained for many years before jumping into the global portal with the same team. He is currently managing 
                  a team of Web Application Developers for VRguest and Florida Beach Rentals in company’s back office IT in Pakistan.
                </p>
              </div>
              <div className="signature text-right" style={{ position: 'relative' }}><img src="http://s3.amazonaws.com/vrguest-assets/assets/team/Imran_signature.png" style={{ position: 'absolute', 'bottom': '-100px', right: '10px' }} /></div> 
            </div>  
          </div>    
        </section>
      </PageWrapper>
    );
  }
}

export default AboutPage;
