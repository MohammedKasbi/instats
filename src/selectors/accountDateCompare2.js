import moment from "moment";
import 'moment/locale/fr';

moment.locale('fr');

export const accountDateCompare2 = (dateArray, accountData) => {
  const dataArray = [];
  const finalArray = [];

  function compare( a, b ) {
    if ( a.transaction_at < b.transaction_at ){
      return -1;
    }
    if ( a.transaction_at > b.transaction_at ){
      return 1;
    }
    return 0;
  }

  accountData.results.forEach(el => {
    dataArray.push({
      idBdd : el.id,
      transaction_at: el.transaction_at,
      date: moment(el.transaction_at).format('L'),
      dayResult: el.dayResult,
      deposit: el.deposit,
      withdrawal: el.withdrawal
    });
  })

  const arrayUnique = (array) => {
    for(let i = 0; i < array.length; ++i) {
      for(let j = i + 1; j < array.length; ++j) {
        if(array[i].date === array[j].date) {
          array[i].dayResult += array[j].dayResult;
          array[i].deposit += array[j].deposit;
          array[i].withdrawal += array[j].withdrawal;
          array.splice(j--, 1)
        }
      }
    }
    return array;
  }

  arrayUnique(dataArray);
  dataArray.sort(compare);

  let valueCumulative = 0;
  dateArray.forEach((newDate) => {
    if (dataArray.find(element => element.date === moment(newDate).format('L'))) {
      const index = dataArray.findIndex(element => element.date === moment(newDate).format('L'));
      valueCumulative += dataArray[index].dayResult + dataArray[index].deposit - dataArray[index].withdrawal;
      finalArray.push({
        idBdd: dataArray[index].idBdd,
        date: newDate,
        dayResult: dataArray[index].dayResult,
        deposit: dataArray[index].deposit,
        withdrawal: dataArray[index].withdrawal,
        dayTotal: (dataArray[index].dayResult + dataArray[index].deposit - dataArray[index].withdrawal),
        capital: valueCumulative
      });
    } else {
      finalArray.push({
        date: newDate,
        dayResult: 0,
        deposit: 0,
        withdrawal: 0,
        dayTotal: 0,
        capital: valueCumulative
      })
    }
  })
  
  return finalArray;
};
