import {distance} from 'fastest-levenshtein';
import {FoodDetailsProps} from './interface';

export const formattedDataFromFirebase = data => {
  const list = [];
  for (const key in data) {
    const obj = data[key].data;
    list.push(obj);
  }

  return list;
};

export const guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

export const convertToDays = (value: number, unit: string): number => {
  switch (unit) {
    case 'day':
      return value; // 1 day is 1 day
    case 'week':
      return value * 7; // 1 week is 7 days
    case 'month':
      return value * 30; // Approximating 1 month as 30 days
    default:
      throw new Error('Invalid unit');
  }
};

export const calculateDaysDifference = (
  expirationDate: string,
  createdAt?: string,
): number => {
  const expDate = new Date(expirationDate);
  let createdDate: Date;

  if (createdAt) {
    createdDate = new Date(createdAt);
  } else {
    createdDate = new Date();
  }

  createdDate.setHours(0, 0, 0, 0);

  const differenceInMilliseconds = expDate.getTime() - createdDate.getTime();

  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / millisecondsInADay,
  );

  return differenceInDays > 0 ? differenceInDays : 0;
};

export const convertToMMDDYYYY = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const convertTimeStringToDate = (timeString: string | Date): string => {
  // Create a Date object from the time string
  const date = new Date(timeString);

  // Define options for date formatting
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
    // hour12: true, // Use 12-hour format with AM/PM
  };

  // Format the date using the specified options
  const result = date.toLocaleDateString('en-US', options);

  return result === 'Invalid Date' ? '' : result;
};

export const calculateExpirationDate = (
  expirationDays: number | string,
  createdBy?: any,
): string => {
  // console.log({createdBy});
  let expiryDate = new Date();

  expiryDate.setDate(Number(expiryDate.getDate()) + Number(expirationDays));

  return expiryDate.toString();
};

export const transformDays = (day: number | string): string => {
  const days = Number(day);
  if (days < 0) {
    throw new Error('Number of days cannot be negative.');
  }

  // Constants for conversion
  const daysInAWeek = 7;
  const daysInAMonth = 30; // Approximate, as months have different lengths
  const daysInAYear = 365; // Not accounting for leap years

  const months = Math.floor(days / daysInAMonth);
  const years = Math.floor(days / daysInAYear);
  const mode = days % daysInAWeek;

  if (days < daysInAWeek || (mode !== 0 && days < daysInAMonth)) {
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (days < daysInAMonth) {
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (days < daysInAYear) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
};

export const findSimilarIds = (
  collection: any[],
  targetId: string,
  threshold: number = 3,
) => {
  if (collection.length === 0) {
    return;
  } else {
    return collection?.filter(item => {
      if (item?.foodName) {
        const similarity = distance(item?.foodName || null, targetId);
        return similarity <= threshold;
      } else {
        return false;
      }
    });
  }
};

export const sortFoodStartFromSpoil = ({
  foodGroup = [],
  order = 0, // Default value for order
  sortMethod = 'All', // Default value for sortMethod
  searchFood = '',
}: {
  foodGroup: FoodDetailsProps[];
  order?: number;
  sortMethod?: string;
  searchFood?: string;
}) => {
  if (searchFood) {
    const filtered = foodGroup.filter(item =>
      item.foodName.toLowerCase().includes(searchFood.toLowerCase()),
    );

    filtered.map(item => console.log(item.foodName));

    return filtered;
  }

  if (order < 0) {
    return foodGroup.sort(
      (a: FoodDetailsProps, b: FoodDetailsProps) =>
        calculateDaysDifference(b?.expiryDate) -
        calculateDaysDifference(a?.expiryDate),
    );
  } else if (order > 0) {
    return foodGroup.sort(
      (a: FoodDetailsProps, b: FoodDetailsProps) =>
        calculateDaysDifference(a?.expiryDate) -
        calculateDaysDifference(b?.expiryDate),
    );
  }

  switch (sortMethod) {
    case 'Expired':
      return foodGroup.filter(
        item => calculateDaysDifference(item?.expiryDate) < 1,
      );
    case 'Expiring':
      return foodGroup.filter(
        item =>
          calculateDaysDifference(item?.expiryDate) > 0 &&
          calculateDaysDifference(item?.expiryDate) < 7,
      );
    case 'Fresh':
      return foodGroup.filter(
        item => calculateDaysDifference(item?.expiryDate) >= 7,
      );
    case 'H2L':
      return foodGroup.sort(
        (a: FoodDetailsProps, b: FoodDetailsProps) =>
          calculateDaysDifference(b?.expiryDate) -
          calculateDaysDifference(a?.expiryDate),
      );
    case 'L2H':
      return foodGroup.sort(
        (a: FoodDetailsProps, b: FoodDetailsProps) =>
          calculateDaysDifference(a?.expiryDate) -
          calculateDaysDifference(b?.expiryDate),
      );
    default:
      return foodGroup;
  }
};
