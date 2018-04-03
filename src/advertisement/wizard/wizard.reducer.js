import {
  SET_WIZARD_UPLOADED_IMAGE,
  SET_STEPS_DATA,
  INITIATE_GET_COUPON_LIST,
  GET_COUPON_LIST_COMPLETED,
  GET_COUPON_LIST_FAILED,
  SET_WIZARD_CURRENT_SETUP,
  INITIATE_VALIDATE_WIZARD_COUPON,
  WIZARD_COUPON_VALIDATED,
  INITIATE_FORM_SUBMISSION,
  FORM_SUBMISSION_COMPLETED,
  FORM_SUBMISSION_FAILED,
} from './wizard.action';

const initialState = {
  uploadedImage: {},
  stepsData: {},
  adCategoryList: {},
  wizardCurrentStep: 0,
  submitting: false,
  fetchingList: false,
  submittingError: {},
  coupon: {
    validated: false,
    validating: false,
  },
};

const adWizard = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_VALIDATE_WIZARD_COUPON:
      return Object.assign({}, state, {
        coupon: {
          validated: action.validated,
          validating: action.validating,
        }
      });

    case WIZARD_COUPON_VALIDATED:
      return Object.assign({}, state, {
        coupon: {
          validated: action.validated,
          validating: action.validating,
        }
      });

    case INITIATE_GET_COUPON_LIST:
      return Object.assign({}, state, {
        fetchingList: action.fetchingList,
      });

    case GET_COUPON_LIST_COMPLETED:
      return Object.assign({}, state, {
        adCategoryList: action.adCategoryList,
        fetchingList: action.fetchingList,
      });

    case GET_COUPON_LIST_FAILED:
      return Object.assign({}, state, {
        fetchingList: action.fetchingList,
      });

    case SET_WIZARD_UPLOADED_IMAGE:
      return Object.assign({}, state, {
        uploadedImage: action.uploadedImage,
      });

    case SET_STEPS_DATA:
      return Object.assign({}, state, {
        stepsData: action.stepsData,
      });

    case SET_WIZARD_CURRENT_SETUP:
      return Object.assign({}, state, {
        wizardCurrentStep: action.wizardCurrentStep,
      });

    case INITIATE_FORM_SUBMISSION:
      return Object.assign({}, state, {
        submitting: action.submitting,
      });

    case FORM_SUBMISSION_COMPLETED:
      return Object.assign({}, state, {
        submitting: action.submitting,
        stepsData: action.stepsData,
      });

    case FORM_SUBMISSION_FAILED:
      return Object.assign({}, state, {
        submitting: action.submitting,
        submittingError: action.submittingError
      });

    default:
      return state;
  }
};

export default adWizard;
