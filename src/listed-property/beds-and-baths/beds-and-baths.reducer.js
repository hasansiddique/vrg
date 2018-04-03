import {
  UPDATE_UNIT_BEDROOMS_AND_BATHROOMS
} from './beds-and-baths.action';

const initialState = {
  bedrooms: [],
  bathrooms: [],
  isFetchingBedrooms: false,
  isFetchingBathrooms: false,
  error: ''
};

const propertyFeatures = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_UNIT_BEDROOMS_AND_BATHROOMS:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default propertyFeatures;
