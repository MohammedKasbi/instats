import './style.scss';
import { Line  } from 'react-chartjs-2';
import Account from '../Account';
import { getDates } from '../../selectors/getDates';
import { getDaysArray } from '../../selectors/getDaysArray';
import { dateCompare } from '../../selectors/dateCompare';
import { useState } from 'react';

const History = ({ accountsList }) => {
  // Array that contain all dates of all transactions on all of the accounts
  const dates = getDates(accountsList);
  // Sorting dates
  dates.sort();
  // Array that contain all of dates from the first transaction to the last
  const allDates = getDaysArray(dates[0], dates.at(-1));

  const graphValues = dateCompare(allDates, accountsList);

  const [duration, setDuration] = useState(7);
  const handleChangeDuration = (evt) => {
    setDuration(evt.target.value);
  }

  const lineData = {
    labels: allDates.slice(-duration),
    datasets: [{
      data: graphValues.slice(-duration),
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
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutElastic',
      }
    },
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

  return (
    <div className="history">
      <div className="history__data-select">
        <button value="7" onClick={handleChangeDuration}>S</button>
        <button value="30" onClick={handleChangeDuration}>M</button>
        <button value="90" onClick={handleChangeDuration}>3M</button>
        <button value="" onClick={handleChangeDuration}>Tout</button>
          {/* <select name="select-account" id="select-account" onChange={handleChange}>
            <option value="all-accounts">Tous les comptes</option>
            {accountsList.map((elem) => (
              <option key={elem.id} value={elem.id}>{elem.name}</option>
            ))}
          </select> */}
      </div>
      <div className='history__graph'>
        <Line data={lineData} options={lineOptions} />
      </div>
      <div className="history__account-list">
        {accountsList.map((elem) => {
            // The variable that will contain the sum of each account
            let tempSum = 0;
            // The variable that will contain the sum of benefit of each account
            let tempProfit = 0;
            // The variable that will contain the sum of deposits of each account
            // and will be used to calculate the percent of the account
            let tempDeposits = 0;

            // For each element in 'results' arrays
            elem.results.forEach(element => {
              // Increment the sum of daily earnings, deposits, minus withdrawals in 'tempsSum' variable
              tempSum += (element.dayResult + element.deposit - element.withdrawal);
              // Increment the sum of daily earnings in 'tempProfit' variable
              tempProfit += element.dayResult;
              // Increment the sum of deposits in 'tempDeposits' variable
              tempDeposits += element.deposit;
            })

            return (
              <Account
                key={elem.id}
                id={elem.id}
                name={elem.name}
                value={tempSum}
                // Calculation of the percentage using the variables 'tempDeposits' and 'tempProfit'
                percent={tempProfit / tempDeposits}
                dollar={tempProfit}
              />)
        })}
      </div>
    </div>
  );
};

export default History;
