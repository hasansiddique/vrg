import {uniq, find, filter} from 'lodash';
import moment from 'moment';

export function getDates(startDate, stopDate) {
  let dateArray = [];
  let currentDate = moment(startDate);
  stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format('MM-DD-YYYY'));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}

export function checkIfBlockedDayExist(startDate, endDate, listingInfo) {
  let selectedDates = getDates(startDate, endDate);
  let blockedDates = filter(listingInfo.rates, (b_d) => {
    return (b_d.isBlock >= 1);
  });
  if (startDate && endDate) {
    return find(selectedDates, (s_d) => {
      return find(blockedDates, (b_d) => {
        return (s_d === b_d.calDate);
      });
    });
  }
}

export function checkIfBookedDayExist(startDate, endDate, listingInfo) {
  let selectedDates = getDates(startDate, endDate);
  let bookedDates = listingInfo.rates.filter((b_d) => {
    return (b_d.isBlock > 1);
  });

  if (startDate && endDate) {
    return selectedDates.find(s_d => {
      return bookedDates.find(b_d => {
        return (s_d === b_d.calDate);
      });
    });
  }
}

export function checkIfNoDayRateExist(startDate, endDate, listingInfo) {
  let dates = [];
  let selectedDates = getDates(startDate, endDate);
  let rateDates = listingInfo.rates.filter((r_d) => {
    return (r_d.rate && r_d.rate > 0);
  });

  if (startDate && endDate) {
    selectedDates.find(s_d => {
      rateDates.find(r_d => {
        if ((s_d === r_d.calDate) && (r_d.rate && r_d.rate > 0)) {
          dates.push(r_d.calDate);
        }
      });
    });
    return selectedDates.filter(s_d => !dates.includes(s_d));
  }
}

export function checkIfRateIsSame(startDate, endDate, listingInfo) {
  let dates = [];
  let selectedDates = getDates(startDate, endDate);

  if (startDate && endDate) {
    selectedDates.find(s_d => {
      listingInfo.rates.find(r_d => {
        if ((s_d === r_d.calDate) && (r_d.rate && r_d.rate > 0)) {
          dates.push(r_d.rate);
        }
      });
    });
    return uniq(dates);
  }
}

export function findDateDetails(currentDate, listingInfo) {
  return find(listingInfo.rates, (date) => {
    return (date.calDate === currentDate);
  });
}
