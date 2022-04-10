// Param : array of objects containing an array named 'results'
export const getDates = (accountsList) => {
  // The array that will contain dates
  const tempArray = [];

  // Test if the variable exists to prevent possible errors
  if (accountsList) {
    // For each object in 'accountsList'
    accountsList.forEach(el => {
      // For each element in 'results' array
      el.results.forEach(elem => {
        tempArray.push(elem.transaction_at);
      })
    })
  }
  return tempArray;
};
