export const getAccountsName = ( accountsList ) => {
  const finalArray = [];

  if (accountsList) {
    accountsList.forEach((element) => {
      finalArray.push(element.name);
    });
  }
  return finalArray;
};
