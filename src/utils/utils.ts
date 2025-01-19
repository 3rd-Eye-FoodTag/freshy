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
    case 'Meat':
      return foodGroup.filter(item => item.category === 'Meat');
    case 'Veg':
      return foodGroup.filter(item => item.category === 'Veg');
    case 'Beverages':
      return foodGroup.filter(item => item.category === 'Beverages');
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

export const daysCollection = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Format 0 as 12
    times.push(`${formattedHour}:00 ${period}`);
  }
  return times;
};

export const isWithin10Minutes = (
  inputDay: string,
  inputTime: string,
): boolean => {
  const weekdayMap: {[key: string]: number} = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const inputDayIndex = weekdayMap[inputDay];
  if (inputDayIndex === undefined) {
    throw new Error(`Invalid weekday: ${inputDay}`);
  }

  const timeRegex = /(\d+):(\d+)(am|pm)/i;
  const match = inputTime.match(timeRegex);
  if (!match) {
    throw new Error(`Invalid time format: ${inputTime}`);
  }

  let [_, hour, minute, period] = match;
  let hours = parseInt(hour);
  let minutes = parseInt(minute);

  if (period.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (inputDayIndex !== currentDayIndex) {
    return false;
  }

  const inputTimeInMinutes = hours * 60 + minutes;
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  return Math.abs(currentTimeInMinutes - inputTimeInMinutes) < 10;
};

export const scheduleFunction = (
  targetDay: string,
  targetTime: string,
  callback: () => void,
) => {
  const weekdayMap: {[key: string]: number} = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const targetDayIndex = weekdayMap[targetDay];
  if (targetDayIndex === undefined) {
    throw new Error(`Invalid weekday: ${targetDay}`);
  }

  // Parse the target time (e.g., "8:00am")
  const timeRegex = /(\d+):(\d+)\s?(am|pm)/i;
  const match = targetTime.match(timeRegex);
  if (!match) {
    throw new Error(`Invalid time format: ${targetTime}`);
  }

  let [_, hour, minute, period] = match;
  let hours = parseInt(hour);
  let minutes = parseInt(minute);

  // Convert to 24-hour format
  if (period.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();

  // Calculate the delay in milliseconds
  const dayDifference =
    targetDayIndex >= currentDayIndex
      ? targetDayIndex - currentDayIndex
      : 7 - (currentDayIndex - targetDayIndex); // Handle wrapping to the next week

  const currentTimeInMilliseconds =
    currentHour * 60 * 60 * 1000 +
    currentMinute * 60 * 1000 +
    currentSecond * 1000;

  const targetTimeInMilliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

  let delay =
    dayDifference * 24 * 60 * 60 * 1000 +
    (targetTimeInMilliseconds - currentTimeInMilliseconds);

  // If the time for today has passed, move to the next occurrence
  if (
    dayDifference === 0 &&
    targetTimeInMilliseconds <= currentTimeInMilliseconds
  ) {
    delay += 7 * 24 * 60 * 60 * 1000; // Move to the next week
  }
  // Schedule the first call
  setTimeout(() => {
    callback(); // Run the function once

    // Start repeating every week AFTER the first run
    setInterval(callback, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
  }, delay);
};
