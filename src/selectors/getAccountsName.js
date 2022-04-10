// Param : array of objects containing a 'name' property
export const getAccountsName = ( accountsList ) => {
  // The array that will contain the name of each account in the order of the
  // objects in the array received in parameters
  const finalArray = [];

  // Test if the variable exists to prevent possible errors
  if (accountsList) {
    // For each object in 'accountsList'
    accountsList.forEach((element) => {
      // Push into the 'finalArray' the 'name' property of the current object
      finalArray.push(element.name);
    });
  }
  return finalArray;
};
