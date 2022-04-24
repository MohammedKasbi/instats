import moment from "moment";
import 'moment/locale/fr';

moment.locale('fr');

export const dateCompare = (dateArray, accountsList) => {
  if (accountsList) {
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

    accountsList.forEach(elem => {
      elem.results.forEach(el => {
        dataArray.push({
          transaction_at: el.transaction_at,
          date: moment(el.transaction_at).format('L'),
          dayTotal: el.dayResult + el.deposit - el.withdrawal,
        });
      })
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

    dateArray.forEach(date => {
      if (dataArray.find(element => element.date === date) !== undefined) {
        const index = dataArray.findIndex(element => element.date === date)
        finalArray.push(dataArray[index].dayTotal)
      } else {
        finalArray.push(0)
      }
    })

    finalArray.reduce((prev, curr,i) =>  finalArray[i] = prev + curr , 0)
    
    return finalArray;
  }
};
