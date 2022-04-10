// Param : array of objects containing an array named 'results'
export const calculateSum = (accountsList) => {
  // The variable that will contain the sum of each account
  let sum = 0;
  // The array that will contain the sums of each account in the order of the
  // objects in the array received in parameters
  const finalArray = [];

  // Test if the variable exists to prevent possible errors
  if (accountsList) {
    // For each object in 'accountsList'
    accountsList.forEach((element) => {
      // For each element in 'results' array
      element.results.forEach(elem => {
        // Increment the sum of daily earnings, deposits, minus withdrawals
        sum += (elem.dayResult + elem.deposit - elem.withdrawal);
      });
      // Then push the sum in the finalArray
      finalArray.push(sum);
      // And reset sum varianble to 0 so that we can push it again in the
      // 'finalArray' with a new value
      sum = 0;
    });
  }
  return finalArray;
};
