import moment from "moment";
import 'moment/locale/fr';

moment.locale('fr');

export const accountDateCompare = (dateArray, accountData) => {
  if (accountData) {
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
        transaction_at: el.transaction_at,
        date: moment(el.transaction_at).format('L'),
        dayTotal: el.dayResult + el.deposit - el.withdrawal,
      });
    });
    
    const arrayUnique = (array) => {
      for(let i = 0; i < array.length; ++i) {
        for(let j = i + 1; j < array.length; ++j) {
          if(array[i].date === array[j].date) {
            array[i].dayTotal += array[j].dayTotal;
            array.splice(j--, 1)
          }
        }
      }
      return array;
    }

    arrayUnique(dataArray);
    dataArray.sort(compare);
    
    dateArray.forEach(newDate => {
      if (dataArray.find(element => element.date === moment(newDate).format('L'))) {
        const index = dataArray.findIndex(element => element.date === moment(newDate).format('L'))
        finalArray.push(dataArray[index].dayTotal)
      } else {
        finalArray.push(0)
      }
    })

    finalArray.reduce((prev, curr,i) =>  finalArray[i] = prev + curr , 0)
    
    return finalArray;
  }
};