export const calculateTotalSum = (accountsList) => {
  let sum = 0;

  if (accountsList) {
    accountsList.forEach(element => {
      element.results.forEach(elem => {
        sum += elem.dayTotal;
      });
    });
  }
  return sum;
};
