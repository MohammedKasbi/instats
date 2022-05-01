// Param : array of objects containing an array named 'results'
export const getDatesAccount = (accountData) => {
  // The array that will contain dates
  const tempArray = [];

  // Test if the variable exists to prevent possible errors
  if (accountData) {
    // For each element in 'results' array
    accountData.results.forEach(elem => {
      tempArray.push(elem.transaction_at);
    })
  }
  return tempArray;
};
