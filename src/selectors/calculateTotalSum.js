export const calculateTotalSum = (accountsList) => {
  let sum = 0;

  if (accountsList) {
    accountsList.forEach(element => {
      element.results.forEach(elem => {
        sum += (elem.dayResult + elem.deposit - elem.withdrawal);
      });
    });
  }
  return sum;
};
