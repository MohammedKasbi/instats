// Param : array of objects containing an array named 'results'
export const calculateDeposits = (accountsList) => {
  // The variable that will contain the sum of benefit of all accounts
  let tempDeposits = 0;

  // Test if the variable exists to prevent possible errors
  if (accountsList) {
    // For each object in 'accountsList'
    accountsList.forEach((el) => {
      // For each element in 'results' array
      el.results.forEach((elem) => {
        // Increment the sum of deposits in 'tempDeposits' variable
        tempDeposits += elem.deposit;
      })
    })
  }
  return tempDeposits;
};
