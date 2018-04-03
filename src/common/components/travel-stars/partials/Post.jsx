import React from 'react';
import {
  ShareButtons,
  ShareCounts
} from 'react-share';
import { Carousel } from 'react-responsive-carousel';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton
} = ShareButtons;
const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount
} = ShareCounts;

export default class Post extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { post } = this.props;
    return (
      <div className="travel-star">
        <div className="row">
          <div className="col-md-3">
            {(() => {
              if(post.mediaurls.length){
                return (
                  <Carousel
                    showStatus={false}
                    showThumbs={false}
                    dynamicHeight
                    infiniteLoop
                    >
                    {post.mediaurls.map((value, key) => {
                      return (
                        <div key={key}>
                          <img key={key} src={value} />
                        </div>
                      );
                    })}
                  </Carousel>
                );
              }else{
                return(
                  <div className="video">
                    <iframe
                      src={`https://www.youtube.com/embed/${post.videourl}?rel=0&showinfo=0`}
                      frameBorder="0"
                      allow="encrypted-media"
                      gesture="media"
                      allowFullScreen></iframe>
                  </div>
                );
              }
            })()}
          </div>
          <div className="col-md-9">
            <div className="info-container">
              <a className="title" href={post.posturl} target="_blank">
                <h3 dangerouslySetInnerHTML={{__html: post.title}}></h3>
              </a>
              <div className="stats">
                <span><i className="fa-fa-clock-o"></i> {post.postdate}</span>
                <span>Post Views: {post.postviews}</span>
                <span>Impressions: {post.impressions}&nbsp;&nbsp;<i className="fa fa-heart"></i></span>
              </div>
              <div className="description">
                <div dangerouslySetInnerHTML={{__html: post.content}}></div>
                <a href={post.posturl} target="_blank">Read More</a>
              </div>
              {/*<span className="home-list-pop-rat">Rank &nbsp; 4.2</span>*/}
            </div>
            <div className="share-icons">
              <ul>
                <li>
                  <TwitterShareButton url={post.posturl}>
                    <a href="javascript:;" className="twitter">
                      <i className="fa fa-twitter" />
                      {/*<TwitterShareCount url={post.posturl} className="count" />*/}
                    </a>
                  </TwitterShareButton>
                </li>
                <li>
                  <FacebookShareButton url={post.posturl}>
                    <a href="javascript:;" className="facebook">
                      <i className="fa fa-facebook" />
                      <FacebookShareCount url={post.posturl} className="count" />
                    </a>
                  </FacebookShareButton>
                </li>
                <li>
                  <GooglePlusShareButton url={post.posturl}>
                    <a href="javascript:;" className="google">
                      <i className="fa fa-google-plus" />
                      <GooglePlusShareCount url={post.posturl} className="count" />
                    </a>
                  </GooglePlusShareButton>
                </li>
                {(() => {
                  if(post.mediaurls.length){
                    return (
                      <li>
                        <PinterestShareButton url={post.posturl} media={post.mediaurls.pop()} description={post.title}>
                          <a href="javascript:;" className="pinterest">
                            <i className="fa fa-pinterest" />
                            <PinterestShareCount url={post.posturl} className="count" />
                          </a>
                        </PinterestShareButton>
                      </li>
                    );
                  }
                })()}
                <li>
                  <LinkedinShareButton url={post.posturl}>
                    <a href="javascript:;" className="linkedin">
                      <i className="fa fa-linkedin" />
                      <LinkedinShareCount url={post.posturl} className="count" />
                    </a>
                  </LinkedinShareButton>
                </li>
              </ul>
            </div>
            <div className="author">
              <a className="photo" href={post.authorurl} title={post.authorname}>
                <img src={post.avatarurl} alt={post.authorname}/>
              </a>
              <div className="name">
                <a href={post.authorurl} target="_blank">{post.authorname}</a>
              </div>
              <div className="rank">
                Rank: {post.authorrank}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
