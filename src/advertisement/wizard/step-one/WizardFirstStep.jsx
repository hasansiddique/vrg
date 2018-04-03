import {isEmpty, map, startCase, merge, get, zipObject, omit} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {BeatLoader} from 'react-spinners';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import storage from 'common/storage';
import {required, checkFormErrors} from "../../../common/validator";

class WizardFirstStep extends Component {
  constructor() {
    super();
    this.state = {
      selectedBusinessType: '',
      adImagePath: '',
      adImageError: false,
      adTypeError: false,
    };

    this.isValidated = this.isValidated.bind(this);
    this.imageUploaded = this.imageUploaded.bind(this);
    this.moveToPreviousStep = this.moveToPreviousStep.bind(this);
    this.getAdTypeData = this.getAdTypeData.bind(this);
    this.getStepsData = this.getStepsData.bind(this);
    this.toggleSelectedBusinessType = this.toggleSelectedBusinessType.bind(this);
  }

  componentWillMount() {
    const {adCategoryList, stepsData} = this.props;

    this.props.setWizardCurrentStep(0);
    isEmpty(adCategoryList) && this.props.getAdCategoryList();
    !isEmpty(get(stepsData, 'picture')) && this.setState({adImagePath: get(stepsData, 'picture')});
    !isEmpty(get(stepsData, 'ad_category_id')) && this.setState({selectedBusinessType: get(stepsData, 'ad_category_id')});
  }

  isValidated() {
    const {stepsData} = this.props;
    const {selectedBusinessType, adImagePath} = this.state;
    let form = this.form;
    form.validateAll();
    const formItems = form.state.byId;

    isEmpty(adImagePath) && this.setState({adImageError: true});
    isEmpty(selectedBusinessType) && this.setState({adTypeError: true});
    if (checkFormErrors(formItems) && !isEmpty(adImagePath) && !isEmpty(selectedBusinessType)) {
      let stepData = merge({
        ad_category_id: selectedBusinessType,
        picture: adImagePath
      }, this.getStepsData(form.getValues()));
      this.props.setWizardStepsData(merge(stepsData, stepData));
      this.props.jumpToStep(1);
    }
  }

  getStepsData(formValues) {
    let keys = ["caption", "website_url", "picture"];
    return zipObject(keys, formValues.undefined);
  }

  toggleSelectedBusinessType(value) {
    value && this.setState({selectedBusinessType: value, adTypeError: false});
  }

  moveToPreviousStep() {
    this.props.jumpToStep(0);
  }

  imageUploaded(event) {
    event.preventDefault();
    let data = {};
    let reader = new FileReader();
    let image = event.target.files[0];
    reader.onload = (upload) => {
      data = {
        dataUrl: upload.target.result,
        fileName: image.name,
        fileType: image.type,
        raw: image,
      };
      this.props.setWizardUploadedImage(data);
    };

    reader.readAsDataURL(image);
    this.setState({adImagePath: image.name, adImageError: false});
  }

  getAdTypeData(list) {
    return map(list, (value, key) => {
      return ({value: value, label: startCase(key)});
    });
  }

  render() {
    let user = storage.get('user');
    const {selectedBusinessType, adImagePath, adImageError, adTypeError} = this.state;
    const {adCategoryList, stepsData, uploadedImage, fetchingList} = this.props;
    const adCategoryL = isEmpty(user) ? omit(adCategoryList, 'featuresProperty') : adCategoryList;
    let adTypeList = !isEmpty(adCategoryL) ? this.getAdTypeData(adCategoryL) : [];

    return (
      <div id="step-one" className="step">
        <h3>
          A new way to introduce the vacationer to your restaurant,
          <br/>
          store, activity or transportation BEFORE they start their vacation!
          <br/>
          <div className="sub-text"><span>10 minutes to sign-up</span></div>
        </h3>
        <h2><span>Create my Ad!</span></h2>

        <div className="hom-cre-acc-left hom-cre-acc-right">
          <div className="">
            <Form ref={c => this.form = c} onSubmit={this.isValidated}>
              <div className="row">
                <div className="input-field col s12">
                  <Select
                    name="card-exp-year"
                    clearable={false}
                    multi={false}
                    onChange={this.toggleSelectedBusinessType}
                    options={adTypeList}
                    placeholder={'Select your business type'}
                    value={get(stepsData, 'ad_category_id') || selectedBusinessType}
                  />
                  {fetchingList ?
                    <div className="calculation-spinner">
                      <BeatLoader
                        size={5}
                        color={'#0074E1'}
                        loading={fetchingList}
                      />
                    </div>
                    :
                    adTypeError ?
                      <div className="error">* Ad Type is required</div>
                      : ''
                  }
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <Input
                    value={get(stepsData, 'caption')}
                    id="adCoupon"
                    type="text"
                    validations={[required]}
                    className="validate"
                    placeholder="Coupon for your Ad"/>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <Input
                    value={get(stepsData, 'website_url')}
                    id="adWebsite"
                    type="text"
                    validations={[required]}
                    className="validate"
                    placeholder="http://www.mysite.com"/>
                </div>
              </div>

              <div className="row tz-file-upload">
                <div className="file-field input-field">
                  <div className="tz-up-btn">
                    <span>File</span>
                    <input
                      defaultValue={get(uploadedImage, 'raw')}
                      type="file"
                      ref="adImage"
                      onChange={this.imageUploaded}/>
                  </div>
                  <div className="file-path-wrapper db-v2-pg-inp">
                    <Input
                      value={adImagePath || get(stepsData, 'picture')}
                      id="adImagePath"
                      type="text"
                      className="validate"
                      placeholder="elect image for ad"/>
                    {adImageError && <div className="error">* Select a valid image</div>}
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>

        <div className="footer-buttons">
          <button
            className="btn btn-next btn-primary btn-lg btn-previous"
            style={{display: `none`}}
            onClick={this.moveToPreviousStep}>
            Previous
          </button>

          <button
            disabled={fetchingList}
            className="btn btn-next btn-success btn-lg"
            onClick={this.isValidated}>
            Preview how good it looks
          </button>
        </div>

      </div>
    );
  }
}

WizardFirstStep.propTypes = {
  jumpToStep: PropTypes.func,
  setWizardUploadedImage: PropTypes.func.isRequired,
  setWizardStepsData: PropTypes.func.isRequired,
  getAdCategoryList: PropTypes.func.isRequired,
  setWizardCurrentStep: PropTypes.func.isRequired,
  adCategoryList: PropTypes.object.isRequired,
  fetchingList: PropTypes.bool.isRequired,
  stepsData: PropTypes.object,
  uploadedImage: PropTypes.object,
  currentUser: PropTypes.object,
};

export default WizardFirstStep;
