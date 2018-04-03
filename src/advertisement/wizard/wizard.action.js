export const INITIATE_GET_COUPON_LIST = 'INITIATE_GET_COUPON_LIST';
export const GET_COUPON_LIST_COMPLETED = 'GET_COUPON_LIST_COMPLETED';
export const GET_COUPON_LIST_FAILED = 'GET_COUPON_LIST_FAILED';
export const INITIATE_VALIDATE_WIZARD_COUPON = 'INITIATE_VALIDATE_WIZARD_COUPON';
export const WIZARD_COUPON_VALIDATED = 'WIZARD_COUPON_VALIDATED';
export const SET_STEPS_DATA = 'SET_STEPS_DATA';
export const SET_WIZARD_UPLOADED_IMAGE = 'SET_WIZARD_UPLOADED_IMAGE';
export const SET_WIZARD_CURRENT_SETUP = 'SET_WIZARD_CURRENT_SETUP';
export const INITIATE_FORM_SUBMISSION = 'INITIATE_FORM_SUBMISSION';
export const FORM_SUBMISSION_COMPLETED = 'FORM_SUBMISSION_COMPLETED';
export const FORM_SUBMISSION_FAILED = 'FORM_SUBMISSION_FAILED';

export const initiateValidateWizardCoupon = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_VALIDATE_WIZARD_COUPON,
      validating: true,
      validated: false,
      payload: payload,
    });
  };
};

export const wizardCouponValidated = (status) => {
  return dispatch => {
    dispatch({
      type: WIZARD_COUPON_VALIDATED,
      validated: status,
      validating: false,
    });
  };
};

export const getAdCategoryList = () => {
  return dispatch => {
    dispatch({
      type: INITIATE_GET_COUPON_LIST,
      fetchingList: true
    });
  };
};

export const getAdCategoryListCompleted = (list) => {
  return dispatch => {
    dispatch({
      type: GET_COUPON_LIST_COMPLETED,
      adCategoryList: list,
      fetchingList: false,
    });
  };
};

export const getAdCategoryListFailed = () => {
  return dispatch => {
    dispatch({
      type: GET_COUPON_LIST_FAILED,
      fetchingList: false,
    });
  };
};

export const setWizardUploadedImage = (uploadedImage) => {
  return dispatch => {
    dispatch({
      type: SET_WIZARD_UPLOADED_IMAGE,
      uploadedImage: uploadedImage
    });
  };
};

export const setWizardStepsData = (stepsData) => {
  return dispatch => {
    dispatch({
      type: SET_STEPS_DATA,
      stepsData: stepsData
    });
  };
};

export const setWizardCurrentStep = (step) => {
  return dispatch => {
    dispatch({
      type: SET_WIZARD_CURRENT_SETUP,
      wizardCurrentStep: step
    });
  };
};

export const initiateFormSubmission = (payload) => {
  return dispatch => {
    dispatch({
      type: INITIATE_FORM_SUBMISSION,
      submitting: true,
      payload: payload
    });
  };
};


export const formSubmissionCompleted = (status) => {
  return dispatch => {
    dispatch({
      type: FORM_SUBMISSION_COMPLETED,
      stepsData: {},
      submitting: status
    });
  };
};


export const formSubmissionFailed = (error) => {
  return dispatch => {
    dispatch({
      type: FORM_SUBMISSION_FAILED,
      submitting: false,
      submittingError: error,
    });
  };
};
