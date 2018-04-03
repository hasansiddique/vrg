import React from 'react';
import PropTypes from 'prop-types';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import Button from 'react-validation/build/button';
import Loading from 'common/components/loading';
import ReactSelect, {Async} from 'react-select';
import _, {lowerCase} from 'lodash';
import {Modal} from 'react-bootstrap';
import FontIcon from 'common/components/font-icon';
import {required} from 'common/validator';
import config from '../../../../config';
import { getImageSet } from 'common/utilities';

const {
  Header,
  Body,
  Footer
} = Modal;

export default class EditAd extends React.Component {
  static get propTypes() {
    return {
      getOwnerAdvertisement: PropTypes.func,
      getAdCategoryList: PropTypes.func,
      locationsList: PropTypes.array,
      match: PropTypes.object,
      history: PropTypes.object,
      adCategoryList: PropTypes.object,
      updateAdvertisement: PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      ad: null,
      loading: false,
      updating: false,
      selectedDestination: null,
      photo: null,
      photoDataUrl: null,
      auto_renew: 0,
      ad_category_id: null,
      is_single_unit: 0
    };
    this.getOptions = this.getOptions.bind(this);
    this.cancelChange = this.cancelChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  componentDidMount() {
    let {getAdCategoryList} = this.props;
    if (this.state.loading === false) {
      this.getAd();
    }
    getAdCategoryList();
  }

  componentWillReceiveProps(newProps) {
    if (this.state.ad && !this.state.selectedDestination) {
      this.setSelectedDestination(newProps);
    }
  }

  getOptions(input, callback) {
    let options = "";
    const {locationsList} = this.props;

    if (input.length > 0) {
      let searchString = input.toLowerCase().trim();
      options = locationsList.filter(function (d) {
        let label = lowerCase(d.label);
        return label.match(lowerCase(searchString));
      });
    } else {
      options = "";
    }
    return (
      callback(null, {
        options: options.slice(0, 5)
      })
    );
  }

  getAd() {
    let {getOwnerAdvertisement, match} = this.props;
    let id = match.params.id;
    this.setState({
      loading: true
    });
    getOwnerAdvertisement({adid: id}).then((ad) => {
      this.setState({
        loading: false,
        ad: ad
      }, () => {
        this.setSelectedDestination();
      });
    }).catch(err => {
      this.setState({
        loading: false
      });
    });
  }

  setSelectedDestination(props = null) {
    let locationsList = this.props.locationsList;
    let {ad} = this.state;
    if(ad && ad.length){
      ad = ad[0];
    }
    if (ad) {
      let gid = parseInt(ad.global_destination_id);
      let selectedDestination = _.find(locationsList, (dest) => parseInt(dest.value) == gid);
      if (selectedDestination && !selectedDestination.label) {
        selectedDestination.label = 'Home';
      }
      this.setState({
        selectedDestination: selectedDestination
      });
    }
  }

  cancelChange() {
    let {history} = this.props;
    history.replace('/dashboard/advertisement');
  }

  onSubmit(e) {
    e.preventDefault();
    let {updateAdvertisement} = this.props;
    let {ad, selectedDestination, auto_renew, photo, ad_category_id, is_single_unit} = this.state;
    ad = ad && ad[0];
    ad_category_id = (ad_category_id) ? ad_category_id : ad.ad_category_id;
    auto_renew = (auto_renew) ? auto_renew : ad.auto_renew;
    is_single_unit = (is_single_unit) ? is_single_unit : ad.is_single_unit;
    let values = this.form.getValues();
    let params = Object.assign({}, values, {
      global_destination_id: selectedDestination.value,
      auto_renew: auto_renew || 0,
      adid: ad.id,
      ad_category_id: ad_category_id
    });
    if(ad_category_id == 2){
      params.is_single_unit = is_single_unit || 0;
    }
    if (photo) {
      params.picture = photo;
    }
    if (ad_category_id === 2) {
      delete params.website_url;
      delete params.caption;
    } else {
      delete params.unit_id;
    }
    let formData = new FormData;
    for (let i in params) {
      formData.append(i, params[i]);
    }
    this.setState({
      updating: true
    });
    updateAdvertisement(formData).then((res) => {
      this.setState({
        updating: false
      });
      if (res.status === 'success') {
        this.cancelChange();
      } else {
        alert('Update Failed');
      }
    }).catch((err) => {
      this.setState({
        updating: false
      });
    });
  }

  selectPhoto(e) {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      let files = e.target.files;
      if (files.length) {
        let file = files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            photoDataUrl: e.target.result,
            photo: file
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  render() {
    let {selectedDestination, ad, auto_renew, updating, photoDataUrl, ad_category_id, is_single_unit} = this.state;
    ad = ad && ad[0];
    if (ad) {
      ad_category_id = (ad_category_id) ? ad_category_id : ad.ad_category_id;
      is_single_unit = (is_single_unit) ? is_single_unit : (ad.is_single_unit ? ad.is_single_unit : '0');
      auto_renew = (auto_renew) ? auto_renew : (ad.auto_renew ? ad.auto_renew : '0');
    }
    let {locationsList} = this.props;
    let adCategoryList = this.props.adCategoryList;

    if(!photoDataUrl && ad && ad.imagesrc){
      let basePhotosUrl = config.s3Bucket;
      photoDataUrl = `${basePhotosUrl}advertisement/${ad.imagesrc}`;
      if(ad.ad_category_id == 2){
        photoDataUrl = basePhotosUrl + 'pmlogos/' + ad.imagesrc;                      
        if(ad.issingleunit == 1){
          let set = getImageSet(ad.featuredunit);
          photoDataUrl = `${basePhotosUrl}properties/units/large/${set}/${ad.featuredunit}/${ad.imagesrc}`;
        }
      }
    }
    return (
      <Modal show onHide={this.cancelChange} bsSize="lg">
        <Form ref={(ref) => {
          this.form = ref;
        }} onSubmit={this.onSubmit} className="form-horizontal">
          <Header closeButton>Edit Advertisement</Header>
          <Body>
          {(!ad || !locationsList.length) ?
            <div className="text-center">
              <Loading loading/>
            </div>
            :
            <div className="row">
              <div className="col-sm-9">
                <div className="form-group">
                  <label className="col-sm-4">Place My Ad in This City</label>
                  <div className="col-sm-8">
                    <Async
                      name="unit_name"
                      onChange={(val) => {
                        this.setState({selectedDestination: val});
                      }}
                      loadOptions={this.getOptions}
                      value={selectedDestination}
                      placeholder="Destination Or Listing ID"
                      clearable={false}
                      options={locationsList}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4">Category</label>
                  <div className="col-sm-8">
                    <ReactSelect
                      name="ad_category_id"
                      onChange={(val) => {
                        this.setState({ad_category_id: val.value});
                      }}
                      value={ad_category_id}
                      placeholder="Category"
                      clearable={false}
                      options={Object.keys(adCategoryList).map((key) => {
                        return {
                          value: adCategoryList[key],
                          label: key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                            return str.toUpperCase();
                          })
                        };
                      })}
                    />
                  </div>
                </div>
                {(ad_category_id === 2) ?
                  <div>
                    <div className="form-group">
                      <label className="col-sm-4">Link Page</label>
                      <div className="col-sm-8">
                        <ReactSelect
                          name="is_single_unit"
                          onChange={(val) => this.setState({is_single_unit: val.value})}
                          value={is_single_unit}
                          placeholder="Category"
                          clearable={false}
                          options={[
                            {value: '0', label: 'All Properties'},
                            {value: '1', label: 'Single Unit'}
                          ]}
                        />
                      </div>
                    </div>
                    {(is_single_unit == 1) && (
                      <div className="form-group">
                        <label className="col-sm-4">Enter Unit</label>
                        <div className="col-sm-8">
                          <Input
                            name="unit_id"
                            type="number"
                            className="form-control"
                            value={ad.unit_id}
                            validations={[required]}
                            isUsed
                            isChanged
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  :
                  <div>
                    <div className="form-group">
                      <label className="col-sm-4">Caption for my Ad</label>
                      <div className="col-sm-8">
                        <Input
                          name="caption"
                          type="text"
                          className="form-control"
                          value={ad.caption}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-4">Link</label>
                      <div className="col-sm-8">
                        <Input
                          name="website_url"
                          type="text"
                          className="form-control"
                          value={ad.website_url}
                          validations={[required]}
                          isChanged
                          isUsed
                        />
                      </div>
                    </div>
                  </div>
                }
                <div className="form-group">
                  <label className="col-sm-4">Auto Renew</label>
                  <div className="col-sm-8">
                    <ReactSelect
                      onChange={(val) => {
                        this.setState({auto_renew: val.value});
                      }}
                      value={auto_renew}
                      placeholder="Auto Renew"
                      clearable={false}
                      options={[
                        {value: '0', label: 'No'},
                        {value: '1', label: 'Yes'}
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div>
                  {(() => {
                    if (photoDataUrl) {
                      return (
                        <img className="img-responsive" src={photoDataUrl}/>
                      );
                    }
                  })()}
                </div>
                {(ad_category_id !== 2) && (
                  <a className="btn btn-default btn-sm btn-block" href="javascript:void(0)"
                     onClick={this.selectPhoto}>Upload Image</a>
                )}
              </div>
            </div>
          }
          </Body>
          <Footer>
            <div className="actions">
              <Button className="btn btn-success"><FontIcon name="save"/> {(updating) ? 'Updating...' : 'Update'}
              </Button>
              <a href="javascript:void(0)" className="btn btn-warning" onClick={this.cancelChange}><FontIcon
                name="remove"/> Cancel</a>
            </div>
          </Footer>
        </Form>
      </Modal>
    );
  }
}
