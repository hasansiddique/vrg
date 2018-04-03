export function getImageSet(unitId) {
  let setNumber = Math.floor(unitId / 5000);
  return `set${setNumber + 1}`;
}

export function flattenObject(ob) {
  let toReturn = {};
  
  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if(ob[i] === 0) continue;
    
    if ((typeof ob[i]) == 'object') {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[x] = (flatObject[x] === true) ? 1 : flatObject[x];
      }
    } else {
      toReturn[i] = (ob[i] === true) ? 1 : ob[i];
    }
  }
  return toReturn;
}

/* eslint-disable react/no-multi-comp */

export const continents = [
  {value:'Africa', label: 'Africa'},
  {value:'Asia', label: 'Asia'},
  {value:'Australia', label: 'Australia'},
  {value:'Caribbean', label: 'Caribbean'},
  {value:'Central America', label: 'Central America'},
  {value:'Europe', label: 'Europe'},
  {value:'North America', label: 'North America'},
  {value:'South America', label: 'South America'},
  {value:'South Pacific', label: 'South Pacific'},
];

export const rooms = [
  {value: 0, label: 'Studio'},
  {value: 1, label: '1 Bedroom'},
  {value: 2, label: '2 Bedroom'},
  {value: 3, label: '3 Bedroom'},
  {value: 4, label: '4 Bedroom'},
  {value: 5, label: '5 Bedroom'},
  {value: 6, label: '6 Bedroom'},
  {value: 7, label: '7 Bedroom'},
  {value: 8, label: '8 Bedroom'},
  {value: 9, label: '9 Bedroom'},
  {value: 10, label: '10 Bedroom'},
  {value: 11, label: '11 Bedroom'},
  {value: 12, label: '12 Bedroom'},
];

export const baths = [
  {value: 1, label: '1'},
  {value: 1.5, label: '1.5'},
  {value: 2, label: '2'},
  {value: 2.5, label: '2.5'},
  {value: 3, label: '3'},
  {value: 3.5, label: '3.5'},
  {value: 4, label: '4'},
  {value: 4.5, label: '4.5'},
  {value: 5, label: '5'},
  {value: 5.5, label: '5.5'},
  {value: 6, label: '6'},
  {value: 6.5, label: '6.5'},
  {value: 7, label: '7'},
  {value: 7.5, label: '7.5'},
  {value: 8, label: '8'},
  {value: 8.5, label: '8.5'},
  {value: 9, label: '9'},
  {value: 9.5, label: '9.5'},
  {value: 10, label: '10'},
  {value: 10.5, label: '10.5'},
  {value: 11, label: '11'},
  {value: 11.5, label: '11.5'},
  {value: 12, label: '12'},
  {value: 12.5, label: '12.5'},
];

export const rentalTypes = [
  {value: 'S', label: 'Season Rental'},
  {value: 'L', label: 'Monthly Rental'},
];

export const mainFeaturesCheckboxes = [
  {
    label: 'Pets',
    name: 'pets'
  },
  {
    label: 'VCR',
    name: 'vcr'
  },
  {
    label: 'DVD',
    name: 'dvd'
  },
  {
    label: 'CD Player',
    name: 'cdplayer'
  },
  {
    label: 'Balcony',
    name: 'balcony'
  },
  {
    label: 'BBQ',
    name: 'bbq'
  },
  {
    label: 'Elevator',
    name: 'elevator'
  },
  {
    label: 'Gated Community',
    name: 'gated_community'
  },
  {
    label: 'Dock/Boat Slip',
    name: 'dock_boat_slip'
  },
  {
    label: 'Security',
    name: 'security'
  },
  {
    label: 'Beachfront',
    name: 'beachfront'
  },
  {
    label: 'Beach View',
    name: 'beachview'
  },
  {
    label: 'Waterfront',
    name: 'waterfront'
  },
  {
    label: 'Water View',
    name: 'waterview'
  },
  {
    label: 'Tennis',
    name: 'tennis'
  },
  {
    label: 'High Speed Internet',
    name: 'high_speed_internet'
  },
  {
    label: 'Stove',
    name: 'stove'
  },
  {
    label: 'Toaster',
    name: 'toaster'
  },
  {
    label: 'Kettle',
    name: 'kettle'
  },
  {
    label: 'High Chair',
    name: 'highchair'
  },
  {
    label: 'Iron',
    name: 'iron'
  },
  {
    label: 'Hair Dryer',
    name: 'hairdryer'
  },
  {
    label: 'Central Heating/AC',
    name: 'central_heating_ac'
  },
  {
    label: 'Cable TV',
    name: 'cable_tv'
  },
  {
    label: 'Premium TV Channels',
    name: 'premium_tv_channels'
  },
  {
    label: 'Fitness Center',
    name: 'fitness_center'
  },
  {
    label: 'TV in Bedroom',
    name: 'tv_in_bedroom'
  },
  {
    label: 'Internet Access',
    name: 'internet_access'
  },
  {
    label: 'Wi-Fi',
    name: 'wifi'
  },
  {
    label: 'Telephone',
    name: 'telephone'
  },
  {
    label: 'Fax',
    name: 'fax'
  },
  {
    label: 'Swimming Pool',
    name: 'swimming_pool'
  },
  {
    label: 'Hot Tub',
    name: 'hot_tub'
  },
  {
    label: 'Sauna',
    name: 'sauna'
  },
  {
    label: 'Gym',
    name: 'gym'
  },
  {
    label: 'Games Room',
    name: 'games_room'
  },
  {
    label: 'Pool Table',
    name: 'pool_table'
  },
  {
    label: 'Golf',
    name: 'golf'
  },
  {
    label: 'Compactor',
    name: 'compactor'
  },
  {
    label: 'Staffed Property',
    name: 'staffed_property'
  },
  {
    label: 'Washer',
    name: 'washer'
  },
  {
    label: 'Dryer',
    name: 'dryer'
  },
  {
    label: 'Icemaker',
    name: 'icemaker'
  },
  {
    label: 'Dishwasher',
    name: 'dishwasher'
  },
  {
    label: 'Blender',
    name: 'blander'
  },
  {
    label: 'Disposal',
    name: 'disposal'
  },
  {
    label: 'Coffee Pot',
    name: 'coffeepot'
  },
  {
    label: 'Microwave',
    name: 'microwave'
  },
  {
    label: 'Water Softener',
    name: 'watersoftner'
  },
  {
    label: 'Refrigerator',
    name: 'refridgerater'
  }
];