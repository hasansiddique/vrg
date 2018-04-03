import {set} from 'lodash/set';

export const transformLocations = (locations) => {

  let transformedLocations = [];

  locations.forEach((location) => {
    let loc = {
      value: location.id,
      label: location.v
    };
    transformedLocations.push(loc);
  });

  return transformedLocations;
};
