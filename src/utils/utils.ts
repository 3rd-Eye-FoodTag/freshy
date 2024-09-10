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

export const calculateDaysDifference = expirationDate => {
  // Parse the expiration date string into a Date object
  const expDate = new Date(expirationDate);

  // Get the current date without the time part for comparison
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = expDate - currentDate;

  // Convert milliseconds to days
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / millisecondsInADay,
  );

  // Return the days remaining (positive if not expired, negative if expired)
  return differenceInDays;
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
  return date.toLocaleDateString('en-US', options);
};

export const calculateExpirationDate = (
  expirationDays: number,
  // today: Date,
): string => {
  const expiryDate = new Date();

  expiryDate.setDate(Number(expiryDate.getDate()) + Number(expirationDays));

  return expiryDate.toString();
};
