export const getAccountsName = ( accountsList ) => {
  // let current = 0;
  const finalArray = [];

  if (accountsList) {
    accountsList.forEach((element) => {
      finalArray.push(element.name);
    });
    console.log(finalArray);
  }
  return finalArray;
};
