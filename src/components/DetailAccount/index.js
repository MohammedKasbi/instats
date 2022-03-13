import './style.scss';
import { useEffect } from 'react';
import { Line  } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment/dist/moment';

const DetailAccount = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.account.loading);
  const accountData = useSelector((state) => state.account.accountData);

  const {id} = useParams();

  useEffect(() => {
    dispatch({
      type: 'FETCH_ACCOUNT',
      id: id
    });
  }, [dispatch, id]);
  
  const lastDays = [];
  const lastsValues = [];
  const cumulatedValues = [];
  const finalDataForHistory = [];

  if (accountData) {
    // ? prepare data to be sorted and de-duplicated
    const history = [];
    const tempDeposits = [];
    const tempWithdrawals = [];
    const tempResults = [];
    accountData.deposit.forEach(elem => {
      const {value, depositedAt: historyDate} = elem;
      history.push({ value, historyDate });
      tempDeposits.push({ value, historyDate });
    });
    accountData.result.forEach(elem => {
      const {value, resultAt: historyDate} = elem;
      history.push({ value, historyDate });
      tempResults.push({ value, historyDate });
    });
    accountData.withdrawal.forEach(elem => {
      const {value, withdrawnAt: historyDate} = elem;
      history.push({ value: -value, historyDate });
      tempWithdrawals.push({ value: -value, historyDate });
    });
    // ? end of prepare data to be sorted and de-duplicated

    // ? sort function
    function compare( a, b ) {
      if ( a.historyDate < b.historyDate ){
        return -1;
      }
      if ( a.historyDate > b.historyDate ){
        return 1;
      }
      return 0;
    }

    history.sort(compare);
    tempResults.sort(compare);
    tempWithdrawals.sort(compare);
    tempDeposits.sort(compare);
    // ? end of sort

    // ? date transform
    const totalHistory = history.map(elem => {
      return {
        historyDate: moment(elem.historyDate).format('L'),
        value: elem.value,
      }
    })
    const resultsD = tempResults.map(elem => {
      return {
        historyDate: moment(elem.historyDate).format('L'),
        value: elem.value,
      }
    })
    const WithdrawalsD = tempWithdrawals.map(elem => {
      return {
        historyDate: moment(elem.historyDate).format('L'),
        value: elem.value,
      }
    })
    const DepositsD = tempDeposits.map(elem => {
      return {
        historyDate: moment(elem.historyDate).format('L'),
        value: elem.value,
      }
    })
    // ? end of date transform

    // ? de-duplicate
    function arrayUnique(array) {
      let a = array.concat();
      for(let i = 0; i < a.length; ++i) {
        for(let j = i + 1; j < a.length; ++j) {
          if(a[i].historyDate === a[j].historyDate) {
            a[i].value += a[j].value;
            a.splice(j--, 1);
          }
        }
      }
      return a;
    }

    const deDuplicate = arrayUnique(totalHistory);
    const deDuplicateResults = arrayUnique(resultsD);
    const deDuplicateWithdrawals = arrayUnique(WithdrawalsD);
    const deDuplicateDeposits = arrayUnique(DepositsD);
    // ? end of de-suplicate
    
    // ? data prepare for graph
    deDuplicate.forEach(elem => {
      lastDays.push(elem.historyDate);
      lastsValues.push(elem.value);
    });

    lastsValues.reduce(function(a,b,i) { return cumulatedValues[i] = a + b; }, 0)
    // ? end of data prepare for graph

    for (let i = 0; i < deDuplicate.length; i++) {
      finalDataForHistory.push({
        date: deDuplicate[i].historyDate,
        capital: cumulatedValues[i],
      });
    }

    for (let i = 0; i < finalDataForHistory.length; i++) {
      deDuplicateResults.forEach(elem => {
        if (finalDataForHistory[i].date === elem.historyDate) {
          finalDataForHistory[i].result = elem.value
        }
      });

      deDuplicateWithdrawals.forEach(elem => {
        if (finalDataForHistory[i].date === elem.historyDate) {
          finalDataForHistory[i].withdrawal = elem.value
        }
      });

      deDuplicateDeposits.forEach(elem => {
        if (finalDataForHistory[i].date === elem.historyDate) {
          finalDataForHistory[i].deposit = elem.value
        }
      });
    };

    // console.log(accountData);
    // console.log(history);
    console.log(deDuplicate);
    console.log('results', deDuplicateResults);
    console.log('withdraws', deDuplicateWithdrawals);
    console.log(deDuplicateDeposits);
    console.log(finalDataForHistory);
  }

  const lineData = {
    labels: lastDays,
    datasets: [{
      data: cumulatedValues,
      // backgroundColor: 'linear-gradient(90deg, rgba(0,113,255,1) 0%, rgba(0,113,255,0) 100%);',
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      // borderWidth: 9,
      pointRadius: 4,
      pointHoverRadius: 7,
      pointBackgroundColor: 'rgb(75, 192, 192)',
      tension: 0.15,
    }],
  }

  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
    },
  }

  if (loading) {
    return <div>
      Chargement...
    </div>
  }

  return (
    <div className="detail-account">
      <div className='detail-account__graph'>
        <Line data={lineData} options={lineOptions} />
      </div>
      <table className="detail-account__result">
        <thead>
          <tr className="detail-account__result__head">
            <th>Date</th>
            {/* <th>%</th> */}
            <th>Gain</th>
            <th>Capital</th>
            <th>Dépôt</th>
            <th>Retrait</th>
          </tr>
        </thead>
        <tbody className="detail-account__result__body">
          {finalDataForHistory.map((elem, index)=> (
            <tr className="detail-account__result__data" key={index}>
              <td>{elem.date}</td>
              <td>{Math.round(elem.result * 100) / 100 || 0}</td>
              <td>{Math.round(elem.capital * 100) / 100}</td>
              <td>{Math.round(elem.deposit * 100) / 100 || 0}</td>
              <td>{Math.round(elem.withdrawal * 100) / 100 || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailAccount;
