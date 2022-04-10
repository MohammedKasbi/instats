// Param : array of objects containing an array named 'results'
export const calculateTotalSum = (accountsList) => {
  // The variable that will contain the sum of all accounts
  let sum = 0;

  // Test if the variable exists to prevent possible errors
  if (accountsList) {
    // For each object in 'accountsList'
    accountsList.forEach(element => {
      // For each element in 'results' array
      element.results.forEach(elem => {
        // Increment the sum of daily earnings, deposits, minus withdrawals
        sum += (elem.dayResult + elem.deposit - elem.withdrawal);
      });
    });
  }
  return sum;
};
