import moment from "moment";
import 'moment/locale/fr';

moment.locale('fr');

export const dateCompare = (dateArray, accountsList) => {
  let tempValue = 0;
  const dataArray = [];
  const finalArray = [];

  // accountsList.forEach(element => {
  //   // console.log(element);
  //   element.results.forEach((elem, i) => {
  //     console.log(elem, i);
  //     // dateArray.forEach(el => {
  //       if (dateArray.includes(moment(elem.transaction_at).format('L'))) {
  //         // console.log(el);
  //         console.log('same');
  //       }
  //     // });
  //   })
  // });

  dateArray.forEach(baseDate => {
    // console.log(baseDate, 'base');

    accountsList.forEach(elem => {
      elem.results.forEach(el => {
        if (accountsList.includes(Date(baseDate))) {
          // console.log(moment(el.transaction_at).format('L'), 'PAREIL');
          // console.log(el);
          tempValue += el.dayResult + el.deposit - el.withdrawal;
          dataArray.push(tempValue);
        }
        // else {
        //   dataArray.push(tempValue);
        // }
      })
    })
  })

  // dataArray.reduce((prev, curr,i) =>  finalArray[i] = prev + curr , 0)
  // console.log(tempValue);
  // console.log(finalArray);
  console.log(dataArray);

  return dataArray;
};
