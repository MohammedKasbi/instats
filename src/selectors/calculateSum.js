export const calculateSum = (accountsList) => {
  let sum = 0;
  const finalArray = [];

  if (accountsList) {
    accountsList.forEach((element) => {
      element.results.forEach(elem => {
        sum += (elem.dayResult + elem.deposit - elem.withdrawal);
      });
      finalArray.push(sum);
      sum = 0;
    });
  }
  return finalArray;
};
